import { Given, Then } from 'cucumber';
import { expect }      from 'chai';

Given(/^clipboard is empty$/, function() {
    return this.app.electron.clipboard.clear().then(() => {
        return expect(this.app.electron.clipboard.readText()).to.eventually.be.empty;
    });
});

Then(/^clipboard has passphrase$/, function() {
    return expect(this.app.electron.clipboard.readText()).to.eventually.not.be.empty;
});
