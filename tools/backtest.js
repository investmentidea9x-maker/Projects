#!/usr/bin/env node
/* Backtest 2024–2025: khởi tạo thế giới ở 12/2023, ép các cú sốc ngoại sinh thật (Fed, USD mạnh, sốt vàng, nới room, bão Yagi,
   Trump, chỉ thị tăng trưởng 2025, thuế quan Mỹ, chiến sự Israel–Iran), để NHNN tự động và các ngân hàng máy tự phản ứng,
   rồi so với dữ liệu thật (HIST) từng quý. Chạy: node tools/backtest.js  (cần Node 18+) */
const fs=require('fs');const path=require('path');const html=fs.readFileSync(path.join(__dirname,'..','index.html'),'utf8');
let js=html.slice(html.indexOf('<script>')+8, html.lastIndexOf('</script>')).replace('renderStart();','');
global.window={devicePixelRatio:1,addEventListener(){},scrollTo(){}};global.document={querySelector(){return {innerHTML:'',querySelectorAll(){return []}}},getElementById(){return null},querySelectorAll(){return []},documentElement:{},body:{appendChild(){},classList:{add(){},remove(){}}},createElement(){return {style:{}}}};global.localStorage={getItem(){return null},setItem(){}};global.getComputedStyle=()=>({getPropertyValue:()=>'#000'});global.toast=()=>{};
const m={}; new Function('module',js+';module.exports={World,HIST,EVENTS,MAC,setW:(w)=>{W=w}};')(m); const {World,HIST,EVENTS,MAC,setW}=m.exports;
const L0=23; // 12/2023
// Kịch bản sự kiện thật 2024–2025 (k = tháng kể từ 12/2023): id sự kiện trong game hoặc cú sốc trực tiếp
const SCRIPT={
  3:[{shock:{name:'USD mạnh (DXY 105), sốt vàng, rút vốn gián tiếp',left:9,fx:4.3}},{ev:'gold'}],
  8:[{ev:'room',note:'NHNN nới room 8/2024'}],
  9:[{ev:'yagi'}],
  11:[{shock:{name:'Trump đắc cử, USD tăng',left:5,fx:1.5}},{ev:'room',note:'NHNN nới room lần 2 (28/11/2024)'}],
  14:[{ev:'growthpush',note:'chỉ thị tăng trưởng tín dụng 16%+, nới room (2/2025)'}],
  16:[{ev:'tariff',note:'thuế đối ứng 46% (2/4/2025)'}],
  18:[{ev:'iran',note:'chiến sự Israel–Iran 12 ngày'}],
  19:[{ev:'room',note:'NHNN nới room 7/2025'}],
};
function run(seed, verbose){
  const W=new World('bank','mbb','real',{startIdx:L0, scale:HIST.credit[L0]/HIST.credit[35], scripted:true}); setW(W); W.sbv.fxDefend='loose'; W.sbv.band=5; // NHNN thật 2024–2025 để VND trượt tới mép biên độ ±5%, chỉ bán USD khi mất giá > 4%/năm
  const rows=[];
  for(let k=1;k<=21;k++){ const idx=L0+k;
    W.macro.fedRate=HIST.fed[idx]; W.us.target=HIST.fed[idx]; // đường lãi suất Fed thật (ngoại sinh)
    for(const a of (SCRIPT[k]||[])){ if(a.ev){ const ev=EVENTS.find(e=>e.id===a.ev); ev.apply(W); W.lastEv[a.ev]=W.month; W.addLog('Sự kiện: '+ev.title,'warn'); } if(a.fx){ W.macro.fx+=a.fx; } if(a.shock){ W.addShock(a.shock); } }
    W.aiPolicy(W.player); W.pendingEvent=null; W.step(); W.pendingEvent=null;
    const M=W.macro,K=W.market,S=W.sbv;
    rows.push({k, date:W.dateStr(), cpi:[M.cpi,HIST.cpi[idx]], gdp:[M.gdp,HIST.gdp[idx]], refi:[S.refi,HIST.refi[idx]], ibON:[K.ibON,HIST.ibON[idx]], usd:[M.usd,HIST.usd[idx]], dep12:[K.gt12,HIST.dep12[idx]], m2:[M.m2,HIST.m2[idx]], lend:[K.lendSys-1.6,HIST.lend[idx]], cg:[W.sysCreditGrowthAnn,HIST.cg[idx]], res:[M.reserves,HIST.res[idx]], npl:[W.sysNpl()*100,HIST.npl[idx]], re:[M.re,HIST.re[idx]], fx:[M.fx, idx>=12?(HIST.usd[idx]/HIST.usd[idx-12]-1)*100:0], tightn:[W.tightness,0], omo:S.omoNet, fxSell:S.fxSell, tight:W.tightness});
  }
  return {W,rows};
}
const N=+(process.argv[2]||8); const runs=[]; for(let i=0;i<N;i++) runs.push(run(i));
const keys=['cpi','gdp','refi','ibON','usd','dep12','lend','cg','m2','res','npl','re','fx','tightn'];
const avg=k=>runs[0].rows.map((_,j)=>runs.reduce((a,r)=>a+r.rows[j][k][0],0)/runs.length);
console.log('Tháng      '+keys.map(k=>k.padStart(11)).join(''));
for(let j=0;j<21;j++){ const r=runs[0].rows[j]; if(j%3!==2 && j!==20) continue;
  console.log(r.date.padEnd(9)+' '+keys.map(k=>{const sim=avg(k)[j], real=r[k][1]; const f=k==='usd'?x=>Math.round(x):x=>x.toFixed(1); return (f(sim)+'/'+f(real)).padStart(11);}).join(''));
}
console.log('RMSE       '+keys.map(k=>{const a=avg(k); const e=Math.sqrt(runs[0].rows.reduce((s,r,j)=>s+Math.pow(a[j]-r[k][1],2),0)/21); return (k==='usd'?Math.round(e):e.toFixed(2)).toString().padStart(11);}).join(''));
const W=runs[0].W; console.log('\nHành động NHNN mô phỏng (lần chạy 1):'); for(const a of (W.actions||[])) console.log('  '+W.dateStr(a.m)+' '+a.text.slice(0,110)+(a.why?'\n      vì: '+a.why.slice(0,110):''));
console.log('\nThực tế NHNN 2024–2025 (để đối chiếu):\n  T3/2024 phát hành lại tín phiếu (11/3), hút ~170 nghìn tỷ\n  T4/2024 bán USD giao ngay từ 19/4, T4–T7 bán ~6–7 tỷ USD; đấu thầu vàng T4–T5, bán vàng qua 4 NHTM quốc doanh từ 3/6\n  T8–T9/2024 ngừng tín phiếu, bơm OMO; Fed hạ 0,5 điểm T9\n  T11–T12/2024 tín phiếu trở lại, bán thêm ~2–3 tỷ USD sau bầu cử Mỹ; Fed hạ T11, T12\n  2025: giữ lãi điều hành 4,5% cả năm; T2 yêu cầu giảm lãi huy động; room 16% rồi nới; T4 thuế đối ứng; T7 nới trần LDR/room; T9 Fed hạ 0,25');
