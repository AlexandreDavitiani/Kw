<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // 1. Проверка защиты от ботов (Honeypot)
    if (!empty($_POST['antispam_check'])) {
        die("Bot detected.");
    }

    // 2. Настройки почты (ЗАМЕНИ НА СВОЮ)
    $to = "ser-lyuba@yandex.ru"; 
    $subject = "Новое сообщение: Форум Дети и Вода";

    // 3. Сбор и очистка данных
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // 4. Формирование текста письма
    $email_content = "Имя: $name\n";
    $email_content .= "Email: $email\n\n";
    $email_content .= "Сообщение:\n$message\n";

    // 5. Заголовки (From должно быть на домене твоего сайта)
    $headers = "From: admin@твой-сайт.ru\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // 6. Отправка
    if (mail($to, $subject, $email_content, $headers)) {
        // Успех
        echo "success";
    } else {
        // Ошибка
        http_response_code(500);
        echo "Oops! Something went wrong.";
    }
} else {
    http_response_code(403);
    echo "There was a problem with your submission.";
}
?>