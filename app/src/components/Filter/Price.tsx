import { useEffect, useState } from "react";
import { SliderPrice } from "./SliderPrice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { useAppSelector } from "@/lib/hooks";
import { RootState } from "@/lib/store";

export default function Price() {
  const productsStatus = useAppSelector(
    (state: RootState) => state.products.status
  );
  let { max_price } = useAppSelector((state: RootState) => state.products);

  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(max_price);
  const [fixMaxValue, setFixMaxValue] = useState(max_price || undefined);

  const handleValueChange = (newValues: number[]) => {
    const [min, max] = newValues;
    setMinValue(min);
    setMaxValue(max);
  };

  useEffect(() => {
    if (productsStatus === "succeeded") {
      setMaxValue(max_price);
      setFixMaxValue(max_price || undefined);
    }
  }, [productsStatus]);

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1" className="border-0">
        <AccordionTrigger className="">Price</AccordionTrigger>
        <AccordionContent className="space-y-4 pt-2.5">
          {maxValue && (
            <>
              <SliderPrice
                value={[minValue, maxValue]}
                onValueChange={handleValueChange}
                min={0}
                max={fixMaxValue}
              />
              <div className="flex items-center justify-between">
                <b>{minValue}</b>
                <b>{maxValue}</b>
              </div>
            </>
          )}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
