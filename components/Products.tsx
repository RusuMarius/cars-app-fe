import React from 'react'
import ProductsList from './ProductsList'
import { getCartData, getProducts } from "@/app/api/getData";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Products = async () => {
  const {isAuthenticated, getUser} = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()
  const cart = await getCartData() // Ensure you await this
  const products = await getProducts();


  // Ensure that the correct path is used based on the actual response structure
  if (products?.data) {
    return (
      <div className='container'>
        <ProductsList
          products={products}
          cart={cart}
          isUserAuthenticated={isUserAuthenticated}
          userData={userData}
          shoes={undefined}
        />
      </div>
    );
  } else {
    return <div>Error: Products data not found</div>;
  }
}

export default Products;
