import { deleteProduct, getProduct, updateProduct } from "@app/server/controllers/product.controller";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  switch (req.method) {
    case "GET":      
      return await getProduct(req, res);
    case "DELETE":
      return await deleteProduct(req, res);
    case "PUT":
      return await updateProduct(req, res);
    default:
      return res.status(400).json({ message: "bad request" });
  }
}





