import Module from "node:module";
const require = Module.createRequire(import.meta.url);
const prompt = require('prompt-sync')({ sigint: true });

export default class Question {

  constructor(questionText) {
    this.questionText = questionText
    /* ersatt detta från original
    this.answer = prompt(questionText).toUpperCase() */
    this.answer = this.askQuestion()
  }

  askQuestion() {
    let userInput
    do {
      userInput = prompt(this.questionText).trim().toUpperCase()
      if (!this.isValidResponse(userInput) == true) { // it didn't want to accept !this.... as a "false" statement
        console.log("Please enter letters only.")
      }
    } while (!this.isValidResponse(userInput) == true)
    return userInput
  }

  isValidResponse(userInput) {
    // Check if userInput is only letters
    return /^[A-Ö]+$/.test(userInput) // +$ makes it possible to enter more letters; to specify how many, use: /^[A-Ö]{3}$/
  }

}