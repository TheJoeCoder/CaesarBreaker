// Caesar cipher breaker
const fs = require("fs");

const list = fs.readFileSync("./words.txt").toString();
const words = list.split("\n");

const args = process.argv.slice(2);

var letters1 = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z"
];

var letters2 = letters1;

function decipher(text) {
  for(var i = 0; i < text.length; i++) {
    //TODO: decipher code
  }
}

//loop through all words specified in the arguments
for (var i = 0; i < args.length; i++) {
  //loop through all cipher patterns
  for (var j = 1; j < letters1.length; j++) {
    //cycle cipher
    console.log(`Using cipher ${j} (A = ${letters2[0]})`);
    var start = letters2[0]; //store first letter
    letters2.shift(); //remove first letter
    letters2.push(start); //put letter at the end

    //check word in list of words
    if(words.includes(decipher(letters1))) {
      //TODO: log the match
    }
  }
}
