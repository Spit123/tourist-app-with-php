<?php 
header('Content-type: text/html; charset=utf-8');
session_start();
if (! $_SESSION['admin']) {
    header('Location: login.php');
}
$id = $_POST['id'];
$title = $_POST["title"];
$description = $_POST["description"];
$img = $_POST["img"];
$lat = $_POST["lat"];
$lng = $_POST["lng"];
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

$sql = "UPDATE `church` SET `id`='$id', `title`= '$title',`description`= '$description',`img`= '$img', `lat`='$lat',`lng`='$lng' WHERE `id` = '$id'";
$result = $conn->query($sql);

if (mysqli_query($conn, $sql)) {
    echo "Запись успешно обновлена";
  } else {
    echo "Ошибка при обновлении записи: " . mysqli_error($conn);
  }

$conn->close();
?>

<form method="post" action="adminpanel.php">
<input type="submit" name="submitButton" value="Назад" />
</form>