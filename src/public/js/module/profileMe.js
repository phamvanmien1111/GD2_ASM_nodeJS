// document.addEventListener("DOMContentLoaded", () => {
//     const isLoggedIn = sessionStorage.getItem("isLoggedIn") === "true";
//     console.log("🔹 Trạng thái đăng nhập:", isLoggedIn);

//     const openModalBtn = document.getElementById("openModalBtn");
//     const closeModalBtn = document.getElementById("closeModalBtn");
//     const modal = document.getElementById("modal");
//     const updateForm = document.getElementById("updateForm");

//     const inputName = document.getElementById("inputName");
//     const inputEmail = document.getElementById("inputEmail");
//     const inputPhone = document.getElementById("inputPhone");
//     const inputAddress = document.getElementById("inputAddress");

//     // 🟢 Khi mở modal, fetch dữ liệu user và hiển thị modal
//     openModalBtn?.addEventListener("click", async () => {
//         console.log("🟢 Đang mở modal...");
        
//         try {
//             const response = await fetch("http://localhost:3000/profileMe");
//             const data = await response.json();

//             console.log("🟢 Dữ liệu từ API:", data); // Kiểm tra dữ liệu trả về

//             if (response.ok && data.user) {
//                 // 🔄 Cập nhật dữ liệu vào modal
//                 inputName.value = data.user.Username || "";
//                 inputEmail.value = data.user.Email || "";
//                 inputPhone.value = data.user.Phone || "";
//                 inputAddress.value = data.user.Location || "Chưa cập nhật";

//                 // Hiển thị modal
//                 modal.classList.remove("hidden", "opacity-0");
//                 modal.classList.add("flex");
//             } else {
//                 console.error("🛑 Lỗi tải dữ liệu:", data);
//                 alert("Lỗi tải dữ liệu người dùng!");
//             }
//         } catch (error) {
//             console.error("❌ Lỗi khi fetch dữ liệu:", error);
//             alert("Không thể tải thông tin người dùng!");
//         }
//     });

//     // Đóng modal
//     closeModalBtn?.addEventListener("click", () => {
//         console.log("🔴 Đóng modal");
//         modal.classList.add("hidden", "opacity-0");
//         modal.classList.remove("flex");
//     });

//     // 🟢 Cập nhật thông tin người dùng
//     updateForm?.addEventListener("submit", async (e) => {
//         e.preventDefault();
//         console.log("✅ Sự kiện submit được kích hoạt");

//         if (!isLoggedIn) {
//             alert("Bạn cần đăng nhập để chỉnh sửa thông tin.");
//             return;
//         }

//         const updatedProfile = {
//             Username: inputName.value,
//             Email: inputEmail.value,
//             Phone: inputPhone.value,
//             Location: inputAddress.value,
//         };

//         console.log("🔄 Dữ liệu gửi lên:", updatedProfile);

//         try {
//             const response = await fetch("http://localhost:3000/profileMe", {
//                 method: "PUT",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(updatedProfile),
//             });

//             const result = await response.json();
//             if (response.ok) {
//                 alert("✅ Cập nhật thành công!");

//                 // Cập nhật UI ngay lập tức
//                 document.getElementById("name")?.textContent = updatedProfile.Username;
//                 document.getElementById("email")?.textContent = updatedProfile.Email;
//                 document.getElementById("phone")?.textContent = updatedProfile.Phone;
//                 document.getElementById("address")?.textContent = updatedProfile.Location;

//                 // Đóng modal
//                 modal.classList.add("hidden", "opacity-0");
//                 modal.classList.remove("flex");
//             } else {
//                 alert("❌ Cập nhật thất bại: " + result.message);
//             }
//         } catch (error) {
//             console.error("❌ Lỗi cập nhật:", error);
//             alert("Có lỗi xảy ra!");
//         }
//     });
// });


    
// //         // ================= XỬ LÝ CHỈNH SỬA BÀI VIẾT =================
// //         const editIcon = document.getElementById("editIcon");
// //         const editModal = document.getElementById("editModal");
// //         const closeModalBtn1 = document.getElementById("closeModalBtn1");
// //         const editForm = document.getElementById("editForm");
// //         const editContent = document.getElementById("editContent");
// //         const editImage = document.getElementById("editImage");
    
// //         // Mở modal chỉnh sửa bài viết
// //         editIcon?.addEventListener("click", () => {
// //             if (!isLoggedIn) {
// //                 alert("Bạn cần đăng nhập để chỉnh sửa bài viết.");
// //                 return;
// //             }
// //             editModal?.classList.remove("hidden");
// //         });
    
// //         // Đóng modal chỉnh sửa bài viết
// //         closeModalBtn1?.addEventListener("click", () => editModal?.classList.add("hidden"));
    
// //         // Cập nhật bài viết
// //         editForm?.addEventListener("submit", async (e) => {
// //             e.preventDefault();
    
// //             if (!isLoggedIn) {
// //                 alert("Bạn cần đăng nhập để chỉnh sửa bài viết.");
// //                 return;
// //             }
    
// //             const postId = editForm.getAttribute("data-post-id"); // Lấy ID bài viết
// //             const newContent = editContent.value;
// //             const newImage = editImage.files[0];
    
// //             // Chuẩn bị dữ liệu gửi (FormData cho ảnh)
// //             const formData = new FormData();
// //             formData.append("content", newContent);
// //             if (newImage) formData.append("image", newImage);
    
// //             try {
// //                 const response = await fetch(`/updatePost/${postId}`, {
// //                     method: "PUT",
// //                     body: formData,
// //                 });
    
// //                 const result = await response.json();
// //                 if (response.ok) {
// //                     alert("Cập nhật bài viết thành công!");
// //                     location.reload();
// //                 } else {
// //                     alert("Lỗi cập nhật: " + result.message);
// //                 }
// //             } catch (error) {
// //                 console.error("Lỗi cập nhật:", error);
// //                 alert("Có lỗi xảy ra!");
// //             }
// //         });
// //     });
    










// // // // Xử lý bài viết 
// // // const editIcon = document.getElementById('editIcon');
// // // const editModal = document.getElementById('editModal');
// // // const closeModalBtn1 = document.getElementById('closeModalBtn1');
// // // const editForm = document.getElementById('editForm');
// // // const editContent = document.getElementById('editContent');
// // // const editImage = document.getElementById('editImage');

// // // // Xử lý mở modal chỉnh sửa bài viết
// // // editIcon?.addEventListener('click', () => {
// // //     if (!isLoggedIn) {
// // //         alert('Bạn cần đăng nhập để chỉnh sửa bài viết.');
// // //         return;
// // //     }
// // //     editModal?.classList.remove('hidden');
// // // });

// // // // Xử lý đóng modal chỉnh sửa bài viết
// // // closeModalBtn1?.addEventListener('click', () => editModal?.classList.add('hidden'));

// // // // Xử lý cập nhật bài viết
// // // editForm?.addEventListener('submit', (e) => {
// // //     e.preventDefault();
// // //     if (!isLoggedIn) {
// // //         alert('Bạn cần đăng nhập để chỉnh sửa bài viết.');
// // //         return;
// // //     }

// // //     const newContent = editContent.value;
// // //     const newImage = editImage.files[0];

// // //     console.log('Nội dung mới:', newContent);
// // //     console.log('Ảnh mới:', newImage);

// // //     editModal?.classList.add('hidden');
// // // });
