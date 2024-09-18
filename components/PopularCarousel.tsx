'use client'
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { usePathname } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';

const PopularCarousel = ({ products, shoes }: any) => {
  const pathname = usePathname();
  const currentItemId = pathname.split('/').pop();

  const allItems = [
    ...products.data.map((item: any) => ({ ...item, type: 'product' })),
    ...shoes.data.map((item: any) => ({ ...item, type: 'shoe' })),
  ];

  const filteredItems = allItems.filter(
    (item: { id: string; type: string; attributes: { category: string } }) => {
      const category = item.attributes.category;
      const id = item.id;
      return category === "popular" && id !== currentItemId;
    }
  );

  return (
    <div className='py-20'>
      <h2 className='mb-10'>Most popular accesories</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={50}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          960: { slidesPerView: 3 },
          1330: { slidesPerView: 4 },
        }}
      >
        {filteredItems.map((item: any) => {
          const image = item.attributes.image?.data?.[0]?.attributes?.url;
          const imageShoes = item.attributes.image.data.attributes?.url
          const imageURL = image ? `http://127.0.0.1:1337${image}` : `http://127.0.0.1:1337${imageShoes}`; // Provide a fallback image URL
          return (
            <SwiperSlide key={`${item.type}-${item.id}`}>
              <div className="product-carousel-item text-center">
                <Link className='table' href={`/${item.type}/${item.id}`}>
                  <span className='product-category'>{item.attributes.category}</span>
                  <Image className='popular-item' src={imageURL} fill alt={item.attributes.title} />
                </Link>
                <h4 className='font-bold my-5'>{item.attributes.title}</h4>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default PopularCarousel;
