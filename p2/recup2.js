const simonTiles = document.querySelectorAll('.simon-tile');
const startButton = document.getElementById('start-btn');
const levelText = document.getElementById('level-text');
const message = document.getElementById('message');

const colors = ['red', 'green', 'blue', 'yellow', 'orange', 'purple', 'pink', 'cyan', 'brown']; // Colores posibles
const lightColors = ['#FF5733', '#33FF57', '#3366FF', '#FFFF33', '#FF5733', '#33FF57', '#3366FF', '#FFFF33', '#FF5733']; // Colores más claros
let sequence = []; // Secuencia aleatoria generada
let playerSequence = []; // Secuencia ingresada por el jugador
let level = 1; // Nivel actual del juego
let movesToRemember = 1; // Cantidad de movimientos a recordar por nivel
let playingSequence = false; // Variable para verificar si se está reproduciendo la secuencia

// Función para generar un número aleatorio entre 0 y el número especificado
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

// Función para reproducir la secuencia de colores
function playSequence() {
    playingSequence = true; // Indicar que se está reproduciendo la secuencia
    let i = 0;
    const interval = setInterval(() => {
        const tile = document.getElementById(sequence[i]);
        tile.style.backgroundColor = lightColors[colors.indexOf(sequence[i])]; // Cambiar el color a uno más claro
        const audio=new Audio('beep.mp3');
        audio.play();
        setTimeout(() => {
            tile.style.backgroundColor = ''; // Restaurar el color original
        }, 500);
        i++;
        if (i >= sequence.length) {
            clearInterval(interval);
            setTimeout(() => {
                message.innerText = 'Te toca!';
                startButton.style.display = 'none'; // Ocultar el botón "Start Game"
            }, 500);
            setTimeout(() => {
                message.innerText = 'Te toca!'; // Limpiar el mensaje después de que el jugador complete su turno
                playingSequence = false; // Indicar que la secuencia ha terminado de reproducirse
            }, 1000);
        }
    }, 1000);
}

// Función para inicializar el juego
function startGame() {
    sequence = [];
    playerSequence = [];
    level = 1;
    movesToRemember = 1;
    levelText.innerText = 'Nivel: ' + level;
    message.innerText = '';
    nextSequence();
}

// Función para generar la siguiente secuencia
function nextSequence() {
    playerSequence = [];
    message.innerText = '';
    sequence = [];
    for (let i = 0; i < movesToRemember; i++) {
        const randomIndex = getRandomInt(colors.length);
        sequence.push(colors[randomIndex]);
    }
    playSequence();
}

// Función para manejar el clic en una casilla
function tileClick(event) {
    if (!playingSequence) { // Hacer caso solo si no se está reproduciendo la secuencia
        const tileColor = event.target.id;
        event.target.style.backgroundColor = lightColors[colors.indexOf(tileColor)]; // Cambiar el color a uno más claro
        setTimeout(() => {
            event.target.style.backgroundColor = ''; // Restaurar el color original
        }, 300);
        playerSequence.push(tileColor);
        if (playerSequence.length === sequence.length) {
            let match = true;
            for (let i = 0; i < sequence.length; i++) {
                if (sequence[i] !== playerSequence[i]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                level++;
                movesToRemember = level; // Aumentar el número de movimientos a recordar por nivel
                message.innerText = 'Correcto';
                setTimeout(() => {
                    nextSequence();
                    levelText.innerText = 'Nivel: ' + level;
                }, 1000);
            } else {
                const audGover=new Audio('gameover.mp3')
                audGover.play();

                message.innerText = 'Secuencia incorrecta, vuelve a probar, te has quedado en el nivel '+level;
                startButton.style.display = 'inline-block'; // Mostrar el botón "Start Game" si el jugador pierde
            }
        }
    }
}

// Agregar eventos de clic a las casillas y al botón de inicio
simonTiles.forEach(tile => {
    tile.addEventListener('click', tileClick);
});

startButton.addEventListener('click', startGame);
