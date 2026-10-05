// Kiểm tra 5 mốc vĩ mô (quy tắc tăng lãi, phương trình CPI, vòng quay tiền, sàn lãi vay) trên ván 15 năm.
// Chạy: node tools/macrotest.js [SEEDS=1,2,3] [YEARS=15]
const fs = require('fs'); const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>')).replace('renderStart();', '');
global.window = { devicePixelRatio: 1, addEventListener() {}, scrollTo() {} }; global.document = { querySelector() { return { innerHTML: '', querySelectorAll() { return []; } }; }, getElementById() { return null; }, querySelectorAll() { return []; }, documentElement: {}, body: { appendChild() {}, classList: { add() {}, remove() {} } }, createElement() { return { style: {}, classList: { add() {}, remove() {} }, appendChild() {}, setAttribute() {}, getContext() { return null; } }; } }; global.NO_REAL = true; /* kiểm thử cơ chế: không qua giai đoạn số liệu thật */ global.localStorage = { getItem() { return null; }, setItem() {} }; global.navigator = { clipboard: {} }; global.requestAnimationFrame = () => 0; global.setTimeout = () => 0; global.console.warn = () => {};
const m = {}; new Function('module', js + ';module.exports={World,MAC,setW:w=>{W=w;}};')(m); const { World, MAC, setW } = m.exports;
const YEARS = +(process.env.YEARS || 15); const seeds = (process.env.SEEDS || '1,2,3').split(',').map(Number); const scen = seeds.map(seed => ({ seed, hold: false })); if (process.env.HOLD !== '0') scen.push({ seed: seeds[0], hold: true }); // kịch bản thêm: NHNN giữ nguyên TCV (Thống đốc hạ về 2,5 rồi giữ) để kiểm mốc 2
const f = (v, d = 1) => (v == null ? '-' : (+v).toFixed(d));
let pass = 0, fail = 0; const ok = (c, msg) => { console.log(`  ${c ? '✓' : '✗'} ${msg}`); if (c) pass++; else fail++; };
for (const { seed, hold } of scen) {
  let s = seed; Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; };
  const W = new World('bank', 'vcb', 'real'); setW(W); W.weekly = true; W.termMonths = 0; if (hold) { W.sbv.holdRefi = true; W.sbv.refi = 2.5; W.sbv.omo = 2.0; W.sbv.disc = 1.0; W.sbv.bill = 1.5; } // kịch bản thụ động: Thống đốc hạ TCV về 2,5 ngay và giữ suốt ván (kích thích) → tín dụng vượt GDP danh nghĩa kéo dài
  const moves = []; let prev = W.sbv.refi;
  for (let i = 0; i < YEARS * 12; i++) { W.aiPolicy(W.player); for (let k = 0; k < 4; k++) { W.pendingEvent = null; W.weekStep(); W.pendingEvent = null; } if (W.sbv.refi !== prev) moves.push({ m: i, d: W.sbv.refi - prev }); prev = W.sbv.refi; }
  const H = W.hist.filter(x => !x.hist);
  console.log(`\n[seed ${seed}${hold ? ', NHNN giữ TCV' : ''}] ${YEARS} năm · TCV ${f(Math.min(...H.map(x => x.refi)), 2)}–${f(Math.max(...H.map(x => x.refi)), 2)} · CPI ${f(Math.min(...H.map(x => x.cpi)))}–${f(Math.max(...H.map(x => x.cpi)))} · GDP ${f(Math.min(...H.map(x => x.gdp)))}–${f(Math.max(...H.map(x => x.gdp)))} · tín dụng bq ${f(H.reduce((a, x) => a + x.cg, 0) / H.length)} · M2 bq ${f(H.reduce((a, x) => a + x.m2, 0) / H.length)}`);
  // 1. ≥ 2 chu kỳ tăng TCV, mỗi chu kỳ ≥ 1 điểm (các lần tăng cách nhau < 12 tháng gộp thành một chu kỳ, chu kỳ kết thúc khi có lần hạ)
  const cycles = []; let cur = null; for (const mv of moves) { if (mv.d > 0) { if (cur && mv.m - cur.end < 12) { cur.tot += mv.d; cur.end = mv.m; } else { cur = { start: mv.m, end: mv.m, tot: mv.d }; cycles.push(cur); } } else cur = null; }
  const big = cycles.filter(c => c.tot >= 1 - 1e-9);
  if (!hold) ok(big.length >= 2, `1. chu kỳ tăng TCV ≥ 1 điểm: ${big.length} (${big.map(c => `${W.dateStr(c.start + 1)}→${W.dateStr(c.end + 1)} +${f(c.tot, 2)}`).join(', ') || 'không'}) — mục tiêu ≥ 2 trong ${YEARS} năm`);
  // 2. tín dụng − GDP danh nghĩa > 4 điểm liên tục 24 tháng → CPI > 5 trong 18 tháng sau đó
  const cg = H.map(x => x.credGap ?? (x.cg - x.gdp - x.cpi)); let run = 0; const episodes = []; for (let i = 0; i < H.length; i++) { run = cg[i] > 4 ? run + 1 : 0; if (run === 24) episodes.push(i); }
  if (!episodes.length) console.log('  · 2. không có đợt tín dụng vượt GDP danh nghĩa > 4 điểm suốt 24 tháng (không kiểm tra được)');
  for (const e of episodes) { const win = H.slice(e, e + 18); const mx = Math.max(...win.map(x => x.cpi)); ok(mx > 5, `2. đợt tín dụng vượt GDP danh nghĩa > 4 điểm 24 tháng tới ${W.dateStr(e + 1)}: CPI cao nhất 18 tháng sau ${f(mx)} (mục tiêu > 5)`); }
  // 3. TCV − CPI không âm quá 4 quý liên tục
  let neg = 0, maxNeg = 0; for (const r of H) { neg = r.refi - r.cpi < 0 ? neg + 1 : 0; maxNeg = Math.max(maxNeg, neg); }
  if (!hold) ok(maxNeg <= 12, `3. lãi điều hành thực âm dài nhất ${maxNeg} tháng (mục tiêu ≤ 12)`);
  // 4. M2/GDP danh nghĩa tăng dần cả ván, không giảm (so theo năm, cho phép nhiễu 0,02)
  const yr = []; for (let y = 0; y < YEARS; y++) { const rows = H.slice(y * 12, y * 12 + 12).filter(r => r.m2gdp); if (rows.length) yr.push(rows.reduce((a, r) => a + r.m2gdp, 0) / rows.length); } // bình quân năm (bỏ nhiễu tháng)
  let drops = 0; for (let i = 1; i < yr.length; i++) if (yr[i] < yr[i - 1] - 0.01) drops++;
  ok(yr[yr.length - 1] > yr[0] + 0.05, `4a. M2/GDP danh nghĩa bình quân năm ${f(yr[0], 2)} → ${f(yr[yr.length - 1], 2)} (mục tiêu tăng cả ván): ${yr.map(v => f(v, 2)).join(' ')}`);
  ok(drops === 0, `4b. số năm M2/GDP danh nghĩa giảm so với năm trước: ${drops} (mục tiêu 0)`);
  // 5. lãi cho vay bình quân không dưới 5,5 dù TCV về 2,5
  const minLend = Math.min(...H.map(x => x.lendNew)); const atFloor = H.filter(x => x.refi <= 2.5);
  ok(minLend >= 5.5, `5. lãi cho vay mới bình quân thấp nhất ${f(minLend, 2)} (mục tiêu ≥ 5,5; ${atFloor.length} tháng TCV = 2,5, lãi vay khi đó thấp nhất ${atFloor.length ? f(Math.min(...atFloor.map(x => x.lendNew)), 2) : '–'})`);
}
console.log(`\nĐạt ${pass}, trượt ${fail}`); process.exit(fail ? 1 : 0);
