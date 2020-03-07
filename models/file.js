const dao = require("./dao");

function get(filename)
{
    return dao.getInstance().executeQuery("SELECT * FROM files WHERE filename=$filename LIMIT 1", {
        $filename: filename
    });
}

function getFromUploader(parent)
{
    return dao.getInstance().executeQuery("SELECT * FROM files WHERE parent=$parent", {
        $parent: parent
    });
}

function create(filename, original, parent=null)
{
    return dao.getInstance().executeUpdate("INSERT INTO files VALUES (NULL, $filename, $original, $parent)", {
        $filename: filename,
        $original: original,
        $parent: parent
    });
}

module.exports = { get, getFromUploader, create };