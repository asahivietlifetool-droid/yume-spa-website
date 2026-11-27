/* Yume Spa – menu đầy đủ (bản nhân viên làm "Yume Spa 新料金メニュー案", giám đốc duyệt đưa lên web 26/11/2026).
   Một nguồn cho: trang menu/ (3 ngôn ngữ), bảng giá trang chủ, PDF in.
   Giá đã gồm thuế, vẫn là giá dự kiến cho đến khi khai trương.
   KHÔNG đưa lên web hai phần nội bộ của tệp gốc: "経営方針・導入前の確認" và "料金比較・変更点（社内検討用）".
   Ưu đãi khai trương: chỉ ghi giá ưu đãi và điều kiện, KHÔNG gạch giá thường (二重価格表示).
   Sửa xong chạy: node tools/build.mjs  rồi  NODE_PATH=$(npm root -g) node tools/menu-pdf.mjs
   Ảnh: assets/img/menu/*.webp là ảnh minh họa do AI tạo (Canva), luôn ghi "イメージ".
*/
window.YUME_MENU = {
  cats: [
    {
      id: "hand", no: "01", en: "HAND NAIL", time: true,
      t: { ja: "ハンドネイル", vi: "Nail tay", en: "Hand nails" },
      note: { ja: "基本の甘皮ケア・爪の形整え込み。", vi: "Đã gồm chăm sóc da quanh móng và tạo dáng móng cơ bản.", en: "Basic cuticle care and nail shaping included." },
      photos: [
        ["clear", { ja: "クリアジェル", vi: "Gel trong", en: "Clear gel" }],
        ["one", { ja: "ワンカラー", vi: "Gel một màu", en: "One colour" }],
        ["glitter", { ja: "ラメグラデーション", vi: "Ombre nhũ", en: "Glitter gradient" }],
        ["magnet", { ja: "マグネット", vi: "Mắt mèo", en: "Magnet" }],
        ["mirror", { ja: "オーロラ", vi: "Aurora", en: "Aurora" }],
        ["gradient", { ja: "カラーグラデーション", vi: "Ombre màu", en: "Colour gradient" }],
        ["french", { ja: "フレンチ", vi: "French", en: "French" }],
        ["mens", { ja: "メンズ", vi: "Nail nam", en: "Men's" }]
      ],
      items: [
        { n: { ja: "クリアジェル", vi: "Gel trong", en: "Clear gel" }, min: 45, price: 4400 },
        { n: { ja: "ワンカラー", vi: "Gel một màu", en: "One colour" }, min: 60, price: 5500 },
        { n: { ja: "ラメグラデーション", vi: "Ombre nhũ", en: "Glitter gradient" }, min: 60, price: 5500 },
        { n: { ja: "マグネット・フラッシュ", vi: "Mắt mèo · flash", en: "Magnet · flash" }, min: 70, price: 6050 },
        { n: { ja: "ミラー・オーロラ", vi: "Tráng gương · aurora", en: "Mirror · aurora" }, min: 70, price: 6600 },
        { n: { ja: "カラーグラデーション", vi: "Ombre màu", en: "Colour gradient" }, min: 75, price: 6600 },
        { n: { ja: "フレンチ", vi: "French", en: "French" }, min: 75, price: 7150 },
        { n: { ja: "メンズジェルネイル", vi: "Gel cho nam", en: "Men's gel nails" }, min: 60, price: 5500 }
      ]
    },
    {
      id: "fixed", no: "02", en: "FIXED DESIGN", time: true,
      t: { ja: "定額デザイン", vi: "Gel mẫu cố định", en: "Set designs" },
      note: { ja: "店内サンプルから選択。カラー変更無料、規定外パーツは別料金。", vi: "Chọn từ bảng mẫu tại tiệm. Đổi màu miễn phí; đá, phụ kiện ngoài mẫu tính thêm.", en: "Choose from our in-salon samples. Colour changes are free; parts outside the sample are extra." },
      photos: [
        ["simple", { ja: "Simple", vi: "Simple", en: "Simple" }],
        ["trend", { ja: "Trend", vi: "Trend", en: "Trend" }],
        ["premium", { ja: "Premium", vi: "Premium", en: "Premium" }]
      ],
      items: [
        { n: { ja: "Simple", vi: "Simple", en: "Simple" }, d: { ja: "アート2本程度／オフィス・上品なデザイン", vi: "Khoảng 2 móng vẽ; nhẹ nhàng, hợp đi làm", en: "About 2 art nails; understated, office-friendly" }, min: 75, price: 6600 },
        { n: { ja: "Trend", vi: "Trend", en: "Trend" }, d: { ja: "アート4〜6本程度／韓国ネイル・季節限定", vi: "Khoảng 4–6 móng vẽ; kiểu Hàn, mẫu theo mùa", en: "About 4–6 art nails; Korean style, seasonal" }, min: 90, price: 7700, star: true },
        { n: { ja: "Premium", vi: "Premium", en: "Premium" }, d: { ja: "アート6〜10本程度／ブライダル・ワンホン", vi: "Khoảng 6–10 móng vẽ; cô dâu, kiểu wanghong", en: "About 6–10 art nails; bridal, wanghong style" }, min: 120, price: 9900 }
      ]
    },
    {
      id: "custom", no: "03", en: "CUSTOM ART", time: true,
      t: { ja: "持ち込みデザイン", vi: "Mẫu theo ảnh bạn mang đến", en: "Bring your own design" },
      note: { ja: "特殊アート・大型パーツ・3Dアートは事前見積もり。", vi: "Vẽ đặc biệt, phụ kiện lớn, vẽ 3D: báo giá trước khi làm.", en: "Special art, large parts and 3D art are quoted before we start." },
      photos: [["custom", { ja: "持ち込みデザイン", vi: "Mẫu riêng", en: "Custom art" }]],
      items: [
        { n: { ja: "アート2本", vi: "Vẽ 2 móng", en: "Art on 2 nails" }, min: 75, price: 6600, from: true },
        { n: { ja: "アート4本", vi: "Vẽ 4 móng", en: "Art on 4 nails" }, min: 90, price: 7700, from: true },
        { n: { ja: "アート6本", vi: "Vẽ 6 móng", en: "Art on 6 nails" }, min: 105, price: 8800, from: true },
        { n: { ja: "アート10本", vi: "Vẽ 10 móng", en: "Art on 10 nails" }, min: 120, price: 11000, from: true },
        { n: { ja: "プレミアムアート", vi: "Vẽ cao cấp", en: "Premium art" }, min: 150, price: 13200, from: true }
      ]
    },
    {
      id: "tips", no: "04", en: "GEL TIP EXTENSIONS", time: true,
      t: { ja: "チップ長さ出し", vi: "Nối móng (gel tip)", en: "Gel tip extensions" },
      note: { ja: "標準Mサイズのチップ10本込み。長さ出し料金の重複請求なし。", vi: "Đã gồm 10 móng tip cỡ M tiêu chuẩn; không tính phí nối hai lần.", en: "Includes 10 standard M-size tips; the extension fee is never charged twice." },
      photos: [["tips", { ja: "長さ出し", vi: "Nối móng", en: "Extensions" }]],
      items: [
        { n: { ja: "ワンカラー・ラメグラ", vi: "Một màu · ombre nhũ", en: "One colour · glitter gradient" }, min: 120, price: 11000 },
        { n: { ja: "マグネット・フラッシュ", vi: "Mắt mèo · flash", en: "Magnet · flash" }, min: 130, price: 11550 },
        { n: { ja: "カラーグラデーション", vi: "Ombre màu", en: "Colour gradient" }, min: 135, price: 12100 },
        { n: { ja: "フレンチ", vi: "French", en: "French" }, min: 135, price: 12650 },
        { n: { ja: "定額 Simple", vi: "Mẫu cố định Simple", en: "Set design Simple" }, min: 135, price: 12100 },
        { n: { ja: "定額 Trend", vi: "Mẫu cố định Trend", en: "Set design Trend" }, min: 150, price: 13200 },
        { n: { ja: "アート6本", vi: "Vẽ 6 móng", en: "Art on 6 nails" }, min: 165, price: 14300, from: true },
        { n: { ja: "フルアート", vi: "Vẽ toàn bộ", en: "Full art" }, min: 180, price: 16500, from: true }
      ]
    },
    {
      id: "foot", no: "05", en: "FOOT NAIL", time: true,
      t: { ja: "フットネイル", vi: "Nail chân", en: "Foot nails" },
      photos: [
        ["foot", { ja: "フットワンカラー", vi: "Gel chân một màu", en: "Foot one colour" }],
        ["foot-art", { ja: "親指アート", vi: "Vẽ móng cái", en: "Big-toe art" }]
      ],
      items: [
        { n: { ja: "フットワンカラー", vi: "Gel chân một màu", en: "Foot, one colour" }, min: 60, price: 6600 },
        { n: { ja: "ラメグラデーション", vi: "Ombre nhũ", en: "Glitter gradient" }, min: 60, price: 6600 },
        { n: { ja: "マグネット・フラッシュ", vi: "Mắt mèo · flash", en: "Magnet · flash" }, min: 75, price: 7700 },
        { n: { ja: "親指2本アート", vi: "Vẽ 2 móng cái", en: "Art on both big toes" }, min: 75, price: 7700 },
        { n: { ja: "定額デザイン", vi: "Mẫu cố định", en: "Set design" }, min: 90, price: 8800 },
        { n: { ja: "フルアート", vi: "Vẽ toàn bộ", en: "Full art" }, min: 120, price: 9900, from: true },
        { n: { ja: "フットケア（ジェルなし）", vi: "Chăm sóc móng chân (không sơn gel)", en: "Foot care (no gel)" }, min: 45, price: 4400 },
        { n: { ja: "足裏角質ケア", vi: "Chăm sóc da chai lòng bàn chân", en: "Sole callus care" }, min: 30, price: 3300 },
        { n: { ja: "ワンカラー＋角質ケア", vi: "Gel một màu + chăm sóc da chai", en: "One colour + callus care" }, min: 90, price: 8800 }
      ]
    },
    {
      id: "care", no: "06", en: "NAIL CARE", time: false,
      t: { ja: "ネイルケア", vi: "Chăm sóc móng", en: "Nail care" },
      photos: [["care", { ja: "ネイルケア", vi: "Chăm sóc móng", en: "Nail care" }]],
      items: [
        { n: { ja: "爪の長さ・形整え", vi: "Cắt và tạo dáng móng", en: "Length and shape" }, price: 1100 },
        { n: { ja: "甘皮ケア", vi: "Chăm sóc da quanh móng", en: "Cuticle care" }, price: 2200 },
        { n: { ja: "ハンドネイルケアセット", vi: "Gói chăm sóc móng tay", en: "Hand nail care set" }, price: 3300 },
        { n: { ja: "メンズネイルケア", vi: "Chăm sóc móng cho nam", en: "Men's nail care" }, price: 3300 },
        { n: { ja: "オフ後のネイルケア追加", vi: "Thêm chăm sóc móng sau khi tháo gel", en: "Nail care after removal (add-on)" }, price: 1650 },
        { n: { ja: "保湿ハンドパック", vi: "Ủ ẩm tay", en: "Moisturising hand pack" }, price: 550 },
        { n: { ja: "保湿フットパック", vi: "Ủ ẩm chân", en: "Moisturising foot pack" }, price: 880 }
      ]
    },
    {
      id: "addon", no: "07", en: "ADD-ONS", time: false, compact: true,
      t: { ja: "オプション", vi: "Tùy chọn thêm", en: "Add-ons" },
      items: [
        { n: { ja: "カラー1色追加", vi: "Thêm 1 màu", en: "Extra colour" }, price: 330 },
        { n: { ja: "ラメ追加（1本）", vi: "Thêm nhũ (1 móng)", en: "Glitter (per nail)" }, price: 220 },
        { n: { ja: "マグネット追加（1本）", vi: "Thêm mắt mèo (1 móng)", en: "Magnet (per nail)" }, price: 220 },
        { n: { ja: "ミラー・オーロラ追加（1本）", vi: "Thêm tráng gương · aurora (1 móng)", en: "Mirror · aurora (per nail)" }, price: 330 },
        { n: { ja: "ベースカラー追加", vi: "Thêm màu nền", en: "Base colour" }, price: 1100 },
        { n: { ja: "小ストーン・パーツ（1個）", vi: "Đá, phụ kiện nhỏ (1 cái)", en: "Small stone or part (each)" }, price: 110, from: true },
        { n: { ja: "大型パーツ（1個）", vi: "Phụ kiện lớn (1 cái)", en: "Large part (each)" }, price: 550, from: true },
        { n: { ja: "3Dアート（1本）", vi: "Vẽ 3D (1 móng)", en: "3D art (per nail)" }, price: 880, from: true },
        { n: { ja: "亀裂補修（1本）", vi: "Sửa móng nứt (1 móng)", en: "Crack repair (per nail)" }, price: 550 },
        { n: { ja: "長さ出し（1本）", vi: "Nối 1 móng", en: "Extension (per nail)" }, price: 770 },
        { n: { ja: "長さ出し（10本・施術に追加）", vi: "Nối 10 móng (thêm vào dịch vụ)", en: "Extensions, 10 nails (added to a service)" }, price: 5500 },
        { n: { ja: "Lサイズ追加（10本）", vi: "Tip cỡ L (10 móng)", en: "L-size tips (10 nails)" }, price: 1100 },
        { n: { ja: "XLサイズ追加（10本）", vi: "Tip cỡ XL (10 móng)", en: "XL-size tips (10 nails)" }, price: 1650 },
        { n: { ja: "2XLサイズ追加（10本）", vi: "Tip cỡ 2XL (10 móng)", en: "2XL-size tips (10 nails)" }, price: 2200 },
        { n: { ja: "3XLサイズ追加（10本）", vi: "Tip cỡ 3XL (10 móng)", en: "3XL-size tips (10 nails)" }, price: 3300 },
        { n: { ja: "5XLサイズ追加（10本）", vi: "Tip cỡ 5XL (10 móng)", en: "5XL-size tips (10 nails)" }, price: 4400 },
        { n: { ja: "パラジェル変更（導入後）", vi: "Đổi sang Paragel (khi tiệm có)", en: "Switch to Paragel (once available)" }, price: 1100 }
      ]
    },
    {
      id: "off", no: "08", en: "GEL REMOVAL", time: false,
      t: { ja: "付け替えオフ", vi: "Tháo gel khi làm bộ mới", en: "Removal with a new set" },
      items: [
        { n: { ja: "ご新規様ソフトジェル付替オフ", vi: "Khách mới: tháo gel mềm khi làm bộ mới", en: "First visit: soft gel removal with a new set" }, free: true },
        { n: { ja: "自店ハンドオフ（4週間以内）", vi: "Tháo gel tay làm tại Yume (trong 4 tuần)", en: "Yume hand gel (within 4 weeks)" }, free: true },
        { n: { ja: "自店ハンドオフ（4週間超）", vi: "Tháo gel tay làm tại Yume (sau 4 tuần)", en: "Yume hand gel (after 4 weeks)" }, price: 1100 },
        { n: { ja: "他店ソフトジェル付替オフ", vi: "Tháo gel mềm của tiệm khác", en: "Soft gel from another salon" }, price: 1650 },
        { n: { ja: "チップ長さ出し付替オフ", vi: "Tháo móng nối tip", en: "Tip extensions" }, price: 2200 },
        { n: { ja: "ハードジェル・スカルプ付替オフ", vi: "Tháo gel cứng, móng đắp", en: "Hard gel or sculpted nails" }, price: 3300 },
        { n: { ja: "自店フット付替オフ（6週間以内）", vi: "Tháo gel chân làm tại Yume (trong 6 tuần)", en: "Yume foot gel (within 6 weeks)" }, free: true },
        { n: { ja: "自店フット付替オフ（6週間超）", vi: "Tháo gel chân làm tại Yume (sau 6 tuần)", en: "Yume foot gel (after 6 weeks)" }, price: 1100 },
        { n: { ja: "他店フット付替オフ", vi: "Tháo gel chân của tiệm khác", en: "Foot gel from another salon" }, price: 1650 },
        { n: { ja: "大型パーツ・埋め尽くしオフ（1本）", vi: "Tháo phụ kiện lớn, móng đính kín (1 móng)", en: "Large parts or fully covered nail (per nail)" }, price: 330, from: true }
      ]
    },
    {
      id: "offonly", no: "09", en: "REMOVAL ONLY", time: false,
      t: { ja: "オフのみ", vi: "Chỉ tháo gel", en: "Removal only" },
      items: [
        { n: { ja: "自店ソフトジェル", vi: "Gel mềm làm tại Yume", en: "Soft gel done at Yume" }, price: 2750 },
        { n: { ja: "他店ソフトジェル", vi: "Gel mềm của tiệm khác", en: "Soft gel from another salon" }, price: 3850 },
        { n: { ja: "自店チップ長さ出し", vi: "Móng nối tip làm tại Yume", en: "Tip extensions done at Yume" }, price: 3850 },
        { n: { ja: "他店チップ長さ出し", vi: "Móng nối tip của tiệm khác", en: "Tip extensions from another salon" }, price: 4400 },
        { n: { ja: "ハードジェル・スカルプ", vi: "Gel cứng, móng đắp", en: "Hard gel or sculpted nails" }, price: 4400, from: true },
        { n: { ja: "自店フットオフ", vi: "Gel chân làm tại Yume", en: "Foot gel done at Yume" }, price: 3300 },
        { n: { ja: "他店フットオフ", vi: "Gel chân của tiệm khác", en: "Foot gel from another salon" }, price: 4400 }
      ]
    },
    {
      id: "facial", no: "10", en: "FACIAL CARE", time: true,
      t: { ja: "フェイシャル", vi: "Chăm sóc da mặt", en: "Facial care" },
      // Giám đốc 2026-11-28: da mặt không ghi giá trên web, báo giá tại quán (giá gốc trong YumeSpa Menu.docx: 5,500 / 7,700 / 8,800 / 11,000).
      note: { ja: "料金はご来店時にご希望をお伺いしてからご案内します。施術の前に内容と料金を必ずお伝えし、ご了承いただいてから始めます。当店はリラクゼーションと美容を目的としたサロンです。医療行為は行いません。", vi: "Giá được báo tại quán sau khi hỏi mong muốn của bạn. Trước khi làm, chúng tôi luôn báo rõ nội dung và giá, bạn đồng ý rồi mới bắt đầu. Yume Beauty Spa & Nail là salon thư giãn và làm đẹp, không thực hiện các hoạt động y tế.", en: "Prices are given at the salon after we hear what you would like. Before we start, we always tell you the content and price and begin only once you agree. Yume Beauty Spa & Nail is a relaxation and beauty salon. We do not provide medical treatment." },
      photos: [["facial", { ja: "フェイシャル", vi: "Da mặt", en: "Facial" }]],
      items: [
        { n: { ja: "ベーシック保湿フェイシャル", vi: "Facial dưỡng ẩm cơ bản", en: "Basic moisturising facial" }, min: 40, ask: true },
        { n: { ja: "うるおいマスクコース", vi: "Facial mặt nạ dưỡng ẩm", en: "Hydrating mask course" }, min: 60, ask: true },
        { n: { ja: "毛穴クレンジングコース", vi: "Facial làm sạch lỗ chân lông", en: "Pore cleansing course" }, min: 60, ask: true },
        { n: { ja: "プレミアムフェイシャル", vi: "Facial cao cấp", en: "Premium facial" }, min: 90, ask: true },
        { n: { ja: "ヘッドスパ", vi: "Head spa", en: "Head spa" }, soon: true }
      ]
    }
  ],

  sets: {
    no: "11", en: "SET MENU",
    t: { ja: "Yume Beauty Spa & Nail 限定セットメニュー", vi: "Combo riêng của Yume Beauty Spa & Nail", en: "Yume Beauty Spa & Nail set menus" },
    note: { ja: "ネイルと美容ケアを組み合わせたセットです。", vi: "Combo kết hợp nail và chăm sóc làm đẹp.", en: "Sets that combine nails and beauty care." },
    items: [
      { n: { ja: "Hand & Foot Set", vi: "Hand & Foot Set", en: "Hand & Foot Set" }, d: { ja: "ハンド＋フット ワンカラー", vi: "Gel một màu tay + chân", en: "Hand and foot, one colour" }, sum: 12100, price: 11000 },
      { n: { ja: "Beauty Set", vi: "Beauty Set", en: "Beauty Set" }, d: { ja: "ハンドワンカラー＋ベーシックフェイシャル", vi: "Gel tay một màu + facial dưỡng ẩm cơ bản", en: "Hand one colour + basic moisturising facial" }, ask: true },
      { n: { ja: "Luxury Set", vi: "Luxury Set", en: "Luxury Set" }, d: { ja: "定額Trend＋うるおいフェイシャル", vi: "Mẫu cố định Trend + facial mặt nạ dưỡng ẩm", en: "Set design Trend + hydrating mask facial" }, ask: true },
      { n: { ja: "Yume Special Set", vi: "Yume Special Set", en: "Yume Special Set" }, d: { ja: "ハンド＋フット ワンカラー＋ベーシックフェイシャル", vi: "Gel một màu tay + chân + facial dưỡng ẩm cơ bản", en: "Hand and foot one colour + basic moisturising facial" }, ask: true }
    ]
  },

  // Ưu đãi khai trương (tệp gốc: "オープン記念限定価格"). Chỉ ghi giá ưu đãi + điều kiện.
  opening: {
    en: "GRAND OPENING",
    t: { ja: "オープン記念 初回限定クーポン", vi: "Ưu đãi khai trương cho lần đầu", en: "Grand opening offers for first visits" },
    cond: {
      ja: "ご新規様のみ・お一人様1回・他の割引との併用不可・税込。ご新規様のソフトジェル付替オフは無料です。期間はオープン記念期間中（終了日はこのページでお知らせします）。",
      vi: "Chỉ cho khách lần đầu, mỗi người 1 lần, không áp dụng cùng ưu đãi khác, giá đã gồm thuế. Khách mới được tháo gel mềm miễn phí khi làm bộ mới. Áp dụng trong thời gian khai trương (ngày kết thúc sẽ báo trên trang này).",
      en: "First visits only, once per person, cannot be combined with other offers, tax included. Soft gel removal is free for first-time guests getting a new set. Valid during our opening period (end date will be posted on this page)."
    },
    items: [
      { n: { ja: "ワンカラー・ラメグラ", vi: "Gel một màu · ombre nhũ", en: "One colour · glitter gradient" }, price: 4500 },
      { n: { ja: "マグネット・フラッシュ", vi: "Mắt mèo · flash", en: "Magnet · flash" }, price: 4980 },
      { n: { ja: "定額 Simple", vi: "Mẫu cố định Simple", en: "Set design Simple" }, price: 5500 },
      { n: { ja: "定額 Trend", vi: "Mẫu cố định Trend", en: "Set design Trend" }, price: 6600 },
      { n: { ja: "長さ出し10本＋ワンカラー", vi: "Nối 10 móng + gel một màu", en: "10 extensions + one colour" }, price: 9900 },
      { n: { ja: "フットワンカラー", vi: "Gel chân một màu", en: "Foot, one colour" }, price: 5500 }
    ]
  },

  ui: {
    ja: { title: "メニュー・料金", lead: "表示価格はすべて税込・オープン時の予定価格です。施術時間は目安です。", time: "時間目安", price: "料金", min: "分", from: "〜", free: "無料", soon: "準備中", ask: "店頭でご案内", sum: "単品合計", setp: "セット料金", coupon: "初回限定", star: "看板メニュー", photo: "写真はすべてイメージです（実際の施術写真ではありません）。デザインはサンプルからお選びいただけます。", toc: "目次" },
    vi: { title: "Bảng giá", lead: "Giá đã gồm thuế, là giá dự kiến khi khai trương. Thời gian chỉ là ước tính.", time: "Thời gian", price: "Giá", min: " phút", from: "từ ", free: "Miễn phí", soon: "Đang chuẩn bị", ask: "Tư vấn tại quán", sum: "Tổng giá lẻ", setp: "Giá combo", coupon: "Lần đầu", star: "Mẫu nổi bật", photo: "Tất cả là ảnh minh họa, không phải ảnh làm tại tiệm. Mẫu thật bạn chọn trong bảng mẫu tại tiệm.", toc: "Mục lục" },
    en: { title: "Menu & prices", lead: "All prices include tax and are planned opening prices. Times are approximate.", time: "Time", price: "Price", min: " min", from: "from ", free: "Free", soon: "Coming soon", ask: "Ask at the salon", sum: "Separately", setp: "Set price", coupon: "First visit", star: "Signature", photo: "All photos are illustrations, not photos of our work. Choose your design from our in-salon samples.", toc: "Contents" }
  }
};
