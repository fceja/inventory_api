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

export const getFolderHierarchyQuery = () => {
    return `
        WITH RECURSIVE FolderHierarchy AS (
            SELECT
                "folderId",
                name,
                "parentFolderId",
                0 AS level
            FROM
                "folders"
            WHERE
                "parentFolderId" IS NULL  -- Root folders have NULL parentFolderId

            UNION ALL

            SELECT
                f."folderId",
                f.name,
                f."parentFolderId",
                fh.level + 1 AS level
            FROM
                "folders" f
            INNER JOIN
                FolderHierarchy fh ON f."parentFolderId" = fh."folderId"
        )
        SELECT
            "folderId",
            name,
            "parentFolderId",
            level
        FROM
            FolderHierarchy
        ORDER BY
            level,
            "folderId";
    `;
}