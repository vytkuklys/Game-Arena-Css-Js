//Selectors
const selectFighter = document.querySelector(".select-fighter");
const arena = document.querySelector(".arena");
const arenaBtn = document.getElementById("btn");
let damageMonitor = document.querySelectorAll(".color-change");
const body = document.body;

//Variables
let timer = setInterval(changeColors, 500);
let alternate = 0;
let chosenFigure = document.querySelector(".chosen-figure");


//loadArena by hidding, removing some html blocks and manipulating some of the styles
function loadArena(name) {
    let HtmlWolter = document.querySelector(".blue-bg");
    let HtmlSil = document.querySelector(".pink-bg");
    let HtmlEd = document.querySelector(".yellow-bg");
    let HtmlEric = document.querySelector(".green-bg");
    let removeOnclick = document.querySelectorAll(".stand");
    let getFigure =
        (name == "Wolter") ? HtmlWolter :
        (name == "Sil") ? HtmlSil :
        (name == "Ed") ? HtmlEd : HtmlEric;
    selectFighter.style.display = "none";
    arena.style.display = "grid";
    for (index = 0; index <= 3; index++) {
        damageMonitor[index].innerHTML = "";
        removeOnclick[index].removeAttribute("onclick");
    }
    document.querySelector(".select-header").innerHTML = "Prepare to Fight"
    chosenFigure.setAttribute("class", "grid-top-left");
    chosenFigure.innerHTML = getFigure.outerHTML;
}

/*startFight allows user to see damage delt in the round */

function startFight() {
    document.querySelector(".grid-top-left").getElementsByTagName("p")[0].setAttribute("class", "red");
    let bossAttack = calcBossAttack();
    let figureAttack = calcAttack();
    let damageMonitorFigure = document.querySelector(".red");
    let damageMonitorBoss = document.querySelector(".damage");
    let bossHp = document.querySelector(".health").innerHTML;
    let playerHp = document.querySelector(".grid-top-left").getElementsByTagName("span")[1].innerHTML;
    let flipCoin = Math.floor(Math.random() * Math.floor(2));
    console.log(flipCoin + "flip")
    if(flipCoin == 1){
        bossHp -= figureAttack;
        if(bossHp < 0){
            damageMonitorBoss.innerHTML = -1 * figureAttack;
            document.querySelector(".health").innerHTML = 0;
            gameWon();
        }else{
            damageMonitorBoss.innerHTML = -1 * figureAttack;
            document.querySelector(".health").innerHTML = bossHp;
            playerHp -= bossAttack;
            setTimeout(() => {if(playerHp < 0){
                damageMonitorFigure.innerHTML = -1 * bossAttack;
                document.querySelector(".grid-top-left").getElementsByTagName("span")[1].innerHTML = 0;
                gameLost();
            }else{
                damageMonitorFigure.innerHTML = -1 * bossAttack;
                document.querySelector(".grid-top-left").getElementsByTagName("span")[1].innerHTML = playerHp;
            }}, 1500);
        }
    }else if(flipCoin == 0){
       playerHp -= bossAttack;
       if(playerHp < 0){
           damageMonitorFigure.innerHTML = -1 * bossAttack;
           document.querySelector(".grid-top-left").getElementsByTagName("span")[1].innerHTML = 0;
           gameLost();
       }else{
           damageMonitorFigure.innerHTML = -1 * bossAttack;
           document.querySelector(".grid-top-left").getElementsByTagName("span")[1].innerHTML = playerHp;
           bossHp -= figureAttack;
           setTimeout(() => {if(bossHp < 0){
                damageMonitorBoss.innerHTML = -1 * figureAttack;
                document.querySelector(".health").innerHTML = 0;
                gameWon();
           }else{
               damageMonitorBoss.innerHTML = -1 * figureAttack;
               document.querySelector(".health").innerHTML = bossHp;
            }}, 1500);
       }
    }
}
function gameWon(){
    document.getElementById("btn").innerHTML = "New Game";
    document.querySelector(".fight-arena").getElementsByTagName("h5")[0].innerHTML = "You won!";
    document.getElementById("btn").setAttribute("onclick", "refresh()");
}

function gameLost(){
    document.getElementById("btn").innerHTML = "New Game";
    document.querySelector(".fight-arena").getElementsByTagName("h5")[0].innerHTML = "You lost!";
    document.getElementById("btn").setAttribute("onclick", "refresh()");
}

function refresh(){
    location.reload();
}

function calcAttack(){
    let figureStrength = document.querySelector(".grid-top-left").getElementsByTagName("span")[0].innerText;
    let figureAgility = document.querySelector(".grid-top-left").getElementsByTagName("span")[2].innerText;
    let calcDamage = figureStrength * figureAgility / 2000;
    let variation = Math.floor(Math.random() * Math.floor(5));
    let numberOfStrikes = Math.floor(Math.random() * Math.floor(figureAgility/10)/ 2) + 1;
    let totalDamage = parseInt((calcDamage + variation) * numberOfStrikes);
    return totalDamage;
}
function calcBossAttack(){
    let bossAttack = ((200 * 125 / 2000) + Math.floor(Math.random() * Math.floor(5))) * Math.floor(Math.random() * Math.floor(125/10)/ 2) + 1;
    return bossAttack;
}

/*style functions for blinking effect of text "select" in the main page bellow*/
function changeColors() {
    let index = 0;
    let change = document.querySelectorAll(".color-change");
    let changeBtn = document.querySelector("button");
    if (alternate % 2 == 0) {
        for (index = 0; index < change.length; index++) {
            change[index].style.color = "#ee88e7";
        }
        changeBtn.style.color = "#ee88e7";
        alternate++;
    } else {
        for (index = 0; index < change.length; index++) {
            change[index].style.color = "#88EE8F";
        }
        changeBtn.style.color = "#88EE8F";
        alternate++;
    }
    if (alternate > 30) {
        clearInterval(timer);
    }
}
