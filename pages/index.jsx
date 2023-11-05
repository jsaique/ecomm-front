import Featured from "@/components/Featured";
import Header from "@/components/Header";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";

export default function HomePage({ featuredProduct }) {
  return (
    <div>
      <Header />
      <Featured featuredProduct={featuredProduct} />
    </div>
  );
}

export async function getServerSideProps() {
  const featuredProductId = "65414038b4c71d634cdf18db";
  await mongooseConnect();
  const featuredProduct = await Product.findById(featuredProductId);
  return {
    props: {
      featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
    },
  };
}
