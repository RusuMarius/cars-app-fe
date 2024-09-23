'use client';

import { getCartData, getProducts } from "@/app/api/getData";
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

export default ProductsList;