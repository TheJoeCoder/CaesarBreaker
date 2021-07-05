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


//random between 2 integers
function randInt(min, max) {
    return Math.floor(
        Math.random() * (max - min) + min
    );
}


const list = fs.readFileSync("./words.txt").toString(); //Load the word list
const words = list.split("\n"); //Split the word list by line breaks (usually \n or \r\n, but in this case \n because file is encoded with LF line endings, not CRLF endings)

//loop through all words and make them uppercase (but not in the words list file)
for(var i = 0; i < words.length; i++) {
  words[i] = words[i].toUpperCase();
}

//generate 5 phrases (0<=x<6)
for(var i = 0; i < 6; i++) {
    //how many words (between 1 and 3)
    var length = randInt(1, 3);
    //how much to cipher (between 1 and 25, 26 would be a full rotation)
    var cipher = randInt(1, 25);
}