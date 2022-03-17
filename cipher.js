#!/usr/bin/env node

/*  
   _____                           ____                 _             
  / ____|                         |  _ \               | |            
 | |     __ _  ___  ___  __ _ _ __| |_) |_ __ ___  __ _| | _____ _ __ 
 | |    / _` |/ _ \/ __|/ _` | '__|  _ <| '__/ _ \/ _` | |/ / _ \ '__|
 | |___| (_| |  __/\__ \ (_| | |  | |_) | | |  __/ (_| |   <  __/ |   
  \_____\__,_|\___||___/\__,_|_|  |____/|_|  \___|\__,_|_|\_\___|_|   

  Code to break a caesar cipher using a list of words.
  License: GPL3 (basically use it how you like; for more details read the LICENSE file)
*/

const removeDiacritics = require("diacritics").remove; //load the diacritics module to remove the diacritics
const fs = require("fs"); //Load the filesystem module inbuilt into nodejs so we can read from and write to files

const args = process.argv.slice(2); //get arguments

if(args.length <= 1) {
    //not enough arguments
    console.log("Not enough arguments!");
    console.log("Usage: node cipher.js <cipherrots> <text>");
    process.exit();
}

//Cipher setup
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
//Reset function
function resetCipher() {
    letters2 = [
        "A", "B","C", "D", "E", "F",
        "G", "H", "I", "J", "K", "L",
        "M", "N", "O", "P", "Q", "R",
        "S", "T", "U", "V", "W", "X",
        "Y", "Z"
    ];
}

/*
  This function ciphers the input text with the current contents of 
  `letters1` and `letters2`. Letters2 is the list with the cipher rotated
  (e.g A in letters1 is B in cipher code/letters2).
  What this code does is look for each letter of the word in letters1 and 
  then look up the letter in the same position, but in letters2 instead, 
  this being the opposite of the decipher function in index.js. This is 
  what I used to cipher the savegames in my Scratch savegame system 
  (https://scratch.mit.edu/projects/523818864/).
*/
function cipher(text = "") {
    var cipheredstring = "";
    for(var i = 0; i < text.length; i++) {
        var letter = removeDiacritics(text.charAt(i)).toUpperCase();
        /*
            Find ciphered letter from table 1 (not rotated) and get letter in same position in 
            table 2 (rotated), therefore ciphering with the current cipher positions.
            We are also checking if the character provided is not in the table (e.g anything 
            that is not a letter) and we ignore it (don't search for it in the other list) if so.
        */
        var cipheredletter = letter;
        var index = letters1.indexOf(letter);
        if(index != -1) cipheredletter = letters2[index];
        cipheredstring += cipheredletter;
    }
    return cipheredstring;
}

//random between 2 integers
function randInt(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}


const list = fs.readFileSync("./words.txt").toString(); //Load the word list
const words = list.split("\n"); //Split the word list by line breaks (usually \n or \r\n, but in this case \n because file is encoded with LF line endings, not CRLF endings)

//remove diacritics (è, å, ï, etc) from every word and make them uppercase (but not in the words list file)
for(var i = 0; i < words.length; i++) {
    words[i] = removeDiacritics(words[i]).toUpperCase();
}


//how much to cipher (between 1 and 25, 26 would be a full rotation)
var ciphert = args.shift(); //first argument
//rotate cipher number of times
for(var j = 0; j < ciphert; j++) {
    letters2.push(letters2.shift());
}
//cipher words
var ciphered = cipher(args.join(" "));
console.log(`${args.join(" ")} -> cipher ${ciphert} -> ${ciphered}`);
//reset cipher
resetCipher();