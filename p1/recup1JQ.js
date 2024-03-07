$(document).ready(function() {
    var sequenceDisplay = $('#sequence-display');
    var userInput = $('#user-input');
    var checkBtn = $('#check-btn');
    var inputContainer = $('#input-container');
    var resultDisplay = $('#result');
    var restartBtn = $('#restart-btn');
    var levelDisplay = $('#level');
    var progressBarContainer = $('#progress-bar-container');
    var progressBar = $('#progress-bar');
  
    var level = 1;
    var sequence = [];
  
  
    function generateSequence() {
      sequence = [];
      for (var i = 0; i < level; i++) {
        sequence.push(Math.floor(Math.random() * 10)); // Genera números aleatorios del 0 al 9
      }
    }
  
    function displaySequence() {
      generateSequence();
      sequenceDisplay.text(sequence.join(' '));
      progressBarContainer.show(); // Muestra el contenedor de la barra de progreso
      progressBar.css('animation-duration', '2s'); // Establece la duración de la animación
      progressBar.css('width', '100%'); // Inicializa la barra de progreso al 100%
  
      setTimeout(function() {
        sequenceDisplay.text('');
        inputContainer.show(); // Muestra el campo de entrada y el botón después de que el número desaparezca
        progressBarContainer.hide(); // Oculta el contenedor de la barra de progreso
      }, 2000); // Muestra la secuencia durante 2 segundos
    }
  
    function checkSequence() {
      var userInputValue = userInput.val().trim();
      if (userInputValue === sequence.join('')) {
        resultDisplay.text('Correcto!');
        setTimeout(function() {
          resultDisplay.text('');
          level++;
          levelDisplay.text(level);
          userInput.val('');
          inputContainer.hide();
          displaySequence();
        }, 3000); // Oculta el mensaje de correcto después de 3 segundos
      } else {
        resultDisplay.text('¡Incorrecto! ¡Has perdido! Te has quedado en el nivel '+level);
        restartBtn.show();
      }
    }
  
    checkBtn.click(function() {
      checkSequence();
    });
  
    restartBtn.click(function() {
      restartGame();
    });
  
    function restartGame() {
      level = 1;
      levelDisplay.text(level);
      resultDisplay.text('');
      restartBtn.hide();
      displaySequence();
    }
  
    displaySequence();
  });
  