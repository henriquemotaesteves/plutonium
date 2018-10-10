import crypto from 'crypto';

export default class CryptoDice {
    roll() {
        return 1 + crypto.randomBytes(4).readUInt32BE(0) % 6;
    }
}
