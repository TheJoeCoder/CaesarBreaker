# CaesarBreaker
Really simple caesar cipher breaker

## Usage
Replace `ifmmp uifsf` with the text you want to try to decrypt, or run it with this preset message.
```
git clone https://github.com/TheJoeCoder/CaesarBreaker && cd CaesarBreaker
npm install
node index.js ifmmp uifsf
```
You will get output something like this:
```json
{ '10': 1, '14': 2, '15': 1, '17': 1, '25': 1 }
```
This displays all of the matched ciphers and how many times a word matched this cipher.

For example, in the data above, the message was most likely encoded with cipher 14, which it was, so my program works.

## License
The license is GPL3, which basically means you can do what you want with it, but you must distribute it with the same license.
For more details, see the [LICENSE](https://github.com/TheJoeCoder/CaesarBreaker/blob/master/LICENSE) file.

## Credits
English words list: https://github.com/dwyl/english-words/

Removing diacritics: https://www.npmjs.com/package/diacritics
