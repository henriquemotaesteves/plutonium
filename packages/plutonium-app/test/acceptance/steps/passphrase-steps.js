import { Given, Then } from 'cucumber';
import { expect }      from 'chai';

Given(/^passphrase number of words is default$/, function() {
    this.numberOfWords = 6;
});

Given(/^passphrase number of words is '(.*)'$/, function(numberOfWords) {
    this.numberOfWords = parseInt(numberOfWords);

    return this.app.client
        .waitForVisible('#number-of-words')
        .setValue('#number-of-words', numberOfWords);
});

Then(/^passphrase with correct number of words is generated$/, function() {
    return this.app.client.elements('.passphrase-view__word').then(wordElements => {
        const wordPromises = wordElements.value.map(wordElement => this.app.client.elementIdText(wordElement.ELEMENT));

        return wordPromises.reduce(
            (chain, next) => chain.then(passphrase => next.then(word => passphrase + word.value)
            ), Promise.resolve(''));
    }).then(passphrase => {
        expect(passphrase.split(' ').length).to.be.equal(this.numberOfWords);
    });
});
