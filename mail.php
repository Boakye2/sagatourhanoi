<?php 

session_start();

$db = new PDO('mysql:host=localhost;dbname=hanoi','root','');


function sendmail ($dest, $otherplayer) {
    $subject = "SAGA TOUR d'HANOI";
    $message = "Vous venez de gagner contre ".$otherplayer;
    $header = "Content-type: text/plain; charset = utf-8\r\n";
    $header .= "From: sagatourdehanoi@gmail.com";

    if(mail($dest, $subject, $message, $header)) echo 'ok';
    else echo 'no ok';

};

if(isset($_GET)) {
    if($_GET['param'] == 'i win') {
    sendmail($_SESSION['user'], $_GET['player']);
    } else {
        $reqX = $db -> prepare('SELECT candidat FROM salon WHERE salon = ?');
        $reqX -> execute(array($_SESSION['user']));
        $resX = $reqX -> fetch();

       sendmail($_SESSION['user'], $resX['candidat']);
    }
}


?>