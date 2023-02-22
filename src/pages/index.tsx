import '@app/config/db.connection'
import axios from "axios";
import { Layout } from "@app/components/Layout";
import { ProductCard } from "@app/components/ProductCard";
import { Product } from "@app/types";
import { ENV } from "@app/config/env/env.variables";

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
  const products = await axios
    .get("http://localhost:3000/api/products")
    .then(({ data }) => data)
    .catch(() => console.log("ERROR AL ACCEDER A LA BASE DE DATOS"))
    

  const googleDocID = ENV.ID_ARCH_PLANO_DRIVE;
  
  
  let dataGoogleDrive = "Error al cargar el contenido";
  try {
    
    const res = await axios.get(
      `https://docs.google.com/uc?export=download&id=${googleDocID}`
    );
    
    dataGoogleDrive = res.data;
  } catch (error) {
    console.log("ERROR AL ENCONTRAR EL DOCUMENTO DE GOOGLE DRIVE", error);
  }

  
  return {
    props: {
      products: (products != undefined ? products.rows : []),
      googleDocData: dataGoogleDrive,
    },
  };
};
