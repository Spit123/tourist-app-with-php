<?php
header('Content-type: text/html; charset=utf-8');
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tourist";
$data = [];
$login = $_POST['login'];
$pas = $_POST['password'];

// Создаем подключение
$conn = new mysqli($servername, $username, $password, $dbname);
// Проверка соединения
if ($conn->connect_error) {
  die("Ошибка соединения " . $conn->connect_error);
}

$sql = "SELECT * FROM userlist";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {

        $data[0] = $row["login"];
        $data[1] = $row["password"];
  
    }
} else {
    echo "0 results";
}
$conn->close();


if ($login == $data[0] && $pas == $data[1]) {
        session_start();
        $_SESSION['admin'] = true;
        $script = 'adminpanel.php';
        $_SESSION['userid'] = "1";
} else {
    $script = '../admin.html';
}
header("Location: $script");
?>