document.addEventListener('DOMContentLoaded', () => {
    const modalPostForm = document.getElementById('modalPostForm');
    const postsList = document.getElementById('postsList');
    const filterButtons = document.querySelectorAll('.filter-btn');
    const modalTitleInput = document.getElementById('modalTitleInput');
    const modalDescriptionInput = document.getElementById('modalDescriptionInput');
    const modalPriceInput = document.getElementById('modalPriceInput');
    const modalPhoneInput = document.getElementById('modalPhoneInput');
    const modalCategoryInput = document.getElementById('modalCategoryInput');
    const modalImageInput = document.getElementById('modalImageInput');
    const postModal = new bootstrap.Modal(document.getElementById('postModal'));
    const posts = []; // مصفوفة لتخزين المنشورات


    
    // عرض المنشورات
    const renderPosts = (filter = 'all') => {
        postsList.innerHTML = '';
        const filteredPosts = posts.filter(post => filter === 'all' || post.category === filter);
        filteredPosts.forEach((post) => {
            const postElement = document.createElement('div');
            postElement.className = 'post-card card shadow-sm mb-3';
            postElement.innerHTML = `
                <div class="row g-0">
                <div class="col-md-4">
                <img src="${post.image}" alt="${post.title}"  class="img-fluid rounded-start">
               <div class="heart position-absolute">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
                   path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143q.09.083.176.171a3 3 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15"/>
                </svg>
               </div>
                </div>
                <div class="col-md-8">
                <div class="card-body">
                
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${post.description}</p>
                    <p class="text-primary">رقم الهاتف: ${post.phoneNumber}</p>
                  <p class="font-weight-bold text-right">السعر: ${post.price} دينار</p>

                </div>
                  </div>
        </div>
            `;
            postsList.appendChild(postElement);
        });
    };

   




    // إضافة منشور جديد
    modalPostForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const imageFile = modalImageInput.files[0];
        const reader = new FileReader();
        reader.onload = (event) => {
            const newPost = {
                title: modalTitleInput.value,
                description: modalDescriptionInput.value,
                price: modalPriceInput.value,
                phoneNumber: modalPhoneInput.value,
                category: modalCategoryInput.value,
                image: event.target.result
            };
            posts.push(newPost);
            renderPosts();
            modalPostForm.reset();
            postModal.hide();
        };
        reader.readAsDataURL(imageFile);
    });

    // تطبيق الفلاتر
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            renderPosts(e.target.getAttribute('data-filter'));
        });
    });

     // عرض المنشورات عند تحميل الصفحة
});
