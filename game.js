import SecretWord from "./secret-word.js"
import Question from "./question.js"
import FoundWord from "./found-word.js"
import Gallows from "./gallows.js"

const print = console.log

//todo:
//När den som gissar matar in en bokstav kollar vi inte om det bara är EN bokstav.Vi kollar inte heller om det ÄR en bokstav.
//Även dem hemliga ordet skulle kunna innehålla vilka tecken som helst, borde begränsas till bokstäver, A - Ö.
//Vi visar inte spelaren vilka bokstäver hen redan har gissat på.
//Vi hindrar inte spelaren att gissa på samma bokstav flera gånger.
//Vi har ingen spelmekanik för att egentligen låta två spelare spela mot varandra(och t ex samla poäng eller whatnot)


export default class Game {

  secretWord
  foundWord
  gallows
  answer

  usedLetters = []

  constructor() {
    print("Welcome to a simple game of hangman. You are doomed!")
    this.runRound()
  }

  runRound() {
    // create a new gallows
    this.gallows = new Gallows()
    // 10. ask for secret word                         bass
    let question = new Question("Type the secret word, don't show your opponent: ")
    this.secretWord = new SecretWord(question.answer)
    print("The secret word has " + this.secretWord.length + " letters")
    // process secret word into chars                  b a s s
    // store found word as empty positions for chars   _ _ _ _
    this.foundWord = new FoundWord(this.secretWord)
    print(this.foundWord.asString)
    // 20. ask for letter ? 
    this.guessWord()
    // loose round
    // win round
    // goto 10
    // this.runRound()
  }

  guessWord() {
    let letter = this.guessLetter()
    print("You guessed " + letter)
    // find if the letter is in the secret word
    if (this.secretWord.isLetterInSecretWord(letter)) {
      //  (b)  found            store  b in used chars,  b _ _ _
      //  (s)  found            store  s in used chars,  b _ s s 
      let positions = this.secretWord.getLetterPositions(letter)
      this.foundWord.applyFoundLetter(letter, positions)
      print("You found \n" + this.foundWord.asString)
      print("good job but don\'t lower your guard. you only have " + this.gallows.stages.length + " attempts left and still " + this.lettersLeft() + " yet to go.")
      // check if word is complete (no empty slots), exit to win round
      this.checkWin()
    } else {
      //  (x)  not found        store  x in used chars, add part to gallows
      print(this.gallows.step())
      print("omg you have " + this.gallows.stages.length + " attempts left and still " + this.lettersLeft() + " letters to go.")
      // check if gallows is done? exit to loose round
      this.checkLose()
    }
  }

  checkWin() {
    if (!this.foundWord.letters.includes('*')) {
      print("Congratulations, you barely survived this time \n" + this.foundWord.asString)
    } else {
      this.guessWord()
    }
  }

  checkLose() {
    if (this.gallows.stages.length == 0) {
      print("Wonderful, you got to hang! \n" + "The word was " + this.secretWord.asString)
    } else {
      this.guessWord()
    }
  }

  lettersLeft() {
    let count = 0
    this.foundWord.letters.forEach(item => {
      if (item === '*') {
        count++
      }
    });
    return count
  }

  guessLetter() {
    let guessedLetter
    do {
      guessedLetter = new Question("Guess a letter: ").answer
      if (guessedLetter.length != 1) {
        print("only one letter at a time, babe")
      } else if (this.usedLetters.includes(guessedLetter)) {
        print("you\'ve already used this letter, goldfish")
      }
    } while (guessedLetter.length != 1 || this.usedLetters.includes(guessedLetter))
    this.usedLetters.push(guessedLetter)
    print("these are the letters you have tried " + this.usedLetters)
    return guessedLetter
  }
}