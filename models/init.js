const dao = require("./dao");

const init = `
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    hash TEXT
);
`

module.exports = _ => dao.getInstance().executeUpdate(init).then(console.log).catch(console.error);
