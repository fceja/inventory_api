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
export const getItemByItemIdQuery = (itemId: number) => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
        WHERE "itemId" = ${itemId}
    `
};