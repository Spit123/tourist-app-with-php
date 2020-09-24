<?php
header('Content-type: text/html; charset=utf-8');
session_start();
if (! $_SESSION['admin']) {
    header('Location: login.php');
}

$id = $_POST['idRemove'];

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

$sql = "DELETE FROM `church` WHERE `id`='$id'";

if (mysqli_query($conn, $sql)) {
    echo "Запись успешно удалена";
  } else {
    echo "Ошибка при удалении записи: " . mysqli_error($conn);
  }

$conn->close();
?>

<form method="post" action="adminpanel.php">
<input type="submit" name="submitButton" value="Назад" />
</form>