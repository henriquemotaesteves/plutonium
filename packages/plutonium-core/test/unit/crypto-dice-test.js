import { expect } from 'chai';
import CryptoDice from '../../src/crypto-dice';

describe('CryptoDice', () => {

    describe('#roll', () => {

        context('dice is rolled 6000 times', () => {

            it('returns uniformly distributed random sides at significance level of 5%', () => {
                /*
                 * Chi-Square Test
                 */
                const dice     = new CryptoDice();
                const observed = [0, 0, 0, 0, 0, 0];

                for (let i = 0; i < 6000; i++) {
                    const side = dice.roll();
                    observed[side - 1] += 1;
                }

                /*
                 * https://www.itl.nist.gov/div898/handbook/eda/section3/eda3674.htm
                 *
                 * Degrees of freedom = 5
                 * Alpha              = 0.05
                 */
                const pValue     = 11.070;
                let   chiSquared = 0;

                for (let i = 0; i < observed.length; i++) {
                    chiSquared += Math.pow(observed[i] - 1000, 2) / 1000;
                }

                expect(chiSquared).to.be.below(pValue);
            });
        });
    });
});
