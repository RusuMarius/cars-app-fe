import { getProducts, getShoes } from '@/app/api/getData';
import React from 'react';
import PopularCarousel from './PopularCarousel';

const PopularProducts = async () => {
  let products = [];
  let shoes = [];

  try {
    const productData = await getProducts();
    const shoeData = await getShoes();

    products = productData?.data || []; // Fallback to empty array
    shoes = shoeData?.data || []; // Fallback to empty array
  } catch (error) {
    console.error("Failed to fetch products or shoes:", error);
  }

  return (
    <div>
      <PopularCarousel products={products} shoes={shoes} />
    </div>
  );
};

export default PopularProducts;
