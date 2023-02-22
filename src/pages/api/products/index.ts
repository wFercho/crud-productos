import { connectToDB } from "@app/config/db.connection";
import {
  getProducts,
  saveProduct,
} from "@app/server/controllers/product.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectToDB();

  switch (req.method) {
    case "GET":
      return await getProducts(req, res);
    case "POST":
      return await saveProduct(req, res);
    default:
      return res.status(400).send("Method not allowed");
  }
}
