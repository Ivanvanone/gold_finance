<?php

$phone = $_POST["phone"]; // пишем данные в переменные

$to      = 'v7rulnik@gmail.com';
$subject = 'Новая заявка Gold Finance';
$message = 'Новая заявка' . "\r\n" .'{$phone}';
$headers = 'From: GoldFinance';

	
	if (!$phone) {
		echo "Заполните все поля";
	} else {
		if (mail($to, $subject, $message, $headers)) {
			echo "Письмо отправлено";
		} else {
			echo "Ошибочка вышла :(";
		}
	}

	?>