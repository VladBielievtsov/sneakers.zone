import { getProducts } from "@/lib/features/products/productsActions";
import { useAppDispatch, useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";
import { useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { TableCell, TableRow } from "../ui/table";
import PanelProductCard from "./PanelProductCard";

export default function PanelProductsList() {
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
      <TableRow key={id}>
        <TableCell>
          <Skeleton className="w-[68px] h-[68px] rounded-xl" />
        </TableCell>
        <TableCell>
          <Skeleton className="w-full h-[20px] rounded-xl" />
        </TableCell>
      </TableRow>
    ));
  } else if (productsStatus === "succeeded") {
    products?.length
      ? (content = [...products].map((product) => (
          <PanelProductCard 
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            createdAt={product.createdAt}
          />
        )))
      : (content = <TableRow><TableCell><h3>There is no products</h3></TableCell></TableRow>);
  }

  return content;
}
