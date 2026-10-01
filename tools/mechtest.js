// node tools/mechtest.js — kiểm thử chấp nhận cơ chế tiền tệ (sổ tiền cơ sở, liên ngân hàng khớp hai phía, LNH theo thiếu hụt, cầu USD ròng)
const fs=require('fs');const html=fs.readFileSync(require('path').join(__dirname,'..','index.html'),'utf8');
let js=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>')).replace('renderStart();','');
global.window={devicePixelRatio:1,addEventListener(){},scrollTo(){}};global.document={querySelector(){return {innerHTML:'',querySelectorAll(){return []}}},getElementById(){return null},querySelectorAll(){return []},documentElement:{},body:{appendChild(){},classList:{add(){},remove(){}}},createElement(){return {style:{},classList:{add(){},remove(){}}}}};global.localStorage={getItem(){return null},setItem(){}};global.requestAnimationFrame=()=>{};global.toast=()=>{};
const m={}; new Function('module',js+';module.exports={World,setW:w=>{W=w;}};')(m); const {World,setW}=m.exports;
const f1=x=>(+x).toFixed(1), f2=x=>(+x).toFixed(2);
function mk(mode='bank', opts={}){ const W=new World(mode,mode==='bank'?'vcb':null,'real',opts); setW(W); W.weekly=true; if(mode==='sbv') W.autoSbv=true; W.sbv.holdRefi=true; /* kiểm thử cơ chế thanh khoản: giữ lãi điều hành cố định (bản chơi thật: NHNN hạ lãi khi GDP < 8%) */ return W; }
const stats={ibBorrowMonths:0, bankMonths:0, ibMismatch:0, ledgerMax:0, ledgerN:0};
function runM(W,n,hook,track){ for(let i=0;i<n;i++){ if(hook) hook(W,i); if(W.player) W.aiPolicy(W.player); for(let k=0;k<4;k++){ W.pendingEvent=null; const done=W.weekStep(); if(W.pendingEvent&&W.pendingEvent.choice) W.pendingEvent.choices[0].apply(W); W.pendingEvent=null;
  if(track){ stats.ledgerN++; stats.ledgerMax=Math.max(stats.ledgerMax, Math.abs(W.ledgerErr||0)); const al=W.banks.filter(b=>!b.dead); const lend=al.reduce((a,b)=>a+b.ibLend,0), bor=al.reduce((a,b)=>a+b.ibBorrow,0); if(Math.abs(lend-bor)>1) stats.ibMismatch++; if(done){ stats.bankMonths+=al.length; stats.ibBorrowMonths+=al.filter(b=>b.ibBorrow>0||b.refi>0).length; } }
  if(done) break; } } }
const st=W=>({m:W.month,fx:f2(W.macro.fx),usd:W.macro.usd,res:f1(W.macro.reserves),ib:f2(W.market.ibON),omo:W.sbv.omo,dep12:f2(W.market.gt12),cof:f2(W.market.cof),refi:W.sbv.refi,m2:f1(W.macro.m2),cg:f1(W.sysCreditGrowthAnn),bills:Math.round(W.sbv.billsOut||0),x:f2(W.liq?W.liq.x:0),short:Math.round(W.liq?W.liq.shortage:0),omoT:Math.round(W.liq?W.liq.omoTaken:0),bankUsd:f1(W.sbv.bankUsd||0),ldr:f1(W._ldrSys*100)});
// [1] + [2] + [5] + [6]: không cú sốc 5 năm
{ const W=mk(); W.scripted=true; const yr=[]; let over=0, n=0; runM(W,60,(W,i)=>{ if(i%12===0&&i) yr.push(st(W)); }, true); yr.push(st(W));
  for(const h of W.hist.filter(h=>!h.hist)){ n++; if(h.ibON>h.omo+0.2) over++; }
  const ibs=W.hist.filter(h=>!h.hist).map(h=>h.ibON); const half=Math.floor(ibs.length/2); const a1=ibs.slice(0,half).reduce((a,b)=>a+b,0)/half, a2=ibs.slice(half).reduce((a,b)=>a+b,0)/(ibs.length-half);
  console.log('\n[1] Không cú sốc 5 năm — LNH từng năm:', yr.map(s=>s.ib).join(' → '), '| nửa đầu', f2(a1), 'nửa sau', f2(a2), a2>=a1-0.3?'✓ không xu hướng giảm':'✗ giảm');
  console.log('[2] LNH > OMO + 0,2 ở', (over/n*100).toFixed(0)+'% số tháng', over/n>=0.1&&over/n<=0.3?'✓':'✗ (mục tiêu 10–30%)');
  console.log('[5] Ngân hàng-tháng có vay liên NH/OMO:', (stats.ibBorrowMonths/stats.bankMonths*100).toFixed(0)+'%', stats.ibBorrowMonths/stats.bankMonths>=0.2?'✓':'✗', '; tổng cho vay ≠ tổng đi vay ở', stats.ibMismatch, 'kỳ', stats.ibMismatch===0?'✓':'✗');
  const tol=Math.max(50, 0.0001*W.baseMoney()); console.log('[6] Sổ tiền cơ sở: sai số lớn nhất', Math.round(stats.ledgerMax), 'tỷ trong', stats.ledgerN, 'tuần (ngưỡng', Math.round(tol), '= 0,01% tiền cơ sở)', stats.ledgerMax<tol?'✓':'✗', '| sổ kỳ cuối', JSON.stringify(Object.fromEntries(Object.entries(W.ledgerLast||{}).map(([k,v])=>[k,Math.round(v)]))));
  console.log('    cuối ván:', JSON.stringify(st(W))); }
// [3] Bán 20–25 tỷ USD trong 9 tháng, không bơm bù
{ const W=mk(); W.scripted=true; runM(W,3); const b=st(W); const r0=W.macro.reserves; const rows=[];
  W.sbv.forceFxFill=1; W.sbv.forceOmoFill=0; runM(W,9,(W,i)=>{ W.sbv.suaInjNext=0; W.addShock({name:'rút vốn',left:1,fx:11}); }); // cú sốc 11 → cầu ≈ −3,8 tỷ/tháng ngoài carry; NHNN bán đủ, không bơm bù
  const a=st(W); const sold=r0-W.macro.reserves; runM(W,0); console.log('\n[3] Bán', f1(sold), 'tỷ USD trong 9 tháng, NHNN không bơm bù — trước:', JSON.stringify(b), '\n    sau:', JSON.stringify(a), '\n    ΔLNH', f2(a.ib-b.ib), (a.ib-b.ib>=4&&a.ib-b.ib<=5.5?'✓':'✗ mục tiêu +4–5'), 'Δhuy động 12T', f2(a.dep12-b.dep12), (a.dep12-b.dep12>=2.5&&a.dep12-b.dep12<=3.5?'✓':'✗ mục tiêu +2,5–3,5')); }
// [4] Fed +2, NHNN giữ lãi
{ const W=mk(); W.scripted=true; runM(W,3); const b=st(W); W.macro.fedRate+=2; W.us.target=W.macro.fedRate; runM(W,3); const a=st(W);
  console.log('\n[4] Fed +2, NHNN giữ — trước:', JSON.stringify(b), '\n    sau 3 tháng:', JSON.stringify(a), '\n    Δdự trữ', f1(a.res-b.res), 'ΔLNH', f2(a.ib-b.ib), (a.res-b.res<=-3||a.ib-b.ib>=1?'✓':'✗')); }
