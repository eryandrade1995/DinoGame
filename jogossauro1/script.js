const dino = document.querySelector('.dino');
const background = document.querySelector('.back');

let isJumping = false;
let isGameOver = false;
let position = 0;

function handleKeyUp(event) {
  if (event.keyCode === 32) { //evento gerado ao pressionar tecla "space"
    if (!isJumping) {
      jump();
    }
  }
}

function jump() {
  isJumping = true;

  let upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval); //anula o upInterval se a posição for maior ou igual a 150px

      let downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval); //anula o downInterval se a posição for menor ou igual a 0px
          isJumping = false;
        } else {
          position -= 20;
          dino.style.bottom = position + 'px';
        }
      }, 20);
    } else {
      position += 20;
      dino.style.bottom = position + 'px';
    }
  }, 20);
}

function createCactus() {
  const cactus = document.createElement('div');
  let cactusPosition = 1000;
  let randomTime = Math.random() * 6000;

  if (isGameOver) return;

  cactus.classList.add('cactus');
  background.appendChild(cactus);
  cactus.style.left = cactusPosition + 'px';

  let leftTimer = setInterval(() => {
    if (cactusPosition < -60) {     
      clearInterval(leftTimer);
      background.removeChild(cactus); // remove o elemento "filho" cactus
    } else if (cactusPosition > 0 && cactusPosition < 60 && position < 60) { //condição se o cacto estiver fora da tela, no pixel do dinossauro e acima do dinossauro 
      clearInterval(leftTimer);
      isGameOver = true;
      document.body.innerHTML = '<h1 class="game-over">Fim de jogo</h1>';
    } else {
      cactusPosition -= 10;
      cactus.style.left = cactusPosition + 'px';
    }
  }, 20);

  setTimeout(createCactus, randomTime); //executa a função createCactus em um tempo aleatório
}

createCactus();
document.addEventListener('keyup', handleKeyUp);