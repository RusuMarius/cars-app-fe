'use client';

import TabsComponent from "./FilteredShoeList";

interface AllShoes {
  shoes: any;
  cart: any;
  isUserAuthenticated: boolean;
  userData: any
}

const ShoesList = ({ shoes, cart, isUserAuthenticated, userData }: Readonly<AllShoes>) => {
  if (!shoes || !shoes.data) {
    return <div>Loading shoes...</div>; // Fallback in case shoes data is undefined
  }

  return (
    <section className="py-16 min-h-[90vh]">
      <h1 className="mb-10 font-bold">Our shoes</h1>
      <TabsComponent
        shoes={shoes}
        cart={cart}
        isUserAuthenticated={isUserAuthenticated}
        userData={userData}
      />
    </section>
  );
};

export default ShoesList;