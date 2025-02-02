
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
 
 
 openModalBtn.addEventListener('click', () => {
     modal.classList.remove('hidden');
 });
 
 
 closeModalBtn.addEventListener('click', () => {
     modal.classList.add('hidden');
 });
 
 updateForm.addEventListener('submit', (e) => {
     e.preventDefault(); 
     nameElement.textContent = inputName.value;
     emailElement.textContent = inputEmail.value;
     phoneElement.textContent = inputPhone.value;
     addressElement.textContent = inputAddress.value;
 
     modal.classList.add('hidden');
 });
 // xử lý bài viết 
 // Lấy các phần tử DOM
const editIcon = document.getElementById('editIcon');
const editModal = document.getElementById('editModal');
const closeModalBtn1 = document.getElementById('closeModalBtn1');
const editForm = document.getElementById('editForm');
const editContent = document.getElementById('editContent');
const editImage = document.getElementById('editImage');

// Mở modal khi nhấn vào icon chỉnh sửa
editIcon.addEventListener('click', () => {
    editModal.classList.remove('hidden');
});

// Đóng modal khi nhấn vào nút đóng
closeModalBtn1.addEventListener('click', () => {
    editModal.classList.add('hidden');
});

// Xử lý khi submit form
editForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const newContent = editContent.value;
    const newImage = editImage.files[0];

    console.log('Nội dung mới:', newContent);
    console.log('Ảnh mới:', newImage);
    editModal.classList.add('hidden');
});