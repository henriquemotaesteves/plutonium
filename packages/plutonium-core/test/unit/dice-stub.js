export default class DiceStub {
    constructor(rolls) {
        this.rolls = rolls;
    }

    roll() {
        return this.rolls.shift();
    }
}
