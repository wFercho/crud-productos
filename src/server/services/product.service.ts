import { pool } from "@app/config/db.connection";
import { Product, ProductToInsert } from "@app/types";

const getAll = async () => {
  return await pool.query("SELECT * FROM product");
};

const saveOne = async (product: ProductToInsert) => {
  const { name, description, price } = product;

  const { fields } = await pool.query(
    "INSERT INTO product(name, description, price) VALUES ($1, $2, $3) RETURNING *",
    [name, description, price]
  );
  return { ...product, id: fields[0] };
};

const getOne = async (id: string) => {
  const { rows } = await pool.query("SELECT * FROM product WHERE id = $1", [
    id,
  ]);
  return rows;
};

const deleteOne = async (id: string) => {
  await pool.query("DELETE FROM product WHERE id = $1", [id]);
};

const updateOne = async (product: Product) => {
  const { id, name, description, price } = product;
  await pool.query(
    `UPDATE "product" SET "name"=$1, "description"=$2, "price"=$3 WHERE "id" = $4`,
    [name, description, price, id]
  );
};

export { getAll, saveOne, getOne, deleteOne, updateOne };
