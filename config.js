const argon2 = require("argon2");

module.exports = {
    port: 8000,
    jwtTokenTime: "24h",
    databaseFile: "uploadDB.db",
    argon2cfg: { // optimised for i7 7500U laptop cpu (about 0.8s/hash)
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64 MiB
        timeCost: 6,
        parallelism: 8
    }
}