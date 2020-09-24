<?php
header('Content-type: text/html; charset=utf-8');
session_start();
if (! $_SESSION['admin']) {
    header('Location: login.php');
}

function connect($sql_text) {
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

    $sql = $sql_text;
    $result = $conn->query($sql);
    if ($result->num_rows > 0) {
        // output data of each row
        while($row = $result->fetch_assoc()) {
      
          array_push($data, $row);
        }
      } else {
        echo "0 results";
      }
    return $data;
}

$sql_churchList = "SELECT * FROM `church`";
$data_array = connect($sql_churchList);

?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Админка</title>
    <link rel="stylesheet" href="../css/admin.css">
    <script src="../js/jquery-3.4.1.min.js"></script>
</head>
<body>
<form method="post" action="logout.php" class="logout">
<input type="submit" name="submitButton" value="Выйти" class="logout" />
</form>
    <div class="wrap">
        <table id="article_list">
            <?php 
                for ($i = 0; $i <= count($data_array); $i++) {
                    echo "<tr>" . "<td class='data_article'>" . $data_array[$i]["title"];
                }
            ?>
        </table>
        <button id="insert_btn" style="width: 100px">+</button>
        <button id="remove_btn" style="width: 100px">-</button>
    </div>
    <form action="../php/add.php" class="insertForm" method="post">
            <table>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <input type="text" id="idAdd" name="idAdd">
                    </td>
                </tr>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <input type="text" id="titleAdd" name="titleAdd">
                    </td>
                </tr>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <textarea name="descriptionAdd" id="descriptionAdd" cols="30" rows="10"></textarea>
                    </td>
                </tr>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <input type="text" id="imgAdd" name="imgAdd">
                    </td>
                </tr>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <input type="text" id="latAdd" name="latAdd">
                    </td>
                </tr>
                <tr>
                    <td class="TD_insert"></td>
                    <td class="TD_insert">
                        <input type="text" id="lngAdd" name="lngAdd">
                    </td>
                </tr>
            </table>
            <input name="submit" type="submit" value="Добавить" style="width: 150px; font-size: 20px;" id="insert">
        </form>
        <form action="../php/remove.php" class="removeForm" method="post">
            <table>
                    <tr>
                        <td class="TD_remove"></td>
                        <td class="TD_remove">
                            <input type="text" id="idRemove" name="idRemove">
                        </td>
                    </tr>
            </table>
            <input name="submit" type="submit" value="Удалить" style="width: 150px; font-size: 20px;" id="remove">
        </form>
    <form action="../php/update.php" class="editForm" method="post">
        <table>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <input type="text" id="id" name="id">
                </td>
            </tr>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <input type="text" id="title" name="title">
                </td>
            </tr>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <textarea name="description" id="description" cols="30" rows="10"></textarea>
                </td>
            </tr>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <input type="text" id="img" name="img">
                </td>
            </tr>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <input type="text" id="lat" name="lat">
                </td>
            </tr>
            <tr>
                <td class="TD_edit"></td>
                <td class="TD_edit">
                    <input type="text" id="lng" name="lng">
                </td>
            </tr>
        </table>
        <input name="submit" type="submit" value="Опубликовать" style="width: 150px;" id="submit">
    </form>

    <script src="../js/adminpanel.js"></script>
</body>
</html>