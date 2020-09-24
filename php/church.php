<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "tourist";
$data = [];

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);
// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "SELECT * FROM church";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {

    array_push($data, $row);
  }
} else {
  echo "0 results";
}
// print_r($data);
echo json_encode($data);
$conn->close();
?>