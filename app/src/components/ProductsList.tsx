import ProductCard from "@/components/ProductCard";
import { getProducts } from "@/lib/features/products/productsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ProductsList() {
  const searchParams = useSearchParams();
  const categories = searchParams.getAll("category");

  const dispatch = useAppDispatch();

  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );

  let { products } = useAppSelector((state: RootState) => state.products);

  useEffect(() => {
    dispatch(getProducts(categories));
  }, []);

  let content = null;

  if (productsStatus === "loading") {
    content = "loading...";
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
