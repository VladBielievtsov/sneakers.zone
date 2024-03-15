import { useState } from "react";
import { SliderPrice } from "./SliderPrice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";

export default function Price() {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const handleValueChange = (newValues: number[]) => {
    const [min, max] = newValues;
    setMinValue(min);
    setMaxValue(max);
  };

  return (
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionTrigger className="px-6">Price</AccordionTrigger>
        <AccordionContent className="px-6 space-y-4 pt-2.5">
          <SliderPrice
            value={[minValue, maxValue]}
            onValueChange={handleValueChange}
            min={0}
            max={100}
          />
          <div className="flex items-center justify-between">
            <b>{minValue}</b>
            <b>{maxValue}</b>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
