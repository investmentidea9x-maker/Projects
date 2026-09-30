# BankSim Việt Nam

Game giả lập điều hành ngân hàng theo mô hình Việt Nam, chạy thời gian thực trong trình duyệt. Một file `index.html`, không cần cài đặt, không dùng thư viện ngoài. Mở file là chơi.

## Chơi thế nào

- Chọn **độ khó**: Dễ, Thực tế (mặc định) hoặc Khắc nghiệt. Độ khó quyết định tần suất cú sốc, tốc độ nợ xấu, mức rút tiền khi ngân hàng yếu, cạnh tranh lãi suất với ngân hàng khác, biên lãi thị trường và ROE mà cổ đông đòi hỏi (ba năm dưới kỳ vọng là bị thay Tổng giám đốc).

- Chọn một trong 9 ngân hàng (4 NHTM Nhà nước, 5 NHTM cổ phần) để làm Tổng giám đốc, hoặc chọn vai Thống đốc NHNN để điều tiết cả hệ thống.
- Giao diện thanh bên: điều hướng, đồng hồ, nút chạy, KPI nhanh ở cột trái; khung pixel, bảng nội dung và terminal ở giữa.
- Bấm **Chạy**: mỗi tháng trôi qua trong vài giây (chỉnh tốc độ được). Phía trên là cảnh pixel trụ sở với khách gửi tiền (xanh lá), vay (xanh dương) và rút tiền (đỏ) ra vào; các bảng thông số an toàn, kết quả và thị trường vẽ ngay trên khung ở độ phân giải màn hình. Phía dưới là bảng điều hành và terminal nhật ký.
- Tab **Điều hành** (ngân hàng): mọi tham số chỉnh bằng nút bấm theo bước (lãi suất ±0,25, khẩu vị ±1, tăng trưởng ±2, cơ cấu ngành ±5 điểm hoặc chọn mẫu, TPCP, đệm tiền mặt, số hóa, mạng lưới, cổ tức) và các hành động một lần (giấy tờ có giá 1/2/5% tài sản, trái phiếu cấp 2, tăng vốn 10/20/40%, bán nợ VAMC).
- Tab **Công cụ NHNN**: nghiệp vụ thị trường mở bơm (mua kỳ hạn TPCP) hoặc hút (tín phiếu) với kỳ hạn 7/14/28/91 ngày, quy mô, tỷ lệ đảo hạn khi đến hạn và lãi suất từng đợt (mỗi đợt phát hành hỏi giữ, tăng hay giảm; lãi bơm là trần mềm, lãi tín phiếu là sàn mềm của lãi liên ngân hàng); bán USD giao ngay hoặc bán kỳ hạn 3–6 tháng với điểm kỳ hạn tự chọn (dự trữ chỉ giảm khi đáo hạn, ngân hàng được hủy một nửa nếu VND đã ổn định); họp điều hành hàng quý về lãi suất các công cụ; lãi suất điều hành, trần lãi suất, dự trữ bắt buộc, room, các trần an toàn, Thông tư 02 và xử lý ngân hàng yếu. Bảng "Nghiệp vụ đang mở" theo dõi số dư, kỳ hạn còn lại và đảo hạn.
- **Quyết định**: khi một chỉ số vượt ngưỡng (CAR, LDR, vốn ngắn hạn cho vay TDH, nợ xấu, thanh khoản, NIM, room, rút tiền; với NHNN là CPI, tăng trưởng, tỷ giá, thanh khoản hệ thống, ngân hàng yếu) hoặc một sự kiện lớn xảy ra (USD rút, NHNN tăng lãi, khủng hoảng trái phiếu, sốt vàng, rút tiền hàng loạt, chiến sự), game tự dừng và đưa 3–5 lựa chọn xử lý với hiệu ứng cụ thể. Mỗi cảnh báo có thời gian chờ để không lặp liên tục.
- Tab **Bảng điều khiển**: báo cáo tháng mới nhất và 12 biểu đồ chuỗi thời gian (quy mô, lợi nhuận, NIM/ROE/chi phí vốn, CAR, nợ xấu, LDR, vốn ngắn hạn cho vay TDH, thanh khoản, tín dụng so với room, lãi suất, vĩ mô, cơ cấu nguồn vốn), có hover xem giá trị từng tháng, chọn 12/36 tháng hoặc toàn bộ.
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

- Ngân hàng khác giành khách: trả lãi thấp hơn nhóm dẫn đầu thì mất tiền gửi, cho vay đắt hơn thì mất khách vay.
- Cho vay dễ dãi tạo nợ xấu tiềm ẩn, bộc lộ dần sau 6–18 tháng.
- Thị trường liên ngân hàng đóng cửa dần với ngân hàng yếu (CAR thấp, nợ xấu cao, thanh khoản mỏng, uy tín giảm).
- Rút tiền hàng loạt nhắm vào ngân hàng yếu nhất, kể cả của bạn.
- Chi phí vận hành tăng theo lạm phát; NHNN siết room khi CPI vượt 5%; thanh tra phạt nặng và công bố công khai.
- Ngân hàng quốc doanh phải nộp cổ tức tối thiểu 30% và khó tăng vốn; cổ đông ngân hàng cổ phần đòi ROE cao hơn.

## Sự kiện ngẫu nhiên

NHNN tăng/giảm lãi suất, khủng hoảng trái phiếu BĐS, rút tiền hàng loạt, nới room, thanh tra, chiến sự Trung Đông, chiến tranh thương mại Mỹ–Trung, USD rút ròng, sốt vàng, FDI kỷ lục, suy thoái toàn cầu, bão lụt, thuế quan Mỹ, Fed tăng/hạ lãi suất, tập đoàn BĐS xin vay lớn (có lựa chọn).

## Ghi chú

Hệ số co giãn, xác suất chuyển nhóm nợ và số liệu ngân hàng là giả định để học và thử chính sách, không phải số liệu thật của bất kỳ ngân hàng nào. Ván chơi có thể lưu vào trình duyệt.
