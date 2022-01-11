const beurtNummerTekst = document.querySelector("#spelerbeurt");
const gooiDobbelsteen = document.querySelector("#gooidobbelsteen");
const dobbelsVisueel = document.querySelectorAll("#dobbelstenenframe ul li img");

const startSchermButtons = document.querySelectorAll("#startschermoverlay ul li, #startschermoverlay > div:nth-of-type(2)");
const startSchermOverlay = document.querySelector("#startschermoverlay");
const playersAantal = document.querySelectorAll(".playersaantal");
const computerOfMens = document.querySelectorAll(".computerofmens");

const actieTekst = document.querySelector("#watgebeurter");
const infoboxSpelers = document.querySelectorAll("#infobox ul li");

const rootElement = document.querySelector(":root");

//positie van de spelers
const players = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0
};

//houdt bij welke spelers vastzitten + hoeveel beurten
const beurtenVast = {
    "1": 0,
    "2": 0,
    "3": 0,
    "4": 0
};

//vakjes die bezet zijn, hiervoor is een aparte array zodat de speler die gooit zijn eigen vakje niet als bezet ziet en terug gaat
let bezet = [0, 0, 0, 0];

//wie is aan de beurt
let userTurn = 1;

//wordt true wanneer de speler bijvoorbeeld vanaf 63 terug telt
let negatieveMove = false;

let hoeveelVakjes;
let movePause;

const ganzen = [5, 9, 14, 18, 23, 27, 32, 36, 41, 45, 50, 54, 59];

const bordTotaal = Array.from(document.querySelectorAll(".bordcontainer div"));

//kleuren worden 1x genoemd zodat ze makkelijk veranderd kunnen worden
const vakjeKleur = ["#D6C399", "blue", "red", "green", "gold"];

let tegenComputer = false;
let gameOver = false;
let beurtBezig = false;


//regelt alles op het startscherm, hoeveelheid en tegen computer of mensen
function choosePlayers(event) {
    if (event.currentTarget.classList.contains("playersaantal")) {
        for (let i = 0; i < playersAantal.length; i++) {
            playersAantal[i].classList.remove("active");
        }
    }

    if (event.currentTarget.classList.contains("computerofmens")) {
        for (let i = 0; i < computerOfMens.length; i++) {
            computerOfMens[i].classList.remove("active");
        }
    }

    if (event.currentTarget.id == "2players") {
        delete players["3"];
        delete players["4"];
        bezet.length = 2;
    } else if (event.currentTarget.id == "3players") {
        players["3"] = 0;
        delete players["4"];
        bezet.length = 3;
    } else if (event.currentTarget.id == "4players") {
        players["3"] = 0;
        players["4"] = 0;
        bezet.length = 4;
    } else if (event.currentTarget.id == "tegencomputer") {
        tegenComputer = true;
    } else if (event.currentTarget.id == "tegenmensen") {
        tegenComputer = false;
    } else {
        startSchermOverlay.style.display = "none";

        for (let i = 0; i < bezet.length; i++) {
            infoboxSpelers[i].style.display = "flex";
        }

        return;
    }
    event.currentTarget.classList.add("active");
}


//kijkt of het spel niet al is afgelopen en dat de vorige beurt niet meer bezig is.
function determineTurn() {
    if (beurtBezig == true) {
        return;
    } else if (gameOver == true) {
        //zodat de juiste winnaar altijd wordt aangegeven in de winalert
        if (userTurn == 1) {
            userTurn = 5;
        }
        alert("Speler " + (userTurn - 1) + " heeft gewonnen");
        return;
    } else {
        beurtBezig = true;
    }
    rootElement.style.setProperty("--huidigespeler", vakjeKleur[userTurn]);
    dobbelen(userTurn);

    //de beurt gaat omhoog, dit had ik beter aan het begin van de function kunnen doen maar dit is nu te veel werk (voor later)
    if (userTurn < Object.keys(players).length) {
        userTurn += 1;
    } else {
        userTurn = 1;
    }
}

//zorgt ervoor dat de beurt tekst pas wordt geupdate als de vorige beurt is afgelopen
function updateScreen() {
    beurtNummerTekst.textContent = userTurn;
    rootElement.style.setProperty("--huidigespeler", vakjeKleur[userTurn]);
}



//2 random dobbelworpen
function dobbelen(userTurn) {
    const dobbel1 = Math.floor(Math.random() * (6) + 1);
    const dobbel2 = Math.floor(Math.random() * (6) + 1);
    let dobbelTotaal = dobbel1 + dobbel2;
    //dobbeltotaal == let zodat je deze in de code aan kan passen voor tests

    // if(userTurn == 1) {
    //     dobbelTotaal = 19;   //bepaal dobbelnr (voor tests)
    // }

    actieTekst.textContent = "Speler " + userTurn + " gooit " + dobbelTotaal;

    const diceRoll = new Audio("assets/dicethrow.mp3");
    diceRoll.play();

    //opmaak voor dobbelsteen worp
    gooiDobbelsteen.classList.add("gooidobbel");
    dobbelsVisueel[0].setAttribute("src", "img/dobbel/" + dobbel1 + ".png");
    dobbelsVisueel[1].setAttribute("src", "img/dobbel/" + dobbel2 + ".png");
    for (let i = 0; i < dobbelsVisueel.length; i++) {
        dobbelsVisueel[i].classList.add("showdobbel");
    }

    //speciale regels zodat je niet via de ganzen in een keer wint
    if (players[userTurn] == 0 && dobbelTotaal == 9) {
        if (dobbel1 == 6 || dobbel1 == 3 && dobbel2 == 6 || dobbel2 == 3) {
            actieTekst.textContent = "Speler " + userTurn + " gooit 6 en 3, ga door naar 26";
            dobbelTotaal = 26;
        } else {
            dobbelTotaal = 53;
            actieTekst.textContent = "Speler " + userTurn + " gooit 5 en 4, ga door naar 53";
        }
    }

    beurtenOverslaan(userTurn, dobbelTotaal);
}



//kijkt of je niet in de put/gevangenis/herberg zit
function beurtenOverslaan(userTurn, dobbelTotaal) {
    if (beurtenVast[userTurn] == 0) {
        setTimeout(function smallPause() {
            movePawns(userTurn, dobbelTotaal);
        }, 1000);
    } else {
        actieTekst.textContent = "Speler " + userTurn + " zit nog " + beurtenVast[userTurn] + " beurt(en) vast";
        beurtenVast[userTurn] -= 1;
        if (userTurn !== parseInt(Object.keys(players)[Object.keys(players).length - 1]) && tegenComputer == true) {
            setTimeout(function smallPause() {
                determineTurn();
            }, 1000);
        }
        setTimeout(function smallPause() {
            for (let i = 0; i < dobbelsVisueel.length; i++) {
                dobbelsVisueel[i].classList.remove("showdobbel");
            }
        }, 1500);
        gooiDobbelsteen.classList.remove("gooidobbel");
        beurtBezig = false;
    }
}



//beweegt spelers visueel
function movePawns(userTurn, dobbelTotaal, hoeveelVakjes) {
    //hoeveelvakjes wordt gebruikt voor bijvoorbeeld de brug, als je 3 gooit en op de brug landt, moet je 6 naar voor en dus niet het dobbeltotaal
    if (hoeveelVakjes == undefined) {
        hoeveelVakjes = dobbelTotaal;
        movePause = 0;
    } else {
        movePause = 500;
        bordTotaal[players[userTurn]].classList.add("actiefvakje");

        setTimeout(function() {
            for (let i = 0; i < bordTotaal.length; i++) {
                bordTotaal[i].classList.remove("actiefvakje");
            }
        }, 1000);
    }
    bezet[userTurn - 1] = 999;
    //zorgt ervoor dat maar 1 vakje wordt gekleurd en dat het vakje bestaat (tussen 0 en 63)
    setTimeout(function movePauseFunc() {
        for (let i = 0; i <= hoeveelVakjes; i++) {
            setTimeout(function timedMoves() {
                if (players[userTurn] > 0 && !bezet.includes(players[userTurn] - 1) && players[userTurn] <= 63) {
                    bordTotaal[players[userTurn] - 1].style.backgroundColor = vakjeKleur[0];
                }
                if (!bezet.includes(players[userTurn]) && players[userTurn] < 64 && players[userTurn] >= 0) {
                    bordTotaal[players[userTurn]].style.backgroundColor = vakjeKleur[userTurn];
                }
                if (i == hoeveelVakjes) {
                    specialeVakjes(userTurn, dobbelTotaal);
                    return;
                }
                if (players[userTurn] < 63 && negatieveMove == false) {
                    players[userTurn]++;
                } else {
                    if (players[userTurn] < 63 && !bezet.includes(players[userTurn] + 1)) {
                        bordTotaal[players[userTurn] + 1].style.backgroundColor = vakjeKleur[0];
                    }
                    negatieveMove = true;
                    players[userTurn]--;
                }
            }, i * 200);
        }
    }, movePause);
}



//regelt alle "speciale" vakjes
function specialeVakjes(userTurn, dobbelTotaal) {
    //check of je op een van de ganzen bent geland
    if (ganzen.includes(players[userTurn])) {
        hoeveelVakjes = dobbelTotaal;
        movePawns(userTurn, dobbelTotaal, hoeveelVakjes);
        actieTekst.textContent = "Speler " + userTurn + " is op een gans geland! Ga nog eens het gegooide aantal ogen vooruit.";
        return;
    }

    //check voor winnaar
    if (players[userTurn] == 63) {
        gameOver = true;
        beurtBezig = false;
        actieTekst.textContent = "Speler " + userTurn + " heeft gewonnen";
        bordTotaal[63].style.backgroundColor = vakjeKleur[userTurn];
        for (let i = 0; i < dobbelsVisueel.length; i++) {
            dobbelsVisueel[i].classList.remove("showdobbel");
        }
        setTimeout(function kleinePauze() {
            alert("Speler " + userTurn + " heeft gewonnen");
        }, 100);
        return;
    }

    //check of het vakje vrij is, anders terug
    if (bezet.includes(players[userTurn]) && players[userTurn] !== 0) {
        actieTekst.textContent = "Dit vakje is bezet, ga het gegooide aantal ogen terug";
        negatieveMove = true;
        hoeveelVakjes = dobbelTotaal;
        movePawns(userTurn, dobbelTotaal, hoeveelVakjes);
        return;
    }

    //de brug - ga verder naar 12
    if (players[userTurn] == 6) {
        if (negatieveMove == false) {
            actieTekst.textContent = "De brug, ga verder naar vakje 12";
        }
        hoeveelVakjes = 6;
        movePawns(userTurn, dobbelTotaal, hoeveelVakjes);
        return;
    } else if (players[userTurn] == 42) { //doornstruik - terug naar 39
        actieTekst.textContent = "De doornstruik, ga terug naar 39";
        negatieveMove = true;
        hoeveelVakjes = 3;
        movePawns(userTurn, dobbelTotaal, hoeveelVakjes);
        return;
    } else if (players[userTurn] == 58) { //de dood - terug naar het begin / 0
        actieTekst.textContent = "De dood, ga terug naar het begin";
        setTimeout(function kleinePauze() {
            players[userTurn] = 0;
            bordTotaal[players[userTurn]].style.backgroundColor = vakjeKleur[userTurn];
            bordTotaal[58].style.backgroundColor = vakjeKleur[0];
        }, 300);
    } else if (players[userTurn] == 19) { //herberg, sla een beurt over
        actieTekst.textContent = "De herberg, sla de volgende beurt over";
        beurtenVast[userTurn] = 1;
    } else if (players[userTurn] == 31 || players[userTurn] == 52) {
        if (players[userTurn] == 31 && beurtenVast[userTurn] == 0) {
            actieTekst.textContent = "De put, sla de volgende 2 beurten over";
        } else if (players[userTurn] == 52 && beurtenVast[userTurn] == 0) {
            actieTekst.textContent = "De gevangenis, sla de volgende 2 beurten over";
        }
        beurtenVast[userTurn] = 2; //put en gevangenis, sla 2 beurten over
    }

    //voor de zekerheid
    if (players[userTurn] < 0) {
        players[userTurn] = 0;
    }

    bezet[userTurn - 1] = players[userTurn];

    for (let i = 0; i < bordTotaal.length; i++) { //kleurt alle vakjes die niet bezet zijn wit, laatste check
        if (!bezet.includes(i)) {
            bordTotaal[i].style.backgroundColor = vakjeKleur[0];
        }
    }
    bordTotaal[players[userTurn]].style.backgroundColor = vakjeKleur[userTurn]; //laatste kleurcheck
    negatieveMove = false;
    beurtBezig = false;
    gooiDobbelsteen.classList.remove("gooidobbel");

    for (let i = 0; i < dobbelsVisueel.length; i++) {
        dobbelsVisueel[i].classList.remove("showdobbel");
    }

    updateScreen();

    //voor als je tegen de computer speelt, voert niet uit wanneer de userTurn de laatste uit de object is (dan zou voor speler 1 ook gegooid worden)
    if (userTurn !== parseInt(Object.keys(players)[Object.keys(players).length - 1]) && tegenComputer == true) {
        setTimeout(function smallPause() {
            determineTurn();
        }, 1000);
    }
}



gooiDobbelsteen.addEventListener("click", determineTurn);

for (let i = 0; i < startSchermButtons.length; i++) {
    startSchermButtons[i].addEventListener("click", choosePlayers);
}

//zorgt ervoor dat je ook ko kan spelen
for (let i = 0; i < startSchermButtons.length; i++) {
    startSchermButtons[i].addEventListener("keydown", function(event) {
        if (event.keyCode == 13) {
            startSchermButtons[i].click();
        }
    });
}

gooiDobbelsteen.addEventListener("keydown", function(event) {
    if (event.keyCode == 13) {
        gooiDobbelsteen.click();
    }
});