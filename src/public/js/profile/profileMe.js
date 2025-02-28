document.getElementById("profileForm").addEventListener("submit", function(event) {
    let username = document.getElementById("Username").value.trim();
    let email = document.getElementById("Email").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let location = document.getElementById("Location").value.trim();
    let isValid = true;

    if (username === "") {
        alert("Tên không được để trống");
        isValid = false;
    }

    if (email === "" || !email.includes("@")) {
        alert("Email không hợp lệ");
        isValid = false;
    }

    if (!/^\d{10,}$/.test(phone)) {
        alert("Số điện thoại phải có ít nhất 10 chữ số và chỉ chứa số");
        isValid = false;
    }

    if (location === "") {
        alert("Địa chỉ không được để trống");
        isValid = false;
    }

    if (!isValid) {
        event.preventDefault(); // Ngăn form gửi nếu có lỗi
    }
});