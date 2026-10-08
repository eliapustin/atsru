<?php
declare(strict_types=1);

// Public endpoint for the four contact forms. Keep mail credentials in the server environment.
header('Content-Type: application/json; charset=UTF-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function reply(int $status, string $message, ?string $invalidField = null): void
{
    http_response_code($status);
    $response = ['message' => $message];
    if ($invalidField !== null) {
        $response['field'] = $invalidField;
    }
    echo json_encode($response, JSON_UNESCAPED_UNICODE);
    exit;
}

function field(string $name, int $maxBytes): string
{
    $labels = [
        'name' => 'имя',
        'contact' => 'контакт',
        'company' => 'организация',
        'region' => 'регион',
        'institution' => 'тип учреждения',
        'students' => 'число учащихся',
        'project' => 'срок и бюджет',
        'demo' => 'формат демонстрации',
        'document' => 'документ',
        'pricing' => 'КП для обоснования цены',
        'message' => 'комментарий',
        'product' => 'продукт',
    ];
    $label = $labels[$name] ?? 'данные формы';
    $value = $_POST[$name] ?? '';
    if (!is_string($value)) {
        reply(422, 'Проверьте поле «' . $label . '».', $name);
    }
    $value = trim(str_replace(["\r\n", "\r"], "\n", $value));
    if (strlen($value) > $maxBytes || preg_match('//u', $value) !== 1) {
        reply(422, 'Поле «' . $label . '» заполнено некорректно или слишком длинное.', $name);
    }
    return preg_replace('/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/', ' ', $value);
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Allow: POST');
    reply(405, 'Используйте форму на сайте.');
}

if ((int) ($_SERVER['CONTENT_LENGTH'] ?? 0) > 16000 || !empty($_FILES)) {
    reply(413, 'Слишком большой запрос.');
}

$host = strtolower(explode(':', $_SERVER['HTTP_HOST'] ?? '')[0]);
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strtolower((string) parse_url($origin, PHP_URL_HOST)) !== $host) {
    reply(403, 'Запрос отклонён.');
}

// A hidden field catches basic automated submissions without revealing the filter.
if (field('website', 200) !== '') {
    reply(200, 'Спасибо! Заявка отправлена.');
}

$types = [
    'f1' => ['label' => 'Получить КП', 'subject' => 'proposal'],
    'f2' => ['label' => 'Рассчитать класс', 'subject' => 'classroom'],
    'f3' => ['label' => 'Запросить демонстрацию', 'subject' => 'demo'],
    'f4' => ['label' => 'Получить документацию', 'subject' => 'documents'],
];
$type = field('type', 2);
if (!isset($types[$type])) {
    reply(422, 'Неизвестный тип заявки. Обновите страницу и попробуйте снова.');
}
if (field('consent', 1) !== '1') {
    reply(422, 'Подтвердите согласие на обработку персональных данных.', 'consent');
}

$data = [
    'cta' => field('cta', 200),
    'page' => field('page', 1000),
    'product' => field('product', 200),
    'name' => field('name', 200),
    'contact' => field('contact', 320),
    'company' => field('company', 300),
    'region' => field('region', 200),
    'institution' => field('institution', 300),
    'students' => field('students', 6),
    'project' => field('project', 600),
    'demo' => field('demo', 40),
    'document' => field('document', 300),
    'pricing' => field('pricing', 3),
    'message' => field('message', 4000),
];

if ($data['name'] === '') {
    reply(422, 'Укажите имя.', 'name');
}
if ($data['contact'] === '') {
    reply(422, 'Укажите телефон или email.', 'contact');
}
if ($data['company'] === '') {
    reply(422, 'Укажите организацию.', 'company');
}
if ($type === 'f2' && $data['institution'] === '') {
    reply(422, 'Укажите тип учреждения.', 'institution');
}
if ($data['students'] !== '' && (!ctype_digit($data['students']) || (int) $data['students'] < 1 || (int) $data['students'] > 10000)) {
    reply(422, 'Число учащихся должно быть от 1 до 10 000.', 'students');
}
if ($type === 'f3' && !in_array($data['demo'], ['Онлайн', 'Очно', 'Обсудить'], true)) {
    reply(422, 'Выберите формат демонстрации.', 'demo');
}
if ($type === 'f4' && $data['document'] === '') {
    reply(422, 'Укажите запрашиваемый документ.', 'document');
}
if ($type === 'f4' && filter_var($data['contact'], FILTER_VALIDATE_EMAIL) === false) {
    reply(422, 'Укажите корректный email.', 'contact');
}
if (!in_array($data['pricing'], ['', '1', 'on'], true)) {
    reply(422, 'Проверьте поле «КП для обоснования цены».', 'pricing');
}

// A small file-based limit is sufficient for the expected traffic and needs no database.
$rateDirectory = sys_get_temp_dir() . DIRECTORY_SEPARATOR . 'atsru-lead-rate';
if (!is_dir($rateDirectory) && !mkdir($rateDirectory, 0700, true) && !is_dir($rateDirectory)) {
    reply(503, 'Отправка временно недоступна. Попробуйте позже.');
}
$rateKey = hash('sha256', $host . '|' . ($_SERVER['REMOTE_ADDR'] ?? 'unknown'));
$rateFile = $rateDirectory . DIRECTORY_SEPARATOR . $rateKey;
$handle = @fopen($rateFile, 'c+');
if ($handle === false || !flock($handle, LOCK_EX)) {
    reply(503, 'Отправка временно недоступна. Попробуйте позже.');
}
$history = json_decode(stream_get_contents($handle), true);
$now = time();
$history = array_values(array_filter(is_array($history) ? $history : [], static function ($timestamp) use ($now): bool {
    return is_int($timestamp) && $timestamp > $now - 600;
}));
if (count($history) >= 10) {
    flock($handle, LOCK_UN);
    fclose($handle);
    reply(429, 'Слишком много заявок. Повторите попытку позже.');
}
$history[] = $now;
rewind($handle);
ftruncate($handle, 0);
fwrite($handle, json_encode($history));
fflush($handle);
flock($handle, LOCK_UN);
fclose($handle);

$privateConfigPath = dirname(__DIR__, 5) . DIRECTORY_SEPARATOR . 'atsru-lead-config.php';
$privateConfig = is_file($privateConfigPath) ? require $privateConfigPath : [];
if (!is_array($privateConfig)) {
    $privateConfig = [];
}
$recipient = trim((string) (getenv('ATS_LEAD_TO') ?: ($privateConfig['to'] ?? 'liap1990@gmail.com')));
$localHost = $host === 'localhost' || str_ends_with($host, '.local');
$sender = trim((string) (getenv('ATS_LEAD_FROM') ?: ($privateConfig['from'] ?? ($localHost ? 'noreply@atsru.local' : ''))));
if (filter_var($recipient, FILTER_VALIDATE_EMAIL) === false || filter_var($sender, FILTER_VALIDATE_EMAIL) === false) {
    error_log('ATS lead mail addresses are not configured.');
    reply(503, 'Отправка временно недоступна. Попробуйте позже.');
}

$value = static function (string $key) use ($data): string {
    return $data[$key] === '' ? '—' : $data[$key];
};
$body = implode("\r\n", [
    'Форма: ' . $types[$type]['label'],
    'Кнопка: ' . $value('cta'),
    'Страница: ' . $value('page'),
    'Продукт: ' . $value('product'),
    'Имя: ' . $value('name'),
    'Контакт: ' . $value('contact'),
    'Организация: ' . $value('company'),
    'Регион: ' . $value('region'),
    'Тип учреждения: ' . $value('institution'),
    'Число учащихся: ' . $value('students'),
    'Срок и бюджет: ' . $value('project'),
    'Демонстрация: ' . $value('demo'),
    'Документ: ' . $value('document'),
    'КП для обоснования цены: ' . (in_array($data['pricing'], ['1', 'on'], true) ? 'Да' : 'Нет'),
    'Комментарий: ' . $value('message'),
]);
$headers = [
    'From' => $sender,
    'MIME-Version' => '1.0',
    'Content-Type' => 'text/plain; charset=UTF-8',
];
if (filter_var($data['contact'], FILTER_VALIDATE_EMAIL) !== false) {
    $headers['Reply-To'] = $data['contact'];
}

if (!@mail($recipient, 'ATS website request: ' . $types[$type]['subject'], $body, $headers)) {
    error_log('ATS lead mail() returned false.');
    reply(503, 'Не удалось отправить заявку. Попробуйте позже.');
}

reply(200, 'Спасибо! Заявка отправлена.');
