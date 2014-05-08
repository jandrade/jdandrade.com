<?php
// multiple recipients
$to  = 'juandavidandrade@gmail.com';

// subject
$subject = 'jdandrade.com | Contacto';

$fromName = $_POST['name'];
$fromEmail = $_POST['email'];
$comment = $_POST['message'];

// message
$message = '
<html>
<head>
  <title>Nuevo Contacto</title>
</head>
<body>
  <p><b>Nombre:</b> ' . $fromName . '</p>
  <p><b>Correo:</b> ' . $fromEmail . '</p>
  <p><b>Comentario:</b> ' . $comment . '</p>
</body>
</html>
';

// To send HTML mail, the Content-type header must be set
$headers  = 'MIME-Version: 1.0' . "\r\n";
$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

// Additional headers
$headers .= 'To: Juan David Andrade <' . $to . '>' . "\r\n";
$headers .= 'From: ' . $fromName . ' <' . $fromEmail . '>' . "\r\n";

// Mail it
echo mail($to, $subject, $message, $headers);

header("Location: ./");
?>