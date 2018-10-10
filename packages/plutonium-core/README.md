# Plutonium Core

Plutonium (passpharse generator that uses the [diceware method](https://www.eff.org/dice)) core library.

# Installation

```shellscript
$ npm install @plutonium/core
```

# Usage

```javascript
var Diceware   = require('@plutonium/core').Diceware;
var diceware   = new Diceware();
var passphrase = diceware.generate();

console.log(passphrase.toString());
```