const bird = document.getElementById('bird');
const back = document.getElementById('background');

let pipeList = [];

const gravity = 0.04;     // Valor da gravidade
const jumpForce = -5;   // Força do salto
let forcaVet = 0;      // Força Vetorial
const pipespeed = 2.5;   //velocidade do pipe


setInterval (() => {
    updatePipes();
    updateBird();

}, 30 / 1000);

//comandos de pular
function jump (data) {    
    if (data.keyCode == 32 || data.keyCode == 119) {
        forcaVet = jumpForce;
    }
    
}
document.body.onkeypress = jump;

//pipe animation
function newPipe (positionY) {
    let pipe = document.createElement('img');
    pipe.src = './image/pipe.png';

    pipe.style.top = positionY + 'px';
    pipe.style.position = 'absolute';
    //esconde o pipe
    pipe.style.right = '-550px';

    pipeList.push(pipe);

    document.body.appendChild(pipe);
}

function updatePipes () {
    for (let i = 0; i < pipeList.length; i++) {
        let positionX = Number(pipeList[i].style.right.replace('px', ''));
        positionX += pipespeed;
            //atualiza a posição do pipe (remove)
        if (positionX >= back.offsetWidth) {
            pipeList[i].remove();
            pipeList.splice(i, 1);
            i--;
            continue;
        }

        pipeList[i].style.right = positionX + 'px';
    }
}

function updateBird () {
    let style = window.getComputedStyle(bird);   
    let positionY = Number(style.top.replace('px', ''));

    //ajuste na gravidade
    forcaVet += gravity;


    // ajusta de força vetorial
    positionY += forcaVet;
    // validação
    if (positionY <= 0 ) {
        positionY = 0;
    }

    if (positionY >= back.offsetHeight - bird.offsetHeight) {
        positionY = back.offsetHeight - bird.offsetHeight;
    }

    bird.style.top = positionY + 'px';
}