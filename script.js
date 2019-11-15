const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

//punkty
var scorep = 0;
var scoreai = 0;
var scorelimit=3;
//wielkośc canvas
const cw = canvas.width;
const ch = canvas.height;

//wielkość linii środkowych
const lineWidth = 6;
const lineHeight = 20;

//wielkość piłki
const ballSize = 20;
//pozycja piłki
let ballX = cw / 2 - ballSize / 2;
let ballY = ch / 2 - ballSize / 2;

//prędkośc piłki
/*let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedX=plusOrMinus*4;
plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedY=plusOrMinus*Math.round(Math.random()*3+1);
*/
let plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedXY = 10;
let angle = (Math.floor(Math.random() * 60) * Math.PI / 180) % 360;
let tangent = Math.tan(angle);
let ballSpeedX = ballSpeedXY / (tangent + 1);
ballSpeedX *= plusOrMinus;
plusOrMinus = Math.random() < 0.5 ? -1 : 1;
let ballSpeedY = ballSpeedXY - Math.abs(ballSpeedX);
ballSpeedY *= plusOrMinus;
//console.log(ballSpeedX, ballSpeedY);

//wielkość paletek
const paddleWidth = 20;
const paddleHeight = 100;
//pozycja paletek
//gracz
const playerX = 70;
let playerY = 200;
//AI
const aiX = 910;
let aiY = 200;

function player() {
    //gracz
    ctx.fillStyle = "#0091f9";
    ctx.fillRect(playerX, playerY, paddleWidth, paddleHeight);
}

function ai() {
    //ai
    ctx.fillStyle = "#b20000";
    ctx.fillRect(aiX, aiY, paddleWidth, paddleHeight);
}

var collision = true;

function ballReset(){
    check=false;
    plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        ballSpeedXY = 10;
        angle = (Math.floor(Math.random() * 60) * Math.PI / 180) % 360;
        tangent = Math.tan(angle);
        ballSpeedX = ballSpeedXY / (tangent + 1);
        ballSpeedX *= plusOrMinus;
        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        plusOrMinus = Math.random() < 0.5 ? -1 : 1;
        ballSpeedY = ballSpeedXY - Math.abs(ballSpeedX);
        ballSpeedY *= plusOrMinus;
        collision = true;
}


function ball() {
    const middleBall = ballY + ballSize / 2;
    const middlePaddleP = playerY + paddleHeight / 2;
    const middlePaddleAI = aiY + paddleHeight / 2;
    const multiplier = 70 / 60;
    //piłka
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(ballX, ballY, ballSize, ballSize);
    ballX += ballSpeedX;
    ballY += ballSpeedY;
    //rozpoznawanie krawędzi
    if (ballY <= 0 || (ballY + ballSize) >= ch) {
        if (ballY <= 0) {
            ballY = 0;
        }
        if (ballY + ballSize >= ch) {
            ballY = ch - ballSize;
        }
        ballSpeedY = -ballSpeedY;
        //speedUp();
    }
    /*if(ballX<=0 || (ballX+ballSize)>=cw){
        ballSpeedX=-ballSpeedX;
        speedUp();
    }*/
    if (ballX <= 0 || (ballX + ballSize) >= cw) {
        if (ballX <= 0) scoreai++;
        else scorep++;
        ballX = cw / 2 - ballSize / 2;
        ballY = ch / 2 - ballSize / 2;
        //console.log(scoreai);
        //console.log(scorep);
        ballReset();
    }

    if (collision == true) {
        if (ballX < 90 && ballX > 60) {
            if (middleBall >= middlePaddleP - 50 - ballSize / 2 && middleBall <= middlePaddleP + 50 + ballSize / 2) {
                //ballSpeedX=-ballSpeedX;
                speedUp();
                let hitPos = (playerY + paddleHeight / 2 - ballY - ballSize / 2) * multiplier;
                if (hitPos > 70) {
                    hitPos = 70;
                }
                if (hitPos < -70) {
                    hitPos = -70;
                }
                //console.log(hitPos);
                angle = (hitPos * Math.PI / 180) % 360;
                tangent = Math.tan(angle);
                //console.log("pozycja: " + hitPos + " tangens " + tangent);
                ballSpeedX = ballSpeedXY / (Math.abs(tangent) + 1);
                ballX = playerX + paddleWidth;
                //console.log("minus czy plus:" + (ballSpeedXY/(tangent+1)));
                if (hitPos > 0) {
                    ballSpeedY = -1 * Math.abs(ballSpeedXY - ballSpeedX);

                } else {
                    ballSpeedY = Math.abs(ballSpeedXY - ballSpeedX);
                }


                /*if(playerY+paddleHeight-ballY<=10){
                    if(ballSpeedY<0){
                        ballSpeedY=Math.abs(ballSpeedY);
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY)/1.5;
                        ballX=playerX+paddleWidth;
                    }
                }
            
                else if(playerY+paddleHeight-ballY<=30){
                    
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY)*1.5;
                        if(ballSpeedY<-18){
                            ballSpeedY=-18;
                        }
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY)/1.5;
                        ballX=playerX+paddleWidth;            
                    }
                    
                }
            
                else if(playerY+paddleHeight-ballY<=50){
                    
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY)*1.25;
                        if(ballSpeedY<-18){
                            ballSpeedY=-18;
                        }
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY)/1.25;
                        ballX=playerX+paddleWidth;
                    }
                    
                }
            
                else if(playerY+paddleHeight-ballY<=70){
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY);
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY);
                        ballX=playerX+paddleWidth;
                    }
                }
            
                else if(playerY+paddleHeight-ballY<=90){
                    
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY)/1.25;
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY)*1.25;
                        if(ballSpeedY>18){
                            ballSpeedY=18;
                        }
                        ballX=playerX+paddleWidth;
                    }
                }
            
                else if(playerY+paddleHeight-ballY<=110){
                    
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY)/1.5;
                        ballX=playerX+paddleWidth;                 
                    }
                    else{
                        ballSpeedY=Math.abs(ballSpeedY)*1.5;
                        if(ballSpeedY>18){
                            ballSpeedY=18;
                        }
                        ballX=playerX+paddleWidth;        
                    }
                }
            
                else if(playerY+paddleHeight-ballY<=120){
                    
                    if(ballSpeedY<0){
                        ballSpeedY=-Math.abs(ballSpeedY)/1.5;
                        ballX=playerX+paddleWidth;
                    }
                    else{
                        ballSpeedY=-Math.abs(ballSpeedY);
                        ballX=playerX+paddleWidth;
                    }              
                }*/

                /*if(middleBall>=middlePaddleP){
                    console.log("dol");
                }
                if(middleBall<=middlePaddleP){
                    console.log("gora")
                }*/
            }
        }
        if (ballX <= 60 && ballX > 50) {
            if (middleBall >= middlePaddleP - 50 - ballSize / 2 && middleBall <= middlePaddleP + 50 + ballSize / 2) {
                //console.log(ballSpeedY);
                ballSpeedY = -ballSpeedY;
                collision = false;
            }
        }

        if (ballX > 890 && ballX < 920) {
            if (middleBall >= middlePaddleAI - 50 - ballSize / 2 && middleBall <= middlePaddleAI + 50 + ballSize / 2) {
                //ballSpeedX=-ballSpeedX;
                speedUp();
                let hitPos = (aiY + paddleHeight / 2 - ballY - ballSize / 2) * multiplier;
                if (hitPos > 70) {
                    hitPos = 70;
                }
                if (hitPos < -70) {
                    hitPos = -70;
                }
                //console.log(hitPos);
                angle = (hitPos * Math.PI / 180) % 360;
                tangent = Math.tan(angle);
                //console.log("pozycja: " + hitPos + " tangens " + tangent);
                ballSpeedX = -1 * Math.abs((ballSpeedXY / (Math.abs(tangent) + 1)));
                ballX = aiX - paddleWidth;
                //console.log("minus czy plus:" + (ballSpeedXY/(tangent+1)));
                if (hitPos > 0) {
                    ballSpeedY = -1 * Math.abs(ballSpeedXY + ballSpeedX);

                } else {
                    ballSpeedY = Math.abs(ballSpeedXY + ballSpeedX);
                }
            }
        }
        if (ballX < 930 && ballX >= 920) {
            if (middleBall >= middlePaddleAI - 50 - ballSize / 2 && middleBall <= middlePaddleAI + 50 + ballSize / 2) {
                //console.log(ballSpeedY);
                ballSpeedY = -ballSpeedY;
                collision = false;
            }
        }
    }
    input();
}

function table() {
    //stół
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    //linie na środku
    ctx.fillStyle = "#999999";
    for (let linePosition = 20; linePosition < ch; linePosition += 2 * lineHeight) {
        ctx.fillRect(cw / 2 - lineWidth / 2, linePosition, lineWidth, lineHeight);
    }
}

function score() {
    ctx.font = "36px Aldrich";
    ctx.fillStyle = "#0091f9";
    ctx.fillText("PUNKTY: " + scorep, cw / 7, ch / 2 + 18);
    ctx.fillStyle = "#b20000";
    ctx.fillText("PUNKTY: " + scoreai, 9 * cw / 14, ch / 2 + 18);
}

//gdzie canvas znajduje się od górnej krawędzi okna przeglądarki
topCanvas = canvas.offsetTop;

//pozycja kursora
//e - informacje o położeniu myszy
function playerPosition(e) {
    playerY = e.offsetY - paddleHeight / 2;
    //aiY=e.offsetY-paddleHeight/2;
    //zabezpieczenie przed wyjechaniem paletki poza canvas
    if (playerY >= ch - paddleHeight) {
        playerY = ch - paddleHeight;
    }
    if (playerY <= 0) {
        playerY = 0;
    }

    //aiY=playerY;
};

//przyspieszenie
/*function speedUp(){
    //prędkość X
    if(ballSpeedX>0 && ballSpeedX<18){
        ballSpeedX += 0.5;
    }
    else if(ballSpeedX<0 && ballSpeedX>-18){
        ballSpeedX -= 0.5;
    }   
    //prędkośc Y
    if(ballSpeedY>0 && ballSpeedY<18){
        ballSpeedY += 0.5;
    }
    else if(ballSpeedY<0 && ballSpeedY>-18){
        ballSpeedY -= 0.5;
    }   
}*/

function speedUp() {
    //prędkość X
    if(difficulty!=0){
        if (ballSpeedXY < 30) {
        ballSpeedXY += 1;
    }
    }
    
}

//HARD
/*function aiPosition(){
    //pozycja środka paletki
    const middlePaddle=aiY+paddleHeight/2;
    //pozycja środka piłki
    const middleBall=ballY+ballSize/2;
    
    //druga połowa boiska
    if(ballX>600){
        if(middlePaddle-middleBall>200){
            aiY-=30; 
        }
        else if(middlePaddle-middleBall>50){
            aiY-=20;
        }
        else if(middlePaddle-middleBall<-200){
            aiY+=30;
        }
        else if(middlePaddle-middleBall<-50){
            aiY+=20;
        }
    }
    
    //pierwsza połowa boiska
    else if(ballX<=600 && ballX>150){
        if(middlePaddle-middleBall>100){
            aiY-=10; 
        }
        else if(middlePaddle-middleBall<-100){
            aiY+=10;
        }
        
    }
}
*/

//sztuczna inteligencja
function aiPositionE() {
    //pozycja środka paletki
    const middlePaddle = aiY + paddleHeight / 2;
    //pozycja środka piłki
    const middleBall = ballY + ballSize / 2;

    //druga połowa boiska
    if (ballX > 600) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 14;
        } else if (middlePaddle - middleBall > 50) {
            aiY -= 7;
        } else if (middlePaddle - middleBall < -200) {
            aiY += 14;
        } else if (middlePaddle - middleBall < -50) {
            aiY += 7;
        }
    }

    //pierwsza połowa boiska
    else if (ballX <= 600 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 5;
        } else if (middlePaddle - middleBall < -100) {
            aiY += 5;
        }

    }
}

function aiPositionM() {
    //pozycja środka paletki
    const middlePaddle = aiY + paddleHeight / 2;
    //pozycja środka piłki
    const middleBall = ballY + ballSize / 2;

    //druga połowa boiska
    if (ballX > 600) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 20;
        } else if (middlePaddle - middleBall > 50) {
            aiY -= 10;
        } else if (middlePaddle - middleBall < -200) {
            aiY += 20;
        } else if (middlePaddle - middleBall < -50) {
            aiY += 10;
        }
    }

    //pierwsza połowa boiska
    else if (ballX <= 600 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 8;
        } else if (middlePaddle - middleBall < -100) {
            aiY += 8;
        }

    }
}

function aiPositionH() {
    //pozycja środka paletki
    const middlePaddle = aiY + paddleHeight / 2;
    //pozycja środka piłki
    const middleBall = ballY + ballSize / 2;

    //druga połowa boiska
    if (ballX > 600) {
        if (middlePaddle - middleBall > 200) {
            aiY -= 25;
        } else if (middlePaddle - middleBall > 50) {
            aiY -= 13;
        } else if (middlePaddle - middleBall < -200) {
            aiY += 25;
        } else if (middlePaddle - middleBall < -50) {
            aiY += 13;
        }
    }

    //pierwsza połowa boiska
    else if (ballX <= 600 && ballX > 150) {
        if (middlePaddle - middleBall > 100) {
            aiY -= 11;
        } else if (middlePaddle - middleBall < -100) {
            aiY += 11;
        }

    }
}

function bubbleSort(n, p) {
    var swapped;
    do {
        swapped = false;
        for (var i = 0; i < p.length - 1; i++) {
            if (p[i] > p[i + 1]) {
                var temp = p[i];
                var temp2 = n[i];
                p[i] = p[i + 1];
                n[i] = n[i + 1];
                p[i + 1] = temp;
                n[i + 1] = temp2;
                swapped = true;
            }
        }
    } while (swapped);
}

var clickedgo = false;
var nicki1 = [];
nicki1 = nicki1.concat(JSON.parse(localStorage.getItem("nicki1")));
var punkty1 = [];
punkty1 = punkty1.concat(JSON.parse(localStorage.getItem("punkty1")));
var nicki2 = [];
nicki2 = nicki2.concat(JSON.parse(localStorage.getItem("nicki2")));
var punkty2 = [];
punkty2 = punkty2.concat(JSON.parse(localStorage.getItem("punkty2")));
var nicki3 = [];
nicki3 = nicki3.concat(JSON.parse(localStorage.getItem("nicki3")));
var punkty3 = [];
punkty3 = punkty3.concat(JSON.parse(localStorage.getItem("punkty3")));

function anykey() {
    if (scoreai == 1) {
        $('html').on('keypress', function (e) {
            clickedgo = true;
        });
    }
}

function escape(){
    $('body').on('keydown', function (e) {
        //console.log(e.keyCode);
        if(e.keyCode==27){
            playing = false;
            difficulty = 0;
            canvas.removeEventListener("mousemove", playerPosition);
            playerY=200;
            aiY=200;
            ballX = cw / 2 - ballSize / 2;
            ballY = ch / 2 - ballSize / 2;
            ballReset();
            $(document.body).off("keydown");
            
        }
    });
}

function gameover() {
    //stół
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    ctx.font = "72px Aldrich";
    ctx.fillStyle = "#b20000";
    var metrics = ctx.measureText("PRZEGRANA");
    ctx.fillText("PRZEGRANA", cw / 2 - metrics.width / 2, ch / 2);
    ctx.font = "24px Aldrich";
    ctx.fillStyle = "#ff8080";
    metrics = ctx.measureText("WCISNIJ DOWOLNY PRZYCISK ABY KONTYNUOWAC");
    ctx.fillText("WCISNIJ DOWOLNY PRZYCISK ABY KONTYNUOWAC", cw / 2 - metrics.width / 2, 3 * ch / 4);
    canvas.onclick = function fun() {
        clickedgo = true;
    }
}

var nickname = "";
var clickeds = false;
var n;
var p;

function input() {
    if (scoreai == 1) {
        $('body').on('keydown', function (e) {
            if (clickedgo == true) {
                if ((e.keyCode >= 65 && e.keyCode <= 90) || (e.keyCode >= 48 && e.keyCode <= 57)) {
                    //console.log(e.keyCode);
                    if (nickname.length <= 12) {
                        nickname += e.key;
                    }
                } else if (e.keyCode == 8) nickname = nickname.substring(0, nickname.length - 1);
                else if (e.keyCode == 13 && nickname.length > 0) {
                    $('body').off('keydown');
                    clickeds = true;
                    if (difficulty == 1) {
                        n = nicki1;
                        p = punkty1;
                    } else if (difficulty == 2) {
                        n = nicki2;
                        p = punkty2;
                    } else if (difficulty == 3) {
                        n = nicki3;
                        p = punkty3;
                    }
                    if (n.length < 5) {
                        if (n[0] == null) {
                            n[n.length - 1] = nickname;
                            p[p.length - 1] = scorep;
                        } else {
                            n[n.length] = nickname;
                            p[p.length] = scorep;
                        }
                        bubbleSort(n, p);
                        n.reverse();
                        p.reverse();
                    } else if (n.length == 5) {
                        bubbleSort(n, p);
                        n.reverse();
                        p.reverse();
                        if (scorep > p[4]) {
                            p[4] = scorep;
                            n[4] = nickname;
                        }
                        bubbleSort(n, p);
                        n.reverse();
                        p.reverse();
                    }
                    //console.log(n);
                    //console.log(p);
                    if (difficulty == 1) {
                        localStorage.setItem("nicki1", JSON.stringify(n));
                        localStorage.setItem("punkty1", JSON.stringify(p));
                        nicki1 = JSON.parse(localStorage.getItem("nicki1"));
                        punkty1 = JSON.parse(localStorage.getItem("punkty1"));
                    } else if (difficulty == 2) {
                        localStorage.setItem("nicki2", JSON.stringify(n));
                        localStorage.setItem("punkty2", JSON.stringify(p));
                        nicki2 = JSON.parse(localStorage.getItem("nicki2"));
                        punkty2 = JSON.parse(localStorage.getItem("punkty2"));
                    } else if (difficulty == 3) {
                        localStorage.setItem("nicki3", JSON.stringify(n));
                        localStorage.setItem("punkty3", JSON.stringify(p));
                        nicki3 = JSON.parse(localStorage.getItem("nicki3"));
                        punkty3 = JSON.parse(localStorage.getItem("punkty3"));
                    }

                }
            }
        });
    }
}






function scoreend() {
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    ctx.font = "72px Aldrich";
    ctx.fillStyle = "#b20000";
    var metrics = ctx.measureText("TWOJ WYNIK: " + scorep);
    ctx.fillText("TWOJ WYNIK: " + scorep, cw / 2 - metrics.width / 2, ch / 4);
    ctx.font = "36px Aldrich";
    ctx.fillStyle = "#ff8080";
    metrics = ctx.measureText("PODAJ NICK");
    ctx.fillText("PODAJ NICK", cw / 2 - metrics.width / 2, ch / 2);
    ctx.font = "36px Aldrich";
    ctx.fillStyle = "#ff8080";
    metrics = ctx.measureText(nickname);
    ctx.fillText(nickname, cw / 2 - metrics.width / 2, 3 * ch / 4);
}

function highscore() {
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    ctx.font = "72px Aldrich";
    ctx.fillStyle = "#b20000";
    var metrics = ctx.measureText("RANKING:");
    ctx.fillText("RANKING:", cw / 2 - metrics.width / 2, ch / 6 + 12);
    ctx.font = "32px Aldrich";
    ctx.fillStyle = "#ff8080";
    if (difficulty == 1) {
        n = nicki1;
        p = punkty1;
    } else if (difficulty == 2) {
        n = nicki2;
        p = punkty2;
    } else if (difficulty == 3) {
        n = nicki3;
        p = punkty3;
    }
    for (var i = 0; i < n.length; i++) {
        ctx.fillText((i + 1) + ". " + n[i], cw / 2 - metrics.width / 2 +4, 2 * ch / 6 + i * 20 * 2);
        ctx.fillText(p[i], cw / 2 + metrics.width / 2 - 24, 2 * ch / 6 + i * 20 * 2);
    }
    $(".return").show();


}

function menu() {
    //stół
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    $(".title").show();
    $(".button").show();
    $(".return").hide();
    scorep=0;
    scoreai=0;
    clickedgo=false;
    clickeds=false;
    nickname = "";
}

var difficulty = 0;
//sterowanie paddle za pomocą myszy

var playing = false;

$(".first").click(function () {
    playing = true;
    scorelimit=1;
    difficulty = 1;
    canvas.addEventListener("mousemove", playerPosition);
    playerY=200;
    aiY=200;
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballReset();
});


$(".second").click(function () {
    playing = true;
    scorelimit=1;
    difficulty = 2;
    canvas.addEventListener("mousemove", playerPosition);
    playerY=200;
    aiY=200;
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballReset();
});

$(".third").click(function () {
    playing = true;
    scorelimit=1;
    difficulty = 3;
    canvas.addEventListener("mousemove", playerPosition);
    playerY=200;
    aiY=200;
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballReset();
});

$(".return").click(function () {
    playing = false;
    difficulty = 0;
    $(".return").css("backgroundColor", "#990000");
    canvas.removeEventListener("mousemove", playerPosition);
});

var helperkey;

$(".fourth").click(function () {
    playing = true;
    scorelimit=3;
    difficulty = 4;
    playerY=200;
    aiY=200;
    ballX = cw / 2 - ballSize / 2;
    ballY = ch / 2 - ballSize / 2;
    ballReset();
    var repeatState = {};
    $(document.body).keydown(function (e) {
        var key = e.which;
        helperkey=e.which;
        // if no time yet for this key, then start one
        if (!repeatState[key]) {
            // make copy of key code because `e` gets reused
            // by other events in IE so it won't be preserved
            repeatState[key] = setInterval(function () {
                switch (key) {
                    case 38:
                        {
                            aiY -= 12;
                            if (aiY <= 0) {
                                aiY = 0;
                            }
                            break;
                        }
                    case 40:
                        {
                            aiY += 12;
                            if (aiY >= ch - paddleHeight) {
                                aiY = ch - paddleHeight;
                            }
                            break;
                        }
                    case 87:
                        {
                            playerY -= 12;
                            if (playerY <= 0) {
                                playerY = 0;
                            }
                            break;
                        }
                    case 83:
                        {
                            playerY += 12;
                            if (playerY >= ch - paddleHeight) {
                                playerY = ch - paddleHeight;
                            }
                            break;
                        }
                };
            }, 1000 / 60);
        } else {
            // nothing really to do here
            // The key was pressed, but there is already a timer
            // firing for it
        }
    }).keyup(function (e) {
        // if we have a timer for this key, then stop it 
        // and delete it from the repeatState object
        var key = e.which;
        var timer = repeatState[key];
        if (timer) {
            clearInterval(timer);
            delete repeatState[key];
        }
    });
});

function menuai1(e){
        const middlePaddle=playerY+paddleHeight/2;
        //pozycja środka piłki
        const middleBall=ballY+ballSize/2;
        if(ballX<400){
        
        if(middlePaddle-middleBall>200){
            playerY-=20; 
        }
        else if(middlePaddle-middleBall>50){
            playerY-=10;
        }
        else if(middlePaddle-middleBall<-200){
            playerY+=20;
        }
        else if(middlePaddle-middleBall<-50){
            playerY+=10;
        }
    }
    
    //pierwsza połowa boiska
    else if(ballX>400 && ballX<850){
        if(middlePaddle-middleBall>100){
            playerY-=10; 
        }
        else if(middlePaddle-middleBall<-100){
            playerY+=10;
        }
        
    }
    
    //aiY=playerY;
};
function menuai2(){
    //pozycja środka paletki
    const middlePaddle=aiY+paddleHeight/2;
    //pozycja środka piłki
    const middleBall=ballY+ballSize/2;
    
    //druga połowa boiska
    if(ballX>600){
        if(middlePaddle-middleBall>200){
            aiY-=20; 
        }
        else if(middlePaddle-middleBall>50){
            aiY-=10;
        }
        else if(middlePaddle-middleBall<-200){
            aiY+=20;
        }
        else if(middlePaddle-middleBall<-50){
            aiY+=10;
        }
    }
    
    //pierwsza połowa boiska
    else if(ballX<=600 && ballX>150){
        if(middlePaddle-middleBall>100){
            aiY-=10; 
        }
        else if(middlePaddle-middleBall<-100){
            aiY+=10;
        }
        
    }
}

function menutable() {
    //stół
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
}

function endgamemp(){
    $(document.body).off("keydown");
    ctx.fillStyle = "#282828";
    ctx.fillRect(0, 0, cw, ch);
    ctx.font = "48px Aldrich";
    if(scorep==3){
        ctx.fillStyle = "#0091f9";
        var metrics = ctx.measureText("WYGRAL GRACZ NIEBIESKI");
        ctx.fillText("WYGRAL GRACZ NIEBIESKI", cw / 2 - metrics.width / 2, ch / 2);
        $(".return").css("backgroundColor", "#0091f9");
        $(".return").show();
    }
    else if(scoreai==3){
        ctx.fillStyle = "#b20000";
        var metrics = ctx.measureText("WYGRAL GRACZ CZERWONY");
        ctx.fillText("WYGRAL GRACZ CZERWONY", cw / 2 - metrics.width / 2, ch / 2);
        $(".return").css("backgroundColor", "#990000");
        $(".return").show();
    }
    
}

var check;
function game() {
    if (playing == false) {
        menu();
        menutable();
        ball();
        player();
        ai();
        menuai1();
        menuai2();
        $("#helpercontainer").addClass("blurred");
        
    } else {
        escape();
        $(".title").hide();
        $(".button").hide();
        $("#helpercontainer").removeClass("blurred");
        
        if (scoreai == scorelimit && difficulty != 4) {
            if (difficulty != 4) {
                if (clickedgo == true) {
                    if (clickeds == true) highscore();
                    else scoreend();
                } else {
                    anykey()
                    gameover();
                }
            } else {
                anykey()
                gameover();
            }
        } else if ((scorep == scorelimit || scoreai==scorelimit) && difficulty == 4) {
            endgamemp();
        } else {
            table();
            score();
            if(check==true){
                ball();
            }
            else{
                setTimeout(function(){check=true},500);
            }
            player();
            ai();
            if (difficulty == 1) aiPositionE();
            if (difficulty == 2) aiPositionM();
            if (difficulty == 3) aiPositionH();
        };
    }


    //console.log(ballSpeedX, ballSpeedY, ballSpeedXY);
}


setInterval(game, 1000 / 60);
