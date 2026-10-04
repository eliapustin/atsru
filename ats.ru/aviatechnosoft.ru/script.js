document.addEventListener('DOMContentLoaded', function() {

    // --- Логика для Гамбургер-меню ---
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Закрывать меню при клике на ссылку
    document.querySelectorAll('.nav-list a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu && navMenu.classList.contains('active')) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

  // --- Форма обратной связи ---
    const form = document.getElementById('feedback-form');
    const statusDiv = document.getElementById('form-status');
    const phoneInput = document.getElementById('phone');

    if (phoneInput) {
        phoneInput.addEventListener('input', () => {
            phoneInput.value = phoneInput.value.replace(/[^0-9]/g, '');
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const phone = phoneInput.value;
            const message = document.getElementById('message').value;

            if (phone.length !== 11) {
                statusDiv.textContent = 'Номер телефона должен состоять из 11 цифр.';
                statusDiv.style.color = 'red';
                return;
            }

            statusDiv.textContent = 'Отправка...';
            statusDiv.style.color = '#384766';

            const formData = new FormData();
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('message', message);

           fetch('mail.php', {
    method: 'POST',
    headers: {
        'Cache-Control': 'no-cache',
    },
    body: formData,
})
            .then(response => {
                if (!response.ok) throw new Error('Сервер вернул ошибку ' + response.status);
                return response.json();
            })
            .then(data => {
                if (data.ok) {
                    statusDiv.textContent = 'Спасибо! Ваше сообщение успешно отправлено.';
                    statusDiv.style.color = 'green';
                    form.reset();
                } else {
                    throw new Error(data.message || 'Неизвестная ошибка');
                }
            })
            .catch(error => {
                console.error('Ошибка отправки:', error);
                // Показываем текст ошибки для отладки
                statusDiv.textContent = 'Ошибка: ' + error.message; 
                statusDiv.style.color = 'red';
            });
        });
    }
});