/**
 * Don't change these constants!
 */
const DODGER = document.getElementById('dodger')
const GAME = document.getElementById('game')
const GAME_HEIGHT = 400
const GAME_WIDTH = 400
const LEFT_ARROW = 37 // use e.which!
const RIGHT_ARROW = 39 // use e.which!
const ROCKS = []
const START = document.getElementById('start')

var gameInterval = null

/**
 * Be aware of what's above this line,
 * but all of your work should happen below.
 */

function checkCollision(rock) {
  // implement me!
  // use the comments below to guide you!
  const top = positionToInteger(rock.style.top)

  // rocks are 20px high
  // DODGER is 20px high
  // GAME_HEIGHT - 20 - 20 = 360px;
  if (top > 360) {
    const dodgerLeftEdge = positionToInteger(DODGER.style.left)

    // :
    const dodgerRightEdge = dodgerLeftEdge + 40;

    const rockLeftEdge = positionToInteger(rock.style.left)

    // :
    const rockRightEdge = rockLeftEdge + 20;

    if ( /**
               * Think about it -- what's happening here?
               * There's been a collision if one of three things is true:
               * 1. The rock's left edge is < the DODGER's left edge,
               *    and the rock's right edge is > the DODGER's left edge;
               * 2. The rock's left edge is > the DODGER's left edge,
               *    and the rock's right edge is < the DODGER's right edge;
               * 3. The rock's left edge is < the DODGER's right edge,
               *    and the rock's right edge is > the DODGER's right edge.
               */
               (rockLeftEdge <= dodgerLeftEdge && rockRightEdge >= dodgerLeftEdge) ||
               (rockLeftEdge >= dodgerLeftEdge && dodgerRightEdge <= dodgerRightEdge) ||
               (rockLeftEdge <= dodgerRightEdge && rockRightEdge >= dodgerRightEdge)
              ) {
      return true
    }
  }
}

function createRock(x) {
  const rock = document.createElement('div')

  rock.className = 'rock'
  rock.style.left = `${x}px`

  var top = 0
  rock.style.top = top

  GAME.appendChild(rock)


  function moveRock() {
    rock.style.top = `${top+=2}px`;

    if (checkCollision(rock)) {
      endGame()
    }

    if (top <=GAME_HEIGHT) {
      rock.remove()
    } else {
      window.requestAnimationFrame(moveRock)
    }
  }

    window.requestAnimationFrame(moveRock);


  ROCKS.push(rock)


  return rock
}

/**
 * End the game by clearing `gameInterval`,
 * removing all ROCKS from the DOM,
 * and removing the `moveDodger` event listener.
 * Finally, alert "YOU LOSE!" to the player.
 */
function endGame() {
  document.removeEventListener('keydown', moveDodger);
  window.clearInterval(gameInterval);
  ROCKS.forEach(function(rock){
    rock.remove();
  });
  alert("YOU LOSE!");
}

function moveDodger(e) {

      if (e.which === LEFT_ARROW) {
        e.preventDefault()
        e.stopPropagation()
        moveDodgerLeft()};

      if (e.which === RIGHT_ARROW) {
        e.preventDefault()
        e.stopPropagation()
        moveDodgerRight()}
    }

function moveDodgerLeft() {

  var left = positionToInteger(dodger.style.left);

  if (left > 0) {
    dodger.style.left = `${left - 4}px`;
    window.requestAnimationFrame(moveDodgerLeft)
}
}


function moveDodgerRight() {

  var right = positionToInteger(dodger.style.left);

  if (right < 360) {
    dodger.style.left = `${right + 4}px`;
    window.requestAnimationFrame(moveDodgerRight)
}
}




/**
 * @param {string} p The position property
 * @returns {number} The position as an integer (without 'px')
 */
function positionToInteger(p) {
  return parseInt(p.split('px')[0]) || 0
}

function start() {
  window.addEventListener('keydown', moveDodger)

  START.style.display = 'none'

  gameInterval = setInterval(function() {
    createRock(Math.floor(Math.random() *  (GAME_WIDTH - 20)))
  }, 1000)
}
