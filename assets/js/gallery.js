/* Ảnh gallery. Bỏ file vào assets/img/gallery/ rồi thêm 1 dòng {src, alt}.
   Mảng rỗng = hiện ô trống "Ảnh đang cập nhật". slots = số ô hiển thị tối thiểu mỗi nhóm.
   Khuyến nghị: ảnh 1200×1500 (dọc 4:5), WebP/JPG ≤ 250KB. Ảnh khách: chỉ khi khách đồng ý. */
window.YUME_GALLERY = {
  slots: 3,
  space:  [ /* {src: "assets/img/gallery/space-01.jpg", alt: "受付と待合スペース"} */ ],
  nails:  [ /* {src: "assets/img/gallery/nail-01.jpg", alt: "ワンカラー ベージュ"} */ ],
  guests: [ /* {src: "assets/img/gallery/guest-01.jpg", alt: "施術中の様子"} */ ]
};
