const argon2 = require("argon2");


module.exports = {
    port: 8000,
    jwtTokenTime: "24h",
    databaseFile: "uploadDB.db",
    downloadRoute: "/d/",
    multerSettings: {
        uploadDir: `${__dirname}/upload/`,
        // maxSize: 100 * 1024 * 1024
        maxSize: 1
    },
    argon2cfg: { // optimised for i7 7500U laptop cpu (about 0.8s/hash)
        type: argon2.argon2id,
        memoryCost: 2 ** 16, // 64 MiB
        timeCost: 6,
        parallelism: 8
    }
}