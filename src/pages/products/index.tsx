import axios from "axios";
import { Layout } from "@app/components/Layout";
import { ProductCard } from "@app/components/ProductCard";
import { Product } from "@app/types";

interface Props {
  products: Product[];
  googleDocData: string;
}

function ProductsPage({ products = [], googleDocData }: Props) {
  const renderProducts = () => {
    if (products.length === 0) return <h1>No hay productos</h1>;
    return products.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  return (
    <Layout>
      <div className="max-w-md py-4 px-8 bg-white shadow-lg rounded-lg my-10">
        <h2 className="text-gray-800 text-2xl font-semibold">
          Contenido cargado desde Google Drive
        </h2>
        <p className="mt-2 text-gray-600">{googleDocData}</p>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-4">
        {renderProducts()}
      </div>
    </Layout>
  );
}

export default ProductsPage;

export const getServerSideProps = async () => {
  const { rows } = await axios
    .get("http://localhost:3000/api/products")
    .then(({ data }) => data)
    .catch((error) => console.error(error));

 

  const googleDocID = "1LSQzDmTCWe3aIL9fkve9lvSEjKdfCHQg";

  let data = "Error al cargar el contenido";
  try {
    const res = await axios.get(
      `https://docs.google.com/uc?export=download&id=${googleDocID}`
    );
    data = res.data;
  } catch (error) {
    console.log(error);
  }

  return {
    props: {
      products: rows,
      googleDocData: data,
    },
  };
};