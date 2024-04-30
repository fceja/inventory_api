import { ItemsModelI } from "@db/models/ItemsModel";

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

// CREATE queries
export const getCreateItemQuery = (itemData: ItemsModelI) => {
    const itemProps = [];
    const valuesClause = [];
    const queryParams = [];
    Object.entries(itemData).forEach(([key]) => {
        itemProps.push(`"${key}"`);
        valuesClause.push(`$${queryParams.length + 1}`);
        queryParams.push(itemData[key]);
    });

    const queryItemProps = itemProps.join(", ");
    const querySetClause = valuesClause.join(", ");

    const query = `
    INSERT INTO "items" (${queryItemProps})
    VALUES (${querySetClause})
  `;

    return { query: query, queryParams: queryParams };
}

// READ queries
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