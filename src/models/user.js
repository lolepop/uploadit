const dao = require("./dao");

function get(username)
{
    return dao.getInstance().executeQuery("SELECT * FROM users WHERE username=$username LIMIT 1", {
        $username: username
    });
}

function create(username, hash)
{
    return dao.getInstance().executeUpdate("INSERT INTO users VALUES ($username, $hash)", {
        $username: username,
        $hash: hash
    });
}

module.exports = { get, create };