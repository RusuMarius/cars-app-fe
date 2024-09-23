import Link from 'next/link';
import React from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { getCartData } from '@/app/api/getData';

const CartHeader = async ({ user }: { user: any }) => {
  const cartProducts = await getCartData();
  let userCartProducts = [];
  if (user && user.email) {
    userCartProducts = cartProducts.data.filter((product: any) => product.attributes.email === user.email);
  }


  const uniqueProductIds = new Set(userCartProducts.map((product: any) => product.attributes.product.data?.attributes.title || product.attributes.shoe.data?.attributes.title));
  const uniqueProductCount = uniqueProductIds.size;


  return (
    <div className='cart-icon mx-8 ml-auto'>
      <Link href="/cart">
        <FaShoppingBasket />
        <span>{uniqueProductCount}</span>
      </Link>
    </div>
  );
}

export default CartHeader;
