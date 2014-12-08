// <?php

Header('Content-Type: application/json; charset=UTF8');

$phone = htmlspecialchars($_POST["phone"]); // пишем данные в переменные
$to = "v7rulnik@gmail.com";
$subject = "Заявка с Gold finance";
$message = "Новая заявка" . "\r\n" . "{$phone}";
$headers = "From: mail@goldfinance.ru" . "\r\n" . "BCC: v7rulnik@rguard.ru";


// Старая форма
// if(strlen($phone) == 17) {
// 	if (mail($to,$subject,$message,$headers)) {
// 		echo "Отправлено!";
// 	} else {
// 		echo "Ошибочка вышла ¯\_(ツ)_/¯";
// 	}
// } else {
// 	echo "Мало циферок ༼ ༎ຶ ෴ ༎ຶ༽";
// }

$errors         = array();  	// array to hold validation errors
$data 			= array(); 		// array to pass back data
// validate the variables ======================================================
	// if any of these variables don't exist, add an error to our $errors array
	if (empty($_POST['phone']))
		$errors['phone'] = 'Заполните поле';
// return a response ===========================================================
	// if there are any errors in our errors array, return a success boolean of false
	if ( ! empty($errors)) {
		// if there are items in our errors array, return those errors
		$data['success'] = false;
		$data['errors']  = $errors;
	} else {
		// if there are no errors process our form, then return a message
		// DO ALL YOUR FORM PROCESSING HERE
		// THIS CAN BE WHATEVER YOU WANT TO DO (LOGIN, SAVE, UPDATE, WHATEVER)
		// show a message of success and provide a true success variable
		mail($to,$subject,$message,$headers);
		
		$data['success'] = true;
		$data['message'] = 'Success!';
	}
	// return all our data to an AJAX call
	echo json_encode($data);

// ?>