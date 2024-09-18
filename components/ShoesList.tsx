import { getCartData, getProducts } from "@/app/api/getData";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import TabsComponent from "./FilteredShoeList";


interface AllShoes {
  shoes: any;
  products: any;
  cart: any;
  isUserAuthenticated: boolean;
  userData: any
}

const ShoesList = ({shoes, cart, isUserAuthenticated, userData }: Readonly<AllShoes>) => {
  return (
    <section className="py-16 min-h-[90vh]">
      <h1 className="mb-10">Our products</h1>
      <TabsComponent
        shoes={shoes}
        cart={cart}
        isUserAuthenticated={isUserAuthenticated}
        userData={userData}
        />
    </section>
  );
};

export const getServerSideProps = async () => {
  const cart = await getCartData();
  const { isAuthenticated, getUser } = getKindeServerSession();
  const isUserAuthenticated = await isAuthenticated();
  const userData = await getUser();

  return {
    props: {
      cart,
      isUserAuthenticated,
      userData
    },
  };
};

export default ShoesList;
