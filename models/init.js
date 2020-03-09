const dao = require("./dao");

const init = [`
CREATE TABLE IF NOT EXISTS users (
    username TEXT PRIMARY KEY,
    hash TEXT NOT NULL
)`,
`
CREATE TABLE IF NOT EXISTS files (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	filename TEXT NOT NULL,
	original TEXT NOT NULL,
	created INT NOT NULL,
	parent TEXT NULL,
	FOREIGN KEY (parent) REFERENCES users(username)
	ON DELETE CASCADE
)`
]

module.exports = _ => {
	for (i of init)
		dao.getInstance().executeUpdate(i).then().catch(console.error);
	console.log("Database initialised")
}
