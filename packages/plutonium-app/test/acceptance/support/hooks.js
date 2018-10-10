import { After, Before, setDefaultTimeout } from 'cucumber';
import chai                                 from 'chai';
import chaiAsPromised                       from 'chai-as-promised';

setDefaultTimeout(10000);

Before(function() {
    chai.use(chaiAsPromised);

    chaiAsPromised.transferPromiseness = this.app.transferPromiseness;

    return this.app.start();
});

After(function() {
    return this.app.stop();
});
