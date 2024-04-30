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

// CREATE operations
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

// READ operations
export const getAllItemsQuery = () => {
    return `
        SELECT ${TABLE_COLS}
        FROM "${TABLE_NAME}"
    `;
}

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

// UPDATE operations
export const getUpdateItemByItemId = (itemId: number, itemData: ItemsModelI) => {
    // generate sql query statement
    const setClausePairs = [];
    const queryParams = [];
    Object.entries(itemData).forEach(([key]) => {
        setClausePairs.push(` "${key}"=$${queryParams.length + 1}`);
        queryParams.push(itemData[key]);
    });

    const querySetClause = setClausePairs.join(", ");
    queryParams.push(itemId);

    // final query
    const query = `
        UPDATE "${TABLE_NAME}" A
        SET ${querySetClause}, "updatedAt" = CURRENT_TIMESTAMP
        WHERE A."itemId"=$${queryParams.length}
  `;

    return { query: query, queryParams: queryParams };
}