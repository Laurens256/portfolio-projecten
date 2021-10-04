const stedenLijst = ["Aardenburg","Abbekerk","Alkmaar","Almelo","Ameide","Amersfoort","Ammerstol","Amsterdam","Appingedam","Arnemuiden","Arnhem","Asperen","Assen","Austerlitz","Axel","Baarn","Barsingerhorn-Haringhuizen","Batenburg","Bergen op Zoom","Beverwijk","Biervliet","Bolsward","Borculo","Breda","Bredevoort","Brielle","Bronkhorst","Brouwershaven","Bunschoten","Buren","Coevorden","Culemborg","Delden","Delft","Delfzijl","Deventer","Doesburg","Doetinchem","Dokkum","Domburg","Dordrecht","Echt","Edam","Eembrugge","Eemnes-Binnen","Eemnes-Buiten","Eindhoven","Elburg","Enkhuizen","Enschede","Franeker","Geertruidenberg","Geervliet","Gendt","Genemuiden","Gennep","Goedereede","Goes","Goor","Gorinchem","Gouda","Grafhorst","Gramsbergen","Grave","Groenlo","Groningen","Grootebroek","Haarlem","Haastrecht","Hardenberg","Harderwijk","Harlingen","Hasselt","Hattem","Heenvliet","Helmond","Hem","Heukelum","Heusden","Hindeloopen","Hoorn","Huissen","Hulst","IJlst","IJsselstein","IJzendijke","Kampen","Kessel","Klundert","Kortgene","Laag-Keppel","Langedijk","Leerdam","Leeuwarden","Leiden","Lochem","Maasbommel","Maassluis","Maastricht","Medemblik","Megen","Meppel","Middelburg","Monnickendam","Montfoort","Montfort","Muiden","Naarden","Stede Niedorp","Nieuwpoort","Nieuwstadt","Nijkerk","Nijmegen","Oisterwijk","Oldenzaal","Ommen","Oostburg","Oosterhout","Ootmarsum","Oss","Oudewater","Philippine","Purmerend","Ravenstein","Reimerswaal","Rhenen","Rijssen","Roermond","Rotterdam","Schagen","Schiedam","Schoonhoven","s-Gravenzande","s-Heerenberg","s-Hertogenbosch","Sint Anna ter Muiden","Sint-Maartensdijk","Sint-Oedenrode","Sittard","Sloten","Sluis","Sneek","Staverden","Stavoren","Steenbergen","Steenwijk","Susteren","Terborg","Terneuzen","Tholen","Thorn","Tiel","Tilburg","Utrecht","Valkenburg","Veere","Venlo","Vianen","Vlaardingen","Vlissingen","Vollenhove","Vreeland","Waalwijk","Wageningen","Weert","Weesp","Wessem","Westkapelle","Westwoud","Wieringen","Wijk bij Duurstede","Willemstad","Wilsum","Winkel","Winschoten","Woerden","Workum","Woudrichem","Zaandam","Zaltbommel","Zevenaar","Zevenbergen","Zierikzee","Zutphen","Zwolle"];
const soortWeer = ["zonnig", "regenachtig", "stormachtig", "wisselvallig"];

const bodyElement = document.querySelector("body");
const genereerButton = document.querySelector("#genereer");
const h2Element = document.querySelector("#randomstad");
const jaarSlider = document.querySelector("#jaarslider");
let jaartalOutput = document.querySelector("#jaartaloutput");

const datumSlider = document.querySelector("#datumslider");
let datumOutput = document.querySelector("#datumoutput");
let maandOutput = document.querySelector("#maandoutput");

const selectElement = document.querySelector("#tijdselector");
const outputTekst = document.querySelector("#outputtekst");

function randomData(dataType) {
    if(dataType == jaarSlider || dataType == datumSlider) {
    let randomGetal = Math.random()*(dataType.max - dataType.min);
    randomGetal = Math.floor(randomGetal);
    dataType.value = parseInt(dataType.min) + randomGetal;
    }   else {
        let randomGetal = Math.random()*stedenLijst.length;
        randomGetal = Math.floor(randomGetal);
        h2Element.innerHTML = stedenLijst[randomGetal];
    }
}

function jaarKiezen() {
    jaartalOutput.innerHTML = jaarSlider.value;
    formatData();
}

function datumKiezen() {
    if(datumSlider.value <= 31) {
        datumOutput.innerHTML = datumSlider.value;
        maandOutput.textContent = "januari";
        maandOutput.value = "01";
    }   else if(datumSlider.value <= 60) {
        maandOutput.textContent = "februari";
        maandOutput.value = "02";
        datumOutput.innerHTML = datumSlider.value - 31;
    }   else if(datumSlider.value <= 91) {
        maandOutput.innerHTML = "maart";
        maandOutput.value = "03";
        datumOutput.innerHTML = datumSlider.value - 60;
    }   else if(datumSlider.value <= 121) {
        maandOutput.innerHTML = "april";
        maandOutput.value = "04";
        datumOutput.innerHTML = datumSlider.value - 91;
    }   else if(datumSlider.value <= 152) {
        maandOutput.innerHTML = "mei";
        maandOutput.value = "05";
        datumOutput.innerHTML = datumSlider.value - 121;
    }   else if(datumSlider.value <= 182) {
        maandOutput.innerHTML = "juni";
        maandOutput.value = "06";
        datumOutput.innerHTML = datumSlider.value - 152;
    }   else if(datumSlider.value <= 213) {
        maandOutput.innerHTML = "juli";
        maandOutput.value = "07";
        datumOutput.innerHTML = datumSlider.value - 182;
    }   else if(datumSlider.value <= 244) {
        maandOutput.innerHTML = "augustus";
        maandOutput.value = "08";
        datumOutput.innerHTML = datumSlider.value - 213;
    }   else if(datumSlider.value <= 274) {
        maandOutput.innerHTML = "september";
        maandOutput.value = "09";
        datumOutput.innerHTML = datumSlider.value - 244;
    }   else if(datumSlider.value <= 305) {
        maandOutput.innerHTML = "oktober";
        maandOutput.value = "10";
        datumOutput.innerHTML = datumSlider.value - 274;
    }   else if(datumSlider.value <= 335) {
        maandOutput.innerHTML = "november";
        maandOutput.value = "11";
        datumOutput.innerHTML = datumSlider.value - 305;
    }   else {
        maandOutput.innerHTML = "december";
        maandOutput.value = "12";
        datumOutput.innerHTML = datumSlider.value - 335;
    }
    formatData();
}

function formatData() {
    let gekozenJaartal = jaarSlider.value;
    let gekozenMaand = maandOutput.value;
    let gekozenDatum = datumOutput.innerHTML;
    let gekozenTijdstip = selectElement.options[selectElement.selectedIndex].value;

    if(gekozenDatum.length < 2) {
    gekozenDatum = "0"+gekozenDatum;
    }
    let completeDatum = gekozenJaartal+gekozenMaand+gekozenDatum+gekozenTijdstip;


    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1;
    let yyyy = today.getFullYear();
    let hh = today.getHours();
    let mt = today.getMinutes();

    if(dd<10){dd='0'+dd;}
    if(mm<10){mm='0'+mm;}
    if(hh<10){hh='0'+hh;}
    if(mt<10){mt='0'+mt;}
    let todayFormat = yyyy+mm+dd+hh+mt;

    if(gekozenTijdstip !== ""){
    let watVoorWeer = Math.random()*soortWeer.length;
    watVoorWeer = Math.floor(watVoorWeer);
    let weerOutput = soortWeer[watVoorWeer];
    console.log(weerOutput);
    if(completeDatum > todayFormat) {
        outputTekst.innerHTML = "Het wordt " + weerOutput;
    }   else if(completeDatum < todayFormat) {
        outputTekst.innerHTML = "Het was " + weerOutput;
    }   else {
        outputTekst.innerHTML = "Het is " + weerOutput;
    }
    bodyElement.style.backgroundImage = "url(img/" + weerOutput + ".gif)";
}
}

function updateScreen() {
randomData(jaarSlider);
randomData(datumSlider);
randomData();
jaarKiezen();
datumKiezen();
}

updateScreen();

jaarSlider.addEventListener("input", jaarKiezen);
datumSlider.addEventListener("input", datumKiezen);
genereerButton.addEventListener("click", randomData);
selectElement.addEventListener("input", formatData);