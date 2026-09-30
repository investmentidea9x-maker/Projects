// node tools/mechtest.js — 7 kiểm thử bắt buộc cho cơ chế điều hành và dẫn truyền (Fed → tỷ giá → thanh khoản → LNH → huy động → chi phí vốn; M2; nhãn chu kỳ)
// Kiểm thử bắt buộc 7 kịch bản cơ chế tiền tệ
const fs=require('fs');const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
let js=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>')).replace('renderStart();','');
global.window={devicePixelRatio:1,addEventListener(){},scrollTo(){}};global.document={querySelector(){return {innerHTML:'',querySelectorAll(){return []}}},getElementById(){return null},querySelectorAll(){return []},documentElement:{},body:{appendChild(){},classList:{add(){},remove(){}}},createElement(){return {style:{},classList:{add(){},remove(){}}}}};global.localStorage={getItem(){return null},setItem(){}};global.requestAnimationFrame=()=>{};global.toast=()=>{};
const m={}; new Function('module',js+';module.exports={World,SBV,setW:w=>{W=w;}};')(m); const {World,setW}=m.exports;
const f1=x=>(+x).toFixed(1), f2=x=>(+x).toFixed(2);
function mk(mode='bank', auto=true){ const W=new World(mode,mode==='bank'?'vcb':null,'real'); setW(W); W.weekly=true; if(mode==='sbv') W.autoSbv=auto; return W; }
function runM(W,n,hook){ for(let i=0;i<n;i++){ if(hook) hook(W,i); if(W.player) W.aiPolicy(W.player); for(let k=0;k<4;k++){ W.pendingEvent=null; const done=W.weekStep(); if(W.pendingEvent&&W.pendingEvent.choice) W.pendingEvent.choices[0].apply(W); W.pendingEvent=null; if(done) break; } } }
const st=W=>({m:W.month,fx:f2(W.macro.fx),usd:W.macro.usd,res:f1(W.macro.reserves),ib:f2(W.market.ibON),dep12:f2(W.market.gt12),cof:f2(W.market.cof),refi:W.sbv.refi,m2:f1(W.macro.m2),cg:f1(W.sysCreditGrowthAnn),bills:Math.round(W.sbv.billsOut||0),tight:f2(W.tightness),phase:W.cyclePhase().key,gap:f2(W.macro.gap),ldr:f1(W._ldrSys*100)});
function acts(W,re,n=6){ return W.actions.filter(a=>re.test(a.text)).slice(-n).map(a=>W.dateStr(a.m)+' '+a.text.slice(0,120)).join('\n  '); }
// 1. Fed tăng liên tục, NHNN giữ/hạ
{ const W=mk(); W.scripted=true; runM(W,3); const b=st(W); runM(W,9,(W,i)=>{ if(i%3===0) W.macro.fedRate+=0.5; }); const a=st(W);
  console.log('\n[1] Fed +0,5 mỗi quý (fed', W.macro.fedRate, ') — trước:',JSON.stringify(b),'\n    sau 9 tháng:',JSON.stringify(a)); console.log('  hành động NHNN:\n  '+acts(W,/bán .*USD|tín phiếu|tăng lãi suất điều hành|giảm lãi suất/,8)); }
// 2. NHNN mua USD không hút lại
{ const W=mk('sbv',false); W.scripted=true; runM(W,2); const b=st(W); for(let i=0;i<4;i++){ W.macro.reserves+=5; W.fxFlow(5*W.macro.usd); runM(W,1); } const a=st(W); console.log('\n[2] Mua 20 tỷ USD trong 4 tháng, không hút — trước:',JSON.stringify(b),'\n    sau:',JSON.stringify(a)); }
// 3. Giữ lãi điều hành, đổi thanh khoản (tín phiếu 2% tiền gửi rồi bơm)
{ const W=mk('sbv',false); W.scripted=true; runM(W,2); const b=st(W); W.sbv.ops.push({id:1,kind:'absorb',amt:W.sysDeposits()*0.02,tenor:28,left:28,roll:1,rate:W.sbv.bill}); W.recomputeOmo(); runM(W,2); const a=st(W); W.sbv.ops=[{id:2,kind:'inject',amt:W.sysDeposits()*0.02,tenor:14,left:14,roll:1,rate:W.sbv.omo}]; W.recomputeOmo(); runM(W,2); const c=st(W); console.log('\n[3] TCV giữ', W.sbv.refi, '— nền:',JSON.stringify(b),'\n    hút tín phiếu 2% TG:',JSON.stringify(a),'\n    bơm OMO 2% TG:',JSON.stringify(c)); }
// 4. Tín dụng tăng nhanh hơn tiền gửi
{ const W=mk('sbv',false); W.scripted=true; runM(W,2); const b=st(W); runM(W,12,(W)=>{ for(const x of W.banks){ x.room=30; x.pol.growthTarget=30; } }); const a=st(W); console.log('\n[4] Room 30%, tín dụng > tiền gửi 12 tháng — trước:',JSON.stringify(b),'\n    sau:',JSON.stringify(a)); }
// 5. Hạ lãi điều hành → chi phí vốn giảm dần
{ const W=mk('sbv',false); W.scripted=true; runM(W,2); const rows=[]; W.sbv.refi-=1; W.sbv.omo-=1; W.sbv.bill-=1; W.sbv.disc-=1; W.sbv.depCap6m-=1; for(let i=0;i<12;i++){ runM(W,1); const s=st(W); rows.push(`m${i+1} ib ${s.ib} dep12 ${s.dep12} cof ${s.cof}`); } console.log('\n[5] Hạ TCV 1 điểm — '+rows.join(' | ')); }
// 6. Dự trữ đổi khớp giao dịch: so sánh tổng đổi dự trữ và tổng giao dịch có log
{ const W=mk(); runM(W,24); const r0=W.hist[W.hist.length-25].reserves, r1=W.macro.reserves; let tx=0; for(const a of W.actions){ let mm; if((mm=a.text.match(/NHNN mua ([\d,]+) tỷ USD/))) tx+=+mm[1].replace(',','.'); else if((mm=a.text.match(/NHNN bán ([\d,]+) tỷ USD/))) tx-=+mm[1].replace(',','.'); else if((mm=a.text.match(/dự trữ −([\d,]+) tỷ USD/))) tx-=+mm[1].replace(',','.'); else if((mm=a.text.match(/Forward .*giao ([\d,]+) tỷ USD/))) tx-=+mm[1].replace(',','.'); }
  console.log('\n[6] Dự trữ 24 tháng: đổi thực', f1(r1-r0), 'tỷ USD; tổng giao dịch có log', f1(tx)); }
// 7. Nhãn chu kỳ ổn định
{ const W=mk(); runM(W,60); const ph=W.hist.slice(-60).map(h=>h.phase); let sw=0; for(let i=1;i<ph.length;i++) if(ph[i]!==ph[i-1]) sw++; const cnt={}; ph.forEach(k=>cnt[k]=(cnt[k]||0)+1); console.log('\n[7] Nhãn chu kỳ 60 tháng: đổi', sw, 'lần;', JSON.stringify(cnt), '; gap cuối', f2(W.macro.gap)); }
