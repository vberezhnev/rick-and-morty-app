import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { fetchCharacters } from "@/helpers/fetchCharacters";

export const useFetchData = (
  page: number,
  searchValue: string,
  queryClient: any
) => {
  const { isLoading, isError, data, isPreviousData } = useQuery(
    ["character", page, searchValue],
    () => fetchCharacters(page, searchValue),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  useEffect(() => {
    if (!isPreviousData && data?.info?.next) {
      queryClient.prefetchQuery({
        queryKey: ["character", page + 1],
        queryFn: () => fetchCharacters(page + 1),
      });
    }
  }, [data, isPreviousData, page, queryClient]);

  useEffect(() => {
    queryClient.prefetchQuery(["character", 1, searchValue], () =>
      fetchCharacters(1, searchValue)
    );
  }, [searchValue]);

  return { isLoading, isError, data, isPreviousData };
};
