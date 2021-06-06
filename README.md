# CaesarBreaker
Really simple caesar cipher breaker

## Usage
Replace `ifmmp uifsf` with the text you want to try to decrypt, or run it with the preset message.
```
git clone https://github.com/TheJoeCoder/CaesarBreaker && cd CaesarBreaker
node index.js ifmmp uifsf
```
You will get output something like this:
```json
{ '10': 1, '14': 2, '15': 1, '17': 1, '25': 1 }
```
This displays all of the matched ciphers and how many times a word matched this cipher.

For example, in the data above, the message was most likely encoded with cipher 14, which it was, so my program works.