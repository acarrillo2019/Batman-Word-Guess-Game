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




    // Array containing names of Batman villians and characters.

$(document).ready(function() {

    var badGuys = ["The Joker", "Penguin", "Riddler", "Azrael", "Professor Pyg", "Firefly", "Ras Al Ghul", 
                            "Deathstroke", "Harley Quinn", "Scarecrow", "Two-Face", "Killer Croc", "Mad Hatter", "Poison Ivy",
                            "Man bat", "Poison Ivy", "Mr Freeze", "Hush", "Red Hood", "Bane", "Arkham Knight"]



// Global variables

const maxGuess = 5 //Number of guesses
var pauseGame = false // Game pause. Starts as false so akey must be pressed to start game, it will return "true"



    

    let guessedLetters = []
    let guessingWord = []
    let wordToMatch
    let numGuess
    let wins = 0

    resetGame()

    // Wait for key press
    document.onkeypress = function(event) {
        // Make sure key pressed is an alpha character
        if (isAlpha(event.key) && !pauseGame) {
            checkForLetter(event.key.toUpperCase())
        }
    }

    // Game Functions
    // Check if letter is in word & process
    function checkForLetter(letter) {
        var foundLetter = false
        var correctSound = document.createElement("audio")
        var incorrectSound = document.createElement("audio")
        correctSound.setAttribute("src", "assets/sounds/stairs.mp3")
        incorrectSound.setAttribute("src","assets/sounds/croak.mp3")

        // Search string for letter
        for (var i=0, j= wordToMatch.length; i<j; i++) {
            if (letter === wordToMatch[i]) {
                guessingWord[i] = letter
                foundLetter = true
                correctSound.play()
                // If guessing word matches random word
                if (guessingWord.join("") === wordToMatch) {
                    // Increment # of wins
                    wins++
                    pauseGame = true
                    updateDisplay()
                    setTimeout(resetGame,5000)
                }
            }
        }

        if (!foundLetter) {
            incorrectSound.play()
            // Check if inccorrect guess is already on the list
            if (!guessedLetters.includes(letter)) {
                // Add incorrect letter to guessed letter list
                guessedLetters.push(letter)
                // Decrement the number of remaining guesses
                numGuess--
            }
            if (numGuess === 0) {
                // Display word before reseting game
                guessingWord = wordToMatch.split()
                pauseGame = true
                setTimeout(resetGame, 5000)
            }
        }

        updateDisplay()

    }
    // Check in keypressed is between A-Z or a-z
    function isAlpha (ch){
        return /^[A-Z]$/i.test(ch);
    }

    function resetGame() {
        numGuess = maxGuess
        pauseGame = false

        // Get a new word
        wordToMatch = badGuys[Math.floor(Math.random() * badGuys.length)].toUpperCase()
        console.log(wordToMatch)

        // Reset word arrays
        guessedLetters = []
        guessingWord = []

        // Reset the guessed word
        for (var i=0, j=wordToMatch.length; i < j; i++){
            // Put a space instead of an underscore between multi word "words"
            if (wordToMatch[i] === " ") {
                guessingWord.push(" ")
            } else {
                guessingWord.push("_")
            }
        }

        // Update the Display
        updateDisplay()
    }

    function updateDisplay () {
        document.getElementById("totalWins").innerText = wins
        document.getElementById("currentWord").innerText = guessingWord.join("")
        document.getElementById("remainingGuesses").innerText = numGuess
        document.getElementById("guessedLetters").innerText =  guessedLetters.join(" ")
    }
})
