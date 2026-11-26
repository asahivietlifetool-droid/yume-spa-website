# Bàn giao cho Codex – website Yume Spa (27/11/2026)

Người giao: Claude (bộ máy AI của Asahi VietLife). Chủ: giám đốc Minamoto Trường Giang. Ngôn ngữ làm việc với giám đốc: tiếng Việt. Nội dung cho khách: tiếng Nhật (JA), tiếng Việt (VI), tiếng Anh (EN), **mỗi ngôn ngữ một trang riêng, không trộn trong một câu**.

## 1. Hiện trạng (đã kiểm 27/11/2026)
| Hạng mục | Trạng thái |
|---|---|
| Website đang chạy | https://asahivietlifetool-droid.github.io/yume-spa-website/ (GitHub Pages, dựng từ nhánh `main`, thư mục gốc). 6 trang, không lỗi tải, liên kết, JS |
| Trang | `/` (JA), `/vi/`, `/en/`, `/menu/` (JA), `/vi/menu/`, `/en/menu/` |
| Menu | Theo tệp nhân viên "Yume Spa 新料金メニュー案" (giám đốc duyệt đưa lên web 26/11): 11 nhóm, ưu đãi khai trương 初回限定, 4 combo. Nguồn duy nhất: `assets/js/menu-data.js` |
| PDF in | `assets/menu/yume-spa-menu-{ja,vi,en}.pdf` + `.png` |
| Ảnh | Toàn bộ là ảnh minh họa do AI tạo (Canva), trang ghi 「写真はすべてイメージです」. Chưa có ảnh thật tại quán. Danh sách: `assets/img/photos/CREDITS.md` |
| Tên miền chính thức | **yumespaadachi.com – CHƯA CHẠY.** Mua ở Tenten (Việt Nam) 14/11/2026. RDAP 27/11: trạng thái `client hold`, nameserver `NS-A1/A2/A3.TENTEN.VN`, DNS trả NXDOMAIN. Lý do: chủ chưa làm eKYC và xác thực email ở Tenten |
| Email chính của quán | booking.yumespa.takenotsuka@gmail.com (đã đúng ở mọi trang) |
| Điện thoại | 070-2813-6693 · giờ 10:00–22:00, nhận khách cuối 21:30, tạm mở cả 7 ngày · tiền mặt, PayPay |
| Khai trương | 19/12/2026 (dự kiến) |
| LINE, Facebook fanpage, link đặt lịch, Google Maps link | Chưa có. Nút LINE và Facebook ở mục đặt lịch đang tự ẩn (`assets/js/main.js › wireLinks`), câu dẫn ghi "LINE đang chuẩn bị" |

## 2. Cấu trúc repo và lệnh
- `src/template.html` – khung trang chủ. `assets/js/i18n.js` – chữ 3 ngôn ngữ (và bảng `menu` cũ chỉ còn để bộ soát so với dữ liệu gốc). `assets/js/menu-data.js` – menu đầy đủ.
- `tools/build.mjs` – dựng `index.html`, `vi/`, `en/`, `menu/`, `vi/menu/`, `en/menu/`, `sitemap.xml`, `robots.txt`, `404.html`. **Không sửa tay các tệp được dựng.** Hằng số `BASE` ở đầu tệp là địa chỉ gốc.
- `tools/menu-page.mjs` – trang menu. `tools/menu-pdf.mjs` – xuất PDF/PNG (cần Playwright + Chromium).
- Lệnh sau mỗi lần sửa:
  ```
  node tools/build.mjs
  node tools/build.mjs --check      # phải in "Trang tĩnh khớp với i18n.js và template."
  NODE_PATH=$(npm root -g) node tools/menu-pdf.mjs   # khi đổi menu
  ```
- Soát dữ liệu (nằm ở repo riêng tư `asahivietlifetool-droid/asahi-vietlife-ai-ops`): `python3 yume/tools/site_audit.py --facts yume/facts.yaml --site <đường dẫn repo website>`. Kết quả hiện tại: 0 từ cấm, 10/10 kiểm tra cho Google đạt, 1 chỗ chờ chủ xác nhận.
- Commit message tiếng Việt; push thẳng `main` (quy tắc của chủ: xong việc là commit + push).

## 3. Việc còn lại, theo thứ tự
### Việc 1 – Gắn tên miền yumespaadachi.com (chặn bởi chủ)
Điều kiện trước: chủ làm eKYC (ảnh CCCD/hộ chiếu + ảnh mặt) và bấm link xác thực email trên Tenten. **AI không làm thay eKYC, không nhận giấy tờ, không giữ mật khẩu Tenten.**
1. Kiểm tra mở khóa: `curl -s https://rdap.verisign.com/com/v1/domain/yumespaadachi.com` → `status` không còn `client hold`.
2. DNS ở Tenten (chủ thêm, hoặc agent có trình duyệt đã được chủ đăng nhập sẵn): 4 bản ghi A cho `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `asahivietlifetool-droid.github.io`. Xóa bản ghi A/CNAME mặc định của Tenten cho `@`/`www` nếu có.
3. Chờ DNS: `dig +short yumespaadachi.com` ra đủ 4 IP trên. **Chưa ra thì dừng ở đây** – nếu bật custom domain trước khi DNS chạy, GitHub Pages sẽ chuyển hướng địa chỉ github.io sang tên miền chưa chạy và web sập.
4. GitHub → repo `yume-spa-website` → Settings → Pages → Custom domain = `yumespaadachi.com` (GitHub tạo tệp `CNAME`; nếu làm bằng commit thì thêm tệp `CNAME` chứa đúng một dòng `yumespaadachi.com`).
5. Sửa `BASE` trong `tools/build.mjs` thành `"https://yumespaadachi.com/"`, chạy build + `--check` + `menu-pdf.mjs`, commit, push.
6. Khi GitHub cấp xong chứng chỉ (vài phút đến vài giờ): bật "Enforce HTTPS".
7. Kiểm thử: 6 trang trả 200 trên `https://yumespaadachi.com/…`, `www.` chuyển về tên gốc, địa chỉ github.io chuyển về tên miền mới, `sitemap.xml` và thẻ `canonical` dùng tên miền mới.
8. Báo repo ops: sửa `contact.website` trong `yume/facts.yaml` **chỉ khi chủ duyệt** (tệp này chỉ chủ sửa; agent ghi đề xuất vào `yume/facts-proposals.md`). Cập nhật CLAUDE.md của repo ops mục "Website Yume Spa" và README website mục 6.

### Việc 2 – Áp góp ý của ChatGPT (box "Tư vấn website Yume Spa" trên tài khoản ChatGPT của chủ)
Chủ sẽ dán góp ý. Sửa chữ trong `assets/js/menu-data.js` hoặc `i18n.js`, giữ quy tắc ở mục 4, dựng lại, xuất PDF, push.

### Việc 3 – Khi chủ gửi thêm dữ liệu
- Link LINE chính thức → `i18n.js › links.line` (nút LINE tự hiện lại). Link fanpage → `links.facebook`. Link Google Maps (nhúng) → `links.map`.
- Địa chỉ đầy đủ, cửa ra ga, tầng → hiện đang ghi "竹ノ塚駅近く" (chủ nói 1 phút từ ga 竹の塚). Có địa chỉ thì thêm vào trang, JSON-LD `BeautySalon` trong `src/template.html`.
- Ngày kết thúc ưu đãi khai trương → `menu-data.js › opening.cond` (đang ghi "sẽ báo trên trang này").
- Ảnh thật tại quán → thay tệp cùng tên trong `assets/img/menu/` (4:5) và `assets/img/photos/`; ảnh nào là ảnh thật thì bỏ chữ イメージ ở nơi đó; ảnh có khách phải có phiếu đồng ý. Gallery (`assets/js/gallery.js`) chỉ dành cho ảnh chụp tại quán.

### Việc 4 – Đồng bộ dữ liệu gốc (repo ops, cần chủ duyệt)
`yume/facts.yaml` vẫn bản 0.7; web đã theo menu mới. Đề xuất bản 0.8 đã ghi ở `yume/facts-proposals.md` mục 26/11 (tháo gel tiệm khác 1.650, chỉ tháo gel 2.750, các dịch vụ mới, ưu đãi khai trương). Chủ duyệt rồi mới sửa tệp gốc và bảng `menu` cũ trong `i18n.js`.

## 4. Quy tắc bắt buộc (không có ngoại lệ)
1. **Từ cấm** trong mọi nội dung spa (薬機法, 景品表示法, あん摩マッサージ指圧師法): 治療・治す・改善・医療・マッサージ・美白・小顔・アンチエイジング・若返り・肩こり解消・発毛・デトックス・必ず・No.1 và bản VI/EN tương ứng (trị liệu, chữa, làm trắng, trẻ hóa, massage, whitening, anti-aging, detox…). Câu bắt buộc giữ nguyên: 「当店はリラクゼーションと美容を目的としたサロンです。医療行為は行いません。」 Danh sách đầy đủ: `legal/forbidden-words.md` (repo ops).
2. **Không gạch giá / không ghi "通常価格→" cho ưu đãi khai trương** (quán chưa bán ngày nào theo giá thường → 二重価格表示). Chỉ ghi giá ưu đãi + điều kiện. Combo được ghi "単品合計" vì là tổng giá lẻ đang niêm yết.
3. **Không đưa lên web** hai phần nội bộ của tệp menu nhân viên: 「経営方針・導入前の確認」 và 「料金比較・変更点（社内検討用）」 (có giá của tiệm PONO).
4. **Ảnh:** không lấy ảnh của tiệm khác hay ảnh trên mạng không rõ giấy phép (3 ảnh trong tệp Word của nhân viên là ảnh tiệm khác, có tên tiệm – không dùng). Ảnh AI luôn ghi イメージ, không giả làm ảnh thật của quán hay kết quả của khách, không ảnh trước/sau.
5. **Ngôn ngữ phục vụ:** "日本語・ベトナム語で対応（英語は翻訳ツールでご案内）" – không quảng bá "phục vụ tiếng Anh".
6. **Head spa:** chỉ ghi 準備中 / đang chuẩn bị / coming soon, không giá (chờ 足立保健所).
7. Không lưu dữ liệu khách (tên, SĐT…) trong repo. Không ghi mật khẩu, token, số tiền nội bộ vào repo.
8. Tên "Yume Spa" vẫn chờ ý kiến 弁理士 về nhãn hiệu: không làm ấn phẩm in số lượng lớn coi tên là đã chốt.
9. Logo: `assets/img/logo-gold.svg`, `logo-white.svg`, `logo.png` đã bỏ dòng "NAILS · LASHES · SKINCARE" (quán không làm nối mi) – đừng khôi phục bản cũ.

## 5. Tài liệu liên quan
- `README.md` (repo website) – mục 6 (tên miền), "Menu đầy đủ", Gallery, quy tắc từ ngữ.
- Repo ops: `CLAUDE.md`, `reports/2026-11-26-yume-menu-in-va-website.md`, `yume/facts.yaml`, `yume/facts-proposals.md`, `legal/forbidden-words.md`.
- Thiết kế ảnh Canva (ảnh gốc độ phân giải cao): https://canva.link/xhkea4uadotizi6 (trang 7–26).
