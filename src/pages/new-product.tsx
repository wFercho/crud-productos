
import { ProductForm } from "@app/components/ProductForm";
import { Layout } from "@app/components/Layout";

function NewPage() {
  return (
    <Layout>
      <div className="h-5/6 grid place-items-center">
        <ProductForm />
      </div>
    </Layout>
  );
}
export default NewPage;

