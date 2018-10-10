import electronPath            from 'electron';
import path                    from 'path';
import { Application }         from 'spectron';
import { setWorldConstructor } from 'cucumber';

class World {
    constructor() {
        this.app = new Application({
            path: electronPath,
            args: [path.join(__dirname, '../../..')]
        });

        this.numberOfWords = 0;
    }
}

setWorldConstructor(World);
