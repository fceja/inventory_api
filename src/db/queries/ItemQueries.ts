const TABLE_NAME = "items"

const TABLE_COLS = `
    "itemId",
    "parentFolderId",
    "name",
    "nodeType",
    "quantity",
    "cost"::float,
    "price"::float,
    "createdAt",
    "updatedAt"
`
export const getChildItemsByParentFolderIdQuery = (parentFolderId: number) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE "parentFolderId" = ${parentFolderId};
    `
};

export const getItemByItemIdQuery = (itemId: number) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE "itemId" = ${itemId}
    `
};

export const getItemContainingNameQuery = (itemName: string) => {
    return `
    SELECT ${TABLE_COLS}
    FROM "${TABLE_NAME}"
    WHERE LOWER("name") LIKE LOWER('%${itemName}%');
`
};