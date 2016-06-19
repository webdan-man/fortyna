<?php
$frmid = $_POST['frmid'];
$name = $_POST['name'];
$phone = $_POST['phone'];
$email = $_POST['email'];
$city = $_POST['city'];

$data_z = $_POST['data_z'];
$data_v = $_POST['data_v'];
$metro = $_POST['metro'];
$many = $_POST['many'];
$radio1 = $_POST['radio1'];
$radio2 = $_POST['radio2'];
$mess = $_POST['mess'];


$utm_source = $_POST['utm_source'];
$utm_medium = $_POST['utm_medium'];
$utm_campaign = $_POST['utm_campaign'];
$utm_term = $_POST['utm_term'];
$source_type = $_POST['source_type'];
$source = $_POST['source'];
$position_type = $_POST['position_type'];
$position = $_POST['position'];
$added = $_POST['added'];
$creative = $_POST['creative'];
$matchtype = $_POST['matchtype'];
$location = $_POST['location'];
$url = $_POST['url'];
$title = $_POST['title'];

$subject = 'Заявка Fortuna(en)';	

//$headers= "From: noreply <noreply@noreply.ru>\r\n";
//$headers.= "Reply-To: noreply <noreply@noreply.ru>\r\n";
$headers.= "X-Mailer: PHP/" . phpversion()."\r\n";
$headers.= "MIME-Version: 1.0" . "\r\n";
$headers.= "Content-type: text/plain; charset=utf-8\r\n";

$to = "reserve@fortunahotels.ru";

$message = "Форма: $frmid\n\n";
$message .= "Имя: $name\n";
$message .= "Телефон: $phone\n\n";
$message .= "Email: $email\n\n";
$message .= "Вопрос: $mess\n\n";
$message .= "Город: $city\n";
$message .= "Дата заезда: $data_z\n";
$message .= "Дата выезда: $data_v\n";
$message .= "Ближайшее метро: $metro\n";
$message .= "Бюджет на 1 человека: $many\n";
$message .= "Тип питания: $radio1\n";
$message .= "Трансфер: $radio2\n\n";
$message .= "Источник: $utm_source\n";
$message .= "Тип источника: $utm_medium\n";
$message .= "Кампания: $utm_campaign\n";
$message .= "Ключевое слово: $utm_term\n";
$message .= "Тип площадки(поиск или контекст): $source_type\n";
$message .= "Площадка: $source\n";
$message .= "Спецразмещение или гарантия: $position_type\n";
$message .= "Позиция объявления в блоке: $position\n";
$message .= "Показ по дополнительным ролевантным фразам: $added\n";
$message .= "Идентификатор объявления: $creative\n";
$message .= "Тип соответствия ключа(e-точное/p-фразовое/b-широкое): $matchtype\n\n";
$message .= "Гео-положение отправителя: $location\n\n";
$message .= "Ссылка на сайт: $url\n";
$message .= "Заголовок: $title";

mail ($to,$subject,$message,$headers);
?>