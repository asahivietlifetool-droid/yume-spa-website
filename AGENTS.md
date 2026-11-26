# Hướng dẫn cho agent (Codex, Claude, ChatGPT và các agent khác)
Đọc `BAN-GIAO-CODEX.md` trước khi làm bất cứ việc gì: ai làm gì, hiện trạng website / Square 予約 / hồ sơ Google, việc đang chặn chờ giám đốc (không làm vượt), lệnh dựng trang và quy tắc bắt buộc (từ cấm, không gạch giá, không ảnh không rõ giấy phép, mỗi ngôn ngữ một trang).
Nguồn giá duy nhất: `YumeSpa Menu.docx` = `assets/js/menu-data.js`. Không tự thêm dịch vụ hay giá.
Không sửa tay các tệp được dựng (`index.html`, `vi/`, `en/`, `menu/`, `sitemap.xml`): sửa nguồn rồi chạy `node tools/build.mjs` và `node tools/build.mjs --check`.
Không bật custom domain trên GitHub Pages trước khi `dig +short yumespaadachi.com` ra đủ 4 IP của GitHub.
Không bật trang đặt lịch Square công khai trước khi có ca làm thật của nhân viên, địa chỉ đúng và 13 kiểm thử đạt.
