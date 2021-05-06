const grid = document.querySelector('#screen');
let currentShoooterIndex = 202;
let width = 15;
let direction = 1;
let invadersId;
let aliensremoved = [];
let results = 0;
const resultDisplay = document.querySelector('.results');
let goingRight = true;
for (let i = 0; i < 225; i++) {
    const squarre = document.createElement('div');
    grid.appendChild(squarre)
}
const squarres = Array.from(document.querySelectorAll('#screen div'));
const aliensInvaders = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24,
    30, 31, 32, 33, 34, 35, 36, 37, 38, 39
]


function draw() {
    for (let i = 0; i < aliensInvaders.length; i++) {
        if(!aliensremoved.includes(i)) {
            squarres[aliensInvaders[i]].classList.add('invader');
        }
    }
}
draw();
function remove() {
    for (let i = 0; i < aliensInvaders.length; i++) {
        squarres[aliensInvaders[i]].classList.remove('invader');
    }
}
squarres[currentShoooterIndex].classList.add('shooter');

function moveShooter(e) {
    squarres[currentShoooterIndex].classList.remove('shooter');
    switch (e.key) {
        case 'ArrowLeft':
            if (currentShoooterIndex % width !== 0) currentShoooterIndex -= 1;
            break
        case 'ArrowRight':
            if (currentShoooterIndex % width < width - 1) currentShoooterIndex += 1;
            break
    }
    squarres[currentShoooterIndex].classList.add('shooter');
}

document.addEventListener('keydown', moveShooter)


function moveInvaders() {
    const leftEdge = aliensInvaders[0] % width === 0;
    const rightEdge = aliensInvaders[aliensInvaders.length - 1] % width === width - 1;
    remove();

    if (rightEdge && goingRight) {
        for (let i = 0; i < aliensInvaders.length; i++) {
            aliensInvaders[i] += width + 1;
            direction = -1;
            goingRight = false;
        }
    }

    if (leftEdge && !goingRight) {
        for (let i = 0; i < aliensInvaders.length; i++) {
            aliensInvaders[i] += width - 1;
            direction = +1;
            goingRight = true;
        }
    }
    for (let i = 0; i < aliensInvaders.length; i++) {
        aliensInvaders[i] += direction;

    }
    draw();
    if (squarres[currentShoooterIndex].classList.contains('invader', 'shooter')) {
        resultDisplay.innerHTML = 'GAME OVER';
        clearInterval(invadersId);
    }
    for (let i = 0; i < aliensInvaders.length; i++) {
        if (aliensInvaders[i] > (squarres.length)) {
            resultDisplay.innerHTML = 'GAME OVER';
            clearInterval(invadersId);
        }
    }
        if(aliensremoved.length === aliensInvaders.length) {
            resultDisplay.innerHTML = 'GAGNE !';
            clearInterval(invadersId);
        }
}
invadersId = setInterval(moveInvaders, 300);
function shoot(e) {
    let laseriD
    let currentLaserIndex=currentShoooterIndex;
    function moveLaser() {
        squarres[currentLaserIndex].classList.remove('laser');
        currentLaserIndex-= width;
        squarres[currentLaserIndex].classList.add('laser');

        if(squarres[currentLaserIndex].classList.contains('invader')){
            squarres[currentLaserIndex].classList.remove('laser');
            squarres[currentLaserIndex].classList.remove('invader');
            squarres[currentLaserIndex].classList.add('boom');
            setTimeout(()=>squarres[currentLaserIndex].classList.remove('boom'),100);
            clearInterval(laseriD);
            const alienRemoved = aliensInvaders.indexOf(currentLaserIndex);
            aliensremoved.push(alienRemoved);
            results+=10;
            resultDisplay.innerHTML=results;
        }
    }
    switch(e.key){
        case 'ArrowUp':
            laseriD=setInterval(moveLaser,100);
    }
}


document.addEventListener('keydown',shoot)










