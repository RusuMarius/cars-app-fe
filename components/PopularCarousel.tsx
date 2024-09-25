'use client';
import Image from 'next/image';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { usePathname } from 'next/navigation';
import { Navigation, Pagination } from 'swiper/modules';
import { mainUrl } from '@/app/api/getData';

const PopularCarousel = ({ products = [], shoes = [] }: any) => {
  const pathname = usePathname();
  const currentItemId = pathname.split('/').pop();

  // Ensure products and shoes are valid arrays
  const allItems = [
    ...products.map((item: any) => ({ ...item, type: 'product' })),
    ...shoes.map((item: any) => ({ ...item, type: 'shoe' })),
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
      <h2 className='mb-10'>Most popular accessories</h2>
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
        {filteredItems.length > 0 ? (
          filteredItems.map((item: any) => {
            // Safely handle missing images
            const image = item.attributes.imageUrl;
            const imageShoes = item.attributes?.imageUrl;
            const imageURL = image ? `${image}` : `${imageShoes}`; // Fallback URL

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
          })
        ) : (
          <div><p>No popular items available.</p></div>
        )}
      </Swiper>
    </div>
  );
};

export default PopularCarousel;