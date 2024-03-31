import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/features/products/productsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductsList() {
  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  let { products } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryString = new URLSearchParams(Object.fromEntries(urlSearchParams.entries())).toString();
    dispatch(getProducts(queryString));
  }, []);

  let content = null;

  if (productsStatus === "loading" || productsStatus === "idle") {
    content = [...Array(4)].map((_, id) => (
      <div key={id}>
        <Skeleton className="w-full h-[368.88px] rounded-xl" />
        <Skeleton className="w-3/4 h-[28px] rounded-xl mt-4" />
      </div>
    ));
  } else if (productsStatus === "succeeded") {
    products?.length
      ? (content = [...products].map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
          />
        )))
      : (content = <h3>There is no products</h3>);
  }

  return content;
}
