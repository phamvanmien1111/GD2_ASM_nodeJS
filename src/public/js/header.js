// document.addEventListener("DOMContentLoaded", function () {
//     const userData = document.body.getAttribute("data-user");
//     const user = userData ? JSON.parse(userData) : null;
  
//     function checkLogin() {
//       if (!user) {
//         const confirmLogin = confirm("Bạn chưa đăng nhập. Bạn có muốn chuyển đến trang đăng nhập không?");
//         if (confirmLogin) {
//           window.location.href = "/dangnhap";
//         }
//         return false;
//       }
//       return true;
//     }
  
//     // Hiển thị avatar nếu đăng nhập
//     if (user) {
//       const avatar = document.getElementById("user-avatar");
//       if (avatar) {
//         avatar.src = user.Avatar;
//         avatar.alt = user.Username;
//       }
//     }
  
//     // Gán sự kiện cho thẻ <a>
//     const profileLink = document.querySelector('a[href="/profileMe"]');
//     if (profileLink) {
//       profileLink.addEventListener("click", function (event) {
//         if (!checkLogin()) {
//           event.preventDefault(); // Ngăn chặn điều hướng nếu chưa đăng nhập
//         }
//       });
//     }
//   });
  