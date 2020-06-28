const fs = require("fs");
const path = require("path");

function getPrivateKey(): string
{
    return fs.readFileSync(path.resolve(__dirname, "../private_key.pem"), "utf8");
}

function getPublicKey(): string
{
    return fs.readFileSync(path.resolve(__dirname, "../public_key.pem"), "utf8");
}

// class JWTKeyPair
// {
//     constructor() // its big brain time
//     {
//         return (async _ => {
//             [this.private, this.public] = await Promise.all([getPrivateKey(), getPublicKey()]);
//             return this;
//         })();
//     }

// }

// var keys = (async _ => {return await new JWTKeyPair()})();
export let keys = {
    private: getPrivateKey(),
    public: getPublicKey()
};
