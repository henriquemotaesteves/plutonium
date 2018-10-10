import { When } from 'cucumber';

When(/^button '(.*)' is clicked$/, function(button) {
    return this.app.client
        .waitForVisible(`button=${button}`)
        .click(`button=${button}`);
});
