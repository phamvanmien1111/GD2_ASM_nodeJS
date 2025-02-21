// Giả định trạng thái đăng nhập (thay đổi khi có hệ thống xác thực)
const isLoggedIn = false; // Thay đổi thành true khi người dùng đăng nhập

// Lấy các phần tử DOM
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const modal = document.getElementById('modal');
const updateForm = document.getElementById('updateForm');

const nameElement = document.getElementById('name');
const emailElement = document.getElementById('email');
const phoneElement = document.getElementById('phone');
const addressElement = document.getElementById('address');

const inputName = document.getElementById('inputName');
const inputEmail = document.getElementById('inputEmail');
const inputPhone = document.getElementById('inputPhone');
const inputAddress = document.getElementById('inputAddress');

// Xử lý mở modal
openModalBtn?.addEventListener('click', () => {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để chỉnh sửa thông tin.');
        return;
    }
    modal?.classList.remove('hidden');
});

// Xử lý đóng modal
closeModalBtn?.addEventListener('click', () => modal?.classList.add('hidden'));

// Xử lý cập nhật thông tin
updateForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    console.log('isLoggedIn:', isLoggedIn); // Kiểm tra giá trị của isLoggedIn

    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để chỉnh sửa thông tin.');
        return;
    }

    nameElement.textContent = inputName.value;
    emailElement.textContent = inputEmail.value;
    phoneElement.textContent = inputPhone.value;
    addressElement.textContent = inputAddress.value;

    modal?.classList.add('hidden');
});


// Xử lý bài viết 
const editIcon = document.getElementById('editIcon');
const editModal = document.getElementById('editModal');
const closeModalBtn1 = document.getElementById('closeModalBtn1');
const editForm = document.getElementById('editForm');
const editContent = document.getElementById('editContent');
const editImage = document.getElementById('editImage');

// Xử lý mở modal chỉnh sửa bài viết
editIcon?.addEventListener('click', () => {
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để chỉnh sửa bài viết.');
        return;
    }
    editModal?.classList.remove('hidden');
});

// Xử lý đóng modal chỉnh sửa bài viết
closeModalBtn1?.addEventListener('click', () => editModal?.classList.add('hidden'));

// Xử lý cập nhật bài viết
editForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
        alert('Bạn cần đăng nhập để chỉnh sửa bài viết.');
        return;
    }

    const newContent = editContent.value;
    const newImage = editImage.files[0];

    console.log('Nội dung mới:', newContent);
    console.log('Ảnh mới:', newImage);

    editModal?.classList.add('hidden');
});
