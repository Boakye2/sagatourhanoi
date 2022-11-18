<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title></title>

    <link rel="stylesheet" href="asset/css/style.css" id="css">

    <style>
        .error_anim {

            animation: error_anim 0.2s ease 4;
            color: red !important;
        }
        @keyframes error_anim {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        .apear {
            display: block !important;
            top: 0 !important;
            opacity: 1 !important;
            transition: 0.5s;
        }

        .hide{
            top: -100%;
            opacity: 0;
        }
        .show{
            top: 0 !important;
            opacity: 1 !important;
        }

        .connexion {
            top: -100%;
            opacity: 0;
            display: none;
            position: absolute;
            width: 100vw;
            height: 100vh;
            transition: 0.5s;
        }
        #win {
            background: #00000088 !important;
        }
        .win, #win{
            top: -100%;
            color: yellow;
            font-weight: bolder;
            opacity: 0;
            position: absolute;
            width: 100vw;
            height: 100vh;
            background-color: #00000088;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: 0.5s;
        }

        .win-content{

            width: 350px;
            height: 250px;
            background-color: white;
            display: flex;
            flex-direction: column;
            align-items: center;
            border-radius:10px ;
            transition: .7s;
            background-image: url("./asset/img/pop-up.jpeg");
            background-repeat: no-repeat;
            background-size: cover;
        }
        .confirm{
            align-self: end;
            position: relative;
            top: 100px;
            bottom: 50px;
            right: 20px;

            color: black;
            font-weight: bolder;
            border-radius: 15px;
            letter-spacing: 0.15em;
            border: none;
           background-color: rgb(255 255 255);
           cursor: pointer;
        }
        .win form{
            color: inherit;
            position: relative;
            top: 40px;
        }
        form input{
            border-radius: 15px;
            padding: 7px;
            background-color: rgb(255 255 255);
            outline: none;
            border: none;

        }
        form label{
            position: relative;
            left: 20%;
            transition: 0.5s;
            top: 0;
        }
        .up{
            top:-22px;
        }
    </style>
</head>
<body>

    <div class="imgs" style="display: none;">
        <img id="scleback" src="./asset/img/backgound.jpeg" alt="soclebg">
        <img id="block" src="./asset/img/block.jpeg" alt="block">
        <img id="bg_canvas" src="./asset/img/clair.jpeg">
    </div>
    <div class="tambour">

        <div class="head">
            <h1><span>SAGA</span><br/>Tour d'hanoi</h1>
        </div>

        <div class="HOME">
            <div class="buttons buttons_home">
                <div class="button"><button id="jouer">Jouer</button></div>
                <div class="button login" style="display:none;"><button id="login">Se connecter</button></div>
                <div class="button"><button id="score">Score</button></div>
                <div class="button"><a href = "./train.php"><button id="aide">Aide</button></a></div>
            </div>
            <label for="sound" id="_sound">Son</label>
            <div class="parameters">
                <p><img src="asset/img/propos.jpeg" alt="" id="propos"></p>

                <input type="checkbox" id ="sound">
                <p><img src="asset/img/share.jpeg" alt="" id="share"></p>
            </div>
            <div class="flags">
                <p><img src="asset/img/america.png" id="eng" alt=""></p>
                <p><img src="asset/img/france.png" id="fr" alt=""></p>
            </div>
        </div>

        <div class="want_to_play" style="display: none;">
            <div class="buttons" >
                <div class="button"><button id="new_game">Nouveau jeux</button></div>
                <div class="button"><button id="again">Reprendre la partie</button></div>
                <div class="button"><button id="online">Jouer en ligne</button></div>
                <div class="button"><button onclick= "document.querySelector('#back').click();" id="_back">Retour</button></div>
            </div>
        </div>
        <div class="levels" style="display:none;">
            <div class="level_label">
                <h1 >Facile</h1>
                <h1 id="normal">Normal</h1>
                <h1 id="hard">Difficile</h1>
            </div>
            <div class="level_button" id="level_button_div_1">
                <div class="button"><button id="3" class="level _3" >3 <br/>Cylindres</button></div>
                <div class="button"><button id="5" class="level _5">5 <br/>Cylindres</button></div>
                <div class="button"><button id="7" class="level _7">7 <br/>Cylindres</button></div>
            </div>
            <div  class="level_button" id="level_button_div_2">
                <div class="button"><button id="4" class="level _4">4<br/>Cylindres</button></div>
                <div class="button"><button id="6" class="level _6">6<br/>Cylindres</button></div>
                <div class="button"><button id="8" class="level _8">8<br/>Cylindres</button></div>
            </div>
        </div>
    </div>
    <div class="clair" style="display: none;">
        <div class="game_area">
            <div class="title">
                <h1 id="saga"><span>SAGA</span><br/>Tour d'hanoi</h1>
                <h1 class="time">
                    <span>0</span><span>0</span>
                    :
                    <span>0</span><span>0</span>
                </h1>
                <div id="pause"><span id="_pause">II</span></div>
                <h1 class="move">Deplacement : <span>0</span></span><br/>
                    minimum : <span>80<span></h1>
            </div>
        <main class="game">
        <canvas width="800" height="480"> <!-- game are here --> </canvas>
        <div class="win">
            <div class="win-content">
                <h3>Terminer</h3>
                <div class="total-point point"> </div>
                <form action="#">
                    <label for="nom">Nom</label>
                    <input id="nom" name="nom" type="text">
                </form>
                <input type="button" class="confirm" value="OK">
            </div>
        </div>

    </main>

    <div class="connect">
    <div class="connexion">
           `<!-- Section: Design Block -->
      <section class="background-radial-gradient overflow-hidden">
        <style>
          .background-radial-gradient {
            background-color: hsl(218, 41%, 15%);
            background-image: url('asset/img/clair.jpeg');
            background-size: cover;
          }

          #radius-shape-1 {
            height: 220px;
            width: 220px;
            top: -60px;
            left: -130px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          #radius-shape-2 {
            border-radius: 38% 62% 63% 37% / 70% 33% 67% 30%;
            bottom: -60px;
            right: -110px;
            width: 300px;
            height: 300px;
            background: radial-gradient(#44006b, #ad1fff);
            overflow: hidden;
          }

          .bg-glass {
            background-color: hsla(0, 0%, 100%, 0.9) !important;
            backdrop-filter: saturate(200%) blur(25px);
          }
        </style>

        <div class="container px-4 py-5 px-md-5 text-center text-lg-start my-5">
          <div class="row gx-lg-5 align-items-center mb-5">
            <div class="col-lg-6 mb-5 mb-lg-0" style="z-index: 10">
              <h1 class="my-5 display-5 fw-bold ls-tight" style="color: hsl(218, 81%, 95%);text-shadow: 1px 1px 1px black;">
                SAGA TOUR d'HANOI <br />
                <span style="color: hsl(218, 81%, 75%)">releve le defis</span>
              </h1>
              <p class="mb-4 opacity-70 info" style="color: hsl(218, 81%, 85%);text-shadow: 1px 1px 1px black;">
                Connectez vous ou cr&eacute;e un compte pour syncroniser vos progression. et debloquer
                d'autres fonctionnalit&eacute;es
              </p>
                <div style="display:flex">
                    <button type="submit" class="btn btn-secondary btn-block mb-4 annuler" style="width: 200px; margin-left:30%;">
                        Annuler
                    </button>

                </div>
            </div>

            <div class="col-lg-6 mb-5 mb-lg-0 position-relative">
              <div id="radius-shape-1" class="position-absolute rounded-circle shadow-5-strong"></div>
              <div id="radius-shape-2" class="position-absolute shadow-5-strong"></div>

              <div class="card bg-glass">
                <div class="card-body px-4 py-5 px-md-5">

                    <!-- Email input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example3">Non d'utilisateur</label>
                        <input type="text" id="form3Example3" class="form-control mail" />
                    </div>

                    <!-- Password input -->
                    <div class="form-outline mb-4">
                        <label class="form-label" for="form3Example4">Mot de passe</label>
                        <input type="password" id="form3Example4" class="form-control mdp" />
                    </div>

                    <!-- Submit button -->
                    <div style="display:flex">
                    <button type="submit" class="btn btn-primary btn-block mb-4 submit">
                        Connexion
                    </button>

                    </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <!-- Section: Design Block -->`;
    </div>
    </div>

    <div id="win">
        <div class="pauseButton">
                <h1>Pause</h1>
                <div class="__">
                <div class="button" id="continue_to_play"><button>Reprendre le jeux</button></div>
                <div class="normal_game">
                    <div class="button " id="saveGame"><button>Enregistrer la partie</button></div>
                    <div class="button niv "><button>Aller &agrave; la selection de niveau</button></div>
                    <div class="button menu"><button>Aller au menu principal</button></div>
                </div>
                    <div class="leave_the_partie" style="display: none";>
                        <div class="button leave"><button>Abandonn&eacute;e la partie</button></div>
                    </div>
        </div>

    </div>
    </div>

    </div>
    </div>
    <div class="sombre">
        <div class="score" style="display:none">
        <h1 id="classement">Classement</h1>
        <div class="sscore">

            <div class="_level">
                <h1>Facile</h1>

                <h1>Normal</h1>

                <h1>Difficile</h1>
            </div>
            <div class="_level">
                <div class="facile"></div>
                <div class="normal"></div>
                <div class="difficile"></div>
            </div>
        </div>
        </div>
       <div class="aide" style="display: none;">
            <h1 id="help_title">Aide</h1>
           <div class="train">
               <div class="imgs" style="display: none;">
                   <img id="scleback" src="./asset/img/backgound.jpeg" alt="soclebg">
                   <img id="block" src="./asset/img/block.jpeg" alt="block">
               </div>
               <main>
                   <div class="select-level">
                       <input type="number" name="level" value="3" id="slevel" max="8" min="3">
                   </div>
                   <canvas width="800" height="480" style="border: 1px solid black;" id="train_canvas">
                       Hanoi game
                   </canvas>
                   <div>
                       <button id="reset">Reset</button>
                       <button id="demo">Demo</button>
                   </div>
               </main>
           </div>
       </div>
       <div class="propos" style="display: none;">
            <div class="author_title"><h1>Cr&eacute;ateur de saga tour d'hanoi</h1></div>
            <div class="author">

                <div style="display:flex;">
                    <div class="a_droite">
                        <label for="" style="float:right;">N'guetta Nana</label>
                        <img src="asset/img/nguetta.jpeg" alt="" srcset="" class="author_img">
                    </div>
                    <div class="vers_la_gauche">
                        <label for="" style="float:right;">Aba Achi Serge</label>
                        <img src="asset/img/aba.jpeg" alt="serge" srcset="" class="author_img">
                    </div>
                </div>
                <div style="display:flex;">
                    <div class="a_droite">
                        <label for="" style="float:right;">Kane Hamidou</label>
                        <img src="asset/img/kane.jpeg" alt="" srcset="" class="author_img">
                    </div>
                    <div class="vers_la_gauche">
                        <label for="" style="float:right;">Akpro Florent</label>
                        <img src="asset/img/freeman.jpg" alt="serge" srcset="" class="author_img"
                        
                        style="margin-top: 40px; margin-left: 50px;">
                    </div>
                </div>
               <h1 class="annee">2022</h1>
            </div>
       </div>
       <div class="button" id="back" style="display:none;"><button id="aide">Retour</button></div>
    </div>

    <!--  ======  Versus  ======== -->

    <div class="versus" style="display: none;">
    <div class="onlinegame" id="onlinegameFirst">
        <div class="gamersList">

            <div class = "menu_button_container">
                <div class="container" id="acceuil">

                    <div class="Conline_button" id="menu_button">
                        <h1>Versus</h1>
                        <div class="online_button" id="get_into_salon"><span>Rejoindre un salon</span></div>
                        <div class="online_button" id="create_game_area"><span>Cree un salon</span></div>
                        <div class="online_button" id="above_versus"><span>Annuler</span></div>
                    </div>
                </div>
                <div class="_container_" id="nb_block">
                     <h1>Versus</h1>
                    <div class="Conline_button">
                        <div class=""><span>Nombres de blocks</span></div>
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

        </div>
    </div>
    </div>

</div>

    <script src="asset/vendor/jquery/jquery.min.js"></script>
    <script src="./confetti.js"></script>
    <script src = 'asset/vendor/bootstrap/js/bootstrap.js'></script>
    <!-- Core plugin JavaScript-->
    <script src="asset/vendor/jquery-easing/jquery.easing.min.js"></script>

    <script src="asset/script/sb-admin-2.min.js"></script>
<!--    <script src="asset/script/train.js"> </script>-->
    
    <script src="asset/script/script.js" id="js"></script>
    <script src="asset/script/en_ligne.js"></script>
    <script>
        let input = document.querySelector(".win input");
        let label = document.querySelector(".win label");
        let okButton = document.querySelector(".confirm");
        let win = document.body.querySelector(".win");
        input.addEventListener("focus",function(){
           label.classList.add("up");
        });
        input.addEventListener("blur",function(){
            if(input.value === "")
                label.classList.remove("up")
        });
        okButton.addEventListener("click",function(){
            win.classList.remove('show');
        });

    </script>
</body>
</html>
