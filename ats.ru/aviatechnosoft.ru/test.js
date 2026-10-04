/* ============================================
   ТЕСТ ПО МОДУЛЮ 1: Основы строения БПЛА
   Отдельный файл для логики тестирования
   ООО «АвиаТехноСофт»
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
    // === БАЗА ВОПРОСОВ (25 вопросов из документа) ===
    const quizData = [
        {
            question: "Какой материал наиболее часто используется для изготовления рам гоночных дронов из-за своей прочности и легкости?",
            answers: ["Алюминий", "Углепластик (карбон)", "Пластик", "Дерево"],
            correct: 1 // б) Углепластик (карбон)
        },
        {
            question: "Какой тип моторов имеет щетки, что приводит к быстрому износу, и обычно используется в дешевых моделях?",
            answers: ["Бесколлекторные", "Коллекторные", "Шаговые", "Серводвигатели"],
            correct: 1 // б) Коллекторные
        },
        {
            question: "Параметр мотора «мощность» измеряется в:",
            answers: ["KV", "Ваттах (W)", "Амперах (A)", "Вольтах (V)"],
            correct: 1 // б) Ваттах (W)
        },
        {
            question: "Диаметр и шаг пропеллера влияют на:",
            answers: ["Время полета и тягу", "Цвет рамы", "Частоту радиосвязи", "Емкость аккумулятора"],
            correct: 0 // а) Время полета и тягу
        },
        {
            question: "Какой протокол чаще используется в современных регуляторах оборотов (ESC) для быстрой связи?",
            answers: ["PWM", "Oneshot", "DShot", "ELRS"],
            correct: 2 // в) DShot
        },
        {
            question: "Полетный контроллер отвечает за:",
            answers: ["Только за питание моторов", "Обработку данных от датчиков и управление моторами", "Хранение видео", "Навигацию по карте"],
            correct: 1 // б) Обработку данных от датчиков и управление моторами
        },
        {
            question: "Какой датчик в полетном контроллере измеряет угловую скорость вращения?",
            answers: ["Акселерометр", "Гироскоп", "Барометр", "Магнитометр"],
            correct: 1 // б) Гироскоп
        },
        {
            question: "Какой протокол передачи сигнала в аппаратуре управления обеспечивает низкую задержку и устойчивость к помехам?",
            answers: ["PWM", "PPM", "CRSF", "S.Bus"],
            correct: 2 // в) CRSF
        },
        {
            question: "Параметр аккумулятора «S» обозначает:",
            answers: ["Емкость в mAh", "Количество ячеек (вольтаж)", "Ток разряда в C", "Массу в граммах"],
            correct: 1 // б) Количество ячеек (вольтаж)
        },
        {
            question: "Какой тип аккумуляторов имеет более высокую энергоемкость, но меньший ток разряда по сравнению с LiPo?",
            answers: ["LiPo", "Li-Ion", "NiCd", "Pb"],
            correct: 1 // б) Li-Ion
        },
        {
            question: "Какое вспомогательное оборудование позволяет видеть видео от первого лица?",
            answers: ["GPS-модуль", "FPV-камера и VTX", "Лидар", "Соннар"],
            correct: 1 // б) FPV-камера и VTX
        },
        {
            question: "VTX — это:",
            answers: ["Видеопередатчик", "Регулятор оборотов", "Полетный контроллер", "Аккумулятор"],
            correct: 0 // а) Видеопередатчик
        },
        {
            question: "GPS-модуль используется для:",
            answers: ["Передачи видео", "Определения координат и навигации", "Измерения расстояния до объектов", "Балансировки пропеллеров"],
            correct: 1 // б) Определения координат и навигации
        },
        {
            question: "Телеметрия — это:",
            answers: ["Передача данных о состоянии дрона на пульт", "Система стабилизации", "Тип пропеллера", "Материал рамы"],
            correct: 0 // а) Передача данных о состоянии дрона на пульт
        },
        {
            question: "Лидар — это датчик для:",
            answers: ["Определения высоты по давлению", "Лазерного сканирования расстояний", "Ультразвукового измерения", "Магнитного ориентирования"],
            correct: 1 // б) Лазерного сканирования расстояний
        },
        {
            question: "Соннар — это датчик для:",
            answers: ["Лазерного сканирования", "Ультразвукового измерения расстояний", "Определения координат", "Передачи видео"],
            correct: 1 // б) Ультразвукового измерения расстояний
        },
        {
            question: "Какой материал рам обеспечивает хорошую прочность при низкой цене, но больший вес?",
            answers: ["Углепластик", "Алюминий", "Пластик", "Композит"],
            correct: 1 // б) Алюминий
        },
        {
            question: "Конфигурация рамы «X» обеспечивает:",
            answers: ["Лучшую стабильность в полете вперед", "Равномерное распределение веса и маневренность", "Увеличенную грузоподъемность", "Уменьшенную вибрацию"],
            correct: 1 // б) Равномерное распределение веса и маневренность
        },
        {
            question: "Балансировка пропеллеров нужна для:",
            answers: ["Увеличения скорости", "Снижения вибрации и шума", "Изменения цвета", "Подключения к ПДУ"],
            correct: 1 // б) Снижения вибрации и шума
        },
        {
            question: "BEC в ESC — это:",
            answers: ["Стабилизатор напряжения для питания электроники", "Датчик скорости", "Передатчик сигнала", "Аккумулятор"],
            correct: 0 // а) Стабилизатор напряжения для питания электроники
        },
        {
            question: "ПО для полетного контроллера, ориентированное на FPV-гонки:",
            answers: ["iNav", "Betaflight", "ArduPilot", "Mission Planner"],
            correct: 1 // б) Betaflight
        },
        {
            question: "Каналы в аппаратуре управления используются для:",
            answers: ["Передачи команд на разные функции", "Хранения данных", "Зарядки АКБ", "Съемки видео"],
            correct: 0 // а) Передачи команд на разные функции
        },
        {
            question: "Маркировка аккумулятора «100C» означает:",
            answers: ["Емкость 100 mAh", "Ток разряда в 100 раз больше емкости", "Вольтаж 100V", "Массу 100 г"],
            correct: 1 // б) Ток разряда в 100 раз больше емкости
        },
        {
            question: "FPV-камера отличается от обычной:",
            answers: ["Низкой задержкой и малым размером", "Большим весом", "Высокой ценой", "Отсутствием объектива"],
            correct: 0 // а) Низкой задержкой и малым размером
        },
        {
            question: "Какое вспомогательное оборудование используется для автономных полетов?",
            answers: ["VTX", "GPS-модуль", "ESC", "Пропеллер"],
            correct: 1 // б) GPS-модуль
        }
    ];

    // === ЭЛЕМЕНТЫ СТРАНИЦЫ ВОПРОСОВ ===
    const questionsWrapper = document.getElementById('questions-wrapper');
    const submitBtn = document.getElementById('submit-quiz');
    const resultsContainer = document.getElementById('results-container');

    // === ЭЛЕМЕНТЫ СТРАНИЦЫ РЕЗУЛЬТАТОВ ===
    const scoreDisplay = document.getElementById('score-display');
    const percentDisplay = document.getElementById('percent-display');
    const gradeDisplay = document.getElementById('grade-display');
    const retryBtn = document.getElementById('retry-btn');
    const homeBtn = document.getElementById('home-btn');

    // === ИНИЦИАЛИЗАЦИЯ ТЕСТА ===
    if (questionsWrapper && !resultsContainer) {
        renderQuiz();
    }

    // === ИНИЦИАЛИЗАЦИЯ РЕЗУЛЬТАТОВ ===
    if (resultsContainer) {
        showResults();
    }

    // ============================================
    // ФУНКЦИИ ДЛЯ СТРАНИЦЫ ВОПРОСОВ
    // ============================================

    // Отрисовка вопросов
    function renderQuiz() {
        quizData.forEach((item, index) => {
            const questionBlock = document.createElement('div');
            questionBlock.classList.add('question-block');

            const questionTitle = document.createElement('h3');
            questionTitle.classList.add('question-title');
            questionTitle.textContent = `${index + 1}. ${item.question}`;

            const answersContainer = document.createElement('div');
            answersContainer.classList.add('answers-container');

            item.answers.forEach((answer, answerIndex) => {
                const label = document.createElement('label');
                label.classList.add('answer-label');

                const radio = document.createElement('input');
                radio.type = 'radio';
                radio.name = `question${index}`;
                radio.value = answerIndex;
                radio.classList.add('answer-radio');

                const span = document.createElement('span');
                span.textContent = answer;

                label.appendChild(radio);
                label.appendChild(span);
                answersContainer.appendChild(label);
            });

            questionBlock.appendChild(questionTitle);
            questionBlock.appendChild(answersContainer);
            questionsWrapper.appendChild(questionBlock);
        });
    }

    // Проверка ответов
    if (submitBtn) {
        submitBtn.addEventListener('click', function() {
            const userAnswers = [];
            let answeredCount = 0;

            // Сбор ответов пользователя
            quizData.forEach((item, index) => {
                const selected = document.querySelector(`input[name="question${index}"]:checked`);
                if (selected) {
                    userAnswers.push(parseInt(selected.value));
                    answeredCount++;
                } else {
                    userAnswers.push(null);
                }
            });

            // Проверка: все ли вопросы отвечены
            if (answeredCount < quizData.length) {
                const confirmed = confirm(`Вы ответили на ${answeredCount} из ${quizData.length} вопросов. Продолжить проверку?`);
                if (!confirmed) {
                    return;
                }
            }

            // Подсчёт результатов
            let correctCount = 0;
            userAnswers.forEach((answer, index) => {
                if (answer === quizData[index].correct) {
                    correctCount++;
                }
            });

            // Сохранение в localStorage
            const resultData = {
                score: correctCount,
                total: quizData.length,
                percent: Math.round((correctCount / quizData.length) * 100),
                answers: userAnswers,
                timestamp: new Date().toISOString()
            };

            localStorage.setItem('quizResult', JSON.stringify(resultData));

            // Переход на страницу результатов
            window.location.href = 'test-results.html';
        });
    }

    // ============================================
    // ФУНКЦИИ ДЛЯ СТРАНИЦЫ РЕЗУЛЬТАТОВ
    // ============================================

    function showResults() {
        const storedResult = localStorage.getItem('quizResult');

        if (!storedResult) {
            resultsContainer.innerHTML = '<p class="error-message">Результаты не найдены. Пожалуйста, пройдите тест.</p>';
            return;
        }

        const result = JSON.parse(storedResult);

        // Отображение счёта
        if (scoreDisplay) {
            scoreDisplay.textContent = result.score;
        }

        // Отображение процента
        if (percentDisplay) {
            percentDisplay.textContent = `${result.percent}%`;
        }

        // Оценка (шкала из задания)
        if (gradeDisplay) {
            const grade = getGrade(result.percent);
            gradeDisplay.textContent = grade.text;
            gradeDisplay.classList.add(grade.class);
        }

        // Кнопка "Пройти заново"
        if (retryBtn) {
            retryBtn.addEventListener('click', function() {
                localStorage.removeItem('quizResult');
                window.location.href = 'test-questions.html';
            });
        }

        // Кнопка "На главную"
        if (homeBtn) {
            homeBtn.addEventListener('click', function() {
                window.location.href = 'index.html';
            });
        }
    }

    // Определение оценки (шкала: 85-100, 70-84, 45-69, <44)
    function getGrade(percent) {
        if (percent >= 85) {
            return { text: 'Отлично! 🏆', class: 'grade-excellent' };
        } else if (percent >= 70) {
            return { text: 'Хорошо! 👍', class: 'grade-good' };
        } else if (percent >= 45) {
            return { text: 'Удовлетворительно 📚', class: 'grade-satisfactory' };
        } else {
            return { text: 'Требуется повторение ⚠️', class: 'grade-poor' };
        }
    }

    // ============================================
    // ЛОГИКА ГАМБУРГЕР-МЕНЮ
    // ============================================
    const hamburger = document.getElementById('hamburger-menu');
    const navMenu = document.querySelector('.quiz-nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Закрывать меню при клике на ссылку
        document.querySelectorAll('.quiz-nav-list a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    hamburger.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    }
});