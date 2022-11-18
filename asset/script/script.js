let elTab = [document.querySelector('.HOME'), document.querySelector('.want_to_play'),
                document.querySelector('.levels'), document.querySelector('.clair'),
                document.querySelector('.score'), document.querySelector('.aide'),
                document.querySelector('.propos'), document.querySelector('.versus'),
                document.querySelector('.train')];

let errorSound = new Audio('asset/music/error.wav');
let blockSound = new Audio();
let winSound = new Audio();
window.onload = () => {
    if(document.querySelector('#sound').checked) {
        blockSound = new Audio('asset/music/block.wav');
        winSound = new Audio('asset/music/applaudissements.wav');
    }
    document.querySelector('#sound').addEventListener('click', (e) => {
        if(e.target.checked) {
            blockSound.src = 'asset/music/block.wav';
            winSound.src = 'asset/music/applaudissements.wav';
        } else {
            blockSound.src = '';
            winSound.src = '';
        }
    })
}
let rect = null;
let canvas = document.body.querySelector('canvas');
let ctx = canvas.getContext("2d");  
let pile_des_pagesPrecedentes = [];
let block_img = document.querySelector("#block");
let pop_background = document.querySelector("#pop");
let socle_img = document.querySelector("#scleback");
let c_background = document.querySelector("#bg_canvas");
let A = null;
let D = null;
let I = null;
let xhr = new XMLHttpRequest();
let interval = null;
let timeCountInterval = null;
let niveau = null;
let time_in_second = 0;
let tableauDisque = [];
let indice = 0; // savoir quoi faire quand on appuie sur retour
let commande = 'save'; // la tache apres la connexion
let annuler = ''; // savoir quoi faire quand on appuie sur annuler
let bool = true;
let _pile_ = '';
let i = 0;
let inner = '';

let wind = {
    w:800,
    h:480
}

function addJSON(pile = null, next = null) {
    if( i < nb_Block - 2) {

        if(bool == true) {
            _pile_ += JSON.stringify( {
                elem : pile.elem,
                id : pile.id,
                next : pile.next,
                rectSelected : pile.rectSelected,
                select : pile.select
            }) + 'sep' + JSON.stringify( {
                elem : pile.h.elem,
                id : pile.h.id,
                rectSelected : pile.h.rectSelected,
                select : pile.h.select
            }) + 'sep';
            bool = false;
        }
        

        _pile_ += JSON.stringify({
            elem : next.elem,
            id : next.id,
            rectSelected : next.rectSelected,
            select : next.select
        }) + 'sep';

        i += 1;

        addJSON(null, next.next);
    } else {bool = true; i = 0; return;}

}


function timeCount() {
    let timeAreaTable = document.querySelectorAll('.time span');
    timeCountInterval = setInterval(() => {
        timeAreaTable[3].innerHTML = Number(timeAreaTable[3].innerHTML) + 1;
        if(Number(timeAreaTable[3].innerHTML) == 10) {
            timeAreaTable[2].innerHTML = Number(timeAreaTable[2].innerHTML) + 1;
            timeAreaTable[3].innerHTML = 0;
            if(Number(timeAreaTable[2].innerHTML) == 6) {
                timeAreaTable[1].innerHTML = Number(timeAreaTable[1].innerHTML) + 1;
                timeAreaTable[2].innerHTML = 0;
                if(Number(timeAreaTable[1].innerHTML) == 9) {
                    timeAreaTable[0].innerHTML = Number(timeAreaTable[0].innerHTML) + 1;
                    timeAreaTable[1].innerHTML = 0;
                    
                }
            }
        }
        time_in_second += 1;
    }, 1000);
} 

function rro(id) { // rro : return right object
    if(id < 8 ) {
        for(let obj of tableauDisque) {
            if(obj.id == id){
                return obj;
            }
        }
    } else {
        for(let obj of tableauSocle) {
            if(obj.id == id){
                return obj;
            }
        }
    }
}

let coup =0;
//tuile represente nos disque
class Tuile {
    /*
    - x: position sur laxe des abscice
    - y: position sur laxe des ordonner
    - w: la largeur du disque 
    - h: la hauteur du disque
    - s: la taille du disque par rapport au premier qui est de taille 1
    - color la couleur
    */ 
    constructor(id = null,x,y,w,h=25,s=null,socle=null,up=null,down=null,
                isSommet=null,click=null,_in=null,pos=null,_self=null)
    {
        this.x =x; 
        this.y =y; 
        this.s = (s == null)? 30 : s;
        this.w = w;
        this.h = h;
        this.socle = (socle == null)? null : socle;
        this.b_x = this.x;
        this.b_y = this.y;
        this.up = (up == null)? null : up; //rectangle au dessu 
        this.down = (down == null)? null : down; // rectangle en dessou
        this.isSommet = (isSommet == null)? false : isSommet;
        this.click = (click == null)? false : click;
        this.in = (_in == null)? false : _in
        this.pos = (pos == null)? false : pos;
        this.self = (_self == null)? false : _self;
        this.id = (id == null)? null : id;
    }
    //dessine le disque
    draw(){
        //ctx.fillStyle = this.color;
        ctx.fillRect(this.x,this.y,this.w,this.h);
        ctx.drawImage(block_img,this.x,this.y,this.w,this.h)
    }
    //deplace le disque
    move(cx,cy){
        this.x = cx;
        this.y = cy;
    }
    //remet a la position anterieur
    roolback(){
        this.x = this.b_x;
        this.y = this.b_y;
        blockSound.play();
    }
    //voir si cest le disque a deplacer
    logic(){ 
        if(this.self && this.isSommet){
            this.move(cx,cy)
        }
        
    }
    
}

//support des disque
class PileDisque{
    constructor(elem){
        this.head = this;
        this.elem = elem;
        this.next = null;
        this.hauteur = 0
        if(elem!==null)
            this.hauteur = 1;
    }
    add(elem){
        let tmp = PileDisque(elem);
        let tete = this.head;
        this.head = tmp;
        tmp.next = tete;

    }
}
class Socle {
    /**
     * 
     * @param {position abscice } x 
     * @param {position ordonner} y 
     * @param {la taille} s 
     * @param {la couleur} color 
     */
    constructor(id = null, x,y,block=4,s=50,color="#000000",self = null, lx = null, ly = null, lh = null
                ,lw = null, pile = null, _in = null, sommet = null, tabSommet = null){

        this.self = (self == null)? false : self;
        this.x = x;
        this.y = y;
        this.s = s;
        this.lx = (lx == null)? x+s : lx;
        this.ly = (ly == null)? y -30*block : ly;
        this.lh = (lh == null)? 30*block : lh;
        this.lw = (lx == null)? 5 : lw;
        this.pile = (pile == null)? 0 : pile;
        this.color = color;
        this.in = (_in == null)? false : _in;
        this.sommet  = (sommet == null)? null : sommet; // le sommet courant du socle
        this.tabSommet = (tabSommet == null)? [] : tabSommet;
        this.id = (id == null)? null : id;
    }

    //verifie si le disque est dans le socle
    insocle(rect){
        if( ((this.lx <= rect.x+rect.w && this.lx >= rect.x) &&(rect.y>this.ly && rect.y < this.ly + this.lh))/*||
        (this.lx <= (rect.x+rect.h)+rect.w && this.lx >= (rect.x+rect.h)) &&( (rect.y+rect.h)>this.ly && (rect.y+rect.h) < this.ly + this.lh)*/)
        {
            this.in = true;
            
        }
        else{
            this.in = false;
           

        }
    }
    //dessine le socle
    draw(){
        let x = this.x;
        let y = this.y;
        let s = this.s;
        ctx.fillStyle = this.color;
        ctx.fillRect(x,y,s*2,5);
        let lx = this.lx;
        let ly = this.ly;
        let lh = this.lh
        let lw = this.lw;
        ctx.fillRect(lx,ly,lw,lh);

    }
    //met le disque dans le socle
    place(rect,init = false,algo=false){
        if(rect == null)
            return
        if(this.sommet!==null){
            let rectSommet = rro(this.sommet);
            if(rectSommet.s < rect.s)
            {
                return;
            }
        }
        if((rect.click === false && (rect.self|| algo))|| init ){
            if(rect.socle !== null){
                let ancienSocle = rro(rect.socle);
                if(ancienSocle === this)
                    return;
                if(rro(rect.socle) !== this){
                    ancienSocle.pile-=1;
                    ancienSocle.tabSommet.pop();
                    ancienSocle.sommet = ancienSocle.tabSommet[ancienSocle.tabSommet.length-1];
                    if(ancienSocle.sommet === undefined)
                        ancienSocle.sommet = null;
                    if(ancienSocle.tabSommet.length === 0)
                        ancienSocle.sommet = null;
                    if(ancienSocle.tabSommet.length > 0)
                        rro(ancienSocle.tabSommet[ancienSocle.tabSommet.length-1]).isSommet = true;
                    this.pile+=1;

                }
            }
            else{
                
                this.pile+=1;
            }
            let x = this.lx - (rect.w/2);
            let y = (this.ly+this.lh) - rect.h*this.pile;
            rect.b_x = x;
            rect.b_y = y;
            rect.socle = this.id;
            if(this.sommet !== null){
                rro(this.sommet).isSommet = false;
            }
            if(init || algo)
                rect.roolback()
            this.sommet = rect.id;
            this.tabSommet.push(this.sommet);
            rect.isSommet = true;
            coup++;
            document.querySelector('.move span').innerText = coup-nb_Block;
                
        }
        //console.log(" x :"+rect.x + "bx "+rect.b_x);
    }
}

//la pile des evenement sur les disque
class PileEvent {
    constructor(elem = null,id = null)
    {
        this.h = this;
        this.id = id;
        this.elem = elem.id;
        this.next = null;
        this.select = false;
        this.rectSelected = null;

    }
    add(elem){
        if(elem !==null){
            let head = this.h;
            let tmp = new PileEvent(elem,head.id+1);
            this.h = tmp;
            tmp.next = head;
        }
    }
    clickdown(cx,cy){
        let ptr = this.h;
        while(ptr!==null){
            rect = rro(ptr.elem);
            
            if(!this.select){
                let x = rect.x;
                let y = rect.y;
                let w = rect.w;
                let h = rect.h;
                // console.log( (offy > y && offy < y+h) )
                if((cx>x && cx < x+w) && (cy > y && cy < y+h) )
                {
                    if(this.rectSelected !== null){
                        rro(this.rectSelected).self = false;
                        //this.rectSelected = null
                    }
                    rect.in = true;
                    rect.self = true;
                    this.rectSelected = rect.id;
                    rectSelect = rro(this.rectSelected);
                    this.select = true;
                }
            }
            ptr = ptr.next;
            
        }
    }
    clickup(){
        this.select = false;
        if(this.rectSelected!==null){
            tableauSocle.forEach(element =>{
                if(rectSelect !== null)
                    element.insocle(rectSelect);
                if(element.in){
                    element.place(rectSelect);
                }
            } );
            rro(this.rectSelected).self =false;
            rectSelect = null; 
            
            rro(this.rectSelected).roolback();
        }
            
    }

}
function parcourEvent(pile){
    if(pile == null){
        console.log("vide");
        return 0;
    }
    let id = 0;
    let active = false;
    let ptr = pile.h;
    while(ptr!==null){
        rect = rro(ptr.elem);
        rect.draw();
        rect.logic();
        ptr = ptr.next;
    }
}

let cx = 0;
let cy = 0;
let rectSelect = null;
//let tableauSocle = [new Socle(25,400),new Socle(250,400),new Socle(450,400)]




//parcour(pile);

let nb_Block = null;
//let tableau = [rect1,rect2,rect3,rect4]
let tableauSocle = [];
let pile = null;
let ok_button = null;
let memoryContent = null;
let one = null; let two = null;
//fonction qui initialise le jeux 
let Game_init = function(tableauDisque) {
    let init = true;
    pile = null;
    
    document.body.addEventListener("keypress",function(e){
        //console.log(e)
        
    });
    tableauDisque.forEach(element => {
        if(init){
            pile = new PileEvent(element,1);
            init = false;
        }else
            pile.add(element);
    })
    for(let i=tableauDisque.length-1;i>=0;i--){
        tableauSocle[0].place(tableauDisque[i],true);
    }
    //parcour(pile);

    //let tableau = [rect1,rect2,rect3,rect4]

     interval = setInterval(function(){
        
        ctx.fillStyle = "#FFFFFF";
        ctx.drawImage(c_background,0,0,wind.w,wind.h)
        //update regle 
        
        tableauSocle.forEach(element => {
            element.draw();
        });
        parcourEvent(pile)
        //console.log(rect1.dir.right);
        if(tableauSocle[2].tabSommet.length >= nb_Block){
            xhr.open('GET', `manager.php?param=${one}&player=${two}`, true);
            xhr.send()
            xhr.onreadystatechange = () => {
                if(xhr.readyState === 4) {
                    if(xhr.responseText === 'you won') {
                        memoryContent = document.querySelector('.win-content form').innerHTML
                        document.querySelector('.win-content form').innerHTML = 'Felicitation ' +
                            'vous avez gagner';
                        document.querySelector('.win').classList.add('show');
                        ok_button = 'online_game';
                        clearInterval(_$interval);
                        clearInterval(interval);
                        clearInterval(timeCountInterval);

                        xhr.open('GET', `mail.php?param=${one}&player=${two}`, true);
                        xhr.send()
                    }
                    else {
                        let inverse_du_temps = 1 / time_in_second;
                        let division_de_coups = 2 ** nb_Block - 1 / Number(document.querySelectorAll('.move span')[1].innerText);
                        let x = inverse_du_temps * division_de_coups;
                        let scorecoeff = null;

                        switch (niveau) {
                            case 'facile' :
                                scorecoeff = 500;
                                break;
                            case 'normal' :
                                scorecoeff = 1000;
                                break;
                            case 'difficile' :
                                scorecoeff = 1500;
                                break;
                        }

                        document.querySelector('.point').innerText = parseInt(x * scorecoeff) + ' points';
                        win.classList.add('show');
                        clearInterval(interval);
                        clearInterval(timeCountInterval);
                    }
                    winSound.play();
                    start();
                    stop();
                }
            }
        }
        
    },1000/60);



        canvas.addEventListener("mousemove",function(e){
            //console.log(e);
            cx = e.offsetX;
            cy = e.offsetY;
            
            //rect1.update(cx,cy)
            //console.log(rect1.in)
        });
        canvas.addEventListener("mousedown",function(){
            
                    pile.clickdown(cx,cy);
        });
        canvas.addEventListener("mouseup",function(){
            
                pile.clickup();
                /*element.stop();
                element.place(t1);*/
                //element.blur()
                
               
            
        });

        timeCount();
}    
function test() {

    interval = setInterval(function(){
        
        ctx.fillStyle = "#FFFFFF";
        ctx.drawImage(c_background,0,0,wind.w,wind.h)
        //update regle 
        
        tableauSocle.forEach(element => {
            element.draw();
        });
        parcourEvent(pile)
        //console.log(rect1.dir.right);
        if(tableauSocle[2].tabSommet.length >= nb_Block){

            let inverse_du_temps = 1/time_in_second;
            let division_de_coups = 2**nb_Block - 1 / Number(document.querySelectorAll('.move span')[1].innerText);
            let x = inverse_du_temps * division_de_coups;
            let scorecoeff = null;

            switch(niveau) {
                case 'facile' :
                    scorecoeff = 500;
                    break;
                case 'normal' :
                    scorecoeff = 1000;
                    break;
                case 'difficile' :
                    scorecoeff = 1500;
                    break;               
            }
            document.querySelector('.point').innerText = parseInt(x * scorecoeff) + ' points';
            win.classList.add('show');
            clearInterval(interval);
            clearInterval(timeCountInterval);

            start();
            stop();
        }
        
    },1000/60);



        canvas.addEventListener("mousemove",function(e){
            //console.log(e);
            cx = e.offsetX;
            cy = e.offsetY;
            
            //rect1.update(cx,cy)
            //console.log(rect1.in)
        });
        canvas.addEventListener("mousedown",function(){
            
                    pile.clickdown(cx,cy);
        });
        canvas.addEventListener("mouseup",function(){
            
                pile.clickup();
                /*element.stop();
                element.place(t1);*/
                //element.blur()
                
               
            
        });

        timeCount();
}

document.querySelector('.head').style.display = '';
document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')";

document.querySelector('#jouer').onclick = () => {
    pile_des_pagesPrecedentes.push(["document.querySelector('.head').style.display = ''",
                                    `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
                                    document.querySelector('.HOME')])                            
    for(let i = 0; i < elTab.length; i++) {
        if(elTab[i] !== document.querySelector('.want_to_play')) {
            elTab[i].style.display = 'none';
        } else {
            elTab[i].style.display = '';
        }
    }
}


//fait une requette pour renseigner les scores enregistres
document.querySelector('#score').onclick = () => {
    document.body.style.overflow = 'auto';
    document.querySelector('.facile').innerText = '';
    document.querySelector('.normal').innerText = '';
    document.querySelector('.difficile').innerText = '';
    let data = {
        param : 'fetch_score'
    }
    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));
    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            let buffer = xhr.responseText.split('~');
            buffer.pop();
            for(let i = 0; i< buffer.length; i++) {
                buffer[i] = JSON.parse(buffer[i]);
                let p = document.createElement('h3');
                p.innerText = buffer[i].nom + ' : ' + buffer[i].score + ' points';
                p.style.color = 'yellow';

                switch(buffer[i].niveau) {
                    case 'facile' :
                        document.querySelector('.facile').appendChild(p);
                        break;
                    case 'normal' :
                        document.querySelector('.normal').appendChild(p);
                        break;
                    case 'difficile' :
                        document.querySelector('.difficile').appendChild(p);
                        break;
                    default :
                        break;
                }
            }
          
        }
    }

    document.querySelector('.head').style.display = 'none';
    document.body.style.background = 'url("./asset/img/sombre.jpeg")';

    pile_des_pagesPrecedentes.push([`document.querySelector('.head').style.display = ''`,
                                    `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
                                    document.querySelector('.HOME')])   

    for(let i = 0; i < elTab.length; i++) {
        if(elTab[i] !== document.querySelector('.score')) {
            elTab[i].style.display = 'none';
        } else {
            elTab[i].style.display = '';
        }
    }
    document.querySelector('#back').style.display = '';
  
}

document.querySelector('#aide').onclick = () => {
    document.body.style.overflow = 'auto';
    document.querySelector('.head').style.display = 'none';
    document.body.style.background = 'url("./asset/img/sombre.jpeg")';

    pile_des_pagesPrecedentes.push([`document.querySelector('.head').style.display = ''`,
                                    `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
                                    document.querySelector('.HOME')])   

    for(let i = 0; i < elTab.length; i++) {
        if(elTab[i] !== document.querySelector('.train')) {
            elTab[i].style.display = 'none';
        } else {
            elTab[i].style.display = '';
        }
    }
    document.querySelector('#back').style.display = '';
}
document.querySelector('#propos').onclick = () => {
    document.querySelector('.head').style.display = 'none';
    document.body.style.background = 'url("./asset/img/sombre.jpeg")';

    pile_des_pagesPrecedentes.push([`document.querySelector('.head').style.display = ''`,
                                    `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
                                    document.querySelector('.HOME')])   

    for(let i = 0; i < elTab.length; i++) {
        if(elTab[i] !== document.querySelector('.propos')) {
            elTab[i].style.display = 'none';
        } else {
            elTab[i].style.display = '';
        }
    }
    document.querySelector('#back').style.display = '';
}

document.querySelector('#new_game').onclick = () => {
    document.querySelector('.head').style.display = '';
    document.body.style.background = 'url("./asset/img/tambour.jpeg") no-repeat';
    document.body.style.backgroundSize = 'cover';

    pile_des_pagesPrecedentes.push([`document.querySelector('.head').style.display = ''`,
                                    `document.body.style.backgroundImage = "url('./asset/img/tambour.jpeg')"`,
                                    document.querySelector('.want_to_play')]) 
   

    for(let i = 0; i < elTab.length; i++) {
        if(elTab[i] !== document.querySelector('.levels')) {
            elTab[i].style.display = 'none';
        } else {
            elTab[i].style.display = '';
        }
    }
    document.querySelector('#back').style.display = '';
}


for(let element of document.querySelectorAll('.level')) {
    element.onclick = (e) => {
       clearInterval(interval)
       if(canvas) canvas.style.opacity = '1';
        switch(e.target.id) {
            case '1' :
                niveau = 'facile';
                break;
            case '3' :
                niveau = 'facile';
                break;
            case '4' :
                niveau = 'normal';
                break;
            case '5' :
                niveau = 'normal';
                break;
            case '6' :
                niveau = 'difficile';
                break;
            case '7' :
                niveau = 'difficile';
                break;
            
        }
        coup = 0;
     
        document.querySelector('.head').style.display = 'none';
        document.body.style.background = 'url("./asset/img/clair.jpeg") no-repeat';
        document.body.style.backgroundSize = 'cover';
    
        document.body.style.overflow = 'hidden';
        
    
    // document.querySelector('.game').style.display = 'flex';
    // document.querySelector('.game').style.animation = 'apear 0.5s ease';
    
        annuler = 'vers_pause';
        nb_Block = Number(e.target.id);
       
        document.querySelectorAll('.move span')[1].innerHTML = (2**nb_Block) - 1;
        //let colors = ["#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000","#FF0000"]
        tableauDisque = [];
        for(let i = 0;i<nb_Block;i++){
            tableauDisque.push(new Tuile(i,20,15,30*(i+1),25,i+1))
        }
        tableauSocle =  [new Socle(8,(wind.w/3)-175,400,nb_Block),new Socle(9, (wind.w/3*2)-175,400,nb_Block),new Socle(10, (wind.w/3*3)-175,400,nb_Block)];
        for(let i = 0; i < elTab.length; i++) {
            if(elTab[i] !== document.querySelector('.clair')) {
                elTab[i].style.display = 'none';
            } else {
                elTab[i].style.display = '';
            }
        }
        
        document.querySelector('#back').style.display = 'none';
        Game_init(tableauDisque);
    }
}

document.querySelector('#back').onclick = () => {
    if(pile_des_pagesPrecedentes !== []) {
        
    eval(pile_des_pagesPrecedentes[pile_des_pagesPrecedentes.length - 1][0])
    eval(pile_des_pagesPrecedentes[pile_des_pagesPrecedentes.length - 1][1])
    document.body.style.backgroundSize = 'cover';

        for(let i = 0; i < elTab.length; i++) {
            if(elTab[i] !==
                pile_des_pagesPrecedentes[pile_des_pagesPrecedentes.length - 1][2] ) {
                elTab[i].style.display = 'none';
            } else {
                elTab[i].style.display = '';
            }
        }
        pile_des_pagesPrecedentes.pop();
        document.querySelector('#css').setAttribute('href', './asset/css/style.css');
    }
   setTimeout(() => { document.querySelector('#back').style.display = 'none'}, 10);
}


document.querySelector('.confirm').addEventListener('click', function(){
    if(ok_button === 'online_game') {
        document.querySelector('#online').click();
        document.querySelector('#retour').click();
        document.querySelector('.win-content form').innerHTML = memoryContent
        document.querySelector('.time').innerHTML = '<span>0</span><span>0</span>\n' +
            '                    :\n' +
            '                    <span>0</span><span>0</span>';
    }
    if(document.querySelector('#nom').value !== '') {
        let data = {
            param : 'insert',
            name : document.querySelector('#nom').value,
            time : document.querySelector('.time').innerText,
            moving : document.querySelector('.move span').innerText,
            score : document.querySelector('.point').innerText.split(' ')[0],
            level : niveau
        }
        xhr.open('POST', 'manager.php', true);
        xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
        xhr.send(JSON.stringify(data));
    }
    win.classList.remove('show');
    document.querySelector('#new_game').click();
})

document.querySelector('#again').addEventListener('click', function() {
    
    indice = 1;
    
    let data = {
        param : 'previousGame',
    }
     
    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function(){
        if(this.readyState === 4) {
            if(xhr.responseText === '~~') {document.querySelector('#jouer').click();
                                        pile_des_pagesPrecedentes.pop(); return;}

           if(xhr.responseText === 'no!'){annuler = 'vers_menu_de_jeux';
                                        commande = 'previousGame'; 
                                        document.querySelector('#saveGame').click();}
           else {
            canvas.style.opacity = 1;
            document.querySelector('.head').style.display = 'none';
            document.body.style.background = 'url("./asset/img/clair.jpeg") no-repeat';
            document.body.style.backgroundSize = 'cover';
            document.body.style.overflow = 'hidden';
            document.querySelector('#css').setAttribute('href', 'asset/css/style.css');
            document.querySelector('.connexion').classList.remove('apear');
            for(let i = 0; i < elTab.length; i++) {
                if(elTab[i] !== document.querySelector('.clair')) {
                    elTab[i].style.display = 'none';
                } else {
                    elTab[i].style.display = '';
                }
            }

            buffer = xhr.responseText.split('~');
            let $tuileEtSocle = buffer[0].split('sep');
            $tuileEtSocle.pop();

            tableauDisque = [];
            tableauSocle = [];
            let nb_tuile = 0;

            for(let __ of $tuileEtSocle) {
                let obj = JSON.parse(__);
                if(obj.id < 8) {
                    tableauDisque.push(new Tuile(obj.id,obj.x,obj.y,obj.w,obj.h,obj.s,obj.socle,obj.up,obj.down,
                            obj.isSommet,obj.click,obj._in,obj.pos,obj._self));
                    nb_tuile += 1;
                } else {
                    tableauSocle.push(new Socle(obj.id,obj.x,obj.y,obj.block,obj.s,obj.color,obj.self,obj.lx,
                            obj.ly,obj.lh,obj.lw,obj.pile,obj._in,obj.sommet,obj.tabSommet));
                }
            }
             let $pile = buffer[1].split('sep');
            $pile.pop();
            let pile_tab = [];
            t = xhr.responseText.split('~')
            for(let i = $pile.length - 1; i >= 0; i--) {
                pile_tab[i] = new PileEvent(rro(JSON.parse($pile[i]).elem), JSON.parse($pile[i]).id);
                pile_tab[i].rectSelected = JSON.parse($pile[i]).rectSelected;
                pile_tab[i].select = JSON.parse($pile[i]).select;
                pile_tab[i].h = pile_tab[i];
            }
            for(let i = 1; i < pile_tab.length - 1; i++) {
                pile_tab[i].next = pile_tab[i+1];
            }
            pile = pile_tab[0];
            pile.h = pile_tab[1];
            pile_tab[pile_tab.length - 1].next = pile;
            niveau = buffer[2];
            coup = Number(localStorage.getItem('coup'));
            nb_Block = nb_tuile;
            document.querySelector('.move span').innerText = coup - nb_Block;
            document.querySelector('.time').innerHTML = localStorage.getItem('time');
            document.querySelectorAll('.move span')[1].innerText = 2**nb_tuile - 1;
            test();
            
           }
        }
    }
    
})



document.querySelector('#pause').onclick = () => {
    document.querySelector('#win').classList.add('show');
    canvas.style.opacity = 0;
    clearInterval(timeCountInterval);
}
document.onkeydown = (e) => {if (e.key == 'q') document.querySelector('#pause').click()};

document.querySelector('#continue_to_play').onclick = () => {
    document.querySelector('#win').classList.remove('show');
    canvas.style.opacity = 1;
    timeCount();
}

document.querySelector('.niv').onclick = () => {
    clearInterval(interval)
    clearInterval(timeCountInterval);
    if(indice == 0) pile_des_pagesPrecedentes.pop(); 
    document.querySelector('.time').innerHTML = '<span>0</span><span>0</span> : <span>0</span><span>0</span>';
    document.querySelector('#new_game').click();
    document.querySelector('#win').classList.remove('show');
}

document.querySelector('.menu').onclick = () => {
    clearInterval(interval);
    clearInterval(timeCountInterval);

    document.querySelector('.time').innerHTML = '<span>0</span><span>0</span> : <span>0</span><span>0</span>';
    
    if(indice == 1) {
        document.querySelector('#back').click();
    } else {
        document.querySelector('#back').click();
        document.querySelector('#back').click();
    }
    indice = 0;
    document.querySelector('#win').classList.remove('show');
}

document.querySelector('#saveGame').onclick = () => {
   
    if(interval) clearInterval(interval);
    if(timeCountInterval) clearInterval(timeCountInterval);
    inner =  document.querySelector('.time').innerHTML;
    document.querySelector('.time').innerHTML = '<span>0</span><span>0</span> : <span>0</span><span>0</span>';
    let str = '';
    if(tableauDisque) {for(let obj of tableauDisque) str += JSON.stringify(obj) + 'sep'; }
    if(tableauSocle) {for(let obj of tableauSocle) str += JSON.stringify(obj) + 'sep'; }
    _pile_ = '';
    if(pile) addJSON(pile, pile.h.next);
    let data = {
        param : 'isUserConnected',
        partie : str,
        pile : _pile_,
        rect_id : niveau // niveau courant du jeux
    }
    
    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function(){
        if(this.readyState == 4) {
            if(xhr.responseText == 'no!') {
                document.querySelector('.head').style.display = 'none';
                document.body.style.background = 'url("./asset/img/clair.jpeg") no-repeat';
                document.body.style.backgroundSize = 'cover';
            
                document.body.style.overflow = 'hidden';
                for(let i = 0; i < elTab.length; i++) {
                    if(elTab[i] !== document.querySelector('.clair')) {
                        elTab[i].style.display = 'none';
                    } else {
                        elTab[i].style.display = '';
                    }
                }
                
                document.querySelector('#css').setAttribute('href', 'asset/css/sb-admin-2.min.css');
                document.querySelector('.connexion').classList.add('apear');
                document.querySelector('#win').classList.remove('show');
            } else {
                localStorage.setItem('time', inner);
                localStorage.setItem('coup', coup);
                document.querySelector('.menu').click();
                document.querySelector('#jouer').click();
            }
            
        }
    }
}
function ifValid() {
    let str = '';
    for(let obj of tableauDisque) str += JSON.stringify(obj) + 'sep'; 
    for(let obj of tableauSocle) str += JSON.stringify(obj) + 'sep';
    if(pile) addJSON(pile, pile.h.next);
    let data = {
        param : 'save',
        commande : commande,
        mail : document.querySelector('.mail').value,
        mdp :  document.querySelector('.mdp').value,
        partie : str,
        pile : _pile_,
        rect_id : niveau // niveau courant du jeux
    }
    
    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
           if(xhr.responseText === 'ok') {document.querySelector('#again').click(); commande = 'save';}
           else if(xhr.responseText === 'success') {
            localStorage.setItem('time', inner);
            localStorage.setItem('coup', coup);
            document.querySelector('.annuler').click();
           } else if(xhr.responseText === '_success_') {
            annuler = 'vers_menu_de_jeux';
            document.querySelector('.annuler').click();
            document.querySelector('#online').click();
            document.querySelector('.login').style.display = 'none';
           } else { commande = 'save'; }
        }
    }
}

document.querySelector('.submit').addEventListener('click', function(){
   // on va verifier si l'adresse email existe mais que le mdp est erroné
   if(!document.querySelector('.mdp').value || !document.querySelector('.mail').value) {

            document.querySelector('.info').innerText = 'Veuillez correctement remplir les champs svp';
            document.querySelector('.info').classList.add('error_anim');
            errorSound.play();
            setTimeout(() => {
                document.querySelector('.info').classList.remove('error_anim');
                document.querySelector('.info').innerText = `Connectez vous ou creé un compte pour syncroniser vos progression. et debloquer
                d'autres fonctionnalitées`;
            }, 3000);
           
           
        } else {

   
    let data = {
            param : 'check',
            mail : document.querySelector('.mail').value,
            mdp :  document.querySelector('.mdp').value
    }

    xhr.open('POST', 'manager.php', true);
    xhr.setRequestHeader('Content-type', 'application/json; charset=UTF-8')
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function() {
        if(xhr.readyState === 4) {
            if(xhr.responseText === 'can go') ifValid();
        }
    }
}
})

document.querySelector('.annuler').onclick = function() {
    if(annuler === 'vers_menu_de_jeux') {
        document.querySelector('#css').setAttribute('href', 'asset/css/style.css');
        document.querySelector('.connexion').classList.remove('apear');
        document.querySelector('#back').click();
        document.querySelector('#jouer').click();
    } else {
        document.querySelector('.connexion').classList.remove('apear');
        document.querySelector('#css').setAttribute('href', 'asset/css/style.css');
        document.querySelector('#win').classList.add('show');
    }
    
}