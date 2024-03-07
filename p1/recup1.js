const sequenceDisplay = document.getElementById('sequence-display');
const userInput = document.getElementById('user-input');
const checkBtn = document.getElementById('check-btn');
const inputContainer = document.getElementById('input-container');
const resultDisplay = document.getElementById('result');
const restartBtn = document.getElementById('restart-btn');
const levelDisplay = document.getElementById('level');
const progressBarContainer = document.getElementById('progress-bar-container');
const progressBar = document.getElementById('progress-bar');

let level = 1;
let sequence = [];
let currentStep = 0;

function generateSequence() {
  sequence = [];
  for (let i = 0; i < level; i++) {
    sequence.push(Math.floor(Math.random() * 10)); // Genera números aleatorios del 0 al 9
  }
}

function displaySequence() {
  generateSequence();
  sequenceDisplay.textContent = sequence.join(' ');
  progressBarContainer.style.display = 'block'; // Muestra el contenedor de la barra de progreso
  progressBar.style.animationDuration = '2s'; // Establece la duración de la animación
  progressBar.style.width = '100%'; // Inicializa la barra de progreso al 100%

  setTimeout(() => {
    sequenceDisplay.textContent = '';
    inputContainer.style.display = 'block'; // Muestra el campo de entrada y el botón después de que el número desaparezca
    progressBarContainer.style.display = 'none'; // Oculta el contenedor de la barra de progreso
  }, 2000); // Muestra la secuencia durante 2 segundos
}

function checkSequence() {
  const userInputValue = userInput.value.trim();
  if (userInputValue === sequence.join('')) {
    resultDisplay.textContent = 'Correcto!';
    setTimeout(() => {
      resultDisplay.textContent = '';
      level++;
      levelDisplay.textContent = level;
      userInput.value = '';
      inputContainer.style.display = 'none';
      displaySequence();
    }, 3000); // Oculta el mensaje de correcto después de 3 segundos
  } else {
    resultDisplay.textContent = '¡Incorrecto! ¡Has perdido! te has quedado en el nivel '+ level;
    restartBtn.style.display = 'block';
  }
}

checkBtn.addEventListener('click', () => {
  checkSequence();
});

restartBtn.addEventListener('click', () => {
  restartGame();
});

function restartGame() {
  level = 1;
  levelDisplay.textContent = level;
  resultDisplay.textContent = '';
  restartBtn.style.display = 'none';
  displaySequence();
}

window.addEventListener('load', () => {
  displaySequence();
});
