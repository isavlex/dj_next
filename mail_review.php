<?php

$recepient = "e.alexandrov177@yandex.ru";
$siteName = "DJkaraoke";

$name = trim($_POST["name"]);
$review = trim($_POST["review"])
$order = $_POST["order"];
$message = "Имя: $name \Отзыв: $review \nПерейти к модерации";

$pagetitle = "Отзыв с сайта \"$siteName\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");

?>