import { getCartData, getProducts } from "@/app/api/getData";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TabsComponent from "./FilteredProdList";

interface AllProducts {
  products: any;
  shoes: any;
  cart: any;
  isUserAuthenticated: boolean;
  userData: any
}

const ProductsList = ({ products, cart, isUserAuthenticated, userData }: Readonly<AllProducts>) => {
  return (
    <section className="py-16 min-h-[90vh]">
      <h1 className="mb-10">Our products</h1>
      <TabsComponent
        products={products}
        cart={cart}
        isUserAuthenticated={isUserAuthenticated}
        userData={userData}
        shoes={undefined}
        />
    </section>
  );
};

export const getServerSideProps = async () => {
  const products = await getProducts();
  const cart = await getCartData();
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const userData = await getUser();

  return {
    props: {
      products,
      cart,
      isUserAuthenticated,
      userData
    },
  };
};

export default ProductsList;
