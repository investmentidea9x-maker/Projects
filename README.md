# BankSim Việt Nam

Game giả lập điều hành ngân hàng theo mô hình Việt Nam, chạy thời gian thực trong trình duyệt. Một file `index.html`, không cần cài đặt, không dùng thư viện ngoài. Mở file là chơi.

## Chơi thế nào

- Chọn **độ khó**: Dễ, Thực tế (mặc định) hoặc Khắc nghiệt. Độ khó quyết định tần suất cú sốc, tốc độ nợ xấu, mức rút tiền khi ngân hàng yếu, cạnh tranh lãi suất với ngân hàng khác, biên lãi thị trường và ROE mà cổ đông đòi hỏi (ba năm dưới kỳ vọng là bị thay Tổng giám đốc).

- Chọn một trong 9 ngân hàng (4 NHTM Nhà nước, 5 NHTM cổ phần) để làm Tổng giám đốc, hoặc chọn vai Thống đốc NHNN để điều tiết cả hệ thống.
- Giao diện thanh bên: điều hướng, đồng hồ, nút chạy, KPI nhanh ở cột trái; khung pixel, bảng nội dung và terminal ở giữa.
- Thời gian chơi tự chọn (3/5/10/15 năm hoặc không giới hạn; mặc định 5 năm), hết giờ thì chấm điểm; nới thêm được khi đang chơi. Bấm **Chạy**: đồng hồ chạy theo **tuần** (1 s/tuần mặc định, chỉnh 2 s → 0,12 s), 4 tuần một tháng; nút **+1 tuần** đi từng bước. **Mỗi tuần kinh tế chảy thật 1/4 tháng**: lãi thu và trả, thu nợ, chuyển nhóm nợ, huy động, giải ngân, thanh khoản, tỷ giá, CPI, GDP, ngân sách đều cập nhật; KPI, terminal (dòng "tuần k") và đầu các biểu đồ trên bảng điều khiển nhích theo từng tuần. Quyết định chính sách (NHNN tự động, ngân hàng AI, chế độ Tự động) đặt ở tuần đầu tháng; khóa sổ (lãi lỗ tháng, kiểm tra tuân thủ, báo cáo, năm tài chính) ở tuần thứ tư. Chỉnh lãi suất hoặc khẩu vị giữa tháng có tác dụng ngay tuần sau. Sự kiện rơi vào tuần bất kỳ với xác suất 1/4 của tháng và cách nhau tối thiểu 3 tuần, nên nhịp sự kiện giống quá khứ (khoảng 5 sự kiện/năm, cách nhau trung vị 8 tuần, cú sốc lớn ~1/năm). Hành động của bạn được ghi đúng tuần. Phía trên là cảnh pixel trụ sở với khách gửi tiền (xanh lá), vay (xanh dương) và rút tiền (đỏ) ra vào; các bảng thông số an toàn, kết quả và thị trường vẽ ngay trên khung ở độ phân giải màn hình. Phía dưới là bảng điều hành và terminal nhật ký.
- **Cột công cụ bên phải** (ngân hàng, luôn hiện để thao tác nhanh, phía trên terminal): mọi tham số chỉnh bằng nút bấm theo bước (lãi suất ±0,25, khẩu vị ±1, tăng trưởng ±2, cơ cấu ngành ±5 điểm hoặc chọn mẫu, TPCP, đệm tiền mặt, số hóa, mạng lưới, cổ tức) và các hành động một lần (giấy tờ có giá 1/2/5% tài sản, trái phiếu cấp 2, tăng vốn 10/20/40%, bán nợ VAMC).
- **Cột công cụ bên phải** (NHNN): điều hành theo hướng, lượng và bước do thị trường quyết.
  - Thanh khoản: ba nút **Bơm ròng / Trung tính / Hút ròng**. Engine tự tính lượng mỗi tháng để đưa lãi liên ngân hàng về mục tiêu: hút ròng → mục tiêu = max(lãi OMO + 1, Fed + 0,5) (giữ chênh lệch lãi VND–USD dương); bơm ròng → mục tiêu = lãi OMO − 0,4. Lượng = khoảng cách lãi suất × tiền gửi hệ thống / 40 (1 điểm ≈ 2,5% tiền gửi), tối thiểu 10 nghìn tỷ, tối đa 2% tiền gửi mỗi tháng. Hút bằng tín phiếu 28 ngày tại lãi mục tiêu + 0,25 (sàn mềm của liên ngân hàng, định giá lại mỗi tháng), bơm bằng mua kỳ hạn 7 ngày tại lãi OMO; đảo hạn khi còn giữ hướng, thu hồi sớm đợt ngược chiều, tất toán dần khi về trung tính; dừng tự động khi lãi đã ở mục tiêu hoặc thị trường đã bão hòa.
  - Tỷ giá: **biên độ ±2–8%** quanh tỷ giá trung tâm (mặc định ±5% như thực tế): vượt biên độ thì NHNN tự bán USD giữ tỷ giá, tốn dự trữ, chỉ khi dự trữ còn trên 45 tỷ USD (~3 tháng nhập khẩu); cạn dự trữ thì biên độ vỡ. Trên nền đó là ba nút **Không can thiệp / Bán giao ngay / Bán kỳ hạn 3 tháng**. Chỉ bán khi VND mất giá trên 2,5%/năm; lượng tính theo mức vượt (giao ngay tối đa 10 tỷ USD hoặc 8% dự trữ mỗi tháng; kỳ hạn tối đa 12 tỷ USD hoặc 12% dự trữ, trừ phần forward còn treo; đến hạn mới giao USD, ngân hàng được hủy một nửa nếu VND đã ổn định).
  - Lãi suất điều hành: hai nút **Giảm / Tăng**; bước bằng một nửa khoảng cách tới quy tắc Taylor, tối thiểu 0,25, tối đa 1,0 điểm (đi ngược Taylor thì 0,25); trần huy động dưới 6 tháng đi theo. Họp điều hành hàng quý cũng chỉ hỏi giữ, tăng hay giảm.
  - Còn lại: dự trữ bắt buộc, room, các trần an toàn, Thông tư 02 và xử lý ngân hàng yếu bằng nút bước cố định. Bảng "Nghiệp vụ đang mở" theo dõi số dư, lãi, kỳ hạn còn lại và đảo hạn.
- **Quyết định**: với NHNN, mọi lựa chọn chỉ nêu hướng (hút ròng, bơm ròng, bán USD, tăng hay giảm lãi) kèm lượng dự kiến engine tính sẵn; ví dụ khi USD rút ròng, chọn "hút ròng" thì engine tự hút đủ để nâng chênh lệch lãi VND–USD, không phải tự nhập số. Khi một chỉ số vượt ngưỡng (CAR, LDR, vốn ngắn hạn cho vay TDH, nợ xấu, thanh khoản, NIM, room, rút tiền; với NHNN là CPI, tăng trưởng, tỷ giá, thanh khoản hệ thống, ngân hàng yếu) hoặc một sự kiện lớn xảy ra (USD rút, NHNN tăng lãi, khủng hoảng trái phiếu, sốt vàng, rút tiền hàng loạt, chiến sự), game tự dừng và đưa 3–5 lựa chọn xử lý với hiệu ứng cụ thể. Mỗi cảnh báo có thời gian chờ để không lặp liên tục.
- Tab **Dòng thời gian**: nhật ký hành động theo trục thời gian (đặt đúng tuần), mỗi hành động kèm **lý do**: nút bạn bấm ghi bối cảnh lúc đó (CAR, LDR, nợ xấu, thanh khoản, room, liên ngân hàng, CPI và các cảnh báo đang bật; với NHNN là CPI, GDP, tỷ giá, Taylor, dự trữ); chế độ tự động ghi quy tắc nào kích hoạt (LDR > 80 nâng lãi, sát trần LDR phát hành GTCG, CAR chật trái phiếu cấp 2…); quyết định ghi điều kiện vượt ngưỡng; sự kiện ghi mô tả; NHNN ghi quy tắc (Taylor, biên độ, tín phiếu, bán USD, bán vàng) hoặc hướng bạn đã chọn. Năm làn: Bạn (nút ở cột công cụ), Tự động (những gì máy đổi mỗi tháng: lãi suất, mục tiêu, phát hành, VAMC), Quyết định (lựa chọn khi chỉ số vượt ngưỡng), Sự kiện (lựa chọn khi có sự kiện), NHNN (NHNN tự động ở chế độ ngân hàng; ở chế độ NHNN là các nghiệp vụ engine thực hiện theo hướng bạn chọn: tín phiếu, OMO, bán USD, bán vàng, giữ biên độ). Mỗi chấm là một tháng, số trong chấm là số hành động, rê chuột để đọc, bấm tên làn để ẩn/hiện; bảng chi tiết theo tháng và nút sao chép. Các tháng có hành động được đánh dấu ▲ trên biểu đồ dashboard, rê chuột thấy số hành động.
- **Chế độ tự động** (nút 🤖 ở thanh bên): máy điều hành thay bạn. Ngân hàng: áp chính sách AI mỗi tháng (neo lãi suất thị trường, tăng trưởng theo room, phát hành giấy tờ có giá khi sát trần LDR, trái phiếu cấp 2 khi CAR chật, VAMC khi nợ xấu cao, giữ hồ sơ kỳ hạn); NHNN: quy tắc Taylor, tín phiếu khi tỷ giá căng, bán USD giữ biên độ, nới room khi Chính phủ thúc. Sự kiện có lựa chọn tự chọn phương án đầu, các quyết định không làm dừng đồng hồ; bạn vẫn có thể bấm nút ở cột công cụ nhưng máy ghi đè lãi suất và mục tiêu mỗi tháng. Tắt để điều hành lại.
- **Màn hình ba phần**: thanh bên trái (điều hướng, đồng hồ, KPI), sân khấu ở giữa, cột phải gồm công cụ điều hành (trên) và terminal (dưới).
- **Sân khấu một màn hình**: dashboard vẽ ngay trên cùng khung tối với cảnh pixel. Phần trên của khung là lưới 12–14 biểu đồ (quy mô, lợi nhuận, NIM/ROE/chi phí vốn, CAR, nợ xấu, LDR, vốn ngắn hạn cho vay TDH, thanh khoản, tín dụng so với room, lãi suất, vĩ mô, tỷ giá, cơ cấu nguồn vốn; với NHNN là tăng trưởng/lạm phát, Taylor, khoảng cách sản lượng, tỷ giá, dự trữ, lãi suất hệ thống, chu kỳ, tín dụng và M2, nợ xấu, sức khỏe ngân hàng, dư nợ) vẽ như bảng HUD, tự co giãn theo màn hình, rê chuột xem giá trị từng tháng, nút 12/36 tháng/từ 2022 ở góc; phần dưới là thành phố pixel với các bảng HUD, thanh thị trường và ticker. Terminal bên phải (dòng mới nhất ở trên). Các tab bên trái chỉ điều hướng phần chức năng nằm dưới sân khấu. Trên điện thoại các khối xếp dọc.
- Tab **Bảng cân đối & P&L**: ngoài bảng số, có 6 biểu đồ: cơ cấu tài sản (cột chồng), cơ cấu nguồn vốn (cột chồng), dư nợ theo phân khúc, nợ xấu theo nhóm 2–5, dự phòng đã trích so với nợ nhóm 3–5, cấu phần lợi nhuận tháng (thu nhập lãi, chi phí lãi, thu phí, chi phí hoạt động, dự phòng, lợi nhuận sau thuế).
- Tab **Tuân thủ**: mỗi chỉ tiêu an toàn (CAR, LDR, vốn ngắn hạn cho vay TDH, dự trữ thanh khoản, nợ xấu nội bảng và gộp VAMC, tín dụng so với room) có biểu đồ riêng kèm đường giới hạn hiện hành (nét đứt), nên thấy ngay khoảng cách tới ngưỡng và xu hướng.
- Tab **Hệ thống & vĩ mô**: biểu đồ cột so sánh 9 ngân hàng (CAR, nợ xấu, LDR, ROE, dự trữ thanh khoản, tổng tài sản; cột đổi màu khi vượt ngưỡng, vạch đỏ là giới hạn) và hai chuỗi thời gian toàn hệ thống (dư nợ và tiền gửi; LDR hệ thống, nợ xấu hệ thống, CAR thấp nhất).
- Tab **Báo cáo tháng**: sau mỗi tháng engine viết một báo cáo tóm tắt (huy động, dư nợ, giải ngân và giới hạn đang chặn, thu nhập, dự phòng, lợi nhuận, các tỷ lệ an toàn, vi phạm, sự kiện, khuyến nghị). Báo cáo cũng in ra terminal.
- Tab **Tổng quan** có bảng "Cơ chế cho vay & dự trữ" giải thích từng bước của tháng: tiền gửi, dự trữ bắt buộc, thu nợ, cầu vay, trần cho vay và giới hạn nào đang chặn, giải ngân thực, cân đối liên ngân hàng.
- Khi có sự kiện, khung pixel phía trên chạy hoạt ảnh riêng (tên lửa và trời đỏ khi có chiến sự, tàu container rời cảng khi bị áp thuế, máy bay chở USD bay đi, đám đông rút tiền, cần cẩu đổ khi khủng hoảng BĐS, xe thanh tra, nhà máy FDI, bão và sét, nhiễu màn hình khi bị tấn công mạng) cùng thẻ mô tả không chặn nhịp chơi; chỉ sự kiện cần bạn quyết định mới tạm dừng.

## 9 ngân hàng (số liệu xấp xỉ cuối 2024, làm tròn để chơi)

| Mã | Loại | Tổng TS (nghìn tỷ) | CASA | Nợ xấu | CAR | NIM | ROE | CIR | Đặc điểm |
|---|---|---|---|---|---|---|---|---|---|
| VCB | SOB | 2.085 | 35% | 1,0% | 11,4% | 2,9% | 18% | 34% | CASA cao, chi phí vốn thấp nhất, cho vay rẻ |
| BIDV | SOB | 2.760 | 19% | 1,4% | 9,3% | 2,4% | 19% | 33% | Lớn nhất, CAR mỏng, phát hành nhiều GTCG |
| CTG | SOB | 2.390 | 23% | 1,2% | 9,5% | 2,8% | 18% | 28% | Hiệu quả chi phí tốt, CAR mỏng |
| AGRI | SOB | 2.200 | 13% | 1,7% | 9,8% | 3,0% | 14% | 40% | 58% dư nợ nông nghiệp nông thôn, mạng lưới lớn, một phần bị trần lãi ưu tiên |
| TCB | JSB | 978 | 40% | 1,2% | 15,3% | 4,2% | 17% | 33% | 56% dư nợ BĐS và mua nhà, vốn dày, số hóa mạnh |
| MB | JSB | 1.130 | 39% | 1,6% | 10,4% | 4,3% | 22% | 30% | CASA cao, đa dạng, tiêu dùng 16% |
| VPB | JSB | 924 | 14% | 4,2% | 15,0% | 5,9% | 12% | 25% | Tiêu dùng 30%, khẩu vị cao, nợ xấu cao, biên lớn |
| ACB | JSB | 864 | 23% | 1,5% | 12,0% | 3,6% | 22% | 33% | Bán lẻ, thận trọng, ROE cao |
| STB | JSB | 748 | 18% | 2,4% | 9,5% | 3,6% | 17% | 48% | Chi phí cao, đang tái cơ cấu |

Bảng cân đối khởi đầu được dựng từ các tỷ lệ trên (dư nợ, tiền gửi, giấy tờ có giá, vay nước ngoài và vay dài hạn, tài sản khác) và tài sản có rủi ro được hiệu chỉnh để CAR khởi đầu đúng bằng CAR công bố. Logo là bản pixel 8×8 mô phỏng nhận diện từng ngân hàng, đã biến đổi.

## Khởi đầu từ dữ liệu thật

Trò chơi bắt đầu tháng 10/2025 trên nền 45 tháng lịch sử vĩ mô Việt Nam (1/2022–9/2025): CPI, GDP quý, lãi suất tái cấp vốn, lãi liên ngân hàng qua đêm, tỷ giá VND/USD, lãi huy động 12 tháng, lãi cho vay bình quân, tín dụng YoY, dự trữ ngoại hối, Fed funds, M2, chỉ số nhiệt bất động sản, nợ xấu, dư nợ toàn hệ thống. Trạng thái khởi đầu (tỷ giá 26.380, CPI 3,4%, GDP 8,2%, tái cấp vốn 4,5%, Fed 4,25%, tín dụng +19,8%, BĐS đang ấm lại, tăng trưởng tín dụng từ đầu năm 13%) lấy từ điểm dữ liệu cuối; 12 tháng đầu nối mượt từ số liệu thật sang mô phỏng. Biểu đồ dashboard hiển thị lịch sử thật (nền xám) nối liền phần mô phỏng. Số liệu là xấp xỉ tổng hợp từ nguồn công khai (NHNN, GSO, báo cáo ngân hàng), nằm trong bảng `HIST` ở đầu file để thay bằng dữ liệu riêng (ví dụ từ ViMo Tracker) nếu cần.

## Mô hình vĩ mô và chu kỳ

**Chu kỳ có pha rõ và đều**: một sóng cầu thế giới & dòng vốn chu kỳ 4,5–6 năm (pha ngẫu nhiên mỗi ván) kéo GDP (±1,5 điểm), giá hàng hóa và tỷ giá; bất động sản có **dư cung** nội sinh (nóng → xây nhiều → tồn kho → giá hạ → đóng băng → hấp thụ → hồi phục) và kéo GDP theo; nợ xấu hệ thống trên 2,5% làm tăng trưởng co lại. Mô phỏng 10 năm: mở rộng ~50–60%, quá nóng ~20%, suy giảm ~15–20%, thắt chặt/phục hồi phần còn lại; GDP dao động 6–9,5%, CPI tới ~5%, lãi điều hành 4–6,5%. Backtest 2024–2025 không dùng sóng tổng hợp (thế giới do kịch bản sự kiện thật).

**Tỷ giá hai chiều, can thiệp mạnh**: xu hướng nền VND mất giá ~1%/năm; pha thế giới thuận lợi thì VND lên giá và NHNN **mua USD** tăng dự trữ (như 2023, tối đa 2,5 tỷ USD/tháng, tới 120 tỷ USD). Khi VND mất giá: tín phiếu hút tiền từ 2%/năm, bán USD từ 2,5%/năm (tới 5 tỷ USD/tháng), biên độ tỷ giá trung tâm ±3% tự bán USD khi vượt, và **tăng lãi điều hành nếu VND mất giá trên 3,5% ba tháng liên tiếp** (như 10/2022). Kết quả: USD/VND đi ngang trong từng pha, 10 năm tăng ~0,7%/năm thay vì ~1,5%; ~12% số tháng VND lên giá. Ở chế độ NHNN bạn tự quyết (biên độ, cách can thiệp); backtest dùng cách làm thật 2024–2025 (`fxDefend = 'loose'`, biên độ ±5%, chỉ bán khi > 4%).

## Sổ tiền cơ sở và thị trường liên ngân hàng (bản sửa lần hai)

- **Tiền tại NHNN là thước đo thanh khoản duy nhất.** Mỗi ngân hàng có `cash` (số dư thanh toán tại NHNN, khởi tạo 0,4% tiền gửi) và `reserve` (dự trữ bắt buộc 3%/1%). Khoản "cho vay TCTD khác" trên BCTC là khoản cơ cấu `ibStruct`, được cân với "tiền gửi/vay của TCTD khác" `ibStructL` để tổng cho vay bằng tổng đi vay toàn hệ thống; không còn đệm tiền thừa 11% tài sản.
- **Sổ tiền cơ sở (`ledger`)**: tổng tiền tại NHNN chỉ đổi khi NHNN mua bán USD hoặc vàng (`fx`), bơm/hút OMO, tín phiếu, cho vay qua đêm, tái cấp vốn đặc biệt và lãi với NHNN (`omo`, `bills`, `lolr`), Kho bạc thu thuế/phát hành/giải ngân/gửi tiền và lãi TPCP (`treasury`, Kho bạc giữ 50% số dư tại NHNN, tham số `FISCAL.sbvShare`), dân rút tiền mặt (`currency`). Mọi dòng khác tổng bằng 0 và đi qua bù trừ: giải ngân tạo tiền gửi ở ngân hàng của người nhận, trả nợ, lãi vay, phí rút tiền gửi; lãi tiền gửi, lãi GTCG, lương, cổ tức, phí tư vấn thành tiền gửi; GTCG/tăng vốn/mua bán TPCP/nợ xấu bán cho công ty mua nợ, sự kiện rút tiền, bồi thường, phạt đều có đối ứng. Giành tiền gửi giữa các ngân hàng được ép tổng bằng 0. Lãi vay nước ngoài và trả gốc dùng vị thế ngoại tệ `usdA`. **Đẳng thức được kiểm mỗi tuần** (`W.ledgerErr`, cảnh báo console khi lệch > 50 tỷ); kiểm thử 6.
- **Cân vị thế cuối kỳ (`settle`)**: dự trữ bắt buộc → thừa cho vay, thiếu đi vay qua đêm theo hạn mức liên ngân hàng (hai phía bằng nhau) → phần thiếu còn lại NHNN bơm OMO theo lượng NHNN chọn (chế độ NHNN: đợt bơm đang mở; tự động: tỷ lệ bù `omoFill`, bình thường ~95%, giữ tỷ giá hoặc chống lạm phát 60–85%) có TPCP cầm cố → còn thiếu thì vay qua đêm lãi phạt (tái cấp vốn + `odPen` 4 điểm) → hết TPCP mới tái cấp vốn đặc biệt. **Lãi liên ngân hàng** = hàm của (tiền tại NHNN − nhu cầu)/tiền gửi tính theo phần nghìn: thừa → về sàn (lãi tín phiếu khi NHNN đang hút, không thì 0,5%); thiếu chưa được bù → vượt lãi OMO, 20‰ chưa bù đi 63% quãng đường tới trần mềm. Tín phiếu được phép hút hệ thống xuống dưới nhu cầu.
- **Tỷ giá = cầu USD ròng theo tháng** (`FXB`): cán cân cơ bản +0,6 tỷ/tháng + 0,8 × sóng thế giới − 1,5 × (Fed − LNH − 0,3) − 0,25 × (mất giá − 2) − 0,6 × cú sốc. Ngân hàng hấp thụ bằng vị thế ngoại tệ (tối đa ~3 tỷ, trạng thái ngoại tệ bị giới hạn), rồi mua của NHNN theo tỷ lệ NHNN chọn (`fxFill`: 2024 'loose' từ 4%/năm bán 60%, can thiệp mạnh từ 3% bán hết, chênh lệch Fed − LNH > 1,5 bán sớm 50%, vượt biên độ ±5% bán hết), phần cầu không được đáp ứng đẩy tỷ giá 0,6 điểm/tỷ USD; cung dư được NHNN mua (dự trữ tăng, tiền cơ sở tăng) hoặc ngân hàng giữ. Dự trữ chỉ đổi bằng giao dịch có log. Hiệu chỉnh: Fed +4,25 kiểu 2022 → bán ~22 tỷ USD, VND −8%, LNH +4; cú sốc 2024 → bán ~11 tỷ, VND −4%.
- **Lãi huy động do ngân hàng thiếu nguồn quyết định**: mặt bằng cơ sở từ LNH (có trễ), từng ngân hàng niêm yết = cơ sở + đặc thù + `rateAdj` tăng 0,05/tháng khi thiếu tiền tại NHNN sau OMO, LDR sát trần mà còn tăng, thanh khoản < 10% hoặc vốn ngắn hạn cho vay TDH sát trần; hạ dần khi dư. **Lãi thị trường = bình quân gia quyền lãi niêm yết** của các ngân hàng.
- Sửa lỗi: room năm đầu (`sysLoansYearStart` bị nằm sau `//`), lượng bơm theo định hướng giảm lãi không còn bị ghi đè (`suaInjNext`), LDR hiệu chỉnh sau khi đã cân bảng cân đối.
- **Kiểm thử chấp nhận** (`node tools/mechtest.js`): (1) không cú sốc 5 năm LNH không có xu hướng giảm; (2) LNH > OMO + 0,2 ở 10–30% số tháng; (3) bán 20–25 tỷ USD trong 9 tháng không bơm bù → LNH +4–5, huy động 12T +2,5–3,5; (4) Fed +2, NHNN giữ → 3 tháng dự trữ giảm rõ hoặc LNH +1; (5) ≥ 20% ngân hàng-tháng có vay liên ngân hàng, tổng cho vay = tổng đi vay; (6) sổ tiền cơ sở đúng mỗi tuần.

Kết quả hiện tại (`node tools/mechtest.js`, chế độ ngân hàng, độ khó Thực tế, không sự kiện):

| # | Kịch bản | Kết quả | Đạt |
|---|---|---|---|
| 1 | Không cú sốc 5 năm | LNH 4,0 → 2,3 → 3,1 → 4,0 → 3,5; nửa đầu 3,8, nửa sau 3,8 | ✓ |
| 2 | LNH > OMO + 0,2 | 15% số tháng | ✓ |
| 3 | Bán 24 tỷ USD/9 tháng, không bơm bù | LNH +4,65; huy động 12T +4,0 (mục tiêu +2,5–3,5) | ✓ / gần |
| 4 | Fed +2, NHNN giữ lãi | 3 tháng: LNH +0,65, dự trữ không đổi (ngân hàng hấp thụ 3 tỷ USD bằng vị thế ngoại tệ trước) | ✗ |
| 5 | Vay liên ngân hàng/OMO | 64% ngân hàng-tháng; tổng cho vay = tổng đi vay mọi kỳ | ✓ |
| 6 | Sổ tiền cơ sở | sai số lớn nhất 48 tỷ trong 240 tuần (ngưỡng 50) | ✓ |

Chưa đạt: kịch bản 4 cần phản ứng mạnh hơn với chênh lệch lãi suất khi tỷ giá chưa căng (hiện NHNN hút tín phiếu 0,6%/điểm chênh và bù OMO 70%, LNH chỉ lên 0,65 điểm). Backtest 2024–2025 sau đại tu lệch nhiều hơn bản trước: tiền gửi/M2 mô phỏng tăng 2–7% (thật 11–15%) vì các khoản rời tiền gửi (lợi nhuận giữ lại, tiền mặt, găm USD, GTCG) cộng lại lớn hơn thực tế, kéo tín dụng 2025 xuống ~7% (thật 19,8%); tỷ giá 2024 chỉ 1,5–2,5%/năm (thật 5%) vì cú sốc 2024 trong kịch bản đang ánh xạ sang cầu USD quá nhẹ. Đây là phần cần hiệu chỉnh tiếp (các tham số `FXB`, phần rời tiền gửi trong `clearing`, ánh xạ cú sốc trong `tools/backtest.js`).

## Không kiểm soát đặc biệt: NHNN hỗ trợ đến khi tuân thủ lại, đổi bằng cung tiền và lạm phát

- **Không ngân hàng nào bị kiểm soát đặc biệt.** Thiếu tiền tại NHNN thì tái cấp vốn đặc biệt (lãi TCV + 2, như trước). Thiếu vốn (CAR dưới tối thiểu) thì NHNN **cho vay đặc biệt lãi 0%** (`sp0`, theo Luật TCTD 2024): ngân hàng dùng tiền đó mua TPCP, thu nhập không chi phí bù dần khoảng cách vốn. Lượng cho vay = khoảng cách vốn × 2 / lợi suất TPCP (bù xong trong ~2 năm nếu không lỗ thêm), tối đa 30% tiền gửi; trả dần 1/24 mỗi tháng khi CAR đã trên tối thiểu + bộ đệm + 0,5. Đang nhận vốn đặc biệt thì cấm chia cổ tức, giám sát tăng cường, vẫn bán bớt dư nợ tốt để trả tái cấp vốn.
- **Giá phải trả là tiền cơ sở mới**: tiền NHNN cho vay 0% chảy sang tổ chức bán TPCP thành tiền gửi (M2 tăng, sổ tiền cơ sở ghi `lolr`), CPI chịu thêm 0,015 điểm/tháng cho mỗi 1% tiền gửi đang được hỗ trợ; NHNN chỉ hút lại 25% bằng tín phiếu và chỉ khi CPI đã trên 4%. Quy tắc tăng lãi điều hành: khi GDP dưới mục tiêu hơn 2 điểm NHNN chịu lạm phát tới 6% rồi mới tăng (ưu tiên tăng trưởng), còn tỷ giá khủng hoảng thì vẫn tăng.
- **Duy trì tín dụng**: ngân hàng dưới chuẩn CAR hoặc đang vay đặc biệt không dừng cho vay mà giảm tốc về max(6%, 60% room hệ thống). Trần CAR trong giải ngân không còn ép co dư nợ: luôn được đảo hạn đủ nợ đến hạn, ngân hàng đang được cho vay 0% được cho vay với CAR thấp hơn chuẩn 3 điểm (phương án phục hồi được duyệt). Trần thanh khoản cho đảo hạn 80% nợ đến hạn (tiền khách trả nợ về trong kỳ). Room chỉ bị hãm 1 điểm khi CPI > 5,5%, sàn 12%.
- **NHNN tự nới quy định an toàn khi cuộc đua lãi suất kìm tăng trưởng** (`regEaseStep`, mỗi đầu tháng): điều kiện là ≥ 40% ngân hàng thiếu nguồn, lãi huy động hệ thống tăng ≥ 0,6 điểm trong 6 tháng và cao hơn neo chính sách > 0,6 điểm, **và** GDP dưới mục tiêu hơn 0,5 điểm với lãi cho vay đã tăng ≥ 0,4 điểm trong 6 tháng (chỉ nới khi lãi suất cao đã làm hại tăng trưởng, không nới sớm). Mỗi lần (cách nhau ≥ 3 tháng): LDR +2 (tối đa chuẩn + 5), vốn ngắn hạn cho vay TDH +2 (tối đa chuẩn + 4), bộ đệm CAR −0,5, DTBB < 12 tháng −0,5 (sàn 1%). Khi còn dưới 25% ngân hàng thiếu nguồn và lãi huy động không tăng 6 tháng, siết dần về chuẩn (chuẩn gốc `reg0` đi theo lộ trình TT25 40% và TT14).
- **Ghi sổ ngoài luồng tuần**: `ledgerAdd` gọi ngoài luồng (sự kiện thanh tra phạt, hành động người chơi, khóa sổ) nay ghi vào sổ chờ (`ledgerCarry`) cộng vào tuần kế tiếp; bán dư nợ của ngân hàng bị giám sát chuyển lên trước bù trừ để hai vế khớp trong cùng tuần. Kết quả: 5 năm không sốc (dễ và khó) sai số sổ tuần ≤ 44 tỷ; chạy căng (Fed +2, NPL +1,5% toàn hệ thống và +5% ở hai ngân hàng) còn lệch nhỏ (< 300 tỷ) ở các tuần có sự kiện, lệch lớn chỉ sau khi ngân hàng người chơi rời ván.
- **Kịch bản căng ở độ khó cao** (harness `nokdb.js`): không ngân hàng nào rời hệ thống, 5–16 lần cho vay đặc biệt 0%, dư nợ hệ thống giữ ngang (giải ngân > đáo hạn nhưng xóa nợ và bán VAMC bù lại), CPI 5–8%, lãi điều hành lên 7–11% sau khi GDP hồi về gần mục tiêu, NHNN nới quy định 0–2 lần tùy ngẫu nhiên. Người chơi ngân hàng chỉ còn một đường thua: ROE kém 3 năm liền bị thay Tổng giám đốc.

## Tỷ giá đi thẳng vào giá cả

- Kinh tế Việt Nam có cấu phần nhập khẩu cao (xăng dầu, nguyên liệu, máy móc, hàng tiêu dùng) nên tỷ giá truyền dẫn trực tiếp vào CPI. Phương trình giá có thêm **phần CPI do tỷ giá** `cpiFx`: tiến dần tới `passFx` 0,35 × mức VND mất giá 12 tháng (`fxYoY`), tốc độ `fxSpeed` 0,2/tháng (khoảng 2/3 sau 5 tháng, gần đủ sau một năm). VND mất giá 5% một năm → thêm ~1,75 điểm CPI; VND lên giá kéo CPI xuống tương ứng. Số hiệu chỉnh cũ (0,02 × max(0, mất giá − 2)) bỏ.
- Hệ số là tham số theo trí nhớ (ước lượng truyền dẫn ở Việt Nam khoảng 0,2–0,5 trong 12 tháng), chỉnh ở `MAC.passFx`. Bảng "Ràng buộc vĩ mô" hiển thị phần CPI do tỷ giá hiện tại và mức sẽ tiến tới; lịch sử tháng ghi `cpiFx`, `fxYoY`; chuỗi nhân quả trong biên niên nêu phần CPI do tỷ giá khi nó đổi ≥ 0,2 điểm.
- Hệ quả với chính sách: NHNN giữ lãi điều hành thấp nên tỷ giá là kênh lạm phát chính; bán USD và tín phiếu giữ tỷ giá cũng chính là giữ CPI.

## Chu kỳ BĐS đánh vào hệ thống

- Trước: chỉ số nhiệt BĐS tự nhiên dao động 0,62–1,38, nợ xấu BĐS chỉ nhích 1,9 → 2,3%; ép giảm xuống 0,30 cũng chỉ lên 6%, ROE về 0, CAR thấp nhất 7,5 — quá nhẹ so với 2011–2013 hay 2022–2023. Nguyên nhân: PD BĐS chỉ nhạy khi giá dưới 0,7 và tuyến tính yếu; tài sản bảo đảm khấu trừ cố định 50% bất kể giá; nợ cần chú ý chữa lành 20%/tháng kể cả khi đóng băng; GDP chỉ mất 0,5 điểm/điểm chỉ số.
- Sửa: (1) giá trị khấu trừ tài sản bảo đảm theo giá BĐS (`collOf`: BĐS × chỉ số, ngành khác 60% + 40% × chỉ số) ở cả trích dự phòng, thu hồi sau xóa nợ và giá bán VAMC — giá giảm thì phải trích thêm, thu hồi ít; (2) áp lực nợ xấu BĐS bắt đầu ngay khi giá dưới 1,0 (×4 mỗi điểm) và tăng vọt dưới 0,7 (+×6); (3) dưới 0,85 chủ đầu tư mất thanh khoản: nợ cần chú ý thành nợ xấu nhanh gấp đôi, chữa lành chậm một nửa; (4) GDP mất 1,8 điểm cho mỗi điểm chỉ số dưới 1 (xây dựng, vật liệu, tiêu dùng), cầu vay BĐS co 12 điểm/điểm; (5) chu kỳ sâu hơn: tồn kho kéo giá mạnh hơn (0,3), quán tính 0,5, sàn chỉ số 0,25.

## Vì sao CAR từng trôi lên, và sửa

- Đo 5 năm (`scratchpad/car.js`): vốn tự có hệ thống tăng 12–21%/năm (ROE 11–19%, cổ tức tiền mặt chỉ 3–30% lợi nhuận, cộng 26k–205k tỷ trái phiếu cấp 2 mỗi năm), trong khi tài sản có rủi ro tăng theo dư nợ: 15–17% hai năm đầu (CAR giữ ~11%), rồi chỉ 7–10% năm 4–5 vì **trần LDR 85% chặn gần hết ngân hàng** (tiền gửi tăng chậm hơn cho vay, cầu tín dụng vẫn 400k so với giải ngân 270k tỷ/tháng). Vốn tiếp tục cộng dồn, RWA chậm lại → CAR 11 → 12,5.
- Sửa ba chỗ: (1) ngân hàng AI chỉ phát hành trái phiếu cấp 2 khi CAR thật sự dưới mục tiêu; (2) cổ tức tiền mặt AI theo dư vốn: CAR cao hơn mục tiêu 1,5 điểm → trả 50% lợi nhuận, dưới mục tiêu → 0, còn lại theo loại hình (SOB 30%, JSB 10%); (3) NHNN nới LDR +2 (tối đa chuẩn + 5) khi ≥ 60% ngân hàng kẹt trần LDR 3 tháng liền trong khi GDP dưới 8%, không cần đợi cuộc đua lãi suất (`ldrBind` trong `regEaseStep`).

## Dư nợ không bao giờ co; lãi thực âm đẩy vốn sang USD

- **Dư nợ không giảm.** Lãnh đạo luôn đáp ứng nhu cầu vốn của doanh nghiệp, nên ở từng ngân hàng: cầu tín dụng mỗi kỳ không bao giờ thấp hơn nợ đến hạn + nợ đã xóa (doanh nghiệp luôn cần đảo nợ), và mọi trần giải ngân (room, CAR, LDR, thanh khoản, vốn ngắn hạn cho vay TDH) đều có **sàn bằng nợ đến hạn + nợ đã xóa**: trần chỉ chặn tăng ròng, không bao giờ ép co. Trước đây dư nợ có thể giảm vì (1) cầu tín dụng trong pha suy giảm (`demand` < 1) thấp hơn nợ đến hạn, (2) trần LDR chỉ cho đảo 95%, thanh khoản 80%, room 0% khi hết room, (3) trần vốn ngắn hạn cho vay TDH chặn cả phần đảo nợ trung dài hạn. Bán nợ xấu cho VAMC vẫn làm dư nợ sổ sách giảm (đổi sang trái phiếu VAMC), nhưng phần đó được bù ngay kỳ sau qua cầu tối thiểu.
- **Bán dự trữ phải làm lãi tăng.** VND rút khi NHNN bán USD đi vào sổ tiền cơ sở từ trước, nhưng quy tắc tự động bù ~90% thiếu hụt qua OMO nên LNH không lên. Nay tháng sau khi đã bán ≥ 0,5 tỷ USD, `omoFill` bị kẹp xuống 0,75 − 0,08 × số tỷ USD đã bán (sàn 0,35): bán 3 tỷ → bù tối đa 51% thiếu hụt, phần còn lại ngân hàng phải vay nhau hoặc chịu LNH cao (như 2022). Lịch sử tháng ghi `omoFill`; chuỗi nhân quả nói rõ "NHNN chỉ bù x% thiếu hụt qua OMO để lượng VND đã rút thật sự khan".
- Ngưỡng kiểm thử sổ tiền cơ sở (test 6) đổi sang 0,01% tiền cơ sở (tối thiểu 50 tỷ): còn một trôi đều 40–47 tỷ/tuần trên nền ~900.000 tỷ, không gắn sự kiện nào, chưa tìm ra nguồn (làm tròn lãi dự trữ/tín phiếu theo tuần là nghi vấn chính).
- **OMO không thay được nguồn.** OMO là cầm cố GTCG vay 7 ngày: đổi tài sản thanh khoản lấy tiền, không tạo nguồn mới và phải trả lại. Mô hình phản ánh ở ba chỗ: GTCG đã cầm cố (`refi / 0,9`) bị trừ khỏi tỷ lệ dự trữ thanh khoản (`liqReserve`); vay OMO quá 3% tiền gửi được coi là thiếu nguồn (`tightB`) nên ngân hàng nâng lãi huy động; LDR tính trên tiền gửi, GTCG, vay dài hạn, không tính OMO nên lượng VND mất khi NHNN bán USD vẫn phải bù bằng tiền gửi thật. Chuỗi nhân quả viết đúng nghĩa đó, không nói OMO "bù" thiếu hụt.
- Dư nợ bán cho VAMC (`vamcRoll`) được cộng vào sàn giải ngân kỳ sau nên dư nợ hệ thống không co vì bán nợ.
- **Lãi thực âm đẩy vốn ra.** Cầu USD ròng có thêm `realK` 0,35 tỷ USD/tháng cho mỗi điểm CPI vượt lãi tiền gửi 12 tháng: lãi hạ trong khi lạm phát lên thì dân và doanh nghiệp chuyển tiết kiệm sang USD và vàng, bất kể Fed. Đây là cái giá của việc ghim lãi điều hành thấp: tỷ giá chịu áp lực từ chính người gửi tiền trong nước, rồi quay lại CPI qua truyền dẫn tỷ giá. Diễn giải tuần và chuỗi nhân quả nêu rõ kênh này khi nó hoạt động.

## CPI cao làm GDP sụt; sốc chính trị đánh mạnh vào tỷ giá

- Phương trình IS có thêm `− aP × max(0, CPI − cpiHurt)` với `cpiHurt` 4,5 và `aP` 0,5: lạm phát trên 4,5% bào mòn thu nhập thực, tiêu dùng yếu, GDP mất 0,5 điểm mỗi điểm CPI vượt ngưỡng (tham số). Vì lãi điều hành bị giữ thấp, đây là ràng buộc thật của mục tiêu 8%: để tỷ giá trượt → CPI lên → GDP mất.
- Sốc chính trị, thương mại đánh vào tỷ giá mạnh hơn nhiều: vốn rút mỗi tháng (`cap`) Chiến sự Trung Đông 2,5 tỷ USD, Thuế quan Mỹ 1,6, Chiến tranh thương mại 1,8, Suy thoái toàn cầu 2,0, USD rút ròng 3,0; FDI giải ngân cắt 50–80%. Vị thế ngoại tệ của ngân hàng (~3 tỷ) hấp thụ hết trong tháng đầu, sau đó NHNN phải bán hoặc tỷ giá trượt.

## Lãi suất điều hành luôn thấp, NHNN hành động theo mục tiêu tăng trưởng 8%+

- Quy tắc tự động của NHNN (`sbvAuto`) không còn tăng lãi theo Taylor, lạm phát hay tình hình hệ thống. Mỗi 3 tháng: GDP dưới mục tiêu 8% → hạ lãi tái cấp vốn 0,25 điểm (0,5 nếu dưới 7%), OMO = TCV − 0,5, tín phiếu = OMO − 0,5, trần lãi ngắn hạn hạ theo; sàn TCV 2,5% (`sbv.refiFloor`). Van an toàn duy nhất: dự trữ ngoại hối dưới 50 tỷ USD và VND vượt biên độ → tăng 0,5.
- Lạm phát và tỷ giá được xử lý bằng công cụ khác: bán USD, tín phiếu, hạn mức OMO (`omoFill`), room, quy định an toàn, tái cấp vốn 0%. Định hướng giảm lãi (kêu gọi, bơm OMO) bật khi GDP dưới mục tiêu, chỉ tạm dừng khi VND mất giá > 4% hoặc dự trữ < 60 tỷ USD. Nới room khi GDP dưới mục tiêu với xác suất 85%.
- Hậu quả để người chơi thấy: CPI và tỷ giá chịu áp lực hơn, LNH vẫn có thể căng vì tín phiếu và hạn mức OMO khi giữ tỷ giá, nhưng mặt bằng lãi điều hành luôn thấp. Kiểm thử chấp nhận 1–6 (`tools/mechtest.js`) giữ lãi điều hành cố định (`sbv.holdRefi`) để đo cơ chế thanh khoản riêng.

## Dòng vốn ngoại không chỉ theo lãi suất

- Cầu USD ròng mỗi tháng (`fxStep`): cán cân cơ bản 0,6 tỷ USD (trong đó FDI giải ngân `FXB.fdi` 0,3) + chu kỳ thế giới − carry (chỉ khi Fed cao hơn LNH − 0,3; lãi VND cao hơn **không** tự tạo dòng vào) − **vốn rút vì bất ổn** (`cap`, tỷ USD/tháng, bất chấp lãi suất) − **FDI cắt giảm** (`fdiCut` × 0,3) − sốc tỷ giá khác.
- Các sự kiện gắn `cap`/`fdiCut`: Chiến sự Trung Đông 1,0 / 40%; Thuế quan Mỹ 0,6 / 50%; Chiến tranh thương mại 0,7 / 60%; Suy thoái toàn cầu 1,0 / 70%; USD rút ròng 2,0 / 50%. Nghĩa là khi căng thẳng chính trị, thương mại nổ ra, NHNN tăng lãi không chặn được dòng ra; chỉ bán USD, tín phiếu và chờ sự kiện qua.
- **Tỷ giá chỉ đổi vì dòng vào – ra.** Tốc độ mất giá `fx` (%/năm) mỗi kỳ = +0,6 × cầu USD không được đáp ứng + 0,2 × USD ngân hàng bán từ vị thế của mình − 0,06 × USD vào ròng được hấp thụ, và tự về 0 khi dòng cân bằng (`revert` 0,25, `drift` 0); USD NHNN bán ra không đẩy giá (bán theo giá niêm yết) nhưng rút VND. Mọi cú `fx += x` gắn trực tiếp vào sự kiện (thuế quan, Trung Đông, Fed, FDI, tín phiếu) đã bỏ: sự kiện chỉ đổi cầu/cung USD (`fx`, `cap`, `fdiCut`, carry theo Fed), tỷ giá phản ứng qua dòng tiền. Bán giao ngay của Thống đốc đưa USD vào vị thế ngân hàng để hấp thụ cầu các kỳ sau. Lịch sử tháng ghi `unmetM`, `takeM`, `absM` và chuỗi nhân quả nêu đúng lượng cầu không được đáp ứng đã đẩy tỷ giá.
- Lịch sử tháng ghi `capOut`, `fdiCut`; diễn giải tuần và chuỗi nhân quả trong biên niên nêu rõ "vốn rút bất chấp lãi VND cao hơn Fed, FDI giải ngân giảm x%" thay vì quy cho chênh lệch lãi.

## Cơ chế điều hành và dẫn truyền (bản sửa theo yêu cầu kiểm định)

Nguyên tắc gốc: **lãi liên ngân hàng và lãi huy động là kết quả của lượng VND trong hệ thống**, không phải "lãi tái cấp vốn trừ một khoảng". Lãi điều hành chỉ đặt hành lang: trần là lãi OMO, sàn là lãi tín phiếu (khi NHNN đang hút; không hút thì sàn ~0,5%).

- **Thanh khoản là tiền tại NHNN của các ngân hàng** (`cash` từng ngân hàng, cân vị thế mỗi kỳ qua liên ngân hàng). Mọi nghiệp vụ đi qua đó: NHNN mua USD → ngân hàng có thêm tiền dự trữ và tiền gửi thanh toán của nhà xuất khẩu; bán USD hoặc bán vàng → nhà nhập khẩu rút tiền gửi; phát hành tín phiếu → ngân hàng thừa vốn mua, tiền dự trữ giảm (tín phiếu là tài sản `bills`, đáo hạn trả lại); Kho bạc thu thuế, phát hành TPCP, giải ngân, gửi tiền tại ngân hàng quốc doanh; dân rút tiền mặt theo GDP danh nghĩa; tái cấp vốn đặc biệt.
- **Lãi liên ngân hàng** = sàn + (trần − sàn) × hàm sigmoid của độ thiếu hụt dự trữ ròng (`tight`): thanh khoản bình thường ≈ 2,5%, thiếu hụt → sát trần OMO, dư thừa → về sàn. Đổi thanh khoản mà giữ lãi điều hành thì LNH vẫn đổi (kiểm thử 3).
- **Kênh bên ngoài**: lãi Fed là mức, không phải cú sốc. Áp lực tỷ giá = 0,5 × (Fed − LNH) + phần **cộng dồn** chừng nào chênh lệch còn âm (+0,04/tháng cho mỗi điểm chênh, xả 0,15/tháng khi hết) + nền 0,5 (cán cân cơ bản) − 0,6 × sóng thế giới + lạm phát + cú sốc. Tỷ giá chạy trong biên độ ±5% quanh tỷ giá trung tâm (tham số `band`). Thứ tự phản ứng của NHNN tự động: để tỷ giá trượt trong biên độ → **tín phiếu** từ 2%/năm (đẩy LNH lên) → **bán USD** từ 3%/năm (tối đa 5 tỷ/tháng; cách làm 2024 `fxDefend = 'loose'`: từ 4%, tối đa 3 tỷ) → **tăng lãi điều hành** khi dự trữ < 65 tỷ USD hoặc mất giá > 3,5% ba tháng liền. Vốn vào: VND lên giá → NHNN mua USD (tới 120 tỷ) → thanh khoản tăng, LNH giảm, trừ khi CPI > 4 thì hút lại một nửa bằng tín phiếu. Dự trữ chỉ đổi qua giao dịch có ghi log (kiểm thử 6); FDI chỉ tăng cung USD trên thị trường.
- **Hàm phản ứng**: ưu tiên tỷ giá → lạm phát → tăng trưởng. Taylor chỉ tham khảo. Chỉ hạ lãi khi tỷ giá không căng (< 1,5%/năm), dự trữ > 80 tỷ USD, CPI dưới mục tiêu, Fed − LNH < 1, Fed không tăng 6 tháng qua và chu kỳ không "Quá nóng". Lạm phát cao thì kèm hút tín phiếu để LNH bám trần, lãi điều hành mới truyền được. Công cụ theo tần suất: tín phiếu/OMO hàng tuần, mua bán USD, room, Kho bạc, cuối cùng mới là lãi điều hành.
- **Cung tiền từ bảng cân đối**: M2 = tiền gửi + tiền mặt, tăng trưởng tính từ số dư thật. Cho vay tạo tiền gửi: ngân hàng A giải ngân, tiền được trả cho khách ở mọi ngân hàng (bù trừ `clearing()` theo tỷ trọng tiền gửi, nghiêng về ngân hàng thanh toán CASA cao): A mất tiền tại NHNN, B nhận cả tiền gửi lẫn tiền dự trữ; trả nợ, mua GTCG (70% người mua phi ngân hàng), góp vốn, lợi nhuận giữ lại (~70% lợi nhuận hoạt động) và tiền mặt rút ra là các khoản rời khỏi tiền gửi. Δtín dụng − Δtiền gửi ≈ Δtiền mặt + ΔGTCG + Δvốn chủ − ΔNHNN mua ròng ngoại tệ − Δtín dụng ròng Chính phủ; NHNN mua USD và tín dụng tăng thì M2 tăng (kiểm thử 2). CPI phản ứng với M2 trễ 9 tháng (trung tính 14,5%).
- **Lãi huy động từng ngân hàng**: mặt bằng mới = 0,35 × lãi điều hành + 0,65 × (LNH + 0,3) + 0,1 × (tín dụng − M2) + phần ngân hàng thiếu nguồn (LDR > 83 hoặc thanh khoản < 12%) + kỳ vọng lạm phát − định hướng NHNN, đi tới với **độ trễ ~1,5 tháng**; từng ngân hàng cộng thêm khi LDR sát trần, vốn ngắn hạn cho vay TDH sát trần, hoặc đối thủ trả cao hơn. Huy động thấp hơn CPI → tiền gửi chảy sang vàng, USD, chứng khoán, BĐS (−2,5 điểm tăng trưởng tiền gửi cho mỗi điểm âm). Lãi GTCG mới = lãi tiền gửi ≥12 tháng + 0,8 (+ phụ trội sức khỏe); giấy cũ giữ lãi cũ, lãi bình quân tính theo số dư.
- **Độ trễ**: LNH → huy động mới 1–2 tháng; **chi phí vốn tính trên lãi thực trả của số dư đang có**: tiền gửi < 6 tháng tính lại ~1/3 mỗi tháng, 6–12 tháng 1/8, ≥ 12 tháng 1/14, GTCG 3 năm giữ tới hết hạn (kiểm thử 5: hạ 1 điểm lãi điều hành, chi phí vốn giảm dần 12 tháng); dư nợ cũ định giá lại ~1/4 mỗi tháng; lãi vay → GDP dùng lãi thực của khoản vay mới trễ 6 tháng.
- **Ràng buộc tín dụng**: giải ngân = min(room, CAR, LDR, thanh khoản). LDR công bố TT22 khởi đầu: VCB 81, BIDV 83, CTG 83,5, Agribank 83 (chạm 83–84,5% vào 3/2026), TCB 79, MB 76, VPB 81, ACB 79, STB 82 (tham số `ldr0`); vượt trần vẫn được đảo hạn ~95% nợ đến hạn nhưng không tăng ròng. Tổng room đã cấp không vượt mục tiêu hệ thống + 1,5 điểm (`roomPoolOk`). Nợ quá hạn chịu hệ số rủi ro +50% nên nợ xấu làm CAR giảm hai lần; chuyển nhóm 3 hoàn lại lãi đã ghi chưa thu (~3 tháng). **Thông tư 14/2025**: bộ đệm bảo toàn vốn 0,625% → 2,5% từ 2027 đến 2030 (tham số `CAR_BUFFER`, năm đủ 10,5% cần tra văn bản gốc); chia cổ tức tiền mặt chỉ khi CAR 6 tháng qua ≥ 8% + bộ đệm (tối thiểu 9%); ngân hàng dưới ngưỡng ngừng tăng tín dụng. Trần vốn ngắn hạn cho vay TDH 30% → **40% từ 1/7/2026** (Thông tư 25/2026); tiền gửi Kho bạc tính 20% rồi **50% vào LDR từ 1/8/2026 đến 31/7/2028**.
- **Diễn giải nhân quả hàng tuần** ở terminal (dòng "DIỄN GIẢI"): mỗi tuần nêu điều gì dẫn tới điều gì cho LNH (tín phiếu, OMO, mua bán USD, Kho bạc, cho vay nhanh hơn tiền gửi, tái cấp vốn, đổi hành lang), huy động (theo LNH có trễ, định hướng, trần, thiếu nguồn, lạm phát), lãi vay (chi phí vốn tính lại từng phần, biên, rủi ro), tỷ giá (Fed − LNH, cộng dồn, cú sốc, mua bán USD, sóng thế giới) và chuỗi dự kiến tiếp theo.
- **Biên niên cả ván** (tab *Biên niên*, nút *Đọc biên niên* ở bảng kết thúc): bảng đầu–cuối (có số) rồi **một bản tường thuật liên tục không quá 700 từ, kể bằng lời, không nhắc số** (`chronNarrative`, `chronPhase`). Mốc thời gian viết là "đầu/giữa/cuối năm thứ mấy"; mức độ viết là "nhích", "tăng rõ", "tăng vọt", "lượng lớn", "phần lớn ngân hàng"... Đoạn mở đầu nêu bối cảnh; mỗi đoạn tiếp theo là một pha của lãi huy động hệ thống (pha theo điểm đổi chiều của đồ thị, dài quá thì tách ở điểm liên ngân hàng đổi hướng) kể chuỗi nhân quả: nguyên nhân (sự kiện kéo vốn ra bất chấp lãi, lãi thực âm, lãi USD cao hơn) → NHNN bán/mua ngoại tệ, VND rút/bơm, tỷ giá, giá nhập khẩu ngấm vào lạm phát → tiền tại NHNN, vay nhau, OMO (cầm cố, không phải nguồn), liên ngân hàng → tín phiếu, lãi điều hành, kêu gọi, tái cấp vốn, nới quy định, room → ngân hàng chạm trần nên đua huy động → cho vay theo chi phí vốn, tín dụng, tăng trưởng, lạm phát, nợ xấu, bất động sản → **hành động của bạn** trong pha (theo loại: nâng/hạ lãi huy động, phát hành giấy tờ có giá, tăng vốn, xử lý nợ xấu...; chế độ Thống đốc: đổi lãi điều hành, OMO/tín phiếu, ngoại tệ, room, quy định) → sự kiện khác và tác động của nó. Đoạn kết nêu trạng thái cuối bằng lời, vì sao lãi tăng trong ván, và ngân hàng của bạn. Vượt 700 từ thì bỏ câu sự kiện rồi gộp pha. Nút *Sao chép toàn bộ* xuất tường thuật kèm bảng số, mọi hành động có lý do và mọi diễn giải tuần (có số).
- **Kiểm thử bắt buộc** (`node tools/mechtest.js`): (1) Fed tăng 0,5 mỗi quý, NHNN giữ → tỷ giá tăng, tín phiếu, LNH lên, huy động và chi phí vốn tăng; (2) mua 20 tỷ USD không hút → LNH giảm, M2 tăng, LDR giảm; (3) giữ lãi điều hành, hút 2% tiền gửi bằng tín phiếu → LNH lên sàn tín phiếu, bơm OMO → LNH về gần sàn 0,5; (4) room 30% nhiều tháng → LDR tăng, huy động tăng; (5) hạ lãi điều hành 1 điểm → chi phí vốn giảm dần trong 12 tháng; (6) đổi dự trữ 24 tháng khớp tổng giao dịch có log; (7) nhãn chu kỳ đổi vài lần trong 60 tháng, không nhấp nháy.

**Lãi điều hành ít tác dụng; mặt bằng lãi suất mới là kênh truyền dẫn**: GDP phản ứng với **lãi cho vay thực** của khoản vay mới (mặt bằng thị trường trừ kỳ vọng lạm phát, trung tính ~4%), không phải với lãi tái cấp vốn. Lãi huy động neo theo lãi điều hành cộng chênh lệch thanh khoản liên ngân hàng (OMO/tín phiếu đẩy LNH lệch khỏi mức bình thường TCV − 0,5) và trừ phần NHNN "kêu gọi". **NHNN luôn cố hạ lãi cho vay để hỗ trợ tăng trưởng**: khi GDP dưới mục tiêu 8% mà CPI < 4,5 và VND mất giá < 3%, NHNN (tự động ở chế độ ngân hàng; ở chế độ NHNN là nút *Định hướng lãi cho vay → Kêu gọi giảm lãi*) tăng dần mức định hướng (0 → 100% trong ~7 tháng): mặt bằng cho vay giảm tới 0,4 điểm, huy động tới 0,35 điểm, bơm OMO giữ liên ngân hàng thấp, hạ trần lãi huy động dưới 6 tháng 0,25 điểm khi định hướng kéo dài (như 2/2025). Lạm phát hoặc tỷ giá hết dư địa thì định hướng rút dần. Lãi điều hành chỉ đổi theo quy tắc Taylor khi lạm phát hoặc tỷ giá căng, hoặc rất hiếm khi cắt để hỗ trợ tăng trưởng (như 2023).

**NHNN là người cho vay cuối cùng**: ngân hàng thiếu tiền mặt mà thị trường 2 đóng cửa không phá sản ngay; NHNN **tái cấp vốn đặc biệt** (lãi TCV + 2%), ngân hàng vào diện giám sát tăng cường: ngừng tăng dư nợ, trả lãi cao giữ tiền gửi, mỗi tháng bán ~3% dư nợ tốt cho ngân hàng khác (chiết khấu 4%) để trả NHNN, không được chia cổ tức. Cái giá của hệ thống: tiền tái cấp vốn là tiền cơ sở mới → áp lực lạm phát (+0,03 điểm CPI/tháng cho mỗi 1% tiền gửi), NHNN hút lại 60% bằng tín phiếu và **hạ ngưỡng tăng lãi** (Taylor 0,25 thay vì 0,75, CPI 4,0 thay vì 4,3) cho đến khi xử lý xong tài sản. Kiểm soát đặc biệt / chuyển giao bắt buộc chỉ khi âm vốn (CAR < 4%), CAR dưới tối thiểu 12 tháng, hoặc tái cấp vốn đặc biệt vượt 25% tiền gửi.

**Thời gian chơi do người chơi đặt**: 3, 5 (mặc định, một nhiệm kỳ), 10, 15 năm hoặc không giới hạn, chọn ở màn hình bắt đầu; ô "Thời gian" ở thanh bên nới thêm bất cứ lúc nào, kể cả sau khi ván đã kết thúc. Hết thời gian thì chấm điểm (điểm CEO quy về thang 5 năm để xếp loại; điểm Thống đốc theo trạng thái cuối) và dừng; vẫn xem được mọi tab, dòng thời gian và nhật ký.

- **Khối ràng buộc tăng trưởng – lạm phát – thất nghiệp – lãi suất** (bảng "Ràng buộc vĩ mô" ở Tổng quan hiện công thức kèm số hiện tại):
  - Khoảng cách sản lượng: gap = 0,92·gap + (g − 6,5)/12.
  - IS: g → 6,5 − 0,6·(r − 1,0) + 0,06·(tín dụng − 12) − 0,1·max(0, Fed − 4), với r = lãi suất tái cấp vốn − kỳ vọng lạm phát (thích nghi).
  - Phillips: Δπ mỗi tháng = 0,04·gap + 0,006·(tín dụng − 12) + 0,02·max(0, tỷ giá − 2) + 0,05·(3,5 − π) + cú sốc cung.
  - Okun: u → 2,3 − 0,35·(g − 6,5), có độ trễ.
  - Taylor: i = 1,0 + π + 0,5·(π − 3,5) + 0,4·gap + 0,3·max(0, tỷ giá − 3); NHNN tự động (chế độ ngân hàng) đi theo từng bước 0,5 mỗi quý, Thống đốc (chế độ NHNN) thấy mức gợi ý.
  - Nợ xấu hình thành nhanh hơn khi lãi suất thực cao, tăng trưởng thấp và thất nghiệp tăng.
  - Kiểm tra: giữ lãi suất 8% ba năm → tăng trưởng 6,4% xuống 4,5%, thất nghiệp 2,1% lên 2,9%, lạm phát 3,8% xuống 3,0%, nợ xấu 2,1% lên 3,5%; hạ về 2% → tăng trưởng 8,9%, thất nghiệp 1,55%, lạm phát 4,9%, VND mất giá.

- **Lãi suất là hệ quả, không phải tham số.** Lãi huy động thị trường = neo lãi suất điều hành + phụ trội thanh khoản (độ căng liên ngân hàng) + kỳ vọng lạm phát + mức độ thiếu nguồn của các ngân hàng. Lãi cho vay tham chiếu = chi phí vốn bình quân thực tế của hệ thống + chi phí hoạt động + phụ trội rủi ro (nợ xấu) + phụ trội thanh khoản + biên. Lãi huy động và cho vay "hệ thống" hiển thị là bình quân gia quyền lãi thực tế đang áp dụng của 9 ngân hàng.
- **Tỷ giá** theo dõi ở dạng tuyệt đối (VND/USD) và xu hướng %/năm; xu hướng do chênh lệch lãi suất VND–USD, lạm phát và can thiệp của NHNN quyết định.
- **Chu kỳ nội sinh.** Bất động sản có quán tính, nóng lên khi lãi suất thực thấp và tín dụng nhanh, đổ vỡ khi NHNN thắt chặt; lạm phát đi theo tín dụng, chênh lệch sản lượng và tỷ giá; Fed đi theo chu kỳ Mỹ ~7 năm từng bước 0,25. Pha chu kỳ (Mở rộng, Quá nóng, Thắt chặt, Suy giảm, Phục hồi) được suy ra từ trạng thái và hiển thị khắp nơi.
- **Sự kiện phát sinh từ trạng thái.** Xác suất mỗi sự kiện tính từ chu kỳ: khủng hoảng trái phiếu chỉ xảy ra khi BĐS nóng và lãi suất tăng; rút tiền hàng loạt khi có ngân hàng yếu; USD rút khi chênh lệch lãi suất âm sâu; sốt vàng khi lạm phát hoặc tỷ giá cao; nới room giữa năm khi lạm phát thấp và tín dụng chậm; Thông tư 02 khi nợ xấu tăng và tăng trưởng yếu. Chỉ các cú sốc bên ngoài (chiến sự, thương mại, thiên tai, suy thoái toàn cầu) giữ xác suất nền nhỏ, nhân theo độ khó.

## Lịch văn bản pháp luật và cơ chế room

Engine mang một **lịch văn bản thật** (`REG_CAL`), áp dụng đúng tháng hiệu lực trong cả ván chơi lẫn backtest (ở chế độ NHNN, việc thuộc thẩm quyền NHNN do bạn quyết qua các quyết định; luật và lộ trình đã ban hành vẫn áp dụng):

| Hiệu lực | Văn bản | Tác động trong game |
|---|---|---|
| 24/4/2023 → 31/12/2024 | Thông tư 02/2023, gia hạn bởi TT06/2024 | Cơ cấu nợ, giữ nguyên nhóm nợ: hình thành nợ xấu ×0,8; hết hiệu lực 1/1/2025 nợ xấu và trích lập tăng |
| 1/10/2023 | Lộ trình TT22/2019 | Trần vốn ngắn hạn cho vay TDH 30% |
| 1/1/2024, 1/1/2025, 1/1/2026 | Thông tư 26/2022 | Tiền gửi có kỳ hạn KBNN tính vào mẫu số LDR: 40% (2024), 20% (2025), 0% (2026); nhóm quốc doanh mất dư địa dần |
| Đầu 2024, đầu 2025 | Chỉ tiêu tín dụng | Room hệ thống 15% (2024), 16% (2025); các đợt nới room 8/2024, 28/11/2024, 7/2025 trong backtest |
| 15/10/2025 | Luật TCTD sửa đổi 96/2025 (luật hóa NQ42) | Quyền thu giữ tài sản bảo đảm: thu hồi nợ nhóm 4 nhanh hơn (7%/tháng), thu hồi sau xóa nợ cao hơn (×1,0 thay vì ×0,8) |
| 15/5/2026 | Thông tư 08/2026 | Tính lại 20% tiền gửi KBNN vào LDR |
| 1/7/2026 | Thông tư 25/2026 | Trần vốn ngắn hạn cho vay TDH 40% |
| 1/8/2026 | Sửa TT22 | Tiền gửi KBNN tính 50% vào LDR |

Mỗi văn bản khi có hiệu lực hiện thẻ sự kiện, ghi vào dòng thời gian (làn NHNN, lý do "theo lịch hiệu lực thật").

**Room tín dụng có thể xin thêm, tùy ý chí NHNN.** Ngân hàng máy nhắm dùng hết room (mục tiêu = room + 2, tối đa 28). Từ tháng 5 đến tháng 11, ngân hàng đã dùng ≥ 65% room có thể xin nới: NHNN sẵn lòng cấp khi CPI < 4,5% và tỷ giá ổn (xác suất 60%/tháng nếu GDP còn dưới mục tiêu 8%, 35% nếu đã đạt, 10% khi lạm phát hoặc tỷ giá căng); chỉ cấp cho ngân hàng có CAR > tối thiểu + 1, nợ xấu gộp < 3%, thanh khoản ≥ 10%; **ngân hàng lớn (quốc doanh hoặc tổng tài sản trên 900 nghìn tỷ) được +4, còn lại +2**, mỗi năm một lần. Người chơi ngân hàng dùng lựa chọn "Xin NHNN nới room" với cùng quy tắc; người chơi NHNN nhận quyết định "Ngân hàng xin nới room" (nới theo điều kiện, chỉ nới cho quốc doanh, hoặc từ chối). Đợt nới room chung (sự kiện) cấp +3 đến +6 tùy sức khỏe, ngân hàng cổ phần khỏe được nhiều nhất.

## Backtest 2024–2025: mô hình tự chạy lại hai năm thật

`node tools/backtest.js` khởi tạo thế giới ở 12/2023 (quy mô ngân hàng thu về theo dư nợ cuối 2023), ép các cú sốc ngoại sinh thật theo lịch (đường lãi suất Fed; USD mạnh và sốt vàng 3–11/2024; nới room 8/2024 và 7/2025; bão Yagi 9/2024; Trump đắc cử 11/2024; chỉ thị thúc tín dụng 2/2025; thuế đối ứng Mỹ 4/2025; chiến sự Israel–Iran 6/2025), tắt sự kiện ngẫu nhiên, để NHNN tự động và 9 ngân hàng máy tự phản ứng, rồi so với dữ liệu thật từng quý (trung bình 8 lần chạy; sim/thật):

| Chỉ tiêu | T6/2024 | T12/2024 | T6/2025 | T9/2025 | RMSE 21 tháng |
|---|---|---|---|---|---|
| CPI % | 3,5 / 4,3 | 3,5 / 2,9 | 3,7 / 3,6 | 4,3 / 3,4 | 0,6 |
| GDP % | 6,8 / 7,3 | 7,2 / 7,5 | 7,6 / 8,2 | 7,6 / 8,2 | 0,6 |
| Lãi tái cấp vốn % | 4,5 / 4,5 | 4,5 / 4,5 | 4,5 / 4,5 | 4,7 / 4,5 | 0,0 |
| Liên ngân hàng O/N % | 4,2 / 4,5 | 3,9 / 4,3 | 4,3 / 3,5 | 4,3 / 4,7 | 1,2 |
| USD/VND | 24.655 / 25.460 | 25.021 / 25.480 | 25.397 / 26.150 | 25.640 / 26.380 | 581 |
| Lãi huy động 12 tháng % | 5,7 / 4,9 | 5,3 / 5,2 | 5,7 / 4,9 | 5,8 / 4,9 | 0,6 |
| Lãi cho vay bình quân % | 8,0 / 7,5 | 7,6 / 7,7 | 8,0 / 7,2 | 8,1 / 7,3 | 0,5 |
| Tín dụng YoY % | 14,5 / 15,0 | 15,3 / 15,1 | 17,4 / 19,3 | 17,4 / 19,8 | 1,2 |
| Dự trữ ngoại hối tỷ USD | 87,5 / 85 | 86,9 / 80 | 83,8 / 80 | 82,0 / 80 | 4,4 |
| Nợ xấu % | 1,5 / 2,3 | 1,4 / 2,1 | 2,2 / 2,2 | 2,4 / 2,2 | 0,6 |

Hành động của NHNN mô phỏng so với thực tế (mô phỏng in kèm lý do trong `tools/backtest.js`):

| Thời điểm | NHNN thật | NHNN mô phỏng |
|---|---|---|
| T3/2024 | Phát hành lại tín phiếu (11/3), hút ~170 nghìn tỷ | Hút qua tín phiếu từ khi VND mất giá > 3% (0,6–1,4% tiền gửi/tháng) |
| T4–T7/2024 | Bán ~6–7 tỷ USD giao ngay từ 19/4; đấu thầu vàng rồi bán vàng qua 4 NHTM quốc doanh từ 3/6 | Bán vàng bình ổn tháng thứ hai của sốt vàng (T4–T5), bán USD giữ biên độ và theo mức vượt 4% (T5–T6, ~1–3,5 tỷ/tháng) |
| T8–T9/2024 | Ngừng tín phiếu, bơm OMO; Fed hạ 0,5 | Ngừng hút khi VND về dưới 3%; Fed theo đường thật |
| T11–T12/2024 | Tín phiếu trở lại, bán thêm 2–3 tỷ USD sau bầu cử Mỹ | Bán 1–2,5 tỷ USD khi VND lại vượt 4% (T11–T12) |
| 2025 | Giữ 4,5% cả năm; thúc tín dụng, nới room; không bán nhiều USD | Giữ 4,5% cả năm (không cắt vì Fed còn cao/tỷ giá, không tăng vì CPI < 4,3); nới room theo sự kiện thúc tăng trưởng; bán 1–2 tỷ USD T6/2025 khi thuế quan ép tỷ giá |

Hiệu chỉnh rút ra từ backtest (đã đưa vào engine):
- **NHNN tự động**: giữ lãi suất điều hành như 2024–2025 (không cắt theo Taylor khi Fed còn cao hơn 0,5 điểm hoặc VND mất giá trên 2%; chỉ tăng khi CPI trên 4,3% và khoảng cách Taylor lớn, hoặc tỷ giá vỡ biên độ với dự trữ thấp; cắt vì tăng trưởng chỉ khi GDP dưới 6,5%); phát hành tín phiếu từ khi VND mất giá trên 3%/năm, bán USD từ trên 4%/năm với lượng tỷ lệ theo mức vượt; nới room cho cả hệ thống khi Chính phủ thúc tăng trưởng.
- **Tỷ giá**: áp lực = 0,5·(Fed − liên NH) + 1,8 + 0,15·max(0, CPI − 4) + cú sốc kéo dài (USD mạnh, thuế quan, rút vốn), tỷ giá tiến 35% khoảng cách mỗi tháng; 1 tỷ USD bán ra hạ đà mất giá 0,2 điểm (2024: bán ~7 tỷ USD mà VND vẫn −5%).
- **Ngân hàng máy**: nhắm dùng hết room (mục tiêu = room + 2, tối đa 28) và bù cả nợ đã xóa; sát trần LDR thì phát hành giấy tờ có giá (2% tài sản/tháng) và vẫn cho vay tới 15%; khách cũ đảo nợ ít nhạy lãi hơn khách mới; ngân hàng khẩu vị cao có cầu tốt hơn; giữ hồ sơ kỳ hạn quen thuộc.
- **Thị trường**: lãi huy động 12 tháng = tái cấp vốn + 0,8 (thay vì +1,2); biên cho vay 2,3; tiền gửi tăng chậm hơn tín dụng 1,5 điểm (LDR nhích lên như thực tế); gửi liên ngân hàng ~9% tài sản là cơ cấu bình thường, chỉ phần vượt mới làm lãi liên ngân hàng tụt.
- **Nợ xấu**: hệ số hình thành mức "Thực tế" 1,15 (trước 1,35), tham chiếu tăng trưởng 6,5%; kỳ vọng ROE cổ đông nâng lên 15% (thực tế) và 18% (khắc nghiệt) để độ khó không đổi.
- **Kỹ thuật**: mốc khởi đầu game có thể đặt ở bất kỳ điểm dữ liệu nào (`new World(mode, id, diff, { startIdx, scale, scripted })`), tháng 0 là điểm dữ liệu cuối (T9/2025), tháng 1 là T10/2025.

Còn lệch: tín dụng 2025 (sim 17,4% so với 19,8% thật, sau khi ngân hàng máy dùng hết room, có cơ chế xin nới room và các đợt nới room thật) và GDP 2025 (7,6 so với 8,2): năm 2025 có cú bứt phá room 20%+, BĐS nóng và xuất khẩu chạy trước thuế mà mô hình chỉ tái tạo một phần; lãi cho vay cao hơn thật ~0,5 điểm; dự trữ ngoại hối giảm chậm hơn thật ~5 tỷ USD.

## Sốt vàng: tiền mua vàng vẫn là tiền ngân hàng

Người mua vàng rút tiền gửi kỳ hạn trả cho cửa hàng vàng và SJC; bên bán gửi lại vào tài khoản thanh toán, phần lớn ở ngân hàng quốc doanh. Vì vậy sự kiện "Sốt vàng" không làm tổng tiền gửi hệ thống giảm, mà:

- mỗi tháng (4 tháng) chuyển ~1,2% tiền gửi kỳ hạn dưới 12 tháng (ngân hàng cổ phần ×1,15, quốc doanh ×0,9) thành CASA của bên bán, phân bổ theo quy mô tiền gửi và nghiêng về quốc doanh (×1,6): ngân hàng cổ phần mất nguồn kỳ hạn, LDR tăng, chi phí vốn của quốc doanh giảm;
- ~10% số tiền rút thành tiền mặt găm giữ ngoài hệ thống (rò rỉ thật duy nhất ở phía tiền gửi);
- cầu USD nhập lậu vàng ép tỷ giá (+1 điểm áp lực suốt đợt sốt);
- NHNN có thể bán vàng bình ổn qua 4 ngân hàng quốc doanh và SJC (như 2024): nhập vàng bằng dự trữ (−1,5 tỷ USD/tháng), thu VND về (hút thanh khoản 0,3% tiền gửi), đợt sốt ngắn lại. Chế độ ngân hàng: NHNN tự động bán từ tháng thứ hai nếu dự trữ trên 60 tỷ USD. Chế độ NHNN: quyết định "Sốt vàng: NHNN phản ứng" (bán vàng, hút ròng nâng lãi VND, hoặc không can thiệp).

## Tài khóa: Kho bạc Nhà nước, đầu tư công, trái phiếu Chính phủ, mục tiêu GDP 8%

Khối tài khóa chạy mỗi tháng (tham số xấp xỉ 2025, tỷ VND/năm: thu ngân sách 2.000 nghìn tỷ, chi thường xuyên 1.600, kế hoạch đầu tư công 830 tăng ~15%/năm, phát hành TPCP 480; tất cả trượt theo GDP danh nghĩa):

- **Tiền gửi Kho bạc Nhà nước** tại 4 ngân hàng quốc doanh (VCB 30%, BIDV 32%, CTG 23%, Agribank 15%; khởi đầu 330 nghìn tỷ) là dòng nợ riêng trên bảng cân đối, lãi suất đấu thầu sát thị trường, không tính vào mẫu số LDR. Tồn quỹ = thu + phát hành TPCP − chi thường xuyên − giải ngân đầu tư công; tăng nửa đầu năm, rút mạnh quý 4 khi giải ngân dồn (hồ sơ 3–4–5–6–7–8–8–9–9–10–13–18% kế hoạch). Thay đổi tồn quỹ đi thẳng vào tiền mặt của các ngân hàng quốc doanh, nên thanh khoản hệ thống căng dần về cuối năm.
- **Chi tiêu và đầu tư công** chảy thành tiền gửi doanh nghiệp, dân cư ở mọi ngân hàng; thuế và TPCP bán cho tổ chức phi ngân hàng rút tiền gửi. Thâm hụt được tài trợ bằng TPCP tạo tiền gửi mới (~1,5%/năm), phần tăng tiền gửi nền đã trừ tương ứng để LDR không trôi.
- **Trái phiếu Chính phủ**: Kho bạc phát hành đều, tăng 50% khi tồn quỹ dưới 150 nghìn tỷ, giảm một nửa khi trên 500; áp lực cung đẩy lợi suất TPCP lên (+0,8 điểm cho mỗi 100% vượt kế hoạch). Ngân hàng mua theo tỷ trọng TPCP mục tiêu như trước.
- **Đầu tư công → GDP**: xung lực = giải ngân 12 tháng so với nhịp bình thường (85% kế hoạch), hệ số 1,5 điểm GDP cho mỗi 100% vượt. Bình thường giải ngân đạt ~85% kế hoạch; khi GDP dưới mục tiêu, Chính phủ thúc lên 100% (xung lực ≈ +0,25 điểm GDP).
- **Mục tiêu GDP 8%** của Chính phủ (tiềm năng mô hình 7,5%): KPI GDP đổi màu theo mục tiêu 8%; điểm Thống đốc cộng 3 khi đạt, 1 khi ≥ 6,5, trừ khi dưới 5,5. Chế độ NHNN có quyết định "GDP dưới mục tiêu 8%" (giảm lãi theo Taylor, nới room, bơm ròng, hoặc để tài khóa gánh). Ở chế độ ngân hàng, NHNN tự động giảm lãi 0,25 điểm mỗi 6 tháng và nới room thêm 1 điểm khi GDP dưới 8% mà CPI dưới 4,5% và tỷ giá ổn. Đẩy tăng trưởng trên tiềm năng làm lạm phát và BĐS nóng: đó là đánh đổi.
- Hiển thị: bảng "Thị trường/Vĩ mô" có tồn quỹ KBNN, giải ngân tháng/lũy kế/kế hoạch, phát hành TPCP, thâm hụt, mục tiêu GDP; tab Hệ thống có hai biểu đồ tài khóa; bảng cân đối ngân hàng quốc doanh có dòng tiền gửi KBNN; báo cáo tháng có dòng tài khóa.

## Cơ cấu kỳ hạn: nguồn vốn ngắn hạn, dư nợ trung dài hạn

Thực tế hệ thống ngân hàng Việt Nam có khoảng 80% nguồn vốn là ngắn hạn trong khi ~50% dư nợ là trung dài hạn (NHNN); tiền gửi kỳ hạn dưới 12 tháng chiếm 85–94% tiền gửi qua các năm. Game mô hình hóa đúng bản chất này:

- **Sổ cho vay theo kỳ hạn**: mỗi ngành có tỷ trọng dư nợ trung dài hạn riêng. Ngắn hạn thu nợ 1/9 mỗi tháng (vòng quay ~9 tháng), trung dài hạn thu nợ 1/60 (bình quân 5 năm). Giải ngân mới có tỷ trọng TDH được tính để giữ cơ cấu ổn định ở tốc độ tăng trưởng thực tế của từng ngành; người chơi chỉnh bằng nút **Kỳ hạn giải ngân mới (hệ số TDH)** 0,5–1,5. Trần vốn ngắn hạn cho vay TDH chỉ chặn phần TDH của giải ngân mới, phần ngắn hạn vẫn giải ngân.
- **Nguồn vốn theo TT22**: nguồn TDH = tiền gửi ≥12 tháng + GTCG + trái phiếu thứ cấp + 20% vay TCTD/nước ngoài + vốn tự có − TSCĐ − 30% tài sản khác (góp vốn dài hạn); nguồn ngắn hạn = CASA + tiền gửi <12 tháng + vay liên ngân hàng, tái cấp vốn + 80% vay TCTD/nước ngoài. Tỷ lệ = (dư nợ TDH − nguồn TDH) / nguồn ngắn hạn.
- **Hiệu chỉnh theo số công bố**: tỷ trọng dư nợ TDH lấy từ BCTC và phân tích ngành, rồi giải tỷ trọng tiền gửi ≥12 tháng để tỷ lệ khởi đầu đúng bằng số công bố; nếu tiền gửi ≥12 tháng đã ở mức tối thiểu 3% mà tỷ lệ vẫn thấp thì nâng tỷ trọng dư nợ TDH. Kết quả: tiền gửi ngắn hạn 85–97% tổng tiền gửi ở mọi ngân hàng.

| Ngân hàng | Tỷ lệ vốn NH cho vay TDH (công bố) | Dư nợ TDH / tổng dư nợ (game) | Tiền gửi <12 tháng (game) |
|---|---|---|---|
| VCB | ~9% (dưới 10%, nhóm thấp nhất) | 40% | 85% |
| BIDV | 22% | 44% | 97% |
| CTG | 26% | 48% | 97% |
| Agribank | 25% | 43% | 93% |
| TCB | 26,5% (Q4/2024; 24,6% cuối 2025) | 70% | 97% |
| MB | ~28% (gần trần Q1/2026) | 61% | 97% |
| VPB | 27,3% (2024; 27,5% cuối 2025) | 68% | 97% |
| ACB | 20,7% (Q3/2024; 21,8% Q3/2025) | 54% | 97% |
| STB | ~23% (2024; 26,2% cuối 2025) | 46% | 94% |

Tỷ trọng dư nợ TDH là kết quả của dòng chảy: vay ngắn hạn quay vòng ~9 tháng nên giải ngân mới nghiêng về ngắn hạn (~20–30% TDH), nhưng dư nợ TDH tồn lâu (~5 năm) nên tỷ trọng trong sổ giữ ở 40–70% và nhích lên ~55–60% sau vài năm (thực tế toàn hệ thống ~45%, ngân hàng bán lẻ và cho vay mua nhà như TCB, VPB trên 60%). Nhóm NHTM Nhà nước 23,6%, toàn hệ thống 28,3% (4/2024). Trần 30% từ 1/10/2023; **Thông tư 25/2026 nâng lên 40% từ 1/7/2026**: ở chế độ ngân hàng, sự kiện này xảy ra đúng tháng 7/2026; ở chế độ NHNN, tháng 6/2026 bạn được hỏi có nâng trần hay không. Ngân hàng máy giữ tỷ lệ quanh hồ sơ đã công bố (±4–5 điểm) thay vì đua lên trần.

Nguồn: [thitruongtaichinhtiente.vn (trần 30% từ 1/10/2023)](https://thitruongtaichinhtiente.vn/ty-le-von-ngan-han-cho-vay-trung-va-dai-han-doi-voi-ngan-hang-giam-xuong-30-tu-ngay-1-10-2023-50362.html), [cafef (nhóm NHTMCP và toàn hệ thống 4/2024)](https://cafef.vn/ty-le-von-ngan-han-cho-vay-trung-dai-han-tai-nhom-ngan-hang-co-phan-bat-ngo-tang-manh-vuot-xa-muc-tran-quy-dinh-188231006122433531.chn), [Techcombank KQKD 6T/2025](https://techcombank.com/content/dam/techcombank/public-site/documents/techcombank-kqkd-6-thang-2025.pdf), [cafef ACB Q3/2025](https://cafef.vn/acb-quy-iii-2025-duy-tri-tang-truong-on-dinh-no-xau-thuoc-nhom-thap-nhat-nganh-188251022215507873.chn), [danviet (VCB, BIDV, TCB, Agribank, CTG)](https://danviet.vn/noi-long-ty-le-von-ngan-han-cho-vay-dai-han-vietcombank-bidv-techcombank-ai-loi-nhat-d1437719.html), [vnfinance (STB, VPB cuối 2025)](https://vnfinance.vn/ty-le-von-ngan-han-cho-vay-trung-dai-han-tai-cac-ngan-hang-hien-ra-sao-49539.html), [stockbiz (dư nợ TDH Big4 giữa 2024)](https://stockbiz.vn/tin-tuc/bidv-va-vpbank-dan-dau-cho-vay-trung-dai-han-nam-2024/27822408), [tapchinganhang.gov.vn (cơ cấu tiền gửi theo kỳ hạn)](https://tapchinganhang.gov.vn/tang-truong-huy-dong-von-tu-tien-gui-khach-hang-tai-ngan-hang-thuong-mai-viet-nam-12136.html), [vnba.org.vn (80% nguồn vốn ngắn hạn, 50% dư nợ TDH)](https://vnba.org.vn/vi/ngan-hang-chiu-ap-luc-cung-ung-von-trung--dai-han-20111.htm), [thuvienphapluat (Thông tư 25/2026)](https://thuvienphapluat.vn/chinh-sach-phap-luat-moi/vn/ho-tro-phap-luat/chinh-sach-moi/115508/thong-tu-25-2026-noi-ty-le-von-ngan-han-cho-vay-trung-han-va-dai-han-len-40-tu-1-7-2026).

## Khung pháp lý được mô phỏng

| Quy định | Ngưỡng | Văn bản |
|---|---|---|
| Hệ số an toàn vốn CAR | ≥ 8% | Thông tư 41/2016 |
| Dư nợ / tiền gửi (LDR) | ≤ 85% | Thông tư 22/2019 |
| Vốn ngắn hạn cho vay trung dài hạn | ≤ 30% | Thông tư 08/2020 sửa TT22 |
| Tỷ lệ dự trữ thanh khoản | ≥ 10% | Thông tư 22/2019 |
| Dự trữ bắt buộc VND | 3% (<12 tháng), 1% (≥12 tháng) | Quyết định 1158/2018 |
| Trần lãi suất huy động < 6 tháng | 4,75% | Quyết định 1124/2023 |
| Trần lãi suất cho vay ngắn hạn lĩnh vực ưu tiên | 4% | Quyết định 1125/2023 |
| Phân loại nợ 5 nhóm, trích lập 5/20/50/100% + dự phòng chung 0,75% | | Thông tư 11/2021 |
| Room tín dụng hàng năm | do NHNN cấp theo xếp hạng | |
| Giới hạn cấp tín dụng một khách hàng | 14% vốn tự có, giảm về 10% | Luật TCTD 2024 |
| Cơ cấu nợ giữ nguyên nhóm nợ | bật/tắt | Thông tư 02/2023 |

## Điều gì làm game khó

- Tiền gửi tăng theo tín dụng và GDP danh nghĩa: tăng trưởng huy động nền = 0,5 × tăng trưởng tín dụng hệ thống + 0,5 × (GDP + CPI) + 1, cộng trừ theo mạng lưới và thương hiệu so với trung bình; CASA chỉ tăng nhanh khi số hóa và thương hiệu vượt trội, và giảm khi lãi kỳ hạn cao. Nhờ vậy LDR ổn định quanh 80–85% về dài hạn thay vì giảm dần vì tiền gửi tăng nhanh hơn dư nợ; ngân hàng máy cũng hạ lãi huy động khi LDR xuống dưới 72%.
- Ngân hàng khác giành khách: trả lãi thấp hơn nhóm dẫn đầu thì mất tiền gửi, cho vay đắt hơn thì mất khách vay.
- Cho vay dễ dãi tạo nợ xấu tiềm ẩn, bộc lộ dần sau 6–18 tháng.
- Thị trường liên ngân hàng đóng cửa dần với ngân hàng yếu (CAR thấp, nợ xấu cao, thanh khoản mỏng, uy tín giảm).
- Rút tiền hàng loạt nhắm vào ngân hàng yếu nhất, kể cả của bạn.
- Chi phí vận hành tăng theo lạm phát; NHNN siết room khi CPI vượt 5%; thanh tra phạt nặng và công bố công khai.
- Ngân hàng quốc doanh phải nộp cổ tức tối thiểu 30% và khó tăng vốn; cổ đông ngân hàng cổ phần đòi ROE cao hơn.
- ROE tính trên vốn chủ bình quân đầu–cuối năm và **giảm dần dù tín dụng tăng 15%+**: lợi nhuận giữ lại làm vốn chủ tăng ~20%/năm trong khi tài sản chỉ tăng 8–17%, nên đòn bẩy (tài sản/vốn) co lại; cộng thêm dự phòng ở pha suy giảm và chi phí vốn cao hơn khi phải phát hành GTCG. Panel **Vì sao ROE thay đổi** (tab Tổng quan) phân rã DuPont 12 tháng: đòn bẩy, ROA và từng cấu phần (lãi thuần, phí, chi phí, dự phòng, thuế) và gợi ý cách xử lý (chia cổ tức, mua lại, tăng tài sản sinh lời, giảm dự phòng).
- Nợ xấu không có lối thoát rẻ: VAMC chỉ mua nợ có tài sản bảo đảm, tối đa 2% dư nợ mỗi đợt, 6 tháng một đợt, trái phiếu đặc biệt lãi 0%, lỗ chiết khấu 5% ngay, trích 20% mệnh giá mỗi năm, ngân hàng vẫn tự thu hồi (tốc độ theo thị trường BĐS), nợ xấu gộp (kể cả phần bán VAMC) vẫn bị tính khi cấp room, chặn cổ tức và tính phụ trội liên ngân hàng, sau 5 năm phải mua lại phần chưa xử lý. Bán nợ theo giá thị trường thu 25–55% mệnh giá bằng tiền mặt, ghi lỗ ngay. Cách thật sự sạch là dùng dự phòng, chịu lỗ, và ngừng tạo nợ xấu mới.

## Sự kiện ngẫu nhiên

NHNN tăng/giảm lãi suất, khủng hoảng trái phiếu BĐS, rút tiền hàng loạt, nới room, thanh tra, chiến sự Trung Đông, chiến tranh thương mại Mỹ–Trung, USD rút ròng, sốt vàng, FDI kỷ lục, suy thoái toàn cầu, bão lụt, thuế quan Mỹ, Fed tăng/hạ lãi suất, tập đoàn BĐS xin vay lớn (có lựa chọn).

## Ghi chú

Hệ số co giãn, xác suất chuyển nhóm nợ và số liệu ngân hàng là giả định để học và thử chính sách, không phải số liệu thật của bất kỳ ngân hàng nào. Ván chơi có thể lưu vào trình duyệt.
