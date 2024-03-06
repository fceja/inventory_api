import { PoolClient } from "pg";

import { connPool } from "@db/DbPoolClient";
import ProductsModel from "@db/models/ProductsModel";

export const createProductsMidW = async (productInfo: ProductsModel) => {
  let dbConn: PoolClient | null = null;

  try {
    // NOTE - does not contain the following since they are generated automatically by db
    // product_id
    // created_at,
    // updated_at,
    const qResult = await connPool.query(
      `
        INSERT INTO products (
          bar_code,
          categories_id,
          depth,
          description,
          fragile,
          heavy,
          height,
          name,
          qr_code,
          quantity,
          refrigerated,
          sku_code,
          weight,
          width
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    `,
      [
        productInfo.barCode ?? null,
        productInfo.categoriesId ?? null,
        productInfo.depth ?? null,
        productInfo.description ?? null,
        productInfo.fragile ?? null,
        productInfo.heavy ?? null,
        productInfo.height ?? null,
        productInfo.name,
        productInfo.qrCode ?? null,
        productInfo.quantity,
        productInfo.refrigerated ?? null,
        productInfo.skuCode ?? null,
        productInfo.weight ?? null,
        productInfo.width ?? null,
      ],
    );

    if (qResult.rowCount > 0) return true;

    throw new Error("Error inserting.");
  } catch (error) {
    console.error(error);

    return false;
  } finally {
    if (dbConn) dbConn.release();
  }
};
