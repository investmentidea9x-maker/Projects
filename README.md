# BankSim Việt Nam

Game giả lập điều hành ngân hàng theo mô hình Việt Nam, chạy thời gian thực trong trình duyệt. Một file `index.html`, không cần cài đặt, không dùng thư viện ngoài. Mở file là chơi.

## Chơi thế nào

- Chọn **độ khó**: Dễ, Thực tế (mặc định) hoặc Khắc nghiệt. Độ khó quyết định tần suất cú sốc, tốc độ nợ xấu, mức rút tiền khi ngân hàng yếu, cạnh tranh lãi suất với ngân hàng khác, biên lãi thị trường và ROE mà cổ đông đòi hỏi (ba năm dưới kỳ vọng là bị thay Tổng giám đốc).

- Chọn một trong 9 ngân hàng (4 NHTM Nhà nước, 5 NHTM cổ phần) để làm Tổng giám đốc, hoặc chọn vai Thống đốc NHNN để điều tiết cả hệ thống.
- Bấm **Chạy**: mỗi tháng trôi qua trong vài giây (chỉnh tốc độ được). Phía trên là cảnh pixel trụ sở với khách gửi tiền (xanh lá), vay (xanh dương) và rút tiền (đỏ) ra vào. Phía dưới là bảng điều hành và terminal nhật ký.
- Tab **Điều hành**: lãi suất huy động theo kỳ hạn, lãi suất cho vay, khẩu vị rủi ro, mục tiêu tăng trưởng, cơ cấu ngành, tỷ trọng TPCP, đệm tiền mặt, cổ tức, phát hành giấy tờ có giá, tăng vốn, bán nợ VAMC.
- Tab **Bảng điều khiển**: báo cáo tháng mới nhất và 12 biểu đồ chuỗi thời gian (quy mô, lợi nhuận, NIM/ROE/chi phí vốn, CAR, nợ xấu, LDR, vốn ngắn hạn cho vay TDH, thanh khoản, tín dụng so với room, lãi suất, vĩ mô, cơ cấu nguồn vốn), có hover xem giá trị từng tháng, chọn 12/36 tháng hoặc toàn bộ.
- Tab **Báo cáo tháng**: sau mỗi tháng engine viết một báo cáo tóm tắt (huy động, dư nợ, giải ngân và giới hạn đang chặn, thu nhập, dự phòng, lợi nhuận, các tỷ lệ an toàn, vi phạm, sự kiện, khuyến nghị). Báo cáo cũng in ra terminal.
- Tab **Tổng quan** có bảng "Cơ chế cho vay & dự trữ" giải thích từng bước của tháng: tiền gửi, dự trữ bắt buộc, thu nợ, cầu vay, trần cho vay và giới hạn nào đang chặn, giải ngân thực, cân đối liên ngân hàng.
- Khi có sự kiện, khung pixel phía trên chạy hoạt ảnh riêng (tên lửa và trời đỏ khi có chiến sự, tàu container rời cảng khi bị áp thuế, máy bay chở USD bay đi, đám đông rút tiền, cần cẩu đổ khi khủng hoảng BĐS, xe thanh tra, nhà máy FDI, bão và sét, nhiễu màn hình khi bị tấn công mạng) cùng thẻ mô tả không chặn nhịp chơi; chỉ sự kiện cần bạn quyết định mới tạm dừng.

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
