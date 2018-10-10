import { expect } from 'chai';
import DiceStub   from './dice-stub';
import Diceware   from '../../src/diceware';

describe('Diceware', () => {

    describe('#generate', () => {

        context('number of words is not specified', () => {

            it('returns passphrase with default number of words', () => {
                const diceStub = new DiceStub([ 1, 1, 1, 1, 1, 1, 6, 6, 6, 6, 2, 6, 6, 6, 6, 3, 6, 6, 6, 6, 4, 6, 6, 6, 6, 6, 6, 6, 6, 6 ]);
                const wordList = { 11111: 'abacus', 16666: 'copilot', 26666: 'five', 36666: 'massive', 46666: 'refold', 66666: 'zoom' };
                const diceware = new Diceware(diceStub, wordList);

                const passphrase = diceware.generate();

                expect(passphrase.toString()).to.equal('abacus copilot five massive refold zoom');
            });
        });
    });
});
