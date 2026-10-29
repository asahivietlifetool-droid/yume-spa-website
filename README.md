# Yume Spa – website

Website tĩnh (HTML/CSS/JS thuần) cho **Yume Spa** – studio làm đẹp nhỏ ở Takenotsuka, Adachi-ku, Tokyo.
Dịch vụ: nail · head spa (chăm sóc da đầu nhẹ) · chăm sóc da mặt. Khai trương 12/2026.
Chạy miễn phí trên GitHub Pages, 3 ngôn ngữ (日本語 / Tiếng Việt / English) đổi tại chỗ.

## Cấu trúc
- `index.html` – khung trang (hero, concept, menu, quy trình, ưu đãi khai trương, địa chỉ, đặt lịch, FAQ).
- `assets/js/i18n.js` – **toàn bộ chữ + bảng giá + link**. Sửa nội dung ở đây.
- `assets/js/main.js` – đổi ngôn ngữ, vẽ bảng giá, gắn link LINE/Facebook/Map.
- `assets/css/style.css` – giao diện. Màu thương hiệu: gold `#C8A04A`, gold đậm `#8A6620`, gold nhạt `#E7D08A`.
- `assets/img/` – logo (SVG/PNG) từ bộ YumeSpa_Logo_FullPack.

## Việc cần làm trước khai trương (TODO)
1. `i18n.js › links.line` – dán link LINE公式 (lin.ee/...). Khi chưa có, nút LINE tạm gọi điện.
2. `i18n.js › links.facebook` – dán link fanpage YUME SPA.
3. `i18n.js › links.map` – dán link embed Google Maps khi có địa chỉ; sửa `access.addrv` 3 ngôn ngữ và JSON-LD trong `index.html`.
4. Giá trong `i18n.js › menu` là **giá dự kiến** – chốt lại trước khi đăng.
5. Thay ảnh thật của quán (hiện chưa có ảnh): thêm vào `assets/img/` và chèn vào `index.html`.
6. Tên miền: khi mua, tạo file `CNAME` chứa tên miền và trỏ DNS về GitHub Pages.

## Quy tắc từ ngữ (bắt buộc – luật Nhật)
- 薬機法 / 景品表示法: **không** dùng 治療・治す・改善・医療・美白・シミが消える・小顔・アンチエイジング・若返り・発毛.
- あん摩マッサージ指圧師法: **không** dùng chữ マッサージ (kể cả tiếng Việt "massage" trên bản JP). Dùng ほぐす・リラックス・ケア.
- Head spa có gội nước → cần 美容師免許 + đăng ký 美容所 với 足立保健所. Nếu chưa có, giữ "dry head spa" (không nước).
- Nối mi (lashes) cần 美容師免許 → **chưa đưa lên web** cho đến khi có thợ có giấy.
- Chi tiết: xem repo `asahi-vietlife-ai-ops/legal/`.

## Gallery (ảnh quán · mẫu nail · khách)
- Bỏ ảnh vào `assets/img/gallery/` (dọc 4:5, ≤ 250KB, WebP/JPG) rồi thêm dòng `{src, alt}` vào `assets/js/gallery.js`.
- Chưa có ảnh → ô trống "Ảnh đang cập nhật" tự hiện. Thẻ ảnh nghiêng 3D theo chuột (máy tính), bấm để phóng to.
- Ảnh khách: chỉ đăng khi khách đồng ý (đã ghi trên web). Không đăng ảnh "trước/sau" cho facial (薬機法).

## Nhân vật minh họa (mục Ba dịch vụ)
Cô gái vector nguyên bản (profile + bàn tay khoe móng + bướm) đổi 3 tư thế nail → head spa → facial; tự xoay vòng 4,5 giây khi đang nhìn, bấm tab để chọn; nghiêng 3D theo chuột, các lớp (tóc, mặt, tay, hạt sáng) trôi khác tốc độ. Nằm trong `index.html` (SVG inline) + `assets/js/showcase.js`. Đây là minh họa, không phải ảnh/video 3D thật; khi có render thật, thay SVG bằng video dọc trong cùng ô.

## Hiệu ứng 2.5D
Hero 6 lớp (nền → quầng sáng → 2 bướm mờ → bướm chính → chữ → hạt vàng) parallax theo cuộn và theo chuột; chữ sáng dần khi cuộn; thẻ menu/gallery xuất hiện lần lượt. GSAP 3.12.5 để trong `assets/js/vendor/` (không phụ thuộc CDN). Tự tắt khi người dùng bật "giảm chuyển động".

## Chạy thử
Mở `index.html` bằng trình duyệt là chạy (không cần build). GitHub Pages: Settings → Pages → Deploy from branch `main` / root.

## Phản biện từ ChatGPT (29/10/2026) – đã áp dụng
- Sửa 4 câu JA để giảm hàm ý "giảm triệu chứng" (head spa, facial, flow).
- Giá: gel 1 màu ¥5.500 ngang mặt bằng Takenotsuka; head spa 30' ¥3.300 cạnh tranh; facial 40' ¥6.600 hơi cao so với đối thủ (~¥4.980/40') → cân nhắc ¥5.500 hoặc nêu rõ giá trị.
- Ba thứ còn thiếu để khách tin đặt lịch: link LINE thật, địa chỉ + Google Maps + ngày nghỉ, ảnh thật của quán/nhân viên.
