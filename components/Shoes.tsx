import React from 'react'
import ShoesList from "./ShoesList"
import { getCartData, getShoes } from "@/app/api/getData"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

const Shoes = async () => {
  const {isAuthenticated, getUser} = getKindeServerSession()
  const isUserAuthenticated = await isAuthenticated()
  const userData = await getUser()
  const cart = await getCartData()
  const shoes = await getShoes()



  if (shoes?.data) {
    return (
      <div className='container'>
        <ShoesList shoes={shoes} cart={cart} isUserAuthenticated={isUserAuthenticated} userData={userData} />
      </div>
    );
  } else {
    return <div>Error: Products data not found</div>;
  }
}

export default Shoes