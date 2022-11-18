<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
    <link rel="stylesheet" href="asset/css/online.css">
</head>
<body>
    <div class="onlinegame" id="onlinegameFirst">
        <div class="gamersList">

            <div class = "menu_button_container">
                <div class="container" id="acceuil">
                    
                    <div class="Conline_button" id="menu_button">
                        <h1>Versus</h1>
                        <div class="online_button"><span>Rejoindre un salon</span></div>
                        <div class="online_button" id="create_game_area"><span>Cree un salon</span></div>
                        <div class="online_button"><span>Annuler</span></div>
                    </div>
                </div>
                <div class="_container_" id="nb_block">
                     <h1>Versus</h1>
                    <div class="Conline_button">
                        <div class=""><span>Nombre de blocks</span></div>
                        <div class="online_button _nb_block_" ><span id ="decremente"><</span><span id="_nb_block_">3</span><span id ="incremente">></span></div>
                        <div style="display: flex;" class="fictif">
                            <div class="online_button" id="back_from_nb_block"><span>Annuler</span></div>
                            <div class="online_button" id = 'go'><span>Go!</span></div>
                        </div>
                        
                    </div>
                </div>
            </div>
    </div>
    </div>
    <div class="onlinegame">
        <div class="gamersList">
            <div class="container" id="rejoindre_salon">
                <br/>
                <h2>En attente d'un joueur</h2>
                <div class="Conline_button liste_salon_dispo">


                    <div style="display: flex;" class="fictif">
                        <div class="online_button" id="retour"><span>Retour</span></div>
                        <div class="online_button" id = 'battle'><span>Battle</span></div>
                    </div>
                </div>
        </div>
    </div>
    </div>
    <script>
        document.querySelectorAll('.online_button span')[2].addEventListener('click', function() {
            document.querySelector('#acceuil').style.animation = 'desapear-zoom-out 0.4s ease  forwards';
            document.querySelector('#rejoindre_salon').style.animation = 'apear-zoom-out 0.4s ease  forwards';
        })

        document.querySelector('#retour').addEventListener('click', function() {
            document.querySelector('#acceuil').style.animation = 'apear-zoom-in 0.4s ease  forwards';
            document.querySelector('#rejoindre_salon').style.animation = 'desapear-zoom-in 0.4s ease  forwards';

        })
        document.querySelector('#create_game_area').addEventListener('click', function() {
            document.querySelector('#nb_block').style.animation = 'move-to-left_2 0.4s ease forwards';
            document.querySelector('#menu_button').style.animation = 'move-to-left_1 0.4s ease forwards';

        })
        document.querySelector('#back_from_nb_block').addEventListener('click', function() {
            document.querySelector('#nb_block').style.animation = 'move-to-right_2 0.4s ease forwards';
            document.querySelector('#menu_button').style.animation = 'move-to-right_1 0.4s ease forwards';

        })
       document.querySelector('#incremente').onclick = () => {
        if(Number(document.querySelector('#_nb_block_').innerText) >= 3)
        {
            if(Number(document.querySelector('#_nb_block_').innerText) === 8) return;
            document.querySelector('#_nb_block_').innerText = Number(document.querySelector('#_nb_block_').innerText) + 1;
        }
       
       }
       document.querySelector('#decremente').onclick = () => {
        if(Number(document.querySelector('#_nb_block_').innerText) <= 8)
        {
            if(Number(document.querySelector('#_nb_block_').innerText) === 3) return;
            document.querySelector('#_nb_block_').innerText = Number(document.querySelector('#_nb_block_').innerText) - 1;
        }

       }
    </script>
</body>
</html>