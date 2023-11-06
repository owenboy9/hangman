export default class SecretWord{

  chars = []

  get length(){
    return this.chars.length
  }

  get asString(){
    return this.chars.join(" ")
  }

  constructor(word){
    // process secret word into chars
    this.chars = this.processWord(word)  
  }

  processWord(word){
    return word.toUpperCase().split("")
  }

  isLetterInSecretWord(letter){
    return this.chars.includes(letter)
  }

  getLetterPositions(letter){
    let positions = []
    for(let i=0;i<this.chars.length;i++){
      if(this.chars[i] == letter){
        positions.push(i)
      }
    }
    return positions
  }

}