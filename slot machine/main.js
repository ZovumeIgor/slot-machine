let can = document.querySelector("#canvas");
can.width = window.innerWidth;
can.height = window.innerHeight;

let canvas = can.getContext("2d");
canvas.fillStyle = "gray";
canvas.font = "bold 30px Tahoma ";

const reelElementLength = 100;
const frameRate = 1000 / 60;

let winImg = new Image();
winImg.src = "../images/win.png";

const startingAmount = 1000;
var currAmount = startingAmount;
var curBet = 100;


var btnElements = [];
window.addEventListener("click", function (e) {
    let x = e.pageX;
    let y = e.pageY;
    btnElements.forEach(function (el) {
        if (y > el.y && y < el.y + el.height
            && x > el.x && x < el.x + el.width) {
            el.click();
        }
    });
});

var btnHeight = 50;
var btnWidth = 150



function BtnStart() {
    let _this = this;
    this.x = 50;
    this.y = 625;
    this.width = 150;
    this.height = 50;
    this.text = "Start";
    let locked = false;
    Object.defineProperty(this, "locked", {
        get: function () {
            return locked;
        }
    });
    this.lock = function () {
        locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(this.x, this.y, btnWidth, btnHeight);
        canvas.fillStyle = "black";
        canvas.fillText(this.text, 85, 660);
    }
    this.unlock = function () {
        locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(this.x, this.y, btnWidth, btnHeight);
        canvas.fillStyle = "black";
        canvas.fillText(this.text, 85, 660);
    };
    this.click = function () {
        if (!locked) {
            btnRestart.lock();
            this.lock();
            currAmount -= curBet;
            currentAmount.update();
            ma.start().then(function () {
                ma.getFinalElements();
                ma.spinningStopped();
                ma.testSum();
                currAmount += Math.floor(ma.multiplier() * curBet);
                currentAmount.update();
                if (currAmount > 0) _this.unlock();
                btnRestart.unlock();
            });
        }
    }
}

var btnStart = new BtnStart();
btnStart.unlock();
btnElements.push(btnStart);

function BtnRestart() {
    var _this = this;
    this.x = 250;
    this.y = 625;
    this.width = 150;
    this.height = 50;
    this.text = "Restart";
    let locked = false;
    this.lock = function () {
        locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(this.x, this.y, btnWidth, btnHeight);
        canvas.fillStyle = "black";
        canvas.fillText(this.text, 270, 660);
    }
    this.unlock = function () {
        locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(this.x, this.y, btnWidth, btnHeight);
        canvas.fillStyle = "black";
        canvas.fillText(this.text, 270, 660);
    }
    this.click = function () {
        if (!locked) {
            currAmount = startingAmount;
            curBet = 100;
            btnElements.forEach(function (el) {
                el.unlock();
            });
            currentAmount.update();
            currentBet.update();
        }

    }

}

var btnRestart = new BtnRestart();
btnRestart.unlock();
btnElements.push(btnRestart);

canvas.fillStyle = "gray";
canvas.fillRect(600, 100, btnWidth + 70, btnHeight);
canvas.fillStyle = "black";
canvas.font = "bold 25px Tahoma ";
canvas.fillText("Current amount", 605, 135);
canvas.font = "bold 30px Tahoma ";


function CurrentAmount() {
    this.x = 835;
    this.y = 100;
    this.width = btnWidth - 35;
    this.height = btnHeight;

    this.update = function () {
        canvas.fillStyle = "gray";
        canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.fillStyle = "black";
        canvas.fillText(currAmount + "$", 850, 135);
    }
}

var currentAmount = new CurrentAmount();
currentAmount.update();

canvas.fillStyle = "gray";
canvas.fillRect(600, 200, btnWidth + 35, btnHeight);
canvas.fillStyle = "black";
canvas.fillText("Current bet", 605, 235);

function CurrentBet() {
    this.x = 835;
    this.y = 200;
    this.width = btnWidth - 35;
    this.height = btnHeight;

    this.update = function () {
        canvas.fillStyle = "gray";
        canvas.fillRect(this.x, this.y, this.width, this.height);
        canvas.fillStyle = "black";
        canvas.fillText(curBet + "$", 850, 235);
    }
}
var currentBet = new CurrentBet();
currentBet.update();

function BetIncreseByFive() {
    let _this = this;
    this.x = 600;
    this.y = 300;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet +5$";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 610, 335);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 610, 335);
    }

    this.click = function () {
        if (currAmount >= curBet + 5 && !btnStart.locked) {
            curBet += 5;
            currentBet.update();
        }
    }
}

var betIncBy5 = new BetIncreseByFive();
betIncBy5.unlock();
btnElements.push(betIncBy5);

function BetDecreseByFive() {
    let _this = this;
    this.x = 800;
    this.y = 300;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet -5$";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 820, 335);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 820, 335);
    }

    this.click = function () {
        if (curBet > 5 && !btnStart.locked) {
            curBet -= 5;
            currentBet.update();
        }
    }
}

var betDecBy5 = new BetDecreseByFive();
betDecBy5.unlock();
btnElements.push(betDecBy5);

function BetIncreseByTwetnyFive() {
    let _this = this;
    this.x = 600;
    this.y = 400;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet +25$";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 605, 435);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 605, 435);
    }

    this.click = function () {
        if (currAmount >= curBet + 25 && !btnStart.locked) {
            curBet += 25;
            currentBet.update();
        }
    }
}

var betIncBy25 = new BetIncreseByTwetnyFive();
betIncBy25.unlock();
btnElements.push(betIncBy25);

function BetDecreseByTwetnyFive() {
    let _this = this;
    this.x = 800;
    this.y = 400;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet -25$";

    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 810, 435);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 810, 435);
    }

    this.click = function () {
        if (curBet > 25 && !btnStart.locked) {
            curBet -= 25;
            currentBet.update();
        }
    }
}

var betDecBy25 = new BetDecreseByTwetnyFive();
betDecBy25.unlock();
btnElements.push(betDecBy25);

function BetIncreseByFifty() {
    let _this = this;
    this.x = 600;
    this.y = 500;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet +50$";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 605, 535);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 605, 535);
    }

    this.click = function () {
        if (currAmount >= curBet + 50 && !btnStart.locked) {
            curBet += 50;
            currentBet.update();
        }
    }
}

var betIncBy50 = new BetIncreseByFifty();
betIncBy50.unlock();
btnElements.push(betIncBy50);

function BetDecreseByFifty() {
    let _this = this;
    this.x = 800;
    this.y = 500;
    this.width = btnWidth;
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet -50$";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 810, 535);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 810, 535);
    }

    this.click = function () {
        if (curBet > 50 && !btnStart.locked) {
            curBet -= 50;
            currentBet.update();
        }
    }
}
var betDecBy50 = new BetDecreseByFifty();
betDecBy50.unlock();
btnElements.push(betDecBy50);

function BetAll() {
    let _this = this;
    this.x = 600;
    this.y = 600;
    this.width = 50 + (btnWidth * 2);
    this.height = btnHeight;
    this.locked = false;
    this.text = "Bet ALL";
    this.lock = function () {
        this.locked = true;
        canvas.fillStyle = "red";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 710, 635);
    }

    this.unlock = function () {
        this.locked = false;
        canvas.fillStyle = "gray";
        canvas.fillRect(_this.x, _this.y, _this.width, _this.height);
        canvas.fillStyle = "black";
        canvas.fillText(_this.text, 710, 635);
    }

    this.click = function () {
        if (!btnStart.locked) {
            curBet = currAmount;
            currentBet.update();
        }
    }
}

var betAll = new BetAll();
betAll.unlock();
btnElements.push(betAll);

//constructor ------------------------------------------------------------
function ReelElementEssencial(id, coef, letter, rarity, colors, picSrc) {
    this.id = id;
    this.coef = coef;
    this.letter = letter;
    this.rarity = rarity;
    this.colors = colors;
    var pic = new Image();

    let pictureLoaded = new Promise(function (resolve, reject) {

        let timeOut = setTimeout(function () {
            reject();
        }, 1000);

        pic.onload = function () {
            resolve();
        }
        pic.src = "../images/" + rarity + "/" + picSrc;
    });
    this.pictureLoadedPromise = pictureLoaded;

    this.draw = function (x, y, dimension) {
        if (!pic.complete) { console.log("slika nije ucitana!"); }
        canvas.drawImage(pic, x, y, dimension, dimension);
        canvas.fillStyle = "gray";
        canvas.fillRect(0, 0, 500, 100);
        canvas.fillRect(0, 400, 500, 200);
    }
    this.getPicture = function () {
        return pic;
    }
    this.win = function (x, y, dimension) {
        canvas.drawImage(winImg, x, y, dimension, dimension);
        let _ = setTimeout(function () { canvas.drawImage(pic, x, y, dimension, dimension); }, 650);
    }
}

//constructor ------------------------------------------------------------
function ReelElement(x, y, element) {
    const y0 = y;
    this.y = y;
    this.x = x;
    this.el = element;
    this.draw = function () {
        this.el.draw(this.x, this.y, reelElementLength);
    }

    this.resetPosition = function () {
        this.y = y0;
    }

    this.win = function () {
        this.el.win(this.x, this.y, reelElementLength);
    }
}

//constructor ------------------------------------------------------------
function Reel(x, y, ary) {
    this.x = x;
    this.y = y;
    let elements = ary.slice(0);
    let dispElems = [];
    const elementsToBeDisplayed = 5;
    let firstSelectedElementIndex = 0;
    this.locked = false;

    this.getDispElems = function () {
        return dispElems;
    }

    let elementsShuffle = (function () {
        var currentIndex = elements.length, temporaryValue, randomIndex;

        while (0 !== currentIndex) {

            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = elements[currentIndex];
            elements[currentIndex] = elements[randomIndex];
            elements[randomIndex] = temporaryValue;
        }
    })();

    //animate
    let moveDistance = 0;
    let speed = 10;
    const maxSpeed = 100;
    let speeding = true;
    const maxTimeSpentOnMaxSpeed = 1000 + Math.random() * 1000;
    let timeSpentOnMaxSpeed = 0;
    const speedUpTick = 400;
    const speedDownTick = 250;
    const acceleration = 5;
    const deceleration = 3;
    let _timer;


    let calcSpeed = function () {
        if (speeding) speedUp();
        else speedDown();
    }

    let speedUp = function () {
        _timer = setTimeout(function () {
            speedUp();
            if (speed < maxSpeed) {
                speed += acceleration;
            }
            else {
                timeSpentOnMaxSpeed += speedUpTick;
                if (timeSpentOnMaxSpeed >= maxTimeSpentOnMaxSpeed) {
                    speeding = false;
                    clearTimeout(_timer);
                    calcSpeed();
                }
            }
        }, speedUpTick);
    }

    let speedDown = function () {
        _timer = setTimeout(function () {
            speedDown();
            if (speed > deceleration) {
                speed -= deceleration;
                if (speed < 1) speed = 1;
            }
            else {
                speed = 1;
                clearTimeout(_timer);
            }
        }, speedDownTick);
    }


    let workWithDisplayedElements = function (ary, numEl, f) {
        let tmpIndex = firstSelectedElementIndex;

        for (let i = 0; i < numEl; i++) {
            f(ary[tmpIndex]);
            tmpIndex++;
            if (tmpIndex == ary.length) tmpIndex = 0;
        }
    }

    let elemShift = (elementsToBeDisplayed - 1) * reelElementLength;
    let showFirstElements = function prikaziPrve(e) {

        e.y += elemShift;
        elemShift -= reelElementLength;
        e.draw();

    }
    this.elemShift = function () { return elemShift; }
    this.displayFirstElements = function () {
        workWithDisplayedElements(elements, elementsToBeDisplayed, showFirstElements);
    }

    this.startSpinning = function () {
        calcSpeed();
        let tmpDistance = 0;
        return new Promise(function (resolve, reject) {
            let interval = setInterval(function () {
                canvas.clearRect(this.x, this.y, reelElementLength, reelElementLength * 7);
                moveReel();
                moveDistance += speed;
                tmpDistance += speed;

                if (speed == 1 && tmpDistance % reelElementLength == 0) {
                    this.elTMP;
                    clearInterval(interval);
                    selectDispElems();
                    moveDistance = 0;
                    tmpDistance = 0;
                    speeding = true;
                    resolve();
                }
            }, frameRate);
        });
    }

    let selectDispElems = function () {
        dispElems = [];
        let tmpInd = firstSelectedElementIndex;
        for (let i = 0; i < elementsToBeDisplayed; i++) {

            if (i > 1) {
                dispElems.push(elements[tmpInd]);
            }
            tmpInd++;
            if (tmpInd == elements.length) tmpInd = 0;
        }
    }

    let draw = function (e) {
        e.draw();
    }

    let alterSpeed = function (e) {
        e.y += speed;
        let tmpInd = firstSelectedElementIndex;
        let tmpValue = 0;
        if (e.y > 500) {
            tmpValue = e.y - 500;
            e.resetPosition();
            firstSelectedElementIndex++;
            if (firstSelectedElementIndex == elements.length) firstSelectedElementIndex = 0;
        }
        if (tmpInd != firstSelectedElementIndex) {
            let t = firstSelectedElementIndex;
            for (let i = 0; i < elementsToBeDisplayed - 1; i++) {
                t++;
                if (t == elements.length) t = 0;
            }
            elements[t].y += tmpValue;
        }
    }

    let moveReel = function () {
        workWithDisplayedElements(elements, elementsToBeDisplayed, alterSpeed);
        workWithDisplayedElements(elements, elementsToBeDisplayed, draw);
    }
}

function SlotMachine(xd, yd) {
    let _this = this;
    let x = xd;
    let y = yd;

    let essentialElements = [];
    elementsFromJson.forEach(function (el) {
        let tmp = el.color;
        essentialElements.push(
            new ReelElementEssencial(el.id, el.coef, el.letter, el.rarity, tmp, el.picture)
        );
    });
    
    Promise.all(essentialElements.map(function (el) { return el.pictureLoadedPromise; })).then(function(){
        makeReels();
        displayReels();
    });

    let reels = [];

    this.getReels = function () {
        return reels;
    }

    let makeReelElems = function (x) {
        let tmpAry = [];
        essentialElements.forEach(function (el) {
            tmpAry.push(new ReelElement(x, y, el));
        });
        return tmpAry;
    }
    function makeReels() {
        let tmpX = 0;
        let tmpReelElems;
        for (let i = 0; i < 5; i++) {
            tmpReelElems = makeReelElems(tmpX);
            reels.push(new Reel(x + tmpX, y, tmpReelElems));
            tmpX += reelElementLength;
        }
    }

    function displayReels() {
        reels.forEach(function (el) {
            el.displayFirstElements();
        });
    }

    this.start = function () {
        let promises = reels.map(function (el) {
            return el.startSpinning();
        })

        resetMultiplier();
        return Promise.all(promises);
    }

    this.finalElements = [];

    this.getFinalElements = function () {
        _this.finalElements = [];
        reels.forEach(function (e) {
            _this.finalElements.push(e.getDispElems());
        });
    }

    this.spinningStopped = function () {
        sumElements();
    }
    let resetMultiplier = function () {
        sumOfElements = [];
        orderedElemIds = [];
        numOfJokers = 0;
    }
    let sumOfElements = [];
    let orderedElemIds = [];
    let numOfJokers = 0;

    let sumElements = function () {
        _this.finalElements.forEach(function (reel) {
            reel.forEach(function (re) {
                if (re.el.rarity == "legendary") {
                    numOfJokers++;
                }
                else {
                    let inside = false;
                    orderedElemIds.forEach(function (oe, oInd) {
                        if (re.el.id == oe) {
                            inside = true;
                            sumOfElements[oInd]++;
                        }
                    });
                    if (!inside) {
                        orderedElemIds.push(re.el.id);
                        sumOfElements.push(1);
                    }
                }
            });
        });

    }

    let gain = [];

    this.testSum = function () {
        gain = [];
        winMultiplier = 0;
        testingSumOfElements();
        calcWinAmount();
    }
    this.gain = function () {// test fja
        return gain;
    }
    this.multiplier = function () {
        return winMultiplier;
    }
    let testingSumOfElements = function () {
        sumOfElements.forEach(function (s, ind) {
            if (s > 2) gain.push([orderedElemIds[ind], s]);
        });
        if (numOfJokers > 1) gain.push([14, numOfJokers]);//id jokera = 14
    }

    let calcWinAmount = function () {
        gain.forEach(function (e, i) {
            calcCoef(e[0], e[1]);
            var _interval = setTimeout(function () {
                animate(e[0]);
            }, i * 1000);

        });

    }

    let winMultiplier = 0;
    const jokerMultiplier = 1.2;

    let calcCoef = function (id, sum) {
        let tmpEl = elementsFromJson.filter(function (e) {
            return e.id == id;
        });
        tmpEl = tmpEl[0];

        let tmpVal = Math.pow(tmpEl.coef, sum);
        if (numOfJokers > 0) tmpVal = tmpVal * Math.pow(jokerMultiplier, numOfJokers);
        winMultiplier += tmpVal;
    }

    let animate = function (id) {
        for (let i = 0; i < _this.finalElements.length; i++) {
            for (let j = 0; j < _this.finalElements[i].length; j++) {
                if (_this.finalElements[i][j].el.id == id || _this.finalElements[i][j].el.id == 14) _this.finalElements[i][j].win(); //14 je joker ID
            }
        }
    }
}
window.canGo = true;

let ma = new SlotMachine(0, 0);

















