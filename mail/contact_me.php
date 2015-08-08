<?php

require 'PHPMailer/PHPMailerAutoload.php';

// Check for empty fields
if(empty($_POST['name'])  		||
   empty($_POST['email']) 		||
   empty($_POST['message'])	||
   !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
   {
	echo "No arguments Provided!";
	return false;
   }
	
$name = $_POST['name'];
$email_address = $_POST['email'];
$message = $_POST['message'];
	
// Create the email and send the message

  $mail = new PHPMailer;
  //$mail->SMTPDebug = 3;                               // Enable verbose debug output

  $mail->isSMTP();                                      // Set mailer to use SMTP
  $mail->Host = 'smtp.mailgun.org';  // Specify main and backup SMTP servers
  $mail->SMTPAuth = true;                               // Enable SMTP authentication
  $mail->Username = 'postmaster@sandbox6bff932344484bcf851ecfe83848386d.mailgun.org';                 // SMTP username
  $mail->Password = '26fcf27c0bb2344841d03519f5158824';                           // SMTP password
  $mail->SMTPSecure = 'tls';                            // Enable TLS encryption, `ssl` also accepted
  $mail->Port = 587;                                    // TCP port to connect to

  $mail->From = $email_address;
  $mail->FromName = $name;
  $mail->addAddress('nicolas.cajelli@olx.com', 'Nico');     // Add a recipient
  //$mail->addAddress('tatopane@gmail.com', 'Nico');     // Add a recipient
  //$mail->addReplyTo('info@example.com', 'Information');
  //$mail->addCC('cc@example.com');
  //$mail->addBCC('bcc@example.com');

  //$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
  //$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
  $mail->isHTML(true);                                  // Set email format to HTML

  $mail->Subject = 'Nuevo contacto en QueSale';
  $mail->Body    = $message;
  $mail->AltBody = $message;

  if(!$mail->send()) {
      //echo 'Message could not be sent.';
      //echo 'Mailer Error: ' . $mail->ErrorInfo;
    return false;
  } else {
      //echo 'Message has been sent';
      return true;
  }

			
?>