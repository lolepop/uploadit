const express = require("express");
const keys = require("./lib/keys");
let cfg = require("./config");

const app = express();
app.use(express.json());

var cors = require('cors');
app.use(cors());

app.use("/api/auth", require("./routes/auth"));
app.use("/api/upload", require("./routes/upload"));
app.use(`${cfg.downloadRoute}`, require("./routes/download"));

(async _ => {
    keys.keys = await new keys.JWTKeyPair();
    await require("./models/init")();

    // require("./models/dao").getInstance().executeQuery("SELECT * FROM users").then(console.log).catch(console.error);

    app.listen(cfg.port, () => console.log(`Server listening on port ${cfg.port}`));
})();
