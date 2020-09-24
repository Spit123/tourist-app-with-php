<?php
header('Content-type: text/html; charset=utf-8');
session_start();
$_SESSION['admin'] = true;
unset($_SESSION['admin']);
session_destroy();
if (!$_SESSION['admin']) {
    header('Location: login.php');
}
?>