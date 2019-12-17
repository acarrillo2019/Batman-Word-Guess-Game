/*

Pseudo Code for game. 

Parts that make up game:

1. Press any key to get started!

2. Wins: (# of times user guessed the word correctly).
   * Write array containing words.

   * If the word is `madonna`, display it like this when the game starts: `_ _ _ _ _ _ _`.

   * As the user guesses the correct letters, reveal them: `m a d o _  _ a`.
   
   * Log to "word" div.

3. Number of Guesses Remaining: (# of guesses remaining for the user).
    * Log to "remaining-guesses" div.

4. Letters Already Guessed: (Letters the user has guessed, displayed like `L Z Y H`).
    * Log to "guessed-wrong" div.

5. After the user wins/loses the game should automatically choose another word and make the user play it.
    * Write code that resets game.

*/


$(document).ready(function() {

    // Array containing names of Batman villians and characters.

    var badguys = ["The Joker", "Penguin", "Riddler", "Azrael", "Professor Pyg", "Firefly", "Ra's Al Ghul", 
                            "Deathstroke", "Harley Quinn", "Scarecrow", "Two-Face", "Killer Croc", "Mad Hatter", "Poison Ivy",
                            "Man-bat", "Poison Ivy", "Mr. Freeze", "Hush", "Red Hood", "Bane", "Arkham Knight"]

})

// Global variables

const maxGuess = 5 //Number of guesses
var pauseGame = false // Game pause. Starts as false so akey must be pressed to start game, it will return "true"

var guessedLetters = []
var guessingWord = []
var wordToMatch
var numGuess
var wins = 0

resetGame()

// Start game on key press
document.onkeypress = function(event) {
    // Make sure key pressed is an alpha character
    if (isAlpha(event.key) && !pauseGame) {
        checkForLetter(event.key.toUpperCase())
    }
}