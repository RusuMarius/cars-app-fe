'use client'
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import AddShoesToCart from "./AddShoesToCart";
import { mainUrl } from "@/app/api/getData";

const TabsShoesComponent = ({ shoes, cart, isUserAuthenticated, userData }: {shoes: any; cart: any; isUserAuthenticated: boolean; userData: any}) => {
  const [shoeType, setShoeType] = useState('all');
  const [filteredShoes, setFilteredShoes] = useState(shoes.data);


  useEffect(() => {
    const filteredShoe = shoes.data?.filter((shoe: any) => {
      return shoeType === 'all' ? shoe : shoeType === shoe.attributes.type;
    });
    setFilteredShoes(filteredShoe);
  }, [shoeType, shoes]);

  return (
    <>
      <Tabs defaultValue="all" className="tabs-component mb-10">
        <TabsList className="mx-auto table tabs-wrapper">
          <TabsTrigger onClick={() => setShoeType('all')} value='all'>All</TabsTrigger>
          <TabsTrigger onClick={() => setShoeType('men')} value='men'>Men</TabsTrigger>
          <TabsTrigger onClick={() => setShoeType('women')} value='women'>Women</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredShoes.map((shoe: any) => {
          const imageURL = `${mainUrl}${shoe.attributes.image.data.attributes.url}`;
          console.log(shoe.attributes.imageUrl);
          return (
            <div className="prod-item flex flex-col" key={shoe.id}>
              <span className='product-category'>{shoe.attributes.category}</span>
              <Link href={`/shoe/${shoe.id}`}>
                <div className="relative w-full h-[250px] overflow-hidden mb-6 image-box">
                  <Image className="object-contain prod-teaser" src={shoe.attributes.imageUrl} fill priority alt={shoe.attributes.title} />
                </div>
              </Link>
              <h3 className="font-bold">{shoe.attributes.title}</h3>
              <p className="description">{shoe.attributes.description}</p>
              <div className="flex justify-between items-center mt-auto">

              <div>
                  {shoe.attributes.promotion ? (
                    <>
                    <p className="text-sm"><span className="old-price">${shoe.attributes.price}</span> <span className="text-gray-400">-{shoe.attributes.promotion}%</span></p>
                    <p className="text-red-600 font-bold">${shoe.attributes.price - (shoe.attributes.price * (shoe.attributes.promotion / 100))}</p>
                    </>
                  ) : (<p className="text-red-600 font-bold">${shoe.attributes.price}</p>)}

                </div>
              <AddShoesToCart
                  shoe={shoe}
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

export default TabsShoesComponent;
