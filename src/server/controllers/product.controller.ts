import { NextApiRequest, NextApiResponse } from "next";
import { deleteOne, getAll, getOne, saveOne, updateOne } from "../services/product.service";


const getProducts = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const results = await getAll();
    return res.status(200).json(results);
  } catch (error) {
    return res.status(500).json({ error });
  }
};

const saveProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { name, description, price } = req.body;

    const result = saveOne({ name, description, price });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({ message: "Error guardando el producto" });
  }
};

const getProduct = async (req: NextApiRequest, res: NextApiResponse) => {
    try {      
      const id = req.query.id?.toString()
      if(id){
        
        const rows = await getOne(id)
        return res.status(200).json(rows);
      }
      return res.status(500).json({ message: "Error al verificar el id" });
    } catch (error) {
      return res.status(500).json({ message: "No existe un producto con ese id" });
    }
  };


  const deleteProduct = async ({query}: NextApiRequest, res: NextApiResponse) => {
    try {
      const id = query.id?.toString()
      if(id){
        await deleteOne(id)
        return res.status(204).json({});
      }
      return res.status(500).json({ message: "Error al verificar el id" });

    } catch (error) {
      return res.status(500).json({ message: "Error al eliminar el producto" });
    }
  };

  const updateProduct = async (req:NextApiRequest, res:NextApiResponse) => {
    try {
      const {id, name, description, price} = req.body
      await updateOne({id, name, description, price})
       
      return res.status(204).json({});
    } catch (error) {
      return res.status(500).json({ message: "Error al actualizar el producto" });
    }
  };
  
export {saveProduct, getProducts, getProduct, deleteProduct, updateProduct}
