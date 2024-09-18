import React from 'react'
import ProductsList from './ProductsList'
import { getCartData, getProducts } from "@/app/api/getData";
import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server';

const Products = async () => {
  const {isAuthenticated, getUser} = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()
  const cart = getCartData()
  const products = await getProducts()
  return (
    <div className='container'>
      <ProductsList products={products} cart={cart} isUserAuthenticated={isUserAuthenticated} userData={userData} shoes={undefined} />
    </div>
  )
}

export default Products