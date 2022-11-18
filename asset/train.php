<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Train</title>
</head>
<body>
    <div class="imgs" style="display: none;">
        <img id="scleback" src="./asset/img/backgound.jpeg" alt="soclebg">
        <img id="block" src="./asset/img/block.jpeg" alt="block">    
    </div>
        <main>
            <div class="select-level">
                <input type="number" name="level" value="3" id="slevel" max="8" min="3">
            </div>
            <canvas width="800" height="480" style="border: 1px solid black;">
                Hanoi game
            </canvas>    
            <div>
                <button id="reset">Reset</button>
                <button id="demo">Demo</button>
            </div>
            <?php
                $to = "testetesteabc002@gmail.com";
                $subjet = "test";
                $message = "agouassilo ";
                $header = "Content-type: text/plain; charset=utf-8\r\n";
                $header .="From: sergeaba07@gmail.com\r\n";

                if(mail($to,$subjet,$message,$header))
                {
                    echo "envoyer";
                }
                else
                {
                    echo "echec d'envoi";
                }
            ?>
        </main>
        <script src="./confetti.js"></script>
        <script >
            let reset = document.body.querySelector("#reset");
            let demo = document.body.querySelector("#demo");
            let level = document.body.querySelector("#slevel");
            let canvas;
            let ctx = null;
            let block_img = document.querySelector("#block");
            let tableauSocle = null;
            //let pop_background = document.querySelector("#pop");
            //let socle_img = document.querySelector("#scleback");
            let interval;
            let A = null;
            let D = null;
            let I = null;
            let coupApareent = 0;
            let tableauDisque = null;
            wind = {
                w:800,
                h:480
            }
            function sycDelay(milliseconde){
                let start = new Date().getTime();
                let end = 0;
                while( (end-start) < milliseconde ){
                    end = new Date().getTime();
                }
            }
            function refresh(ms){
                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0,0,wind.w,wind.h)
                //update regle 
                //sycDelay(5); 
                tableauSocle.forEach(element => {
                    element.draw();
                    //sycDelay(2); 
                });
                parcourEvent(pile)
                sycDelay(ms); 
            }
            function Hanoi(n,D,A,I){
                if(n!=0 && stop_game == false){
                    Hanoi(n-1,D,I,A);
                    (function(i){
                        setTimeout(function(){
                            A.place(D.sommet,false,true);
                            refresh(1000);
                        },i*5)
                        
                    })(coup)
                    
                        
                // A.sommet.draw();
                    Hanoi(n-1,I,A,D);
                }
            }
            function correctSide(rect,socle){
                let i = 0;
                while(i<socle.tabSommet.length){
                    if(rect == socle.tabSommet[i])
                        return true;
                    i++
                }
                return false;
            }
            function unlike(a,b,table){
                for(let i =0;i<table.length;i++)
                {
                    if(table[i] != a && table[i] != b){
                        return table[i]
                    }
                }
                return null;
                

            }

            function hanoi_generaliser(n,A){
                if(n!=0){
                    let Pn = tableauDisque[n-1] 
                    if(Pn.socle == A){
                        hanoi_generaliser(n-1,A);
                    }else{
                        let I = unlike(Pn.socle,A,tableauSocle);
                        if(I == null){
                            console.log("null")
                            return
                        }
                        
                        
                        //(function(i,A,I){
                            hanoi_generaliser(n-1,I);
                        //  setTimeout(function(){
                                
                                A.place(Pn.socle.sommet,false,true);
                                refresh(10);
                                
                            //},i*50)
                            hanoi_generaliser(n-1,A);
                        //})(coupApareent,A,I)
                        coupApareent++;
                        coup = 0;
                        
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
                constructor(x,y,w,h=25,s=30,color="#DBBA55")
                {
                    this.x =x; 
                    this.y =y; 
                    this.s = s;
                    this.w =w *this.s; 
                    this.h =h;
                    this.socle = null;
                    this.b_x = this.x;
                    this.b_y = this.y;
                    this.up = null;//rectangle au dessu 
                    this.down = null;// rectangle en dessou
                    this.color = color ;
                    this.isSommet = false;
                    this.click = false;
                    this.in = false;
                    this.pos = false;
                    this.self = false;
                    this.init =true;//quand on click
                    this.percentx = 0;//la position de la souris par raport au debut du disque
                    this.percenty = 0;//la position de la souris par raport au debut du disque
                }
                //dessine le disque
                draw(){
                    //ctx.fillStyle = this.color;
                    ctx.fillRect(this.x,this.y,this.w,this.h);
                    ctx.drawImage(block_img,this.x,this.y,this.w,this.h)
                }
                //deplace le disque
                move(cx,cy){
                    let w = this.w;
                    let h = this.h;
                    let x = this.x;
                    let y = this.y;
                    if(this.init){
                        this.percentx = w*(cx-x)/(w) ;
                        this.percenty = h*(cy-y)/(h) ;
                        this.init = false;  
                    }
                    this.x = cx-this.percentx;
                    this.y = cy-this.percenty;
                }
                //remet a la position anterieur
                roolback(){
                    this.x = this.b_x;
                    this.y = this.b_y;
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
                    if(elem!=null)
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
                constructor(x,y,block=4,s=50,color="#000000"){
                    this.self = false;
                    this.x = x;
                    this.y = y;
                    this.s = s;
                    this.lx = x+s;
                    this.ly = y -30*block;
                    this.lh = 30*block;
                    this.lw = 5;
                    this.pile = 0;
                    this.color = color;
                    this.in = false;
                    this.sommet  = null;
                    this.tabSommet = [];
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
                    //await sleep(1000);
                    if(rect == null)
                        return;
                    if(this.sommet!=null){
                        let rectSommet = this.sommet;
                        if(rectSommet.s < rect.s)
                        {
                            return
                        }
                    }
                    if((rect.click == false && (rect.self|| algo))|| init ){
                        if(rect.socle != null){
                            let ancienSocle = rect.socle;
                            if(ancienSocle == this)
                                return;
                            if(rect.socle != this){
                                ancienSocle.pile-=1;
                                ancienSocle.tabSommet.pop();
                                ancienSocle.sommet = ancienSocle.tabSommet[ancienSocle.tabSommet.length-1];
                                if(ancienSocle.sommet == undefined)
                                    ancienSocle.sommet = null;
                                if(ancienSocle.tabSommet.length == 0)
                                    ancienSocle.sommet = null;
                                if(ancienSocle.tabSommet.length > 0)
                                    ancienSocle.tabSommet[ancienSocle.tabSommet.length-1].isSommet = true;
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
                        rect.socle = this;
                        if(this.sommet != null){
                            this.sommet.isSommet = false;
                        }
                        if(init || algo)
                            rect.roolback()
                        this.sommet = rect;
                        this.tabSommet.push(this.sommet);
                        rect.isSommet = true;
                        coup++;
                        console.log(coup-nb_Block)
                            
                    }
                    //console.log(" x :"+rect.x + "bx "+rect.b_x);
                }
            }

            //la pile des evenement sur les disque
            class PileEvent {
                constructor(elem,id)
                {
                    this.h = this;
                    this.id = id;
                    this.elem = elem;
                    this.next = null;
                    this.select = false;
                    this.rectSelected = null;

                }
                add(elem){
                    if(elem !=null){
                        let head = this.h;
                        let tmp = new PileEvent(elem,head.id+1);
                        this.h = tmp;
                        tmp.next = head;
                    }
                }
                clickdown(cx,cy){
                    let ptr = this.h;
                    while(ptr!=null){
                        let rect = ptr.elem;
                        if(!this.select){
                            let x = rect.x;
                            let y = rect.y;
                            let w = rect.w;
                            let h = rect.h;
                            // console.log( (offy > y && offy < y+h) )
                            if((cx>x && cx < x+w) && (cy > y && cy < y+h) )
                            {
                                if(this.rectSelected != null){
                                    this.rectSelected.self = false;
                                    //this.rectSelected = null
                                }
                                rect.in = true;
                                rect.self = true;
                                this.rectSelected = rect;
                                rectSelect = this.rectSelected;
                                this.select = true;
                            }
                        }
                        ptr = ptr.next;
                    }
                }
                clickup(){
                    this.select = false;
                    if(this.rectSelected!=null){
                        tableauSocle.forEach(element =>{
                            if(rectSelect != null)
                                element.insocle(rectSelect);
                            if(element.in){
                                element.place(rectSelect);
                            }
                        } );
                        this.rectSelected.self =false;
                        rectSelect = null; 
                        
                        this.rectSelected.roolback();
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
                while(ptr!=null){
                    rect = ptr.elem;
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

            let nb_Block = 8;
            //let tableau = [rect1,rect2,rect3,rect4]
            let pile = null;
            
            let stop_game = false;
            let Game_init = function(tableauDisque) {
            clearInterval(interval);
            let init = true;
            stop_game = false;
            pile = null;
            let cheat = "";
            let over = false;
            canvas = document.body.querySelector("canvas") 
            ctx = canvas.getContext("2d");
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

            

            interval = setInterval(function(){

                ctx.fillStyle = "#FFFFFF";
                ctx.fillRect(0,0,wind.w,wind.h)
                //update regle 
                
                tableauSocle.forEach(element => {
                    element.draw();
                });
                parcourEvent(pile)
               if(!stop_game)
                if(tableauSocle[2].tabSommet.length >= nb_Block){
                //win.classList.add('show')
                //clearInterval(interval);
                stop_game = true;
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
                    
                });
                reset.addEventListener("click",function(e){
                    coup = 0;
                    coupApareent = 0;
                    hanoi_generaliser(nb_Block,tableauSocle[0]);
                });
                demo.addEventListener("click",function(e){
                    hanoi_generaliser(nb_Block,tableauSocle[0]);
                    Hanoi(nb_Block,D,A,I)
                });
        }

        level.addEventListener("change",function(){
            nb_Block = Number(level.value);
            tableauDisque = [];
            tableauSocle = [new Socle((wind.w/3)-175,400,nb_Block),new Socle((wind.w/3*2)-175,400,nb_Block),new Socle((wind.w/3*3)-175,400,nb_Block)]
            A = tableauSocle[2];
            D = tableauSocle[0];
            I = tableauSocle[1]; 
            for(let i = 0;i<nb_Block;i++){
                tableauDisque.push(new Tuile(20,15,30,25,i+1,"#"+i+"F"+i+"F"+"0"+i))
            }
            coup = 0;
            coupApareent = 0;
            Game_init(tableauDisque);
        })
        nb_Block = Number(level.value);
            tableauDisque = [];
            tableauSocle = [new Socle((wind.w/3)-175,400,nb_Block),new Socle((wind.w/3*2)-175,400,nb_Block),new Socle((wind.w/3*3)-175,400,nb_Block)]
            A = tableauSocle[2];
            D = tableauSocle[0];
            I = tableauSocle[1]; 
            for(let i = 0;i<nb_Block;i++){
                tableauDisque.push(new Tuile(20,15,30,25,i+1,"#"+i+"F"+i+"F"+"0"+i))
            }
            coup = 0;
            coupApareent = 0;
        Game_init(tableauDisque)
        

       
        </script>
</body>
</html>