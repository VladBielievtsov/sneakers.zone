"use client";

import { useState } from "react";
import { AspectRatio } from "../ui/aspect-ratio";
import { Swiper, SwiperSlide } from "swiper/react";
import { Thumbs, Navigation } from "swiper/modules";

import "swiper/css";
import "./style.css";

export default function Carousel() {
  const [thumbsSwiper, setThumbsSwiper] = useState<null | boolean>(null);

  const imgs = [
    {
      id: 0,
      img: "https://static.staff-clothes.com/uploads/media/image_product/0003/37/b3f8333e28404f78aa0db1369a27ba33.jpeg",
    },
    {
      id: 1,
      img: "https://static.staff-clothes.com/uploads/media/image_product/0003/37/ec9884abfbd14fa5ab23275a7e912a0c.jpeg",
    },
    {
      id: 2,
      img: "https://static.staff-clothes.com/uploads/media/image_product/0003/37/51f2ebc280534fbbbb2fe188c00dbf95.jpeg",
    },
    {
      id: 3,
      img: "https://static.staff-clothes.com/uploads/media/image_product/0003/37/76ae9e783e624fb1bbad6ff45a7b3508.jpeg",
    },
  ];

  return (
    <div className="w-full">
      <div className="rounded-xl overflow-hidden">
        <Swiper
          spaceBetween={0}
          slidesPerView={1}
          modules={[Navigation, Thumbs]}
          thumbs={{
            // @ts-ignore
            swiper:
              // @ts-ignore
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
        >
          {imgs.map((img) => (
            <SwiperSlide key={img.id}>
              <AspectRatio ratio={1 / 0.7}>
                <img
                  src={img.img}
                  alt="alt"
                  className="block h-full w-full object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="mt-4">
        <Swiper
          modules={[Thumbs]}
          grabCursor
          spaceBetween={20}
          slidesPerView={4}
          watchSlidesProgress
          // @ts-ignore
          onSwiper={setThumbsSwiper}
          className="w-full overflow-hidden relative"
        >
          {imgs.map((img) => (
            <SwiperSlide
              key={img.id}
              className={
                "opacity-50 hover:opacity-100 hover:transition-opacity cursor-pointer max-w-[152px] max-h-[152px]"
              }
            >
              <AspectRatio ratio={1 / 1}>
                <img
                  src={img.img}
                  alt="alt"
                  className="block rounded-xl h-full object-cover"
                />
              </AspectRatio>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
