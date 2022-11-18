// ----- Script pour le jeux sur le reseau ------- //

// au chargement de la page on envoie une requete au serveur
// pour voir si l'utilisateur est connecter en vue d'afficher ou non le bouton de connexion


document.querySelector('#online').addEventListener('click', function(){
    xhr.open('GET', 'manager.php?param=param', true)
    xhr.send();
    xhr.onreadystatechange = function() {
    if(xhr.readyState === 4) {
        if(xhr.responseText === 'no') document.querySelector('#login').click();
        else {
            document.body.style.background = 'url("./asset/img/clair.jpeg") no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.querySelector('#css').setAttribute('href', 'asset/css/online.css');
            document.querySelector('.head').style.display = 'none';
            for(let i = 0; i < elTab.length; i++) {
                if(elTab[i] !== document.querySelector('.versus')) {
                    elTab[i].style.display = 'none';
                } else {
                    elTab[i].style.display = '';
                }
            }
            pile_des_pagesPrecedentes.push(["document.querySelector('.head').style.display = ''",
            `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
            document.querySelector('.HOME')])     
        }
    }
   }
})

document.querySelector('#login').onclick = function() {
   document.querySelector('#again').click();
   pile_des_pagesPrecedentes.push(["document.querySelector('.head').style.display = ''",
   `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
   document.querySelector('.HOME')])     
   setTimeout(() => commande = 'login', 300);
}

document.querySelector('#above_versus').addEventListener('click', function(){
    document.querySelector('#back').click();
})

// === Transitions animations ===
function trans() { // trans for transition
    document.querySelector('#acceuil').style.animation = 'desapear-zoom-out 0.4s ease  forwards';
    document.querySelector('#rejoindre_salon').style.animation = 'apear-zoom-out 0.4s ease  forwards';
    document.querySelector('#nb_block').style.animation = 'desapear-zoom-out 0.4s ease  forwards';
}
let memory_table =[];
let _interval_ = null;
let el_tab = [];
let eltab = [];
let to_main_menu = 0;
function available_salon() {

    _interval_ = setInterval(() => {
        xhr.open('GET', 'manager.php?param=fetch_available_salon', true);
        xhr.send();
        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                if (xhr.responseText !== '') {
                    eltab = document.querySelectorAll('.__ span');
                    memory_table = [];
                    for(let i = 0; i < eltab.length; i++) {
                        memory_table.push(eltab[i].innerText);
                    }
                    for (let obj of xhr.responseText.split('~')) {

                        if (memory_table.includes(JSON.parse(obj).salon)) return;
                        else {
                            let div = document.createElement('div');
                            div.classList.add('online_button');
                            div.classList.add('__');
                            let span = document.createElement('span');
                            ({salon: span.innerText, nb_block: span.id} = JSON.parse(obj));
                            span.id += ' ' + JSON.parse(obj).salon;
                            div.append(span);

                            document.querySelector('#rejoindre_salon').insertBefore(div, document.querySelector('.liste_salon_dispo'));
                            memory_table.push(JSON.parse(obj).salon);
                        }
                    }
                    el_tab = document.querySelectorAll('.__ span');
                    candidat()
                    let counter = 0;
                    for(let i = 0; i < el_tab.length; i ++) {
                        counter = 0;
                        for(let obj of xhr.responseText.split('~')) {
                            if(el_tab[i].innerText !== JSON.parse(obj).salon) {
                                counter += 1;
                            }
                        }
                        if(counter ===  xhr.responseText.split('~').length) el_tab[i].remove();
                    }


            } else {retour()}
            }
        }
    }, 500);

}

function retour() {

    document.querySelector('#rejoindre_salon').innerHTML = `
                    
                    <h2 id="purpose_title">Salons disponibles</h2>
                    
                    <div class="Conline_button liste_salon_dispo">
                    
                        <div style="display: flex;" class="fictif" >
                            <div class="online_button" id="retour"><span>Retour</span></div>
                        </div>
                        
                    </div>`;
                    goback();
}

document.querySelector('#get_into_salon').addEventListener('click', () => {
    retour();
    trans();
    available_salon();

})

function goback() {
    document.querySelector('#retour').addEventListener('click', function () {
        document.querySelector('#acceuil').style.animation = 'apear-zoom-in 0.4s ease  forwards';
        document.querySelector('#rejoindre_salon').style.animation = 'desapear-zoom-in 0.4s ease  forwards';
        document.querySelector('#nb_block').style.opacity = 0;
        memory_table = [];
        clearInterval(_interval_);
        clearInterval($_interval_);

    })
}
document.querySelector('#go').addEventListener('click', function() {
    let data = {
        param : 'salon',
        nb_block : Number(document.querySelector('#_nb_block_').innerText)
    }
     
    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
            if (xhr.responseText === 'we can go') {
                document.querySelector('#rejoindre_salon').innerHTML = `
                    <br/>
                    <h2 id="purpose_title">En attente d'un joueur</h2>
                    <div class="Conline_button liste_salon_dispo">
    
                        <div style="display: flex;" class="fictif">
                            <div class="online_button" id="retour"><span>Retour</span></div>
                            <div class="online_button" id = 'battle'><span>Battle</span></div>
                        </div>
                    </div>`;
                document.querySelector('#battle').addEventListener('click', () => {
                    if(document.querySelector('#gamer')) {
                        xhr.open('GET', 'manager.php?param=ready', true);
                        xhr.send();
                        xhr.onreadystatechange = () => {
                            if(xhr.readyState === 4) {
                                if(xhr.responseText === 'ready') {
                                    setTimeout(() => {
                                        document.querySelector('#css').setAttribute('href', 'asset/css/style.css');
                                        one = 'i won';
                                        two = null;
                                        document.querySelector('._' + document.querySelector('#_nb_block_').innerText).click();
                                        whoWon('win')
                                        clearInterval($interval);
                                        document.querySelector('.normal_game').style.display = 'none';
                                        document.querySelector('.leave_the_partie').style.display = 'block';
                                        document.querySelector('#win').classList.remove('show');
                                        to_main_menu = 1;

                                    }, 1000);
                                }
                            }
                        }
                    }
                })

                document.querySelector('#retour').addEventListener('click', function () {
                    document.querySelector('#acceuil').style.animation = 'apear-zoom-in 0.4s ease  forwards';
                    document.querySelector('#rejoindre_salon').style.animation = 'desapear-zoom-in 0.4s ease  forwards';
                    document.querySelector('#nb_block').style.animation = 'apear-zoom-in 0.4s ease  forwards';
                    document.querySelector('#create_game_area').click();
                    clearInterval($interval);
                    bool = true;
                    xhr.open('GET', 'manager.php?param=delete_salon', true);
                    xhr.send(); // kill game area after left it

                })

                trans()
                available_gamers();

            }
        }
    }

})
let $interval;
function available_gamers() {
    $interval = setInterval(() => {
        xhr.open('GET', 'manager.php?param=available_gamer', true)
        xhr.send();

        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.responseText !== '' && bool === true) {
                    let span = document.createElement('span');
                    span.id = 'gamer';
                    span.innerText = xhr.responseText + ' veut jouer avec vous';
                    document.querySelector('#rejoindre_salon').insertBefore(span, document.querySelector('.liste_salon_dispo'))
                    bool = false;
                }
            }
        }

    }, 1000)
}
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
    if(Number(document.querySelector('#_nb_block_').innerText) == 8) return;
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
let memoryNbBlock = null;
let memoryOtherPlayer = null;
function candidat() {

    for(let el of el_tab) {
        el.addEventListener('click', (e) => {
            xhr.open('POST', 'manager.php', true);
            xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
            xhr.send(JSON.stringify({
                param: 'battle',
                data:  e.target.id
            }));
            memoryNbBlock = e.target.id.split(' ')[0];
            memoryOtherPlayer = e.target.id.split(' ')[1]
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    // let memoryState = document.querySelector('#rejoindre_salon').innerHTML;
                    // document.querySelector('#rejoindre_salon').innerHTML = '<br/><br/> <p>Votre demande a été' +
                    //     ' envoyée, vous serez redirigé dans l\'espace de jeux, quand elle sera acceptée</p>';
                    //
                    // setTimeout(() => {
                    //     document.querySelector('#rejoindre_salon').innerHTML = memoryState;
                    //     goback();
                    //     candidat();
                    // }, 7000);
                    isAnotherPlayerAcceptedMyRequest();

                }
            }
        })
    }
}
let _$interval = null;
let final_result = null;
function whoWon(param_one, param_two = null) {
    _$interval = setInterval(() => {
        xhr.open('GET', `manager.php?param=${param_one}&player=${param_two}`, true)
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4) {
                if(xhr.responseText !== '') {

                    switch (xhr.responseText) {
                        case 'me' :
                            final_result = 'Felicitation vous avez gagner';
                            break;
                        default :
                            final_result = 'Desole vous avez perdu';
                            break;
                    }

                    memoryContent = document.querySelector('.win-content form').innerHTML
                    document.querySelector('.win-content form').innerHTML = final_result;
                    document.querySelector('.win').classList.add('show');
                    ok_button = 'online_game';
                    clearInterval(_$interval);
                    clearInterval(interval);
                    clearInterval(timeCountInterval);
                }
            }
        }
    }, 1000);
}
let $_interval_ = null;
function isAnotherPlayerAcceptedMyRequest() {
    $_interval_ = setInterval(() => {
        xhr.open('GET', `manager.php?param=isHeAgree&player=${memoryOtherPlayer}`, true)
        xhr.send();
        xhr.onreadystatechange = () => {
            if(xhr.readyState === 4){
                if(xhr.responseText === 'ready') {
                    document.querySelector('#css').setAttribute('href', 'asset/css/style.css');
                    one = 'i win';
                    two = memoryOtherPlayer;
                    document.querySelector('._' + memoryNbBlock).click();
                    whoWon('winner', memoryOtherPlayer);
                    clearInterval($_interval_)
                    clearInterval(_interval_)
                    document.querySelector('.normal_game').style.display = 'none';
                    document.querySelector('.leave_the_partie').style.display = 'block';
                    document.querySelector('#win').classList.remove('show');

                }
            }
        }
    }, 400);
}

document.querySelector('.leave').addEventListener('click', () => {
    document.querySelector('#online').click();
    document.querySelector('#retour').click();
    document.querySelector('.time').innerHTML = '<span>0</span><span>0</span>\n' +
        '                    :\n' +
        '                    <span>0</span><span>0</span>'
    if(to_main_menu) document.querySelector('#back_from_nb_block').click();
})
// === End of transition animation ===


let eng_table = {
    'Jouer': 'Play',
    'Score': 'Score',
    'Aide': 'Help',
    'Retour': 'back',
    'Nouveau jeux': 'New game',
    'Reprendre la partie': 'Continue',
    'Jouer en ligne': 'Versus',
    'Facile': 'Easy',
    'Normal': 'Normal',
    'Difficile': 'Hard',
    'Deplacements': 'moving',
    'minimum': 'minimum',
    'Reprendre le jeux': 'Continue',
    'Enregistrer la partie': 'Save the party',
    'Aller à la selection de niveau': 'Go to level selection menu',
    'Aller au menu principal': 'Main menu',
    'releve le defis': 'Try to win !',
    'Connectez vous ou crée un compte pour syncroniser vos progression. et debloquer d\'autres fonctionnalitées': 'get connected to unlock more functionality',
    'Annuler': 'Above',
    'Connexion': 'Sign up',
    'Mail': 'Mail',
    'Mot de passe': 'Password',
    'Rejoindre un salon': 'get into game room',
    'Cree un salon': 'Create game room',
    'Salon disponibles': 'Availables Room',
    'Nombres de blocks': 'Cylinders number',
    'En attente d\'un joueur': 'Waiting for a player',
    'Classement': 'Ranking',
    'Son': 'Sound',
    'Créateur de saga tour d\'hanoi': 'Creator of Hanoi SAGA TOUR',
    'Pause': 'Stop',

}

function switchLangToEng(tab) {
    for(let i = 0; i<tab.length; i++) {
          for(let el of document.querySelectorAll(tab[i])) {
              if(Object.keys(eng_table).includes(el.innerText)) el.innerText = eng_table[el.innerText];
              if(el.innerText.split(' ').includes('Cylindres')) el.innerText = el.innerHTML.split(' ')[0]+' \nCylinders';
  }
    }
      document.querySelector('.move').innerHTML = `Moving : <span>0</span></span><br/>
                      minimum : <span>80<span>`;
  }

  let $ = 0;

function switchLangToFr(tab) {
    keyTable = Object.entries(eng_table);
    for(let i = 0; i<tab.length; i++) {
          for(let el of document.querySelectorAll(tab[i])) {
                for(let tab of keyTable) {
                    if(tab.includes(el.innerText)) el.innerText = tab[0];
                }
              if(el.innerText.split(' ').includes('Cylinders')) el.innerText = el.innerHTML.split(' ')[0]+' \nCylindres';
  }
    }
      document.querySelector('.move').innerHTML = `Deplacements : <span>0</span></span><br/>
                      minimun : <span>80<span>`;
  }



document.querySelector('#eng').onclick = () => {
    switchLangToEng(['button', 'span', 'h1', 'h2', 'label']);
}
document.querySelector('#fr').onclick = () => {
    switchLangToFr(['button', 'span', 'h1', 'h2', 'label'])
}
