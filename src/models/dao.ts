const sqlite3 = require("sqlite3");

const cfg = require("../config");

// godawful bindings
// switch to better-sqlite3 once windows prebuilt binaries are available
class DAO
{
    conn: any;

    constructor()
    {
        this.conn = new sqlite3.Database(cfg.databaseFile, err => {
            if (err)
                console.error(err);
            else
                console.log(`Connected to ${cfg.databaseFile}`);
        })
    }

    executeUpdate(query: string, param={})
    {
        return new Promise((resolve, reject) => {
            this.conn.run(query, param, function(err) {
                if (err)
                    reject(err);
                console.log(`${this.changes} rows affected`);
                resolve({ changes: this.changes, lastId: this.lastID });
            });
        });
    }

    executeQuery(query: string, param={}) 
    {
        return new Promise((resolve, reject) => {
            this.conn.all(query, param, (err, rows) => {
                if (err)
                    reject(err);
                resolve(rows);
            });
        });
    }

    close()
    {
        this.conn.close();
    }
}

var instance = null;

function getInstance()
{
    if (instance)
        return instance;
    instance = new DAO();
    return instance;
}

module.exports = { getInstance };
