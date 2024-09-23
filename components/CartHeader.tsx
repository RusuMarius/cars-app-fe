'use client';

import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { FaShoppingBasket } from 'react-icons/fa';
import { getCartData } from '@/app/api/getData';

const CartHeader = ({ user }: { user: any }) => {
  const [uniqueProductCount, setUniqueProductCount] = useState(0);

  const fetchCartProducts = async () => {
    const cartProducts = await getCartData();
    if (user && user.email) {
      const userCartProducts = cartProducts.data.filter(
        (product: any) => product.attributes.email === user.email
      );

      const uniqueProductIds = new Set(
        userCartProducts.map(
          (product: any) =>
            product.attributes.product.data?.attributes.title ||
            product.attributes.shoe.data?.attributes.title
        )
      );
      setUniqueProductCount(uniqueProductIds.size);
    }
  };

  useEffect(() => {
    // Fetch cart data initially
    fetchCartProducts();

    // Add event listener for cart updates
    const handleCartUpdate = () => {
      fetchCartProducts(); // Re-fetch cart data when cart is updated
    };

    // Listen for 'cartUpdated' events to refresh the cart
    window.addEventListener('cartUpdated', handleCartUpdate);

    // Clean up event listener when component unmounts
    return () => {
      window.removeEventListener('cartUpdated', handleCartUpdate);
    };
  }, [user]);

  return (
    <div className='cart-icon mx-8 ml-auto'>
      <Link href="/cart">
        <FaShoppingBasket />
        <span>{uniqueProductCount}</span>
      </Link>
    </div>
  );
};

export default CartHeader;
