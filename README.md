# BankSim Việt Nam

Game giả lập điều hành ngân hàng theo mô hình Việt Nam, chạy thời gian thực trong trình duyệt. Một file `index.html`, không cần cài đặt, không dùng thư viện ngoài. Mở file là chơi.

## Chơi thế nào

- Chọn một trong 9 ngân hàng (4 NHTM Nhà nước, 5 NHTM cổ phần) để làm Tổng giám đốc, hoặc chọn vai Thống đốc NHNN để điều tiết cả hệ thống.
- Bấm **Chạy**: mỗi tháng trôi qua trong vài giây (chỉnh tốc độ được). Phía trên là cảnh pixel trụ sở với khách gửi tiền (xanh lá), vay (xanh dương) và rút tiền (đỏ) ra vào. Phía dưới là bảng điều hành và terminal nhật ký.
- Tab **Điều hành**: lãi suất huy động theo kỳ hạn, lãi suất cho vay, khẩu vị rủi ro, mục tiêu tăng trưởng, cơ cấu ngành, tỷ trọng TPCP, đệm tiền mặt, cổ tức, phát hành giấy tờ có giá, tăng vốn, bán nợ VAMC.
- Tab **Tổng quan** có bảng "Cơ chế cho vay & dự trữ" giải thích từng bước của tháng: tiền gửi, dự trữ bắt buộc, thu nợ, cầu vay, trần cho vay và giới hạn nào đang chặn, giải ngân thực, cân đối liên ngân hàng.

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

## Sự kiện ngẫu nhiên

NHNN tăng/giảm lãi suất, khủng hoảng trái phiếu BĐS, rút tiền hàng loạt, nới room, thanh tra, chiến sự Trung Đông, chiến tranh thương mại Mỹ–Trung, USD rút ròng, sốt vàng, FDI kỷ lục, suy thoái toàn cầu, bão lụt, thuế quan Mỹ, Fed tăng/hạ lãi suất, tập đoàn BĐS xin vay lớn (có lựa chọn).

## Ghi chú

Hệ số co giãn, xác suất chuyển nhóm nợ và số liệu ngân hàng là giả định để học và thử chính sách, không phải số liệu thật của bất kỳ ngân hàng nào. Ván chơi có thể lưu vào trình duyệt.
