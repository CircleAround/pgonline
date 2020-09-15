<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>
<body>
    <?php
      // if($_COOKIE["email"]) {
      //   echo $_COOKIE["email"];
      // } else {
      //   setcookie("email", "example@hoge.com");
      //   echo "success set cookie!";
      // }

      session_start();
      if ($_SESSION["email"]) {
        echo $_SESSION["email"];
      } else {
        $_SESSION['email'] = 'example@hoge.com';
        echo "success set session";
      }
    ?>
</body>
</html>