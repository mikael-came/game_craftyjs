
/*var level;
  scenes = [
    "menu","niveau1"
  ];

  function startGame(){
     level = 0;
     loadMenu();
  }

  function getNextLevelscene(){
    return scenes[level];
  }
  */

  //menu
  function loadMenu(){
    Crafty.scene ("menu",function(){
      Crafty.background("#066");

      var banner = Crafty.e("2D,DOM,Text")
      .text("Il etait une fois un jeune vendéen qui cherchait à obtenir son diplome... ")
      .textColor('#000000')
      .textFont({
        size: '20px',
        //weight: 'bold'

      })
      .attr({
        x : 10,
        y : 20,
        w : 700,
        h : 200,
      });

      var instruction = Crafty.e("2D,DOM,Text")
      .text(" Pour commencer cliquer sur ENTRER")
      .textFont({
        size: '25px',
        weight: 'bold'

      })
      .attr({
        x : 400,
        y : 150,
        w : 200,
        h : 20,
      });

      banner.bind('KeyDown',function (e){
          if(e.key==Crafty.keys.ENTER){
            Crafty.enterScene("niveau1");
          }
      });

    });
  }

  //menu 2
  function loadMenu2(){
    Crafty.scene ("menu2",function(){
      Crafty.background("#066");

      var banner = Crafty.e("2D,DOM,Text")
      .text("Une fois son diplome obtenu. Il ne lui restait qu'à faire ses preuves en stage...")
      .textColor('#000000')
      .textFont({
        size: '20px',
        //weight: 'bold'

      })
      .attr({
        x : 10,
        y : 20,
        w : 700,
        h : 200,
      });

      var instruction = Crafty.e("2D,DOM,Text")
      .text(" Pour commencer cliquer sur ENTRER")
      .textFont({
        size: '25px',
        weight: 'bold'

      })
      .attr({
        x : 400,
        y : 150,
        w : 200,
        h : 20,
      });

      banner.bind('KeyDown',function (e){
          if(e.key==Crafty.keys.ENTER){
            Crafty.enterScene("niveau1");
          }
      });

    });
  }



  function loadNiveau1(){
    var score=0;
    var speedFrame=5;
    var taillePlayer=130;
    var playerline=1;

    //Chargement des sprites
    Crafty.sprite("./images/sprite/avatar.jpg", {avatar:[0,0,50,50]});
    Crafty.sprite("./images/sprite/diplome.png" ,{diplome: [0,0,48,48]});
    Crafty.sprite(taillePlayer,"images/sprite/beerrunningspritetorightXS.png", {
        player: [0,0,1,1]
    });

    Crafty.scene("niveau1",function(){
      score =0;
      playerline=1;


  //SCORE - gui component, put all your static gui stuff in here
    if( !document.getElementById("gui") ){
       var gui = document.createElement("div");
       	gui.setAttribute("id", "gui"); // set id!

       // one of the gui components: score text
       var scoreText = document.createElement("div");
       scoreText.setAttribute("id", "scoreText"); // set id!
       scoreText.appendChild(document.createTextNode(score +"/20"));
       Crafty.bind("Score", function(newValue) {
           scoreText.innerHTML = score +"/20";
       });

       gui.appendChild(scoreText);
       Crafty.stage.elem.appendChild(gui);
    }





//PLAYER Initialisation du joueur
      var player = Crafty.e("2D, DOM, player,controls,Twoway,Gravity,SpriteAnimation,Collision")
      .attr({x:0, y: 145,z:1})
      .twoway(speedFrame,0)

      // Animation du sprite
      .reel('marche', 1000, 0, 0, 10)
      .reel("marcheReverse",1000,[ [9,0], [8, 0], [7, 0] , [6, 0] , [5, 0] , [4, 0], [3, 0] , [2, 0], [1, 0], [0, 0]     ])
      .reel("jump",1000,[ [9,0], [8, 0], [7, 0] , [6, 0] , [5, 0] , [4, 0], [3, 0] , [2, 0], [1, 0], [0, 0]     ])
      .animate('marche', -1)
      .bind('EnterFrame', function(e) {
        //  this.x += speedFrame;
          if (!this.isPlaying("marche")){
             this.animate("marche",-1);

          }
      })
      .bind("KeyDown", function(e) {
           if(e.key == Crafty.keys.LEFT_ARROW) {
             if (!this.isPlaying("marcheReverse")){
                this.animate("marcheReverse",-1);
              }
           } else if (e.key == Crafty.keys.RIGHT_ARROW) {
             if (!this.isPlaying("marche")){
                this.animate("marche",-1);

              }

           } else if (e.key == Crafty.keys.UP_ARROW) {
             //this.resumeAnimation();
              if(this.y>120){
                this.y-=25;
                playerline -=1;
                this.z-=1;
              }
           } else if (e.key == Crafty.keys.DOWN_ARROW) {

             //this.pauseAnimation();
             if(this.y<170){
               this.y+=25;
               playerline+=1;
               this.z+=1;


             }
           }
       })
      ;

//BG - Chargement du fond coulissant
      var wall = Crafty.e("2D, DOM, Image").image("images/sprite/bg1large.gif")
      .attr({x:0, y: 0,w:2000, z:-1})
      ;

//FLOOR Definition du sol
      var floor = Crafty.e("2D, DOM, floorid,Color")
      .attr({x:0, y: 300, w: 2000+taillePlayer, h: 20})
    //  .color("blue")
      ;

// End Blocker
      var endBlocker = Crafty.e("2D, DOM, endblocker")
        .attr({x:2000+taillePlayer, y: 0, w: 10, h:300 })

        ;

      var endZone =   Crafty.e("2D, DOM, Color, endZone")
        .attr({x:2000, y: 0, w:taillePlayer , h:300,z:2 })
        .color('black')
        ;

      var startBlocker = Crafty.e("2D, DOM, Color, startblocker")
        .attr({x:-10, y: 0, w: 1, h:260 })

        ;


      // Definition de la camera
      Crafty.viewport.follow(player, -250, 0)

      // Zone de fin
      player.onHit("endblocker",function(hit) {

        this.x=this.x-speedFrame;

          Crafty.enterScene("niveau2");
      });
      player.onHit("startblocker",function(hit) {

        this.x=this.x+speedFrame;

      });

      //sauvagerade les icones a collecter dans une liste
      var listeIcone=[];

      //insertion des icones
      for (i = 0; i < 6; i++) {
        var line = Math.floor((Math.random() * 3));
        var x = (i+1)*300;
        listeIcone[i]= addIcone(i,x,line);
      }

      // Gestion collision diplome
      player.onHit("hitzone",function(hit) {
          // Si le player est après le hit
          if(player.x+50 >= hit[0].obj.x){
            // Destruction de la hitzone
            var idIcone = hit[0].obj._attr_get("idHit");

            //Verification de la position sur la ligne
            var icone = listeIcone[idIcone];
            var position = icone._attr_get("position");
            // Compare la position de du diplome avec la position du joueur
            if(position == playerline){
              // Suppression zone de hit
              hit[0].obj.destroy();
              // Suppression icone si reussi
              icone.destroy();

              Crafty.trigger("Score",score+=2);


            }

          }
      });
    });

  }


function addIcone(id,x,line){
  var yline = [120,145,170];

  // Ajout Icone diplome
  var x_icone = x;
  var y_icone = yline[line] + 90;

  var icone = Crafty.e("2D,DOM,diplome"); //650 200
  icone.x=x_icone;
  icone.y=y_icone;
  icone.z=line;
  icone.attr({position : line});

  //Ajout Hit zone
  var hitzone =   Crafty.e("2D, DOM, Color, hitzone")
    .attr({x:x_icone, y:0, w:30 , h:300, z:line ,idHit:id})
  //  .color("green")

  ;
  return icone;


}

// Fonction de chargement
window.onload = function(){

  Crafty.init(750,290, document.getElementById('game'));

  loadMenu();
  loadniveau1();
  loadMenu2();



  Crafty.c("paddleCtrl",{

    init: function(){
      this.requires("Keyboard");
    },

    paddleCtrl: function(){
      this.bind("KeyDown",function(){
        if(this.isDown("d")){
          var myval=this.x;
          return this.x=myval-5;
        }
      });
    }
  });

  Crafty.enterScene("niveau1");

}
