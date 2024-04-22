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

export const getChildFoldersByFolderIdQuery = (folderId: number) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE "parentFolderId" = ${folderId}
    `;
}

export const getFoldersContainingNameQuery = (folderName: string) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE LOWER("name") LIKE LOWER('%${folderName}%');
    `;
}