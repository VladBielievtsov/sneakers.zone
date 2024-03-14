import Link from "next/link";
import { Button } from "./ui/button";
import { FaRegTrashAlt } from "react-icons/fa";

export default function CartItem() {
  return (
    <div className="flex pt-4 items-start">
      <Link href={"/"} className="w-[80px] h-[80px] overflow-hidden rounded-xl">
        <img
          src="https://static.staff-clothes.com/uploads/media/image_product/0003/37/b3f8333e28404f78aa0db1369a27ba33.jpeg"
          alt="title"
          className="w-full h-full object-cover hover:scale-125 transition"
        />
      </Link>
      <div className="pl-4 flex-1">
        <Link href={"/"} className="uppercase font-bold hover:underline">
          Standout Backpack
        </Link>
        <div className="pt-1.5 flex space-x-3">
          <p className="text-sm text-zinc-500">
            Size: <b className="text-black">Large</b>
          </p>
          <p className="text-sm text-zinc-500">
            Color: <b className="text-black">White</b>
          </p>
        </div>
        <div className="flex justify-between">
          <div></div>
          <div>
            <b>$76.00</b>
          </div>
        </div>
        <div className="flex justify-end divide-x divide-zinc-500 items-center">
          <div>
            <Button variant={"ghost"} className="h-auto p-2.5">
              Move to Favourites
            </Button>
          </div>
          <div>
            <Button variant={"ghost"} className="h-auto p-2.5">
              <FaRegTrashAlt />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
