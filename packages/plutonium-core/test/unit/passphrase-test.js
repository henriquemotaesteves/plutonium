import { expect } from 'chai';
import Passphrase from '../../src/passphrase';

describe('Passphrase', () => {

    describe('#isEmpty', () => {

        context('passphrase is empty', () => {
            const passphrase = new Passphrase();

            it('returns true', () => {
                expect(passphrase.isEmpty()).to.be.true;
            });
        });

        context('passphrase is not empty', () => {
            const passphrase = new Passphrase([ 'hello', 'world' ]);

            it('returns false', () => {
                expect(passphrase.isEmpty()).to.be.false;
            });
        });
    });
});
