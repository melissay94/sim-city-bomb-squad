
const STARTING_TIME = 30;

const WIRES = {
    blue: {
        cut: false,
        needsCut: false,
        cutImage: "img/cut-blue-wire.png",
        unCutImage: "img/uncut-blue-wire.png",
    }, 
    green: {
        cut: false,
        needsCut: false,
        cutImage: "img/cut-green-wire.png",
        unCutImage: "img/uncut-green-wire.png",
    },
    red: {
        cut: false,
        needsCut: false,
        cutImage: "img/cut-red-wire.png",
        unCutImage: "img/uncut-red-wire.png",
    },
    white: {
        cut: false,
        needsCut: false,
        cutImage: "img/cut-white-wire.png",
        unCutImage: "img/uncut-white-wire.png",
    },
    yellow: {
        cut: false,
        needsCut: false,
        cutImage: "img/cut-yellow-wire.png",
        unCutImage: "img/uncut-yellow-wire.png",
    }
};

let wiresToCut = [];
let wiresCutCount = 0;
let remainingTime = STARTING_TIME;
let domResetBtn;
let wireDiv;

const setUpGame = function() {

    let domTimer = document.querySelector(".countdown");
    let domWires = document.querySelectorAll("img");
    let body = document.querySelector("body");

    remainingTime = STARTING_TIME;
    
    for (let i = 0; i < 5; i++) {
        domWires[i].src = `img/uncut-${domWires[i].id}-wire.png`;
    }

    domResetBtn.disabled = true;

    body.classList.add("happy-city");
    body.classList.remove("explosion");    

    wireDiv.addEventListener("click", wireClickHandler);

    setUpWiresToCut();

}

const setUpWiresToCut = function() {

    wiresToCut = [];
    wiresCutCount = 0;

    for (const wire in WIRES) {
        WIRES[wire].cut = false;
        let randomChance = Math.floor(Math.random() * 2);

        if (randomChance % 2 === 0) {
            WIRES[wire].needsCut = true;
            wiresToCut.push(wire);
        }
    }
}

const wireClickHandler = function(e) {

    let currentWireName = e.target.id;

    if (WIRES[currentWireName].cut === false) {
        e.target.src = WIRES[currentWireName].cutImage;
        WIRES[currentWireName].cut = true;
        checkWin(WIRES[currentWireName]);
    }
}

const checkWin = function(currentWire) {

    if (currentWire.needsCut === false && currentWire.cut === true) {
        gameLost();
        return;
    } else {
        wiresCutCount++;
    }
    
    if (wiresCutCount === wiresToCut.length) {
        gameWon();
    }

}

const gameLost = function() {
    const BODY = document.querySelector("body");
    BODY.classList.remove("happy-city");
    BODY.classList.add("explosion");
    domResetBtn.disabled = false;
    wireDiv.removeEventListener("click", wireClickHandler);
}

const gameWon = function() {
    console.log("Game Won!");
    domResetBtn.disabled = false;
    wireDiv.removeEventListener("click", wireClickHandler);
}

document.addEventListener("DOMContentLoaded", function() {

    wireDiv = document.querySelector(".wires");
    domResetBtn = document.querySelector(".reset");

    domResetBtn.addEventListener("click", setUpGame);

    setUpGame();

});

// TODO: Set up timer couter thing

// TODO: Set up reset button listener

// TODO: Set up which wires need to be cut

// TODO: Function for win condition met

// TODO: Function for lose condition met


