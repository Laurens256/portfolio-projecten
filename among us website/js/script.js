const bodyElement = document.querySelector("body");
const h1Element = document.querySelector("h1");
let iframe = document.querySelector("iframe");
const kirbySucc = document.querySelector("body > :first-child");
let clickCount = 0;
let mouseDown = 0;

const hamburger = document.querySelector("header nav ul:nth-of-type(2) li button");

let scrollHeight = bodyElement.scrollHeight;
const articleScroll = document.querySelectorAll(".amogus section:nth-of-type(5) article img, .amogusnieuws section:nth-of-type(2) article img, .amogusnieuws section:nth-of-type(3) article img");

const darkModeToggle = document.querySelector("footer section:last-of-type button");
const rootElement = document.querySelector(":root");
let currentTheme = localStorage.getItem("currentTheme");

const emailSubmit = document.querySelector("footer section:nth-of-type(2) input:last-of-type");
const emailInvalid = document.querySelector("footer section:nth-of-type(2) form p");

const filterButtons = document.querySelectorAll(".amogusnieuws section:nth-of-type(3) ul li button");
const filterArticles = document.querySelectorAll(".amogusnieuws section:nth-of-type(3) article");
const articleDivs = document.querySelectorAll(".amogusnieuws section:nth-of-type(3) > div");
console.log("Als hier errors staan, komen ze waarschijnlijk van YouTube. Dit kan je testen door de iFrame tag weg te halen.");



function toggleDarkMode(event) {
//pagina load geeft als event undefined, alleen dan kijken naar localstorage/systeemvoorkeur
    if (event == undefined) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches && currentTheme == null) {
            rootElement.classList.add("lightmode");
        } else if (currentTheme == "light") {
            rootElement.classList.add("lightmode");
        }
        return;
    }
    if (event.target.tagName == "BUTTON" || event.target.tagName == "SPAN") {
        rootElement.classList.toggle("lightmode");

    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
        rootElement.classList.add("lightmode");
    } else {
        rootElement.classList.remove("lightmode");
    }

    if (rootElement.classList.contains("lightmode")) {
        localStorage.setItem("currentTheme", "light");
    } else {
        localStorage.setItem("currentTheme", "dark");
    }
}



//regelt de mobile nav overlay
function toggleHamburger() {
    bodyElement.classList.toggle("navtoggle");
    // bodyElement.style.overflowY = bodyElement.style.overflowY == "hidden" ? "scroll" : "hidden";
}



//laat imgs inschuiven wanneer je de pagina scrollt
function scrollarticles() {
    for (let i = 0; i < articleScroll.length; i++) {
        //haalt positie van img element op
        const imgPositie = articleScroll[i].getBoundingClientRect();

        //zorgt ervoor dat het op alle browsers/devices werkt
        if (document.documentElement.scrollTop < scrollHeight && imgPositie.top + 100 >= (window.innerHeight || document.documentElement.clientHeight)) {
            articleScroll[i].classList.add("scrolleffect");
        } else if (imgPositie.top + 15 <= (window.innerHeight || document.documentElement.clientHeight)) {
            articleScroll[i].classList.remove("scrolleffect");
        }
    }
    //update scroll positie
    scrollHeight = document.documentElement.scrollTop;
}



//email valideren op index.html, nieuws.html gebruikt css validatie
function validateEmail(event) {
    if (window.location.href.includes("nieuws.html")) {
        return;
    }
    const emailInput = document.querySelector("footer section:nth-of-type(2) input:first-of-type").value;

    //uitleg: https://stackoverflow.com/questions/49209362/what-is-the-meaning-of-s-s-gm-in-javascript
    const nodigeSymbols = /^\S+@\S+\.\S+$/;

    if (!nodigeSymbols.test(emailInput)) {
        emailInvalid.innerHTML = "This is not a valid email";
    } else {
        emailInvalid.innerHTML = "Signup confirmed";
    }
    emailInvalid.style.display = "block";
    emailInvalid.focus();
    event.preventDefault();
}



//zou eventueel met radio buttons kunnen
function switchFilter(event) {
    for (let i = 0; i < filterArticles.length; i++) {
        filterArticles[i].classList.add("hidden");
        articleDivs[i].classList.add("hidden");
    }

    for (let i = 0; i < filterButtons.length; i++) {
        filterButtons[i].classList.remove("activefilter");
    }

    if(event.target.value == 0) {
        for (let i = 0; i < filterArticles.length; i++) {
            filterArticles[i].classList.remove("hidden");
            articleDivs[i].classList.remove("hidden");
        }
    }   else {
        for (let i = 0; i < filterArticles.length; i++) {
            filterArticles[event.target.value].classList.remove("hidden");
            articleDivs[event.target.value].classList.remove("hidden");
        }
    }
    filterButtons[event.target.value].classList.add("activefilter");
}



//kijkt of de muis is ingeklikt voor (voor kirbysucc)
document.body.onmousedown = function() {
    ++mouseDown;
}
document.body.onmouseup = function() {
    --mouseDown;
}


//zucc
function kirbySuck(event) {
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        console.log("ja");
        return;
    }
//event keycode 13 = enter, zorgt ervoor dat je dmv tab & enter kirby kan laten succen
    if (mouseDown == 0 || event.keyCode == 13) {
        clickCount++;
    }
    if (clickCount == 10) {
        const kirbySuckAudio = new Audio("assets/kirbysucc.mp3");
        kirbySuckAudio.play();
        bodyElement.classList.add("succ");
        window.setTimeout(() => kirbySucc.focus(), 100)
        if (window.location.href.includes("index.html")) {
            iframe.style.display = "none";
        }
    }
}



//check localstorage/systeemvoorkeur
toggleDarkMode();

for (let i = 0; i < filterButtons.length; i++) {
    filterButtons[i].addEventListener("click", switchFilter);
}
emailSubmit.addEventListener("click", validateEmail);
window.matchMedia("(prefers-color-scheme: light)").addEventListener("change", toggleDarkMode);
window.addEventListener("scroll", scrollarticles);
hamburger.addEventListener("click", toggleHamburger);
darkModeToggle.addEventListener("click", toggleDarkMode);

h1Element.addEventListener("click", kirbySuck);
h1Element.addEventListener("keydown", kirbySuck);