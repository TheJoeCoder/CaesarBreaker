#!/usr/bin/env node

/*  
  ____                          ____                 _
 / ___|__ _ ___  ___  __ _ _ __| __ ) _ __ ___  __ _| | _____ _ __
| |   / _` / __|/ _ \/ _` | '__|  _ \| '__/ _ \/ _` | |/ / _ \ '__|
| |__| (_| \__ \  __/ (_| | |  | |_) | | |  __/ (_| |   <  __/ |
 \____\__,_|___/\___|\__,_|_|  |____/|_|  \___|\__,_|_|\_\___|_|

  Code to break a caesar cipher using a list of English words.
  License: GPL3 (basically use it how you like; for more details read the LICENSE file)
*/

const fs = require("fs"); //Load the filesystem library so we can read from and write to files

const list = fs.readFileSync("./words.txt").toString(); //Load the word list
const words = list.split("\n"); //Split the word list by line breaks (usually \n or \r\n, but in this case \n because file is encoded with LF line endings, not CRLF endings)

//loop through all words and make them uppercase (but not in the words list file)
for(var i = 0; i < words.length; i++) {
    words[i] = words[i].toUpperCase();
}

const args = process.argv.slice(2); //get command line arguments apart from the first 2 (which are probably `node index.js`)

var letters1 = [
    "A", "B","C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
];

var letters2 = [
    "A", "B","C", "D", "E", "F",
    "G", "H", "I", "J", "K", "L",
    "M", "N", "O", "P", "Q", "R",
    "S", "T", "U", "V", "W", "X",
    "Y", "Z"
];

function resetCipher() {
    letters2 = [
        "A", "B","C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X",
        "Y", "Z"
    ];
}

var wordmatches = {};

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
        var letter = text.charAt(i).toUpperCase();
        /*
            Find ciphered letter from table 2 (rotated) and get letter in same position in 
            table 1 (not rotated), therefore deciphering with the current cipher positions.
            We are also checking if the character provided is not in the table (e.g anything 
            that is not a letter) and we ignore it (don't search for it in the other list) if so.
        */
        var cipheredletter = letter;
        var index = letters2.indexOf(letter);
        if(index != -1) cipheredletter = letters1[index];
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
        //check word in list of words
        var dc = decipher(args[i]);
        if(words.includes(dc.toUpperCase())) {
            console.log(`Word match: ${args[i].toUpperCase()} -> ${dc} (Cipher ${j})`);
            wordmatches[j] = wordmatches[j] == null ? 1 : wordmatches[j] + 1; //add 1 to match count for ciphers
        }
    }
    //reset cipher after each word
    resetCipher();
}

console.log("FINISHED!");
console.log(`Results: `);
console.log(wordmatches);