import { singleReturn } from "../lib/util";

const dao = require("./dao");

interface User
{
    username: string
    hash: string
}

export async function get(username: string): Promise<User>
{
    const user = await dao.getInstance().executeQuery("SELECT * FROM users WHERE username=$username LIMIT 1", {
        $username: username
    });
    return singleReturn<User>(user); 
}

export function create(username: string, hash: string)
{
    return dao.getInstance().executeUpdate("INSERT INTO users VALUES ($username, $hash)", {
        $username: username,
        $hash: hash
    });
}

// module.exports = { get, create };