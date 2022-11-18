<?php 
session_start();
try {
    if(isset($_SESSION['user'])) {session_unset($_SESSION['user']); echo 'ok';}
    
} catch (Throwable $th) {
    throw $th;
}
?>