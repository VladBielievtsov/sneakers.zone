import { useSearchParams } from "next/navigation";

export default function useSetSearchParams({key ,value}: {key: string, value: string}) {
  const searchParams = useSearchParams()
  const existingParams = Object.fromEntries(searchParams.entries());
    const mergedParams = {
      ...existingParams,
      [key]: value
    };
    return new URLSearchParams(mergedParams).toString();
}
