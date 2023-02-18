import axios, { isAxiosError } from "axios";
import { useRouter } from "next/router";
import toast from "react-hot-toast";
import { Layout } from "@app/components/Layout";
import { GetServerSideProps } from "next";

interface Props {
  product: any[]
}
function ProductPage(props:Props) {
  const router = useRouter();
  const product = props.product[0];
  const handleDelete = async (id: string) => {
    try {
      await axios.delete("/api/products/" + id);
      toast.success("Producto eliminado");
      router.push("/");
    } catch (error) {
      if (isAxiosError(error)) console.error(error.response?.data.message);
    }
  };

  return (
    <Layout>
      <div className="p-6 bg-white dark:bg-gray-800">
        <p>Nombre: {product.name}</p>
        <p>Descripción: {product.description}</p>
        <p>Precio: {product.price}</p>
      </div>

      <div className="mt-7 flex justify-center">
        <button
          className="bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
          onClick={() => handleDelete(product.id)}
        >
          Eliminar
        </button>
        <button
          className="bg-gray-500 hover:bg-gray-800 ml-2 py-2 px-5 rounded"
          onClick={() => router.push("/products/edit/" + product.id)}
        >
          Editar
        </button>
      </div>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  
  const { data: product } = await axios.get(
    "http://localhost:3000/api/products/" + query.id
  );

  return {
    props: {
      product,
    },
  };
};

export default ProductPage;
