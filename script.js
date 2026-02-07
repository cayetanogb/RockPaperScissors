const options = ['rock', 'paper', 'scissors']
const playerScoreElement = document.getElementById('player-score')
const computerScoreElement = document.getElementById('computer-score')
const winnerMsgElement = document.getElementById('winner-msg')
const optionsContainer = document.querySelector('.options-container')
const resultContainer = document.querySelector('.result-container')
const resetGameBtn = document.getElementById('reset-game-btn')
const playerOption = document.getElementById('player-option')
const computerOption = document.getElementById('computer-option')
const roundResult = document.getElementById('round-result')

let playerScore = 0
let computerScore = 0

function getRandomComputerResult() {
  const randomIndex = Math.floor(Math.random() * options.length)
  return options[randomIndex]
}

function hasPlayerWonTheRound(playerChoice, computerChoice) {
  return (
    (playerChoice === 'rock' && computerChoice === 'scissors') ||
    (playerChoice === 'scissors' && computerChoice === 'paper') ||
    (playerChoice === 'paper' && computerChoice === 'rock')
  )
}

function getRoundResults(userOption) {
  const computerResult = getRandomComputerResult()

  playerOption.classList.add('option-play')
  computerOption.classList.add('option-play')

  setTimeout(() => {
    playerOption.classList.remove('option-play')
    computerOption.classList.remove('option-play')
    playerOption.src = `./${userOption}.svg`
    computerOption.src = `./${computerResult}.svg`

    if (computerResult === userOption) {
      roundResult.textContent = 'Empate';
      roundResult.style.color = 'yellow';
      return
    }

    if (hasPlayerWonTheRound(userOption, computerResult)) {
      roundResult.textContent = 'Gana el Jugador';
      roundResult.style.color = 'greenyellow';
      playerScore++;
    } else {
      roundResult.textContent = 'Gana la CPU';
      roundResult.style.color = 'red';
      computerScore++;
    }

    playerScoreElement.textContent = playerScore
    computerScoreElement.textContent = computerScore

    if (playerScore === 3 || computerScore === 3) {
      roundResult.textContent = '';
      winnerMsgElement.textContent = `${
        playerScore === 3 ? 'Jugador' : 'CPU'
      } ha ganado el juego!`
      winnerMsgElement.style.color = playerScore === 3 ? 'greenyellow' : 'red';

      resultContainer.style.display = 'flex'
      optionsContainer.style.display = 'none'
    }
  }, 1500)
}

function resetRound() {
  playerOption.src = './rock.svg'
  computerOption.src = './rock.svg'
  roundResult.textContent = '';
}

function showResults(userOption) {
  getRoundResults(userOption)
  resetRound();
}

function resetGame() {
  playerScore = 0
  computerScore = 0
  resetRound();
  winnerMsgElement.textContent = ''
  resultContainer.style.display = 'none'
  optionsContainer.style.display = 'block'
}

resetGameBtn.addEventListener('click', resetGame)

const rockOption = document.getElementById('rock-option')
const paperOption = document.getElementById('paper-option')
const scissorsOption = document.getElementById('scissors-option')

rockOption.addEventListener('click', function () {
  console.log('rock')
  showResults('rock')
})

paperOption.addEventListener('click', function () {
  showResults('paper')
})

scissorsOption.addEventListener('click', function () {
  showResults('scissors')
})
