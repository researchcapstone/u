var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
const guessLeft = document.querySelector(".guess-left span");

CANVAS_HEIGT = canvas.height = 50 * window.innerHeight / 100 || 766;
CANVAS_WIDTH = canvas.width = window.innerWidth + 20;

// CREATE IMAGES

const shark = new Image();
shark.src = 'shark.png';
shark.width = (shark.width/2);
shark.height = (shark.height/2);

let shark_x = CANVAS_WIDTH - (shark.width/2);
let shark_y = (CANVAS_HEIGT - shark.height) / 2;

const player = new Image();
player.src = 'shark cage size1.png';
player.width = (player.width/4);
player.height = (player.height/4);

const player_d = new Image();
player_d.src = 'cage-broken size.png';
player_d.width = (player_d.width/2);
player_d.height = (player_d.height/2);

function animate(){
    if (guessLeft.innerText > 0){
        c.clearRect(0, 0, canvas.width, canvas.height);
        shark_x = CANVAS_WIDTH - (shark.width/2);
        shark_y = (CANVAS_HEIGT - shark.height) / 2;

        c.drawImage(shark, shark_x, shark_y, shark.width, shark.height);
        c.drawImage(player, 20, 0, player.width, player.height);
        requestAnimationFrame(animate); 
        
    }
    else{
        c.clearRect(0, 0, canvas.width, canvas.height);
        c.drawImage(shark, shark_x, shark_y, shark.width, shark.height);  
        if(shark_x >= 70){     
            shark_x = shark_x - 2;   
            c.drawImage(player, 20, 0, player.width, player.height);   
        }  
        else{
            c.drawImage(player_d, 20, 0, player_d.width, player_d.height); 
            
        }
        requestAnimationFrame(animate);    
        
    }    
}
animate();
