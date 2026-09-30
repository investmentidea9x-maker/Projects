# BankSim Việt Nam

Game giả lập điều hành ngân hàng theo mô hình Việt Nam, chạy thời gian thực trong trình duyệt. Một file `index.html`, không cần cài đặt, không dùng thư viện ngoài. Mở file là chơi.

## Chơi thế nào

- Chọn **độ khó**: Dễ, Thực tế (mặc định) hoặc Khắc nghiệt. Độ khó quyết định tần suất cú sốc, tốc độ nợ xấu, mức rút tiền khi ngân hàng yếu, cạnh tranh lãi suất với ngân hàng khác, biên lãi thị trường và ROE mà cổ đông đòi hỏi (ba năm dưới kỳ vọng là bị thay Tổng giám đốc).

- Chọn một trong 9 ngân hàng (4 NHTM Nhà nước, 5 NHTM cổ phần) để làm Tổng giám đốc, hoặc chọn vai Thống đốc NHNN để điều tiết cả hệ thống.
- Giao diện thanh bên: điều hướng, đồng hồ, nút chạy, KPI nhanh ở cột trái; khung pixel, bảng nội dung và terminal ở giữa.
- Bấm **Chạy**: mỗi tháng trôi qua trong vài giây (chỉnh tốc độ được). Phía trên là cảnh pixel trụ sở với khách gửi tiền (xanh lá), vay (xanh dương) và rút tiền (đỏ) ra vào; các bảng thông số an toàn, kết quả và thị trường vẽ ngay trên khung ở độ phân giải màn hình. Phía dưới là bảng điều hành và terminal nhật ký.
- Tab **Điều hành** (ngân hàng): mọi tham số chỉnh bằng nút bấm theo bước (lãi suất ±0,25, khẩu vị ±1, tăng trưởng ±2, cơ cấu ngành ±5 điểm hoặc chọn mẫu, TPCP, đệm tiền mặt, số hóa, mạng lưới, cổ tức) và các hành động một lần (giấy tờ có giá 1/2/5% tài sản, trái phiếu cấp 2, tăng vốn 10/20/40%, bán nợ VAMC).
- Tab **Công cụ NHNN**: điều hành theo hướng, lượng và bước do thị trường quyết.
  - Thanh khoản: ba nút **Bơm ròng / Trung tính / Hút ròng**. Engine tự tính lượng mỗi tháng để đưa lãi liên ngân hàng về mục tiêu: hút ròng → mục tiêu = max(lãi OMO + 1, Fed + 0,5) (giữ chênh lệch lãi VND–USD dương); bơm ròng → mục tiêu = lãi OMO − 0,4. Lượng = khoảng cách lãi suất × tiền gửi hệ thống / 40 (1 điểm ≈ 2,5% tiền gửi), tối thiểu 10 nghìn tỷ, tối đa 2% tiền gửi mỗi tháng. Hút bằng tín phiếu 28 ngày tại lãi mục tiêu + 0,25 (sàn mềm của liên ngân hàng, định giá lại mỗi tháng), bơm bằng mua kỳ hạn 7 ngày tại lãi OMO; đảo hạn khi còn giữ hướng, thu hồi sớm đợt ngược chiều, tất toán dần khi về trung tính; dừng tự động khi lãi đã ở mục tiêu hoặc thị trường đã bão hòa.
  - Tỷ giá: **biên độ ±2–8%** quanh tỷ giá trung tâm (mặc định ±5% như thực tế): vượt biên độ thì NHNN tự bán USD giữ tỷ giá, tốn dự trữ, chỉ khi dự trữ còn trên 45 tỷ USD (~3 tháng nhập khẩu); cạn dự trữ thì biên độ vỡ. Trên nền đó là ba nút **Không can thiệp / Bán giao ngay / Bán kỳ hạn 3 tháng**. Chỉ bán khi VND mất giá trên 2,5%/năm; lượng tính theo mức vượt (giao ngay tối đa 10 tỷ USD hoặc 8% dự trữ mỗi tháng; kỳ hạn tối đa 12 tỷ USD hoặc 12% dự trữ, trừ phần forward còn treo; đến hạn mới giao USD, ngân hàng được hủy một nửa nếu VND đã ổn định).
  - Lãi suất điều hành: hai nút **Giảm / Tăng**; bước bằng một nửa khoảng cách tới quy tắc Taylor, tối thiểu 0,25, tối đa 1,0 điểm (đi ngược Taylor thì 0,25); trần huy động dưới 6 tháng đi theo. Họp điều hành hàng quý cũng chỉ hỏi giữ, tăng hay giảm.
  - Còn lại: dự trữ bắt buộc, room, các trần an toàn, Thông tư 02 và xử lý ngân hàng yếu bằng nút bước cố định. Bảng "Nghiệp vụ đang mở" theo dõi số dư, lãi, kỳ hạn còn lại và đảo hạn.
- **Quyết định**: với NHNN, mọi lựa chọn chỉ nêu hướng (hút ròng, bơm ròng, bán USD, tăng hay giảm lãi) kèm lượng dự kiến engine tính sẵn; ví dụ khi USD rút ròng, chọn "hút ròng" thì engine tự hút đủ để nâng chênh lệch lãi VND–USD, không phải tự nhập số. Khi một chỉ số vượt ngưỡng (CAR, LDR, vốn ngắn hạn cho vay TDH, nợ xấu, thanh khoản, NIM, room, rút tiền; với NHNN là CPI, tăng trưởng, tỷ giá, thanh khoản hệ thống, ngân hàng yếu) hoặc một sự kiện lớn xảy ra (USD rút, NHNN tăng lãi, khủng hoảng trái phiếu, sốt vàng, rút tiền hàng loạt, chiến sự), game tự dừng và đưa 3–5 lựa chọn xử lý với hiệu ứng cụ thể. Mỗi cảnh báo có thời gian chờ để không lặp liên tục.
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

## Backtest 2024–2025: mô hình tự chạy lại hai năm thật

`node tools/backtest.js` khởi tạo thế giới ở 12/2023 (quy mô ngân hàng thu về theo dư nợ cuối 2023), ép các cú sốc ngoại sinh thật theo lịch (đường lãi suất Fed; USD mạnh và sốt vàng 3–11/2024; nới room 8/2024 và 7/2025; bão Yagi 9/2024; Trump đắc cử 11/2024; chỉ thị thúc tín dụng 2/2025; thuế đối ứng Mỹ 4/2025; chiến sự Israel–Iran 6/2025), tắt sự kiện ngẫu nhiên, để NHNN tự động và 9 ngân hàng máy tự phản ứng, rồi so với dữ liệu thật từng quý (trung bình 8 lần chạy; sim/thật):

| Chỉ tiêu | T6/2024 | T12/2024 | T6/2025 | T9/2025 | RMSE 21 tháng |
|---|---|---|---|---|---|
| CPI % | 3,5 / 4,3 | 3,4 / 2,9 | 3,6 / 3,6 | 4,1 / 3,4 | 0,6 |
| GDP % | 6,8 / 7,3 | 7,2 / 7,5 | 7,4 / 8,2 | 7,4 / 8,2 | 0,6 |
| Lãi tái cấp vốn % | 4,5 / 4,5 | 4,5 / 4,5 | 4,5 / 4,5 | 4,5 / 4,5 | 0,0 |
| Liên ngân hàng O/N % | 4,0 / 4,5 | 3,8 / 4,3 | 4,3 / 3,5 | 4,1 / 4,7 | 1,2 |
| USD/VND | 24.618 / 25.460 | 24.982 / 25.480 | 25.365 / 26.150 | 25.609 / 26.380 | 607 |
| Lãi huy động 12 tháng % | 5,4 / 4,9 | 5,3 / 5,2 | 5,7 / 4,9 | 5,5 / 4,9 | 0,5 |
| Lãi cho vay bình quân % | 8,1 / 7,5 | 7,8 / 7,7 | 8,1 / 7,2 | 8,1 / 7,3 | 0,5 |
| Tín dụng YoY % | 14,0 / 15,0 | 13,3 / 15,1 | 12,7 / 19,3 | 12,8 / 19,8 | 4,0 |
| Dự trữ ngoại hối tỷ USD | 92 / 85 | 90 / 80 | 87 / 80 | 85 / 80 | 7,5 |
| Nợ xấu % | 2,0 / 2,3 | 2,5 / 2,1 | 2,6 / 2,2 | 2,7 / 2,2 | 0,4 |

Hiệu chỉnh rút ra từ backtest (đã đưa vào engine):
- **NHNN tự động**: giữ lãi suất điều hành như 2024–2025 (không cắt theo Taylor khi Fed còn cao hơn 0,5 điểm hoặc VND mất giá trên 2%; chỉ tăng khi CPI trên 4,3% và khoảng cách Taylor lớn, hoặc tỷ giá vỡ biên độ với dự trữ thấp; cắt vì tăng trưởng chỉ khi GDP dưới 6,5%); phát hành tín phiếu từ khi VND mất giá trên 3%/năm, bán USD từ trên 4%/năm với lượng tỷ lệ theo mức vượt; nới room cho cả hệ thống khi Chính phủ thúc tăng trưởng.
- **Tỷ giá**: áp lực = 0,5·(Fed − liên NH) + 1,8 + 0,15·max(0, CPI − 4) + cú sốc kéo dài (USD mạnh, thuế quan, rút vốn), tỷ giá tiến 35% khoảng cách mỗi tháng; 1 tỷ USD bán ra hạ đà mất giá 0,2 điểm (2024: bán ~7 tỷ USD mà VND vẫn −5%).
- **Ngân hàng máy**: sát trần LDR thì phát hành giấy tờ có giá (1,5% tài sản/tháng) và vẫn cho vay tới 12%; khách cũ đảo nợ ít nhạy lãi hơn khách mới; ngân hàng khẩu vị cao có cầu tốt hơn; giữ hồ sơ kỳ hạn quen thuộc.
- **Thị trường**: lãi huy động 12 tháng = tái cấp vốn + 0,8 (thay vì +1,2); biên cho vay 2,3; tiền gửi tăng chậm hơn tín dụng 1,5 điểm (LDR nhích lên như thực tế); gửi liên ngân hàng ~9% tài sản là cơ cấu bình thường, chỉ phần vượt mới làm lãi liên ngân hàng tụt.
- **Nợ xấu**: hệ số hình thành mức "Thực tế" 1,15 (trước 1,35), tham chiếu tăng trưởng 6,5%; kỳ vọng ROE cổ đông nâng lên 15% (thực tế) và 18% (khắc nghiệt) để độ khó không đổi.
- **Kỹ thuật**: mốc khởi đầu game có thể đặt ở bất kỳ điểm dữ liệu nào (`new World(mode, id, diff, { startIdx, scale, scripted })`), tháng 0 là điểm dữ liệu cuối (T9/2025), tháng 1 là T10/2025.

Còn lệch: tín dụng 2025 (sim 13% so với 19,8% thật) và GDP 2025 (7,4 so với 8,2): năm 2025 có cú bứt phá room 20%+, BĐS nóng và xuất khẩu chạy trước thuế mà mô hình chỉ tái tạo một phần; lãi cho vay cao hơn thật ~0,5 điểm; dự trữ ngoại hối giảm chậm hơn thật ~5 tỷ USD.

## Sốt vàng: tiền mua vàng vẫn là tiền ngân hàng

Người mua vàng rút tiền gửi kỳ hạn trả cho cửa hàng vàng và SJC; bên bán gửi lại vào tài khoản thanh toán, phần lớn ở ngân hàng quốc doanh. Vì vậy sự kiện "Sốt vàng" không làm tổng tiền gửi hệ thống giảm, mà:

- mỗi tháng (4 tháng) chuyển ~1,2% tiền gửi kỳ hạn dưới 12 tháng (ngân hàng cổ phần ×1,15, quốc doanh ×0,9) thành CASA của bên bán, phân bổ theo quy mô tiền gửi và nghiêng về quốc doanh (×1,6): ngân hàng cổ phần mất nguồn kỳ hạn, LDR tăng, chi phí vốn của quốc doanh giảm;
- ~10% số tiền rút thành tiền mặt găm giữ ngoài hệ thống (rò rỉ thật duy nhất ở phía tiền gửi);
- cầu USD nhập lậu vàng ép tỷ giá (+1 điểm áp lực suốt đợt sốt);
- NHNN có thể bán vàng bình ổn qua 4 ngân hàng quốc doanh và SJC (như 2024): nhập vàng bằng dự trữ (−1,5 tỷ USD/tháng), thu VND về (hút thanh khoản 0,3% tiền gửi), đợt sốt ngắn lại. Chế độ ngân hàng: NHNN tự động bán từ tháng thứ hai nếu dự trữ trên 60 tỷ USD. Chế độ NHNN: quyết định "Sốt vàng: NHNN phản ứng" (bán vàng, hút ròng nâng lãi VND, hoặc không can thiệp).

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

Nhóm NHTM Nhà nước 23,6%, toàn hệ thống 28,3% (4/2024). Trần 30% từ 1/10/2023; **Thông tư 25/2026 nâng lên 40% từ 1/7/2026**: ở chế độ ngân hàng, sự kiện này xảy ra đúng tháng 7/2026; ở chế độ NHNN, tháng 6/2026 bạn được hỏi có nâng trần hay không. Ngân hàng máy giữ tỷ lệ quanh hồ sơ đã công bố (±4–5 điểm) thay vì đua lên trần.

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
- Nợ xấu không có lối thoát rẻ: VAMC chỉ mua nợ có tài sản bảo đảm, tối đa 2% dư nợ mỗi đợt, 6 tháng một đợt, trái phiếu đặc biệt lãi 0%, lỗ chiết khấu 5% ngay, trích 20% mệnh giá mỗi năm, ngân hàng vẫn tự thu hồi (tốc độ theo thị trường BĐS), nợ xấu gộp (kể cả phần bán VAMC) vẫn bị tính khi cấp room, chặn cổ tức và tính phụ trội liên ngân hàng, sau 5 năm phải mua lại phần chưa xử lý. Bán nợ theo giá thị trường thu 25–55% mệnh giá bằng tiền mặt, ghi lỗ ngay. Cách thật sự sạch là dùng dự phòng, chịu lỗ, và ngừng tạo nợ xấu mới.

## Sự kiện ngẫu nhiên

NHNN tăng/giảm lãi suất, khủng hoảng trái phiếu BĐS, rút tiền hàng loạt, nới room, thanh tra, chiến sự Trung Đông, chiến tranh thương mại Mỹ–Trung, USD rút ròng, sốt vàng, FDI kỷ lục, suy thoái toàn cầu, bão lụt, thuế quan Mỹ, Fed tăng/hạ lãi suất, tập đoàn BĐS xin vay lớn (có lựa chọn).

## Ghi chú

Hệ số co giãn, xác suất chuyển nhóm nợ và số liệu ngân hàng là giả định để học và thử chính sách, không phải số liệu thật của bất kỳ ngân hàng nào. Ván chơi có thể lưu vào trình duyệt.
