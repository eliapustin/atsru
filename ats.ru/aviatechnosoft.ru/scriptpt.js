document.addEventListener('DOMContentLoaded', function() {
    // ==========================================
    // 1. ЛОГИКА ДЛЯ ГАМБУРГЕР-МЕНЮ
    // ==========================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        document.querySelectorAll('.nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }

    // ==========================================
    // 2. ЛОГИКА ДЛЯ СЛАЙДЕРА ТОВАРА
    // ==========================================
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const dots = document.querySelectorAll('.dot');
    
    let currentSlide = 0;

    function updateSlider() {
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        if(slides[currentSlide]) {
            slides[currentSlide].classList.add('active');
            dots[currentSlide].classList.add('active');
        }
    }

    if (prevBtn && nextBtn && slides.length > 0) {
        nextBtn.addEventListener('click', () => {
            currentSlide = (currentSlide + 1) % slides.length;
            updateSlider();
        });

        prevBtn.addEventListener('click', () => {
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            updateSlider();
        });

        dots.forEach(dot => {
            dot.addEventListener('click', (e) => {
                currentSlide = parseInt(e.target.dataset.index);
                updateSlider();
            });
        });
    }

    // ==========================================
    // 3. ЛОГИКА ДЛЯ ВКЛАДОК (ТАБЫ)
    // ==========================================
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            tabPanes.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const tabId = btn.dataset.tab;
            document.getElementById(tabId).classList.add('active');
        });
    });

    // ==========================================
    // 4. ЛОГИКА ДЛЯ ФОРМЫ ЗАКАЗА ТОВАРА
    // ==========================================
    const orderBtn = document.getElementById('order-btn');
    const productFormContainer = document.getElementById('product-form-container');

    if (orderBtn && productFormContainer) {
        orderBtn.addEventListener('click', () => {
            if (productFormContainer.style.display === 'none') {
                productFormContainer.style.display = 'block';
                orderBtn.textContent = 'Свернуть форму';
                productFormContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                productFormContainer.style.display = 'none';
                orderBtn.textContent = 'Заказать';
            }
        });
    }

    // ==========================================
    // 5. ЛОГИКА ОТПРАВКИ ФОРМ
    // ==========================================
    
    // --- ВАШИ ДАННЫЕ TELEGRAM ---
    const BOT_TOKEN = 'YOUR_BOT_TOKEN';
    const CHAT_ID = 'YOUR_CHAT_ID';

    function handleFormSubmit(formId, nameId, phoneId, messageId, statusId, isProductForm = false) {
        const form = document.getElementById(formId);
        if (!form) return;

        const phoneInput = document.getElementById(phoneId);
        
        if(phoneInput) {
            phoneInput.addEventListener('input', () => {
                phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
            });
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById(nameId).value;
            const phone = phoneInput ? phoneInput.value : '';
            const message = document.getElementById(messageId).value;
            const statusDiv = document.getElementById(statusId);

            if (phone.length < 10) {
                statusDiv.textContent = 'Введите корректный номер телефона.';
                statusDiv.style.color = 'red';
                return;
            }

            if (name.length > 50 || message.length > 500) {
                statusDiv.textContent = 'Превышен лимит символов.';
                statusDiv.style.color = 'red';
                return;
            }
            
            statusDiv.textContent = 'Отправка...';
            statusDiv.style.color = '#384766';

            let text = `<b>${isProductForm ? 'Новый ЗАКАЗ ТОВАРА!' : 'Новая заявка с сайта!'}</b>\n\n`;
            text += `<b>Имя:</b> ${name}\n`;
            text += `<b>Телефон:</b> ${phone}\n`;
            if(isProductForm) text += `<b>Товар:</b> Учебный тренажер БПЛА\n`;
            text += `<b>Сообщение:</b>\n${message}`;

            const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
            
            const params = {
                chat_id: CHAT_ID,
                text: text,
                parse_mode: 'HTML',
            };

            fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(params),
            }) 
            .then(response => response.json())
            .then(data => {
                if (data.ok) {
                    statusDiv.textContent = 'Спасибо! Заявка отправлена.';
                    statusDiv.style.color = 'green';
                    form.reset(); 
                    if(isProductForm) {
                        setTimeout(() => {
                            productFormContainer.style.display = 'none';
                            orderBtn.textContent = 'Заказать';
                        }, 3000);
                    }
                } else {
                    throw new Error(data.description);
                }
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                statusDiv.textContent = 'Ошибка отправки. Попробуйте позже.';
                statusDiv.style.color = 'red';
            });
        });
    }

    // Инициализация Главной формы
    handleFormSubmit('feedback-form', 'name', 'phone', 'message', 'form-status', false);

    // Инициализация Формы товара
    handleFormSubmit('product-order-form', 'p-name', 'p-phone', 'p-message', 'p-form-status', true);
});