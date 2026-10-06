// Kiểm tra kênh tỷ giá → lãi suất → lạm phát: node tools/fxtest.js
// (1) lãi VND thấp kéo dài so với Fed → dân cư đổi sang USD, vàng (đô la hóa); (2) tỷ giá phản ứng; (3) LNH không chìm sâu dưới Fed kéo dài;
// (4) vị thế ngoại tệ ngân hàng có trần; (5) NHNN không hạ lãi khi dòng ra đang chảy; (6) VND mất giá truyền vào CPI (tư liệu sản xuất nhập khẩu); (7) sổ tiền cơ sở cân
global.NO_REAL = true;
const fs = require('fs'); const html = fs.readFileSync(__dirname + '/../index.html', 'utf8');
const js = html.slice(html.indexOf('<script>') + 8, html.lastIndexOf('</script>')).replace('renderStart();', '');
global.window = { devicePixelRatio: 1, addEventListener() {}, scrollTo() {} }; global.document = { querySelector() { return { innerHTML: '', querySelectorAll() { return []; } }; }, getElementById() { return null; }, querySelectorAll() { return []; }, documentElement: {}, body: { appendChild() {}, classList: { add() {}, remove() {} } }, createElement() { return { style: {}, classList: { add() {}, remove() {} }, appendChild() {}, setAttribute() {}, getContext() { return null; } }; } }; global.localStorage = { getItem() { return null; }, setItem() {} }; global.navigator = { clipboard: {} }; global.requestAnimationFrame = () => 0; global.setTimeout = () => 0; global.console.warn = () => {};
const m = {}; new Function('module', js + ';module.exports={World,FXB,MAC,setW:w=>{W=w;}};')(m); const { World, FXB, MAC, setW } = m.exports;
const f = (v, d = 2) => (v == null ? '-' : (+v).toFixed(d)); let pass = 0, fail = 0; const ok = (c, msg) => { console.log(`  ${c ? '✓' : '✗'} ${msg}`); if (c) pass++; else fail++; };
const run = (seed, months, opt = {}) => { let s = seed; Math.random = () => { s = (s * 1103515245 + 12345) % 2147483648; return s / 2147483648; }; const W = new World('bank', 'vcb', 'real'); setW(W); W.weekly = true; W.termMonths = 0; W.randomEvents = false;
  if (opt.hold) { W.sbv.holdRefi = true; W.sbv.refi = 2.75; W.sbv.omo = 2.25; W.sbv.disc = 1.25; W.sbv.bill = 1.75; }
  const rows = []; for (let i = 0; i < months; i++) { W.aiPolicy(W.player); if (opt.fxShock && i >= 12 && i < 24) W.macro.usd = Math.round(W.macro.usd * 1.006); /* VND mất giá thêm ~7,5%/năm trong 12 tháng */ for (let k = 0; k < 4; k++) { W.pendingEvent = null; W.weekStep(); W.pendingEvent = null; }
    const K = W.market, M = W.macro, S = W.sbv; rows.push({ i, refi: S.refi, ib: K.ibON, m6: K.m6_12, gt12: K.gt12, lt6: K.lt6, fed: M.fedRate, fx: M.fx, usd: M.usd, res: M.reserves, doll: W.dollM || 0, uip: M.uip, bankUsd: S.bankUsd, bill: S.bill, cpi: M.cpi, cpiFx: M.cpiFx || 0, ledg: W.ledgerErr || 0 }); }
  return { W, rows }; };
console.log('A. NHNN giữ TCV 2,75 suốt 8 năm, Fed 3,75 (không sự kiện ngẫu nhiên)');
const A = run(1, 96, { hold: true }); const ra = A.rows;
console.log('  năm  TCV   LNH   <6T  6–12T  ≥12T  Fed  chênh  đô-la  fx%/n  USD    dự trữ  vị thế  tín phiếu  CPI');
for (let y = 0; y < 8; y++) { const r = ra[y * 12 + 11]; console.log('  ' + String(y + 1).padStart(3), f(r.refi).padStart(5), f(r.ib).padStart(5), f(r.lt6).padStart(5), f(r.m6).padStart(6), f(r.gt12).padStart(5), f(r.fed).padStart(5), f(r.uip).padStart(6), f(r.doll).padStart(6), f(r.fx, 1).padStart(6), String(r.usd).padStart(6), f(r.res, 0).padStart(7), f(r.bankUsd, 1).padStart(7), f(r.bill).padStart(9), f(r.cpi, 1).padStart(5)); }
const dollMonths = ra.filter(r => r.doll >= 0.5).length; ok(dollMonths >= 24, `1. tháng dân cư đổi ≥ 0,5 tỷ USD/tháng sang USD, vàng: ${dollMonths} (mục tiêu ≥ 24 trong 96)`);
const dep = (ra[95].usd / ra[0].usd - 1) * 100; ok(dep >= 3, `2. VND mất giá cộng dồn 8 năm ${f(dep, 1)}% (mục tiêu ≥ 3%: lãi VND thấp hơn USD thì tỷ giá phải phản ứng)`);
const deepIb = ra.filter(r => r.fed - r.ib > 2).length; ok(deepIb <= 36, `3. tháng LNH thấp hơn Fed quá 2 điểm: ${deepIb}/96 (mục tiêu ≤ 36: tín phiếu, OMO dè sẻn và lợi suất tín phiếu nổi giữ thị trường 2 không chìm)`);
const maxPos = Math.max(...ra.map(r => r.bankUsd)); ok(maxPos <= FXB.bankTarget + FXB.posCap + 0.5, `4. vị thế ngoại tệ ngân hàng tối đa ${f(maxPos, 1)} tỷ USD (trần ${FXB.bankTarget + FXB.posCap})`);
const m6Low = ra.slice(24).filter(r => r.m6 - r.fed < -0.5).length; ok(m6Low <= 36, `3b. tháng lãi 6–12T thấp hơn Fed quá 0,5 điểm (sau năm 2): ${m6Low}/72 (thị trường 1 phải trả giá cạnh tranh với USD)`);
console.log('B. NHNN tự điều hành 8 năm (quy tắc), Fed 3,75');
const B = run(1, 96); const rb = B.rows;
let cutDuring = 0; for (let i = 1; i < rb.length; i++) if (rb[i].refi < rb[i - 1].refi && rb[i - 1].doll >= 0.5) cutDuring++; ok(cutDuring === 0, `5. lần hạ TCV trong khi dân cư đang đổi ≥ 0,5 tỷ USD/tháng: ${cutDuring} (mục tiêu 0)`);
const hikes = B.W.actLog ? 0 : 0; const dollHike = (B.W.log || []).filter(x => /chuyển sang USD, vàng .* tháng liền/.test(x.text || x.msg || '')).length; console.log(`  (TCV ${f(Math.min(...rb.map(r => r.refi)))}–${f(Math.max(...rb.map(r => r.refi)))}, số lần tăng lãi vì đô la hóa ${dollHike}, LNH thấp hơn Fed > 2 điểm ${rb.filter(r => r.fed - r.ib > 2).length}/96 tháng, USD/VND ${rb[0].usd} → ${rb[95].usd})`);
ok(Math.abs(rb[95].ledg) <= 50 && Math.abs(ra[95].ledg) <= 50, `7. sổ tiền cơ sở cuối ván: ${f(ra[95].ledg, 0)} / ${f(rb[95].ledg, 0)} (|sai số| ≤ 50)`);
console.log('C. Truyền dẫn tỷ giá vào CPI: cặp ván cùng seed, ván 2 VND mất giá thêm ~7,5% trong tháng 13–24');
const C0 = run(3, 42), C1 = run(3, 42, { fxShock: true }); const d = i => C1.rows[i].cpi - C0.rows[i].cpi; const dUsd = (C1.rows[23].usd / C0.rows[23].usd - 1) * 100;
console.log(`  USD/VND tháng 24 chênh ${f(dUsd, 1)}%; ΔCPI tháng 24 ${f(d(23))}, tháng 30 ${f(d(29))}, tháng 36 ${f(d(35))}, tháng 42 ${f(d(41))}; phần CPI do tỷ giá ván 2 tháng 30: ${f(C1.rows[29].cpiFx)}`);
const dMax = Math.max(d(29), d(35), d(41)); ok(dMax >= 0.25 * dUsd * 0.8 && dMax <= 0.8 * dUsd, `6. CPI tăng thêm tối đa ${f(dMax)} điểm sau khi VND mất giá thêm ${f(dUsd, 1)}% (mục tiêu 0,2–0,8 × mức mất giá: truyền dẫn nhanh 0,2 + tư liệu sản xuất nhập khẩu 0,12 trễ 3 quý)`);
console.log(`\nĐạt ${pass}, trượt ${fail}`);
