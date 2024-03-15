"use client";

import { useState, useCallback, forwardRef } from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const SliderPrice = forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ ...props }, ref) => {
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(100);

  const handleMinValueChange = useCallback(
    (value: number) => {
      setMinValue(Math.min(value, maxValue - 1));
    },
    [maxValue]
  );

  const handleMaxValueChange = useCallback(
    (value: number) => {
      setMaxValue(Math.max(value, minValue + 1));
    },
    [minValue]
  );

  return (
    <SliderPrimitive.Root
      ref={ref}
      className="relative flex w-full touch-none select-none items-center"
      value={[minValue, maxValue]}
      onValueChange={([min, max]) => {
        handleMinValueChange(min);
        handleMaxValueChange(max);
      }}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
      <SliderPrimitive.Thumb className="block h-5 w-5 rounded-full border-2 border-primary bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  );
});

SliderPrice.displayName = SliderPrimitive.Root.displayName;

export { SliderPrice };
