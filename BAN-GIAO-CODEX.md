# Bàn giao cho đội AI agent – Yume Spa (cập nhật 28/11/2026)

Áp dụng cho mọi agent: Codex, Claude (phiên khác), ChatGPT (người rà soát). Người cập nhật: Claude. Chủ: giám đốc Minamoto Trường Giang. Làm việc với giám đốc bằng tiếng Việt. Nội dung cho khách: JA/VI/EN, **mỗi ngôn ngữ một trang riêng, không trộn trong một câu**.

**Đọc trước khi làm:** mục 1 (hiện trạng), mục 3 (việc đang chặn – đừng làm vượt), mục 5 (quy tắc). Báo cáo sáng 28/11 cho giám đốc: repo ops `reports/2026-11-28-yume-square-google-website.md`.

## 0. Ai làm gì
| Agent | Vai trò | Ở đâu |
|---|---|---|
| Claude (Claude Code, máy nhà giám đốc) | Kỹ sư triển khai: website, Square, hồ sơ Google, repo ops | Repo này + `asahi-vietlife-ai-ops`; Chrome của giám đốc (đã đăng nhập Square, Google `authuser=7` = email đặt lịch của quán, Tenten) |
| ChatGPT | Rà soát độc lập (menu, nhân sự, lịch, luật quảng cáo) | Box "Tư vấn website Yume Spa" trong dự án "TRUONG GIANG" trên tài khoản ChatGPT của giám đốc. Gửi báo cáo **không chứa tên nhân viên, SĐT, email cá nhân, dữ liệu khách, mật khẩu** |
| Codex | Sửa code website khi được giao | Repo này |
| Claude cloud (phiên phụ, mở từ app desktop, chạy trên cloud – không phụ thuộc máy nhà) | Trợ lý website: code, build, tên miền, tài liệu | Chỉ repo GitHub này. **Không có Chrome** → không vào Square / Google / Tenten |
Mọi agent: không coi ChatGPT đã duyệt nếu chưa có phản hồi; giám đốc là người quyết cuối.

**Phối hợp nhiều agent (từ 27/11):**
- Luôn `git pull` trước khi làm. Agent phụ làm trên nhánh riêng + PR vào `main`; không force-push. Agent máy nhà merge.
- Trạng thái mới ghi vào tài liệu này (có ngày) trong cùng commit/PR. Việc cần Square/Google/Tenten → ghi vào mục "Việc cho agent máy nhà" dưới đây, không tự làm.
- Không agent nào nhập mật khẩu/OTP, tạo tài khoản, gửi thư thay giám đốc khi chưa được cho phép rõ.

**Việc cho agent máy nhà:** (agent phụ ghi thêm vào đây)
- ~~Gắn link đặt lịch Square lên Google + website~~ – XONG 28/11 (giám đốc đồng ý): website có nút WEB予約 (hero, thanh cố định mobile, mục ご予約); Google: 予約リンク = trang Square, website = https://yumebeautyspa.com/, menu = /menu/ (2 link này chờ Google duyệt).
- Square: ghi website https://yumebeautyspa.com/ vào hồ sơ location LK15VJNH9TBDG – chưa làm vì Square bị đăng xuất 28/11 (giám đốc đăng nhập lại).
- 28/11 da mặt (lần 2, giám đốc): web ghi giá cơ bản ¥5,500〜/¥7,700〜/¥8,800〜/¥11,000〜 + câu "gói cơ bản đúng giá, phụ phí báo trước" (ChatGPT YUME-MKT-01). Combo có da mặt vẫn 「店頭でご案内」. Chờ giám đốc gửi danh sách phụ phí da mặt.
- Kênh tìm khách: kế hoạch ở Downloads\Yume-Spa-bao-cao\KE-HOACH-KENH-TIM-KHACH-28-11-2026.md. KHÔNG tạo tài khoản ảo/ステマ. Giám đốc tự tạo tài khoản (IG, LINE公式, WhatsApp Business, Zalo OA); agent viết bài + lên lịch.
- Hồ sơ Google có trang Facebook (profile.php?id=61586956555272) – có thể gắn vào website (links.facebook trong i18n.js) nếu giám đốc xác nhận đó là trang chính thức.

**Tên miền chính thức: yumebeautyspa.com – ĐÃ GẮN (27/11/2026, lệnh L-023).** Giám đốc thêm DNS ở Tenten (4 A `@` + CNAME `www`), repo có tệp `CNAME`, `BASE` trong `tools/build.mjs` = `https://yumebeautyspa.com/`. Địa chỉ github.io tự chuyển sang tên miền mới. Việc còn lại: (1) GitHub Settings → Pages: kiểm tra Custom domain hiện yumebeautyspa.com, bật "Enforce HTTPS" khi chứng chỉ cấp xong; (2) agent có Chrome đổi link website trên hồ sơ Google và Square sang https://yumebeautyspa.com/; (3) giám đốc quyết bỏ hay giữ yumespaadachi.com.

## 1. Hiện trạng (kiểm 28/11/2026)
| Hạng mục | Trạng thái |
|---|---|
| Website | https://asahivietlifetool-droid.github.io/yume-spa-website/ – 6 trang (`/`, `/vi/`, `/en/`, `/menu/`, `/vi/menu/`, `/en/menu/`) trả 200. Có địa chỉ thật + bản đồ Google, 徒歩1分, giờ nhận khách cuối **20:30** (đổi 27/11 theo chỉ thị giám đốc), ngôn ngữ đúng quy tắc 5 |
| Tên miền yumespaadachi.com | **CHƯA CHẠY** – Tenten `client hold`. Xác thực email: giám đốc đã bấm nhưng Tenten chưa ghi nhận. eKYC: bị từ chối vì hồ sơ tên miền ghi số **hộ chiếu**, giám đốc chụp **CCCD**; chụp hộ chiếu thì bị báo mờ. Cách gỡ: gọi Tenten 02471 097 222 nhờ sửa số giấy tờ, hoặc chụp lại trang hộ chiếu (ngang, rõ 2 dòng mã cuối). AI không làm eKYC, không giữ giấy tờ |
| Địa chỉ quán | 〒121-0813 東京都足立区竹の塚1丁目29-11 アーバンステージ (theo hồ sơ Google đã xác minh). Thiếu tầng/phòng. `yume/facts.yaml` chưa ghi (đề xuất đã nằm trong `facts-proposals.md`) |
| Menu, giá | **Nguồn giá duy nhất: `YumeSpa Menu.docx`** (giám đốc chốt; bản sao `ネイルコース.docx` cùng nội dung) = `assets/js/menu-data.js`. Không lấy phần nội bộ (経営方針, so sánh PONO), không dùng 3 ảnh tiệm khác trong tệp |
| Hồ sơ Google "Yume Spa Adachi" | Danh mục ネイルサロン (chính), フェイシャル スパ, エステティック サロン. Mô tả JA mới. Website + link menu = `yumespaadachi.com` (**giám đốc muốn giữ tên miền, không đổi sang github.io**). 17 dịch vụ có giá. 1 bài khai trương – **nội dung trên Google đang ghi 12/12/2026, mọi nơi khác 19/12: chờ giám đốc xác nhận ngày, chưa sửa**. Logo/ảnh bìa: giám đốc tự tải (trình duyệt tự động không chọn được tệp) từ `Downloads\Yume-Spa-anh-Google`. Ảnh đại diện đang là Street View tiệm hoa cũ (không xóa được, chỉ đẩy xuống bằng ảnh thật) |
| Đặt lịch | **Square 予約** (giám đốc đổi từ USEN sang Square 27/11). Xem mục 2 |
| Ảnh | Toàn bộ là ảnh AI có nhãn イメージ. Danh sách ảnh cần chụp: `ANH-CAN-CHUP.md` |
| LINE, fanpage | Chưa có; nút tự ẩn |

## 2. Square 予約 – trạng thái
- Gói: **Plus dùng thử, hết hạn 27/12/2026**, chưa có thẻ → tự về **Free**. Chỉ dùng tính năng có trong Free (giám đốc cấm nâng gói). Free không có: 対応時間の設定, 複数スタッフ対象の予約, 自動予約確認, 1日上限. Free có: lịch theo nhân viên, nhắc lịch, trang đặt lịch, liên kết Google.
- **Đã tạo 6 category, 26 dịch vụ** đúng tệp giá gốc, giá 税込 cố định, mỗi dịch vụ +10 phút "Block extra time after appointment":
  - 01 ハンドネイル: クリアジェル 45p ¥4,400 · ワンカラー 60p ¥5,500 · ラメグラデーション 60p ¥5,500 · マグネット・フラッシュ 70p ¥6,050 · ミラー・オーロラ 70p ¥6,600 · カラーグラデーション 75p ¥6,600 · フレンチ 75p ¥7,150 · メンズジェルネイル 60p ¥5,500
  - 02 定額デザイン: 定額 Simple 75p ¥6,600 · Trend 90p ¥7,700 · Premium 120p ¥9,900
  - 03 持ち込みデザイン: アート2本 75p ¥6,600〜 · アート4本 90p ¥7,700〜 (**tắt đặt online** tới khi xác minh tay nghề)
  - 04 チップ長さ出し: ワンカラー・ラメグラ 120p ¥11,000 · マグネット・フラッシュ 130p ¥11,550 · 定額 Simple 135p ¥12,100 · 定額 Trend 150p ¥13,200 (M10本込み)
  - 05 フットネイル: フットワンカラー 60p · フット ラメグラデーション 60p ¥6,600 · フット マグネット・フラッシュ 75p · フット 親指2本アート 75p ¥7,700 · フット 定額デザイン 90p ¥8,800
  - 06 フェイシャル: ベーシック保湿 40p ¥5,500 · うるおいマスク 60p ¥7,700 · 毛穴クレンジング 60p ¥8,800 · プレミアム 90p ¥11,000
- Chưa tạo: Off, Care, Add-on, Combo, ưu đãi khai trương (thiếu thời lượng / điều kiện). Dịch vụ mẫu "ヘアカット（サービス例）": đã tắt đặt online.
- Giờ cửa hàng (location): 10:00–22:00 cả 7 ngày.
- **Chưa bật trang đặt lịch công khai.** ChatGPT rà soát CONFIG-01: *CONDITIONAL GO*.
- Cách cắt giờ nhận cuối trên Free (đã thống nhất với ChatGPT, **chưa kiểm thử**): khung đặt 30 phút; giờ nhận lịch của nhân viên ca cuối kết thúc 21:40. Phải thử Facial 40 phút không có khung 21:00; nếu có → hạ về 21:30.
- Tham chiếu chỉ thị đầy đủ: tin nhắn giám đốc "YUME SPA | SQUARE 予約 FREE — TRIỂN KHAI NHẬN LỊCH THẬT" (13 tình huống kiểm thử ở mục H) – bản gốc nằm trong box ChatGPT nói trên.

## 3. Việc đang chặn – chờ giám đốc (không làm vượt)
1. **Ca làm** (giám đốc trả lời 28/11): 10–16h 2 thợ nail; 16h–đóng cửa **1 thợ nail** (cùng một người cho 16–18h và 18h–cuối); 1 KTV da mặt full time cả ngày, **nghỉ 12:00–12:30**; 1 quản lý không nhận lịch; **chưa có ngày nghỉ** (làm cả 7 ngày). **Nail chân: tay nghề còn non → 5 dịch vụ 05 フットネイル đã tắt đặt online (28/11)**, khách hỏi thì nhận qua điện thoại. **ĐÃ TẠO TRÊN SQUARE 28/11** (tên theo vai trò, giám đốc duyệt; email = alias `booking.yumespa.takenotsuka+nail-a|nail-b|nail-c|facial@gmail.com`, thư mời và thông báo đều về hộp thư chính; quyền "Team Permissions" miễn phí – không có quyền xem lịch trong app, nhận lịch qua email):
   - ネイリスト A, ネイリスト B: **10:00–17:00** cả 7 ngày (ca chính 10–16h, giám đốc 27/11: có lịch thì tăng ca đến 17h), không nghỉ trưa; 17 dịch vụ (8 tay + 3 定額 + 2 持ち込み + 4 長さ出し), không chân, không da mặt.
   - ネイリスト C: 16:00–21:40 cả 7 ngày; cùng 17 dịch vụ.
   - フェイシャル担当: 10:00–12:00 + 12:30–21:40 cả 7 ngày; 4 dịch vụ da mặt.
   - Mỗi người: thông báo email BẬT, "Notify owner" BẬT. 木伏里奈 (事業主, chỉ quản lý): **tắt Bookable online** (28/11), email chủ = hộp thư chính.
   - 21:40 là mốc để khách cuối + 10 phút dọn xong trước 22:00 và giữ last order 20:30 cho dịch vụ ≤60 phút – **chưa kiểm thử**.
   - Ai làm nối móng/Premium: đang cho cả 3 thợ.
   - **Ảnh dịch vụ (27/11):** 19 dịch vụ online có ảnh minh họa AI của repo (`assets/img/menu/*-720.webp` → JPG có nhãn イメージ; dùng chung: 長さ出し = tips, フェイシャル = facial). Ảnh thu nhỏ vuông cắt mất nhãn nên mỗi mô tả bắt đầu bằng 「※写真はイメージです。」. Booking site: bật "Show categories" + "Show service images". Khi có ảnh thật của quán thì thay ảnh và có thể bỏ câu イメージ.
   - **Online booking ĐÃ BẬT 27/11** (giám đốc cho phép thử). Trang: https://book.squareup.com/appointments/69awg5w0exe62m/location/LK15VJNH9TBDG/services – **chưa gắn lên Google/website**, "Search engine visibility" TẮT. Cài đặt: chờ quán xác nhận (auto-accept TẮT), 1 dịch vụ/lần, khóa giờ JST, khung 30 phút, 19 dịch vụ hiện online.
   - Ngày: **khai trương chính thức 19/12, nhận khách từ 12/12** (giám đốc 27/11). Chặn trước 12/12 bằng Personal event "開店準備（12/12から予約受付）" cả ngày 27/11–11/12 cho cả 4 nhân viên. Trang đặt lịch báo "No availability until Saturday, December 12" ✓.
   - Kết quả kiểm thử 27/11 (xem giờ trống, không tạo lịch khách): ワンカラー cuối 20:30, không 21:00 ✓; 定額 Premium cuối 19:30, không 20:30 ✓ (19:50 không có vì khung 30 phút); 長さ出し Trend cuối 19:00, không 20:00 ✓; Facial 40p cuối 20:30, nghỉ 12:00–12:30 ✓; dịch vụ nail không hiện フェイシャル担当 ✓; giờ đã có lịch bận bị ẩn ✓ (đã thử bằng personal event rồi đổi nó thành khối chặn); 持ち込み ¥6,600〜 không đặt online ✓; mô tả 長さ出し ghi không tính phí nối 2 lần ✓; Square tính cả 10 phút dọn vào giờ làm.
   - Ca sáng đã nới đến 17:00 → 12/12 trống liên tục 10:00–20:30 cho ワンカラー ✓ (16–17h có thể 3 thợ cùng nhận nếu đủ khách).
   - Chưa đạt/chưa thử: khách có gel cần tháo – chỉ ghi chú trong mô tả, chưa cộng thời gian tự động; chưa đặt thử tới bước xác nhận (bước thanh toán bắt số điện thoại và tự tạo tài khoản Square cho khách – không làm); chưa xem trên điện thoại; chưa gửi CONFIG-02 cho ChatGPT. → Có rồi mới tạo **hồ sơ từng nhân viên thật** (không tạo theo vai), gán ca + dịch vụ, chạy 13 kiểm thử, gửi CONFIG-02 cho ChatGPT, rồi mới bật đặt lịch và lấy **URL thật** gắn vào Google (予約リンク) + website.
2. ~~Địa chỉ location Square~~ **ĐÃ XONG 28/11** (giám đốc cho phép): 〒121-0813 東京都足立区竹の塚1-29-11 アーバンステージ; tên hiển thị trên Square = "Yume Beauty Spa & Nail" (katakana ユメビューティースパアンドネイル); nickname nội bộ giữ 合同会社朝日越南ライフ. Thanh toán Square: thẻ "3 of 7 under review", E-Money và QR **Not Applied**.
3. **Ngày khai trương** 12/12 hay 19/12 (bài Google đang ghi 12/12).
4. **Tên quán ĐÃ CHỐT 28/11: "Yume Beauty Spa & Nail"** (kana ユメ ビューティースパ＆ネイル). Đã đổi: website (tiêu đề, header, JSON-LD, chân trang, menu/PDF), Square location, Google (đang chờ Google duyệt; mô tả Google chưa lưu được tên mới – thử lại khi tên duyệt xong). Biển hiệu phải khớp tên này.
5. **Dịch vụ da mặt mới** (mụn, căng da, mát xa mặt, trắng da, nâng cơ): chưa có giá/thời lượng → không tạo. Khi có, đặt tên dạng "hỗ trợ/chăm sóc": クリアスキンケア, ハリ・ツヤケア, フェイシャルトリートメント, 透明感ケア – không dùng ニキビ改善, リフトアップ効果, 小顔, マッサージ, 美白.
6. **Tên miền**: xem mục 1; các bước gắn tên miền ở mục 4.

## 4. Gắn tên miền khi Tenten mở khóa
1. `curl -s https://rdap.verisign.com/com/v1/domain/yumespaadachi.com` → `status` hết `client hold`.
2. DNS ở Tenten (id.tenten.vn → Quản lý dịch vụ → Tên miền → bánh răng → Cài đặt DNS): 4 bản ghi A `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`; CNAME `www` → `asahivietlifetool-droid.github.io`.
3. Chờ `dig +short yumespaadachi.com` ra đủ 4 IP. **Chưa ra thì dừng** (bật custom domain sớm làm sập cả github.io).
4. GitHub Pages → Custom domain `yumespaadachi.com`; sửa `BASE` trong `tools/build.mjs`; build + check + PDF; commit; push; bật Enforce HTTPS; kiểm 6 trang.
5. Ghi đề xuất `contact.website` vào `yume/facts-proposals.md` (repo ops); cập nhật mục Yume trong CLAUDE.md repo ops.

## 5. Lệnh
```
node tools/build.mjs
node tools/build.mjs --check      # phải in "Trang tĩnh khớp với i18n.js và template."
node tools/menu-pdf.mjs           # cần playwright; máy nhà không có Chromium của Playwright → dùng Chrome (channel "chrome") với playwright-core
```
Máy nhà giám đốc (Windows): node ở `D:\Asahi-CI\tools\node24\node.exe`, git ở `%LOCALAPPDATA%\PortableGit\cmd\git.exe`, python ở `%LOCALAPPDATA%\Programs\Python\Python311`. Repo website trên máy: `D:\DU_LIEU_GOC\03_CHUNG\GITHUB\yume-spa-website` (`core.autocrlf=false`). Bản sao repo ops trên máy (`D:\DU_LIEU_GOC\03_CHUNG\GITHUB\asahi-vietlife-ai-ops`) **đang hỏng nhánh** – commit qua bản clone mới.
Soát: `python yume/tools/site_audit.py --facts yume/facts.yaml --site <repo website>` (repo ops; cần PyYAML, `PYTHONUTF8=1`, node trên PATH). Hiện: 0 từ cấm, 10/10 Google, 1 chỗ chờ chủ (địa chỉ).
Commit tiếng Việt, push thẳng `main`.

## 6. Quy tắc bắt buộc
1. **Từ cấm** (薬機法, 景品表示法, あん摩マッサージ指圧師法): 治療・治す・改善・医療・マッサージ・美白・小顔・アンチエイジング・若返り・肩こり解消・発毛・デトックス・必ず・No.1 và bản VI/EN. Dịch vụ da mặt chỉ viết dạng chăm sóc/hỗ trợ. Câu bắt buộc: 「当店はリラクゼーションと美容を目的としたサロンです。医療行為は行いません。」 Đủ: `legal/forbidden-words.md` (repo ops).
2. Không gạch giá / "通常価格→" cho ưu đãi khai trương.
3. Không đưa phần nội bộ của tệp menu lên web hay Square.
4. **Ảnh:** không lấy ảnh tiệm khác hay ảnh mạng không giấy phép – **kể cả khi được bảo "đừng quan tâm giấy phép"** (giám đốc từng yêu cầu ngày 27/11; đã từ chối, đề xuất ảnh tự chụp hoặc ảnh mua bản quyền). Ảnh AI luôn ghi イメージ.
5. Ngôn ngữ phục vụ: 日本語・ベトナム語（英語は翻訳ツールでご案内）.
6. Head spa, Paragel: chỉ 準備中, không nhận lịch.
7. Không lưu dữ liệu khách, mật khẩu, mã OTP, số tiền nội bộ trong repo hay gửi ChatGPT. Đăng nhập, OTP, CAPTCHA, eKYC: để giám đốc làm.
8. Không nâng gói trả phí, không nhập thẻ/ngân hàng, không bật thu tiền trước hay phí hủy.
9. Logo không có dòng "NAILS · LASHES · SKINCARE".

## 7. Tài liệu liên quan
- Repo này: `README.md`, `ANH-CAN-CHUP.md`, `AGENTS.md`.
- Repo ops: `CLAUDE.md` (mục Yume), `yume/facts.yaml`, `yume/facts-proposals.md`, `reports/2026-11-28-yume-square-google-website.md`, `legal/forbidden-words.md`.
- Trên máy giám đốc: `Downloads\YumeSpa Menu.docx` (giá gốc), `Downloads\Yume-Spa-anh-Google` (logo, ảnh bìa, mẫu câu hỏi USEN cũ), `Downloads\Yume-Spa-bao-cao`.
