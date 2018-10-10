export default class Passphrase {
    constructor(words = []) {
        this.words = words.map(w => w.trim());
    }

    isEmpty() {
        return this.words.length === 0;
    }

    reduceWords(callback, accumulator) {
        return this.words.reduce(callback, accumulator);
    }

    toString() {
        return this.words.join(' ');
    }
}
