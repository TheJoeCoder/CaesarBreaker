#!/usr/bin/env node

/*  
  ____                          ____                 _
 / ___|__ _ ___  ___  __ _ _ __| __ ) _ __ ___  __ _| | _____ _ __
| |   / _` / __|/ _ \/ _` | '__|  _ \| '__/ _ \/ _` | |/ / _ \ '__|
| |__| (_| \__ \  __/ (_| | |  | |_) | | |  __/ (_| |   <  __/ |
 \____\__,_|___/\___|\__,_|_|  |____/|_|  \___|\__,_|_|\_\___|_|

  Code to break a caesar cipher using a list of words.
  License: GPL3 (basically use it how you like; for more details read the LICENSE file)
*/

const fs = require("fs"); //Load the filesystem library so we can write to files

const list = fs.readFileSync("./words.txt").toString(); //Load the word list
const words = list.split("\n"); //Split the word list by new lines (\n)

const args = process.argv.slice(2); //get command line arguments

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

var letters2 = letters1; //Creates cipher list/letters2 with the contents of letters1


/*
  This function deciphers the input text with the current contents of 
  `letters1` and `letters2`. Letters2 is the list with the cipher rotated
  (e.g A in letters1 is B in cipher code/letters2).
  What this code does is look for each letter of the word in letters2 and 
  then look up the letter in the same position, but in letters1 instead.
  This is what I used to cipher the savegames in my Scratch savegame sys-
  tem (https://scratch.mit.edu/projects/523818864/)
*/
function decipher(text = "") {
  var cipheredstring = "";
  for(var i = 0; i < text.length; i++) {
    var letter = text.charAt(i);
    /*
      Find ciphered letter from table 2 (rotated) and get letter in same position in 
      table 1 (not rotated), therefore deciphering with the current cipher positions.
      We are also checking if the character provided is not in the table (e.g anything 
      that is not a letter) and we ignore it (don't search for it in the other list) if so.
    */
    //var cipheredletter = letter.toUpperCase();
    //var index = letters2.indexOf(letter.toUpperCase());
    //if(index != -1) cipheredletter = letters1[index];
    var cipheredletter = letters1[letters2.indexOf(letter.toUpperCase())];
    
    cipheredstring += cipheredletter;
  }
  return cipheredstring;
}

//loop through all words specified
for (var i = 0; i < args.length; i++) {
  //loop through all cipher patterns
  for (var j = 1; j < letters1.length; j++) {
    //cycle cipher
    letters2.push(letters2.shift());
    //console.log(`Using cipher ${j} (A = ${letters2[0]})`);

    //check word in list of words
    var dc = decipher(args[i]);
    console.log(dc);
    if(words.includes(dc)) {
      console.log(`Word match: ${args[i]} -> ${dc} (Cipher ${j})`);
    }
  }
}
