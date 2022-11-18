<?php

try {
    session_start();

    $db = new PDO('mysql:host=localhost;dbname=hanoi','root','');

    $data = json_decode(file_get_contents('php://input'));

      

    if($data) {
        if($data -> param == 'insert') {
            $req = $db -> prepare('INSERT INTO score_local VALUES(NULL, ?,?,?,?,?)');
            $req -> execute(array($data -> name, $data -> time, intval($data -> moving), $data -> level, $data -> score));

        } elseif($data -> param == 'fetch_score') {

            $req = $db -> prepare('SELECT nom, score, niveau FROM score_local ORDER BY score');
            $req -> execute();

            $str = '';
            while($res = $req -> fetch(PDO::FETCH_OBJ)) {
                $str = json_encode($res).'~'.$str;
            }
            echo $str;

        } elseif($data -> param == 'save') {

            if($data -> commande == 'save' || $data -> commande == 'login') {


                $req = $db -> prepare('SELECT partie, pile, rect_id FROM partie_enregistree WHERE mail = ? AND mdp = ?');
                $req -> execute(array($data -> mail, $data -> mdp));
                $res = $req -> fetch(PDO::FETCH_OBJ);

                if(!$res) {

                    $niveau = ($data -> rect_id)? $data -> rect_id : '';
                    $partie = ($data -> partie)? $data -> partie : '';
                    $pile = ($data -> pile)? $data -> pile : '';

                    $req = $db -> prepare('INSERT INTO partie_enregistree VALUES(NULL,?,?,?,?,?)');
                    $req -> execute(array($data -> mail, $data -> mdp, $partie, $pile, $niveau));
                    $_SESSION['user'] = $data -> mail;

                } else {

                    $niveau = ($data -> rect_id)? $data -> rect_id : $res -> rect_id;
                    $partie = ($data -> partie)? $data -> partie : $res -> partie;
                    $pile = ($data -> pile)? $data -> pile : $res -> pile;

                    $req = $db -> prepare('UPDATE partie_enregistree SET partie = ?, pile = ?, rect_id = ? WHERE mail = ? AND mdp = ?');
                    $req -> execute(array($partie, $pile, $niveau, $data -> mail, $data -> mdp));
                    $_SESSION['user'] = $data -> mail;
                }

                if($data -> commande == 'save') echo 'success';
                else echo '_success_';

            } elseif($data -> commande == 'previousGame') {

                $req = $db -> prepare('SELECT id FROM partie_enregistree WHERE mail = ? AND mdp = ?');
                $req -> execute(array($data -> mail, $data -> mdp));
                $res = $req -> fetch(PDO::FETCH_OBJ);

                if($res) {
                    $_SESSION['user'] = $data -> mail;
                    echo 'ok';
                } else {
                    echo 'no';
                }
            }

        } elseif($data -> param == 'isUserConnected') {

            if(!isset($_SESSION['user'])) echo 'no!';
            else {
                $req = $db -> prepare('UPDATE partie_enregistree SET partie = ?, pile = ?, rect_id = ? WHERE mail = ?');
                $req -> execute(array($data -> partie, $data -> pile,$data-> rect_id, $_SESSION['user']));
                echo 'yes';
            }

        } elseif($data -> param == 'previousGame') {

            if(!isset($_SESSION['user'])) echo 'no!';
            else {
                $req = $db -> prepare('SELECT partie, pile, rect_id FROM partie_enregistree WHERE mail = ?');
                $req -> execute(array($_SESSION['user']));
                $res = $req -> fetch(PDO::FETCH_OBJ);
                echo $res -> partie.'~'.$res -> pile.'~'.$res -> rect_id;
            }

        } elseif($data -> param == 'check') {
            $req = $db -> prepare('SELECT mdp FROM partie_enregistree WHERE mail = ?');
            $req -> execute(array($data -> mail));
            $res = $req -> fetch(PDO::FETCH_OBJ);

            if($res) {if($res -> mdp == $data -> mdp) echo 'can go'; else echo 'can not go';}
            else echo 'can go';
        }
        //------------ NETWORKING GAME SECTION -------//
        elseif ($data -> param == 'salon') {
            $req = $db -> prepare('INSERT INTO salon VALUES(?,?,?,?,?)');
            $req -> execute(array($_SESSION['user'], $data -> nb_block, '','',''));
            echo 'we can go';
        } elseif ($data -> param == 'battle') {
            $req = $db -> prepare('UPDATE salon SET candidat = ? WHERE salon = ?');
            $req -> execute(array($_SESSION['user'], explode(' ', $data -> data)[1] ));
            echo 'candidat';
        }
    }


if(isset($_GET['param'] )) {
    if( $_GET['param'] == 'param')  if(!isset($_SESSION['user'])) echo 'no';
    if( $_GET['param'] == 'delete_salon') {
        $req = $db -> prepare('DELETE FROM salon WHERE salon = ?');
        $req -> execute(array($_SESSION['user']));
    }
    elseif ($_GET['param'] == 'fetch_available_salon') {
        $req = $db -> query('SELECT salon, nb_block FROM Salon');

        $str = '';
        while($res =  $req -> fetch(PDO::FETCH_OBJ)) {
            if($str == '') $str = json_encode($res);
             else $str = json_encode($res).'~'.$str;
        }
        echo $str;
    } elseif ($_GET['param'] == 'available_gamer') {
        $req = $db -> prepare('SELECT candidat FROM salon WHERE salon = ?');
        $req -> execute(array($_SESSION['user']));
        $res = $req -> fetch();
        print_r($res['candidat']);
    } elseif ($_GET['param'] == 'ready') {
        $req = $db -> prepare('UPDATE salon SET pret = "ready" WHERE salon = ?');
        $req -> execute(array($_SESSION['user']));
        echo 'ready';
    } elseif ($_GET['param'] == 'isHeAgree') {
        $req = $db -> prepare('SELECT pret FROM salon WHERE salon = ?');
        $req -> execute(array($_GET['player']));
        $res = $req -> fetch();
        if($res['pret'] != '' and $res['pret'] == 'ready') {
            echo 'ready';
        }
    } elseif($_GET['param'] == 'i won') {
        $req = $db -> prepare('UPDATE salon SET victoire = ? WHERE salon = ?');
        
        $req -> execute(array($_SESSION['user'], $_SESSION['user']));
        echo 'you won';


    } elseif($_GET['param'] == 'i win') {
        $req = $db -> prepare('UPDATE salon SET victoire = ? WHERE salon = ?');
        $req -> execute(array($_SESSION['user'], $_GET['player']));
        echo 'you won';


    } elseif ($_GET['param'] == 'winner') {
        $req = $db -> prepare('SELECT victoire FROM salon WHERE salon = ?');
        $req -> execute(array($_GET['player']));
        $res = $req -> fetch();
        if($res['victoire'] == $_SESSION['user']) echo 'me';
        elseif($res['victoire'] == $_GET['player']) echo 'no you';
    } elseif ($_GET['param'] == 'win') {
        $req = $db -> prepare('SELECT victoire, candidat FROM salon WHERE salon = ?');
        $req -> execute(array($_SESSION['user']));
        $res = $req -> fetch();
        if($res['victoire'] == $_SESSION['user']) echo 'me';
        elseif($res['victoire'] == $res['candidat']) echo 'no you';
    }

}

} catch (\Throwable $th) {
    throw $th;
}
?>