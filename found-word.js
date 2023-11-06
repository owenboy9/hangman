export default class FoundWord{

  letters = []

  

  get asString(){
    return this.letters.join(" ")
  }

  constructor(secretWord){
    this.createNotFoundLetters(secretWord.chars)  
  }

  createNotFoundLetters(chars) {
    
    for (let letter of chars) {
      this.letters.push("*")
    }
  }

  applyFoundLetter(letter, positions){
    for(let index of positions){
      this.letters[index] = letter
    }
  }

  /*alphabetF(lett) {
    lett = new Question("Guess a letter: ").answer
    if (this.lett.length != 1 && !this.alphabet.includes(this.lett)) {
      return console.log('you can only type in letters of the swedish alphabet. moreover, you can only type in one at a time')
    }

  }*/


}