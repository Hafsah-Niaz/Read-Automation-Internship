<?php
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 1 Jan 2000 00:00:00 GMT");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/SMTP.php';
require 'PHPMailer/Exception.php';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $name    = $_POST['name'];
    $email   = $_POST['email'];
    $phone   = $_POST['phone'];
    $subject = $_POST['subject'];
    $message = $_POST['message'];

    $mail = new PHPMailer(true);

    try {
        // SMTP config
        $mail->isSMTP();
        $mail->Host = 'smtp.gmail.com';
        $mail->SMTPAuth = true;
        $mail->Username = 'your_gmail@gmail.com';        // Your Gmail
        $mail->Password = 'password';                // Your App password
        $mail->SMTPSecure = 'tls';
        $mail->Port = 587;

        // Email content
        $mail->setFrom($email, $name);
        $mail->addAddress('automationread@gmail.com');      // Receiver email

        $mail->Subject = "READ Automation Website Contact: $subject";
        $mail->Body    = "You have a new contact form submission:\n\n"
                       . "Name: $name\n"
                       . "Email: $email\n"
                       . "Phone: $phone\n"
                       . "Subject: $subject\n\n"
                       . "Message:\n$message";

        $mail->send();

        // ✅ Success message
        echo "<script>alert('Message sent successfully!'); window.location.href='index.html';</script>";
    } catch (Exception $e) {
        // ❌ Failure message
        echo "<script>alert('Message failed to send. Please try again.'); window.location.href='index.html';</script>";
    }
}
?>

