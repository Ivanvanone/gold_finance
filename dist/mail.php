<?php

$phone = $_POST["phone"]; // пишем данные в переменные

$to      = 'v7rulnik@gmail.com';
$subject = 'the subject';
$message = 'Новая заявка' . "\r\n" .'{$phone}';
$headers = 'From: Gold Finance';

	
	if (!$phone) {
		echo "Заполните все поля";
	} else {
		if (mail($to, $subject, $message, $headers)) {
			echo "Писмьо отправлено";
		} else {
			echo "Ошибочка вышла :(";
		}
	}

	?>