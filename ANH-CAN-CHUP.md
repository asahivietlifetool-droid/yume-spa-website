# Ảnh cần chụp tại quán để thay ảnh minh họa (soát 27/11/2026)

Hiện mọi ảnh trên website là ảnh do AI tạo (Canva), luôn có chữ 「写真はイメージです」. Khi có ảnh thật, thay **tệp cùng tên, cùng khổ**, rồi bỏ chữ イメージ ở đúng chỗ đó. Không dùng ảnh tiệm khác, ảnh trên mạng, ảnh trước/sau da mặt. Ảnh có khách: phải có phiếu đồng ý, không lộ mặt.

## Ưu tiên 1 – cần trước khai trương 19/12

| # | Chụp gì | Thay tệp | Khổ | Dùng ở đâu |
|---|---|---|---|---|
| 1 | Mặt tiền có biển Yume Spa, ban ngày, thấy cửa vào | (mới) `assets/img/gallery/space-01.jpg` | ngang 3:2 | Gallery “サロンの空間”, ảnh bìa Google |
| 2 | Không gian bên trong (quầy nail, ánh sáng thật) | `assets/img/photos/salon-1400.webp`, `salon-700.webp` | ngang 3:2 | Trang chủ mục ảnh |
| 3 | Khay dụng cụ đã khử trùng, đóng gói | `assets/img/photos/tools-1400.webp`, `tools-700.webp` | ngang 3:2 | Trang chủ mục ảnh |
| 4 | Giường/ghế facial, khăn, mỹ phẩm thật (không người) | `assets/img/photos/facial-items-900.webp`, `-480` | dọc 4:5 | Trang chủ, Google |

## Ưu tiên 2 – sau khi có khách đồng ý chụp

| # | Chụp gì | Thay tệp | Khổ |
|---|---|---|---|
| 5 | Tay gel một màu do thợ quán làm | `assets/img/photos/gel-one-*.webp`, `assets/img/menu/one-*.webp` | dọc 4:5 |
| 6 | Mẫu定額 Simple / Trend / Premium từ bảng mẫu thật | `assets/img/menu/simple-*`, `trend-*`, `premium-*` | dọc 4:5 |
| 7 | French, mắt mèo, aurora, ombre, gel trong, nail nam | `menu/french-*`, `magnet-*`, `mirror-*`, `gradient-*`, `glitter-*`, `clear-*`, `mens-*` | dọc 4:5 |
| 8 | Nail chân, vẽ móng cái | `photos/foot-*`, `menu/foot-*`, `menu/foot-art-*` | dọc 4:5 |
| 9 | Nối móng, mẫu khách mang đến, chăm sóc móng | `menu/tips-*`, `menu/custom-*`, `menu/care-*` | dọc 4:5 |

Mỗi ảnh cần 2 cỡ: menu `-720` và `-360` (rộng 720/360 px), photos `-900`/`-480` hoặc `-1400`/`-700`. Gửi ảnh gốc cho Claude, Claude cắt khổ, nén webp, thay chữ イメージ, dựng lại và xuất PDF.

## Ảnh Gallery (chỉ ảnh chụp tại quán)
Bỏ ảnh vào `assets/img/gallery/` và thêm dòng trong `assets/js/gallery.js` (space / nails / guests). Hiện 3 nhóm đều trống, trang ghi 「写真は準備中です」.

## Không cần chụp
Logo (đã có), ảnh head spa (chưa mở, chỉ ghi 準備中).
