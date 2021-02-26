<?php
  // Set hostname
  $hostname = check_input($_SERVER['HTTP_HOST']);
  // Set e-mail recipient
  $recipient = "ben@inspiringhopechurch.com";
  
  if ($hostname === "dev.inspiringhopechurch.com") {
      $recipient = "admin@inspiringhopechurch.com";
  }

  // Check all form inputs using check_input function
  $fullname = check_input($_POST['fullname'], "Enter your name");
  $email = check_input($_POST['email']);
  $message = check_input($_POST['message']);
  $subject = check_input($_POST['subject']);

  // Setup From: email address properly
  $headers = "From: Inspiring Hope Church <noreply@inspiringhopechurch.com>" 
    . "\r\n" . "Reply-To: $email";

  // If e-mail is not valid show error message
  if (!preg_match("/([\w\-]+\@[\w\-]+\.[\w\-]+)/", $email)) {
      show_error("E-mail address not valid");
  }

  // Message for the e-mail
  $message = "New message from inspiringhopechurch.com!

  Name: $fullname
  E-mail: $email

  Subject: $subject

  Message:
  $message
  ";

  // Send the message using mail() function
  mail($recipient, $subject, $message, $headers);

  // Send data back to page on success
  $success_msg =
  "Thank you! We'll send a reply to $email as soon as we can!";
  header('HTTP/1.1 200 OK');
  header('Content-type: application/json');
  echo json_encode($success_msg);
  exit();

  // Used functions
  function check_input($data, $problem='') {
    $data = trim($data);
    $data = stripslashes($data);
    $data = htmlspecialchars($data);
    if ($problem && strlen($data) == 0) {
        show_error($problem); // Function exits here if error is found
    }
    return $data; // If no errors, we return here
  }

  // Send data back to page on error
  function show_error($myError) {
    $result="Please correct the following error: $myError";

    header('HTTP/1.1 400 Bad Request');
    header('Content-type: application/json');
    echo json_encode($result);
    exit();
  }
?>
