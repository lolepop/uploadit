import { singleReturn } from "../lib/util";

const dao = require("./dao");

interface FileData
{
    id: number
    filename: string,
    original: string,
    created: number,
    parent: null
}


export async function get(filename: string): Promise<FileData>
{
    const f = await dao.getInstance().executeQuery("SELECT * FROM files WHERE filename=$filename LIMIT 1", {
        $filename: filename
    });
    return singleReturn<FileData>(f);
}

export function getFromUploader(parent: string)
{
    return dao.getInstance().executeQuery("SELECT * FROM files WHERE parent=$parent", {
        $parent: parent
    });
}

export function create(filename: string, original: string, parent: string = null)
{
    return dao.getInstance().executeUpdate("INSERT INTO files VALUES (NULL, $filename, $original, strftime('%s','now'), $parent)", {
        $filename: filename,
        $original: original,
        $parent: parent
    });
}
