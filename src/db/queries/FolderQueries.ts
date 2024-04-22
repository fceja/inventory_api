const TABLE_NAME = "folders"

const TABLE_COLS = `
    "folderId",
    "parentFolderId",
    "name",
    "nodeType",
    "createdAt",
    "updatedAt"
`

export const getContentsByFolderIdQuery = (folderId: number) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE "folderId" = ${folderId}
    `
}