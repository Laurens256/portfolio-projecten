let geld = 100;
const geldTekst = document.querySelector("#money");

const nameSubmit = document.querySelector("#submitform");
const startscherm = document.querySelector("#startscherm");
const nameInput = document.querySelector("#nameform");
let randomNames = ["Dirk", "Hans", "Boudewijn", "Stephanie", "Reduan", "Sam"];
let yourName = "";

let foodBar = document.querySelector("progress").value;
const buttonPet = document.querySelector("#aaien");
const buttonPlay = document.querySelector("#spelen");
const buttonEat = document.querySelector("#eten");

const wardrobeOverlay = document.querySelector("#wardrobe");
const buttonWardrobeToggle = document.querySelector("#buttonwardrobe");

const bruin = document.querySelector("#bruin");
const blauw = document.querySelector("#blauw");
const rood = document.querySelector("#rood");
const groen = document.querySelector("#groen");

const settings = document.querySelector("aside");
const achtergrondSelector = document.querySelectorAll("#achtergrondkleuren div");
const creditsSettingsIcons = document.querySelectorAll(".overlaytoggle");

const volumeIcon = document.querySelector("#volume");
const audio = document.createElement("audio");
let volumeCheck = true;

const achtergrondChange = document.querySelectorAll(".achtergrondchange");
const achtergrondAccentChange = document.querySelectorAll(".achtergrondchangeaccent");

const creditsScreen = document.querySelector("section");
const tekstScroll = document.querySelector("#tekstscroll");
const creditScroll = document.querySelector("#creditscroll");

const tamagotchi = document.querySelector("#tamagotchi");

//mbv Melvin Idema (student-assistent)
const pakjeCheck = {
	blauw: false,
	rood: false,
	groen: false
};


//startscherm en naaminvoer
function getName(event) {
	startscherm.style.opacity = "0";
	startscherm.style.visibility = "hidden";
	event.preventDefault();

	if (nameInput.value == "") {
		let randomGetal = Math.random() * randomNames.length;
		randomGetal = Math.floor(randomGetal);
		yourName = randomNames[randomGetal];
	} else if (nameInput.value == "motherlode") {
		geld = 10000;
		yourName = "Cheater";
		updateScreen();
	} else {
		yourName = nameInput.value;
	}
}

//spelen, +geld, -foodBar
function actionSpelen() {
	if (geld < 980 && foodBar > 0) {
		geld += 20;
		foodBar -= 5;
		actionEffects("play", "play");
	} else if (geld >= 980 && foodBar > 0) {
		geld = 1000;
		foodBar -= 5;
		actionEffects("play", "play");
	} else {
		alert(yourName + " is hungry, give him something to eat before playing again!");
	}
	updateScreen();
}


//eten, -geld, +foodBar
function actionVoeren() {
	if (geld > 0 && foodBar <= 90) {
		geld -= 10;
		foodBar += 10;
		actionEffects("eat", "eat");
	} else if (foodBar > 90 && foodBar < 100) {
		geld -= 10;
		foodBar = 100;
		actionEffects("eat", "eat");
	} else {
		alert("Looks like " + yourName + " is full! Time to burn some calories.");
	}
	updateScreen();
}

function actionAaien() {
	actionEffects("pet", "pet");
}

//wardrobe
function wardrobeToggle() {
	if (wardrobeOverlay.style.visibility == "visible") {
		wardrobeOverlay.style.opacity = "0";
		wardrobeOverlay.style.visibility = "hidden";
		buttonWardrobeToggle.src = "img/clothes-hanger.png";
	} else {
		wardrobeOverlay.style.opacity = "1";
		wardrobeOverlay.style.visibility = "visible";
		buttonWardrobeToggle.src = "img/close.png";
	}
}

function bruinKleur() {
	revert("blauw");
	revert("rood");
	revert("groen");
	bruin.src = "img/bruin_aan.png";
	tamagotchi.src = "img/bruin_idle.gif";
}

function blauwKleur() {
	if (geld >= 500 && pakjeCheck.blauw == false) {
		geld -= 500;
		blauw.src = "img/blauw_gekocht.png";
		pakjeCheck.blauw = true;
		actionEffects("_", "ka-ching");
	} else if (pakjeCheck.blauw == true) {
		revert("rood");
		revert("groen");
		blauw.src = "img/blauw_aan.png";
		tamagotchi.src = "img/blauw_idle.gif";
	} else {
		noMoney();
	}
	updateScreen();
}

function roodKleur() {
	if (geld >= 700 && pakjeCheck.rood == false) {
		geld -= 700;
		rood.src = "img/rood_gekocht.png";
		pakjeCheck.rood = true;
		actionEffects("_", "ka-ching");
	} else if (pakjeCheck.rood == true) {
		revert("blauw");
		revert("groen");
		rood.src = "img/rood_aan.png";
		tamagotchi.src = "img/rood_idle.gif";
	} else {
		noMoney();
	}
	updateScreen();
}

function groenKleur() {
	if (geld >= 900 && pakjeCheck.groen == false) {
		geld -= 900;
		groen.src = "img/groen_gekocht.png";
		pakjeCheck.groen = true;
		actionEffects("_", "ka-ching");
	} else if (pakjeCheck.groen == true) {
		revert("blauw");
		revert("rood");
		groen.src = "img/groen_aan.png";
		tamagotchi.src = "img/groen_idle.gif";
	} else {
		noMoney();
	}
	updateScreen();
}

function revert(kleur) {
	const kleurPoppetje = document.querySelector("#" + kleur);
	bruin.src = "img/bruin_gekocht.png";
	if (pakjeCheck[kleur]) {
		kleurPoppetje.src = "img/" + kleur + "_gekocht.png";
	} else {
		kleurPoppetje.src = "img/" + kleur + "_kopen.png";
	}
}


function achtergrondKiezen(event, achtergrondKleur, accentKleur) {
	if (event.target.id == "darkseagreen_achtergrond") {
		achtergrondKleur = "darkseagreen";
		accentKleur = "#afcfaf";
	} else if (event.target.id == "lightblue_achtergrond") {
		achtergrondKleur = "lightblue";
		accentKleur = "#d4ebf2";
	} else if (event.target.id == "pink_achtergrond") {
		achtergrondKleur = "pink";
		accentKleur = "#ffdae0";
	} else {
		achtergrondKleur = "#ffbf00";
		accentKleur = "#ffcc33";
	}
	for (let i = 0; i < achtergrondChange.length; i++) {
		achtergrondChange[i].style.background = achtergrondKleur;
	}
	for (let i = 0; i < achtergrondAccentChange.length; i++) {
		achtergrondAccentChange[i].style.background = accentKleur;
	}
}

//audio afspelen via https://gamedev.stackexchange.com/questions/60139/play-audio-in-javascript-with-a-good-performance
function actionEffects(welkeActie, welkeAudio) {
	const actieEffect = document.querySelector("#transparant" + welkeActie);
	if (volumeCheck == true) {
		audio.src = "assets/geluid_" + welkeAudio + ".mp3";
		audio.play();
	}
	if (welkeActie == "_") {
		return;
	} else {
		actieEffect.src = "img/gif_" + welkeActie + ".gif";
	}
}

function changeVolume() {
	if (volumeCheck == true) {
		volumeCheck = false;
		volumeIcon.src = "img/volumeoff.png";
	} else {
		volumeCheck = true;
		volumeIcon.src = "img/volume.png";
	}
}

//algemen overlaytoggle en roll credits
function revealOverlays(event, welkScherm) {
	if (event.target.id == "togglecredits") {
		welkScherm = creditsScreen;
		creditScroll.scrollTo(0, 0);
		tekstScroll.classList.add("scrollanimation");
		setTimeout(function() {
			creditScroll.scrollTo(0, 2000); 
            tekstScroll.classList.remove("scrollanimation");
		}, 15001);
	} else if (event.target.id == "leavecredits") {
		welkScherm = creditsScreen;
	} else {
		welkScherm = settings;
	}
	if (welkScherm.style.visibility == "visible") {
		welkScherm.style.opacity = "0";
		welkScherm.style.visibility = "hidden";
	} else {
		welkScherm.style.opacity = "1";
		welkScherm.style.visibility = "visible";
	}
}

//update geld en eten visueel wanneer bovenstaande functions worden uitgevoerd + anti softlock
function updateScreen() {
	document.getElementById("money").innerHTML = geld;
	document.querySelector("progress").value = foodBar;
	if (geld == 0 && foodBar == 0) {
		geld += 10;
	}
}

function noMoney() {
	geldTekst.classList.add("nomoney");
	setTimeout(function() {
		geldTekst.classList.remove("nomoney");
	}, 1900);
	if (volumeCheck == true) {
		audio.src = "assets/error.mp3";
		audio.play();
	}
}

updateScreen();

nameSubmit.addEventListener("click", getName);
buttonPet.addEventListener("click", actionAaien);
buttonPlay.addEventListener("click", actionSpelen);
buttonEat.addEventListener("click", actionVoeren);

buttonWardrobeToggle.addEventListener("click", wardrobeToggle);
bruin.addEventListener("click", bruinKleur);
blauw.addEventListener("click", blauwKleur);
rood.addEventListener("click", roodKleur);
groen.addEventListener("click", groenKleur);

volumeIcon.addEventListener("click", changeVolume);

for (let i = 0; i < achtergrondSelector.length; i++) {
	achtergrondSelector[i].addEventListener("click", achtergrondKiezen);
}

for (let i = 0; i < creditsSettingsIcons.length; i++) {
	creditsSettingsIcons[i].addEventListener("click", revealOverlays);
}