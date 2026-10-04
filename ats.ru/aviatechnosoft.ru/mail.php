<?php
// Включаем отображение всех ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Разрешаем CORS и указываем тип ответа
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json; charset=utf-8');

// Обработка предзапроса (OPTIONS)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Проверяем метод (используем strtoupper для надежности)
if (strtoupper($_SERVER['REQUEST_METHOD']) === 'POST') {
    
    $to = 'dutofel@mail.ru'; // ВАША ПОЧТА
    $name = htmlspecialchars(trim($_POST['name'] ?? ''));
    $phone = htmlspecialchars(trim($_POST['phone'] ?? ''));
    $message = htmlspecialchars(trim($_POST['message'] ?? ''));

    if (empty($name) || empty($phone)) {
        http_response_code(400);
        echo json_encode(['ok' => false, 'message' => 'Заполните имя и телефон']);
        exit;
    }

    $subject = "Новая заявка с сайта АвиаТехноСофт";
    $body = "Имя: $name\nТелефон: $phone\nСообщение:\n$message";
    
    // Заголовки (важно для Reg.ru)
    $headers = "From: no-reply@" . $_SERVER['HTTP_HOST'] . "\r\n";
    $headers .= "Reply-To: $to\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo json_encode(['ok' => true]);
    } else {
        http_response_code(500);
        echo json_encode(['ok' => false, 'message' => 'Ошибка функции mail()']);
    }
} else {
    // Возвращаем ошибку с деталями для отладки
    http_response_code(405);
    echo json_encode(['ok' => false, 'message' => 'Метод не разрешён. Используется: ' . $_SERVER['REQUEST_METHOD']]);
}
?>