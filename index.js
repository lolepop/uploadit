const express = require("express");
const keys = require("./lib/keys");
let cfg = require("./config");

const app = express();
app.use(express.json());

app.use("/auth", require("./routes/auth"));

(async _ => {
    keys.keys = await new keys.JWTKeyPair();
    await require("./models/init")();

    // require("./models/dao").getInstance().executeQuery("SELECT * FROM users").then(console.log).catch(console.error);

    app.listen(cfg.port, () => console.log(`Server listening on port ${cfg.port}`));
})();
