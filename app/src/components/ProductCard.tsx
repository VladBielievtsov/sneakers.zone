import React from "react";
import { AspectRatio } from "./ui/aspect-ratio";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  id: number;
  title: string;
  price: string;
}

export default function ProductCard({ id, title, price }: ProductCardProps) {
  return (
    <Link href={"/product/" + id} className="group">
      <div>
        <AspectRatio ratio={9 / 10} className="overflow-hidden rounded">
          <Image
            src="https://static.staff-clothes.com/media/cache/image_product_desktop_catalog/image_product/0003/37/b3f8333e28404f78aa0db1369a27ba33.jpeg"
            alt="Image"
            className="object-cover h-full w-full group-hover:scale-105 transition"
            width={768}
            height={853.33}
          />
        </AspectRatio>
      </div>
      <div className="pt-4 flex items-start justify-between">
        <div>
          <h3 className="text-base group-hover:underline">{title}</h3>
        </div>
        <div>
          <p className="font-bold text-lg">${price}</p>
        </div>
      </div>
    </Link>
  );
}
