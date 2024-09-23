'use client'
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddToCart from "@/components/AddToCart";
import { mainUrl } from "@/app/api/getData";

const TabsComponent = ({ products, shoes, cart, isUserAuthenticated, userData }: {products: any; shoes: any; cart: any; isUserAuthenticated: boolean; userData: any}) => {
  const [productType, setProductType] = useState('all');
  const [filteredProducts, setFilteredProducts] = useState(products?.data || []);

  useEffect(() => {
    if (products?.data) {
      const filtered = products.data.filter((product: any) => {
        return productType === 'all' ? product : productType === product.attributes.type;
      });
      setFilteredProducts(filtered);
    }
  }, [productType, products]);

  return (
    <>
      <Tabs defaultValue="all" className="tabs-component mb-10">
        <TabsList className="mx-auto table tabs-wrapper">
          <TabsTrigger onClick={() => setProductType('all')} value='all'>All</TabsTrigger>
          <TabsTrigger onClick={() => setProductType('men')} value='men'>Men</TabsTrigger>
          <TabsTrigger onClick={() => setProductType('women')} value='women'>Women</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product: any) => {
          const imageURL = `${mainUrl}${product.attributes.image.data[0].attributes.url}`;

          return (
            <div className="prod-item" key={product.id}>
              <span className='product-category'>{product.attributes.category}</span>
              <Link href={`/product/${product.id}`}>
                <div className="relative w-full h-[250px] overflow-hidden mb-6 image-box">
                  <Image className="object-contain prod-teaser" src={imageURL} fill priority alt={product.attributes.title} />
                </div>
              </Link>
              <h3 className="font-bold">{product.attributes.title}</h3>
              <p className="description">{product.attributes.description}</p>
              <div className="flex justify-between items-center">
                <div>
                  {product.attributes.promotion ? (
                    <>
                      <p className="text-base">
                        <span className="old-price">${product.attributes.price}</span>
                        <span className="text-gray-400">-{product.attributes.promotion}%</span>
                      </p>
                      <p className="text-red-600 font-bold">
                        ${product.attributes.price - (product.attributes.price * (product.attributes.promotion / 100))}
                      </p>
                    </>
                  ) : (
                    <p className="text-red-600 font-bold">${product.attributes.price}</p>
                  )}
                </div>
                <AddToCart
                  product={product}
                  cart={cart}
                  isUserAuthenticated={isUserAuthenticated}
                  userData={userData}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default TabsComponent;

