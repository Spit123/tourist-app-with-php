<?php
header('Content-type: text/html; charset=utf-8');
session_start();
if (! $_SESSION['admin']) {
    header('Location: login.php');
}

$id = $_POST['idAdd'];
$title = $_POST["titleAdd"];
$description = $_POST["descriptionAdd"];
$img = $_POST["imgAdd"];
$lat = $_POST["latAdd"];
$lng = $_POST["lngAdd"];
$id2 = htmlentities($_POST['id']);

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tourist";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "INSERT INTO church (`id`, `title`, `description`, `img`, `lat`, `lng`) VALUES ('$id', '$title', '$description', '$img', '$lat', '$lng')";

if (mysqli_query($conn, $sql)) {
    echo "Запись успешно добавлена";
  } else {
    echo "Ошибка при добавлении записи: " . mysqli_error($conn);
  }

$conn->close();
?>

<form method="post" action="adminpanel.php">
<input type="submit" name="submitButton" value="Назад" />
</form>