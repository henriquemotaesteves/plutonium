import CryptoDice    from './crypto-dice';
import Passphrase    from './passphrase';
import EFF_WORD_LIST from './eff-word-list';

const NUMBER_OF_WORDS = 6;
const NUMBER_OF_ROLLS = 5;

export default class Diceware {
    constructor(dice = new CryptoDice(), wordList = EFF_WORD_LIST) {
        this.dice     = dice;
        this.wordList = wordList;
    }

    generate(numberOfWords = NUMBER_OF_WORDS) {
        let words = [];

        for (let i = 0; i < numberOfWords; i++) {
            let id = '';

            for (let j = 0; j < NUMBER_OF_ROLLS; j++) {
                id = id + this.dice.roll();
            }

            words.push(this.wordList[id]);
        }

        return new Passphrase(words);
    }
}
