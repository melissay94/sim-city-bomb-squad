
const STARTING_TIME = 30;

const WIRE_NUMBER_CLUES = [
    [
        "A solo act",
        "The lonliest number that you'll ever do.",
        "____ in the hand is better"
    ],
    [
        "A duet",
        "It takes _____ to tango"
    ],
    [
        "_____s company. or a crowd.",
        "A trio",
        "Number of muskateers"
    ],
    [
        "The entire barbershop quartet",
        "Number of mauraders at Hogwarts"
    ], 
    [
        "One for each finger on your hand"
    ]
];

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
let remainingTime;
let domResetBtn;
let domTimer
let wireDiv;
let countdown;
let numberClue;

const setUpGame = function() {

    domTimer = document.querySelector(".countdown");
    domTimer.classList.remove("countdown-saved");
    domTimer.classList.add("countdown-panic");

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

    document.getElementById("success").pause();

    setUpWiresToCut();

    setTimeout(function() {
        countdown = setInterval(updateClock, 1000);
    }, 500);

}


const updateClock = function() {
    // TODO: count down in milliseconds
    remainingTime--;

    if (remainingTime <= 0) {
        setTimeout(gameLost, 750);
    }
    domTimer.textContent = `00:00:${remainingTime > 10?remainingTime:"0"+remainingTime}`;
}

const setUpWiresToCut = function() {

    wiresToCut = [];
    wiresCutCount = 0;

    for (const wire in WIRES) {
        WIRES[wire].cut = false;
        WIRES[wire].needsCut = false;
        let randomChance = Math.floor(Math.random() * 2);

        if (randomChance % 2 === 0) {
            WIRES[wire].needsCut = true;
            wiresToCut.push(wire);
        }
    }

    if (wiresToCut.length === 0) {
        let randomWire = Math.floor(Math.random() * 4);
        WIRES[randomWire].needsCut = true;
        wiresToCut.push(WIRES[randomWire]);
    }

    getRandomNumberClue();
}

const getRandomNumberClue = function() {
    let clueIndex = WIRE_NUMBER_CLUES[wiresToCut.length - 1];
    numberClue = clueIndex[Math.floor(Math.random() * (clueIndex.length - 1))];
    console.log(numberClue);
    document.getElementById("letter").addEventListener("click", displayLetter);
}

const displayLetter = function() {
    document.querySelector(".letter-div").style.visibility = "initial";
    document.querySelector(".letter-div").style.height = "100%";
    document.querySelector(".wires").style.visibility = "hidden";
    document.querySelector(".wires").style.height = "0px";
    document.querySelector("#number-hint").textContent = numberClue;
    document.getElementById("close").addEventListener("click", closeLetter);
}

const closeLetter = function() {
    document.querySelector(".letter-div").style.visibility = "hidden";
    document.querySelector(".letter-div").style.height = "0px";
    document.querySelector(".wires").style.visibility = "initial";
    document.querySelector(".wires").style.height = "100%";
}

const wireClickHandler = function(e) {

    let currentWireName = e.target.id;

    if (WIRES[currentWireName].cut === false) {
        e.target.src = WIRES[currentWireName].cutImage;
        WIRES[currentWireName].cut = true;
        checkWin(WIRES[currentWireName]);
        document.getElementById("buzz").play();
    }
}

const checkWin = function(currentWire) {
    if (currentWire.needsCut === false && currentWire.cut === true) {
        setTimeout(gameLost, 750);
        return;
    } else {
        wiresCutCount++;
    }
    
    if (wiresCutCount === wiresToCut.length) {
        setTimeout(gameWon, 750);
    }

}

const gameLost = function() {
    const BODY = document.querySelector("body");
    BODY.classList.remove("happy-city");
    BODY.classList.add("explosion");
    clearInterval(countdown);
    domResetBtn.disabled = false;
    wireDiv.removeEventListener("click", wireClickHandler);
    document.getElementById("explode").play();
}

const gameWon = function() {
    clearInterval(countdown);
    domResetBtn.disabled = false;
    wireDiv.removeEventListener("click", wireClickHandler);
    domTimer.classList.add("countdown-saved");
    domTimer.classList.remove("countdown-panic");
    document.getElementById("cheers").play();
    document.getElementById("success").play();
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


