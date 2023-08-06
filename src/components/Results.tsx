import { QueryClient, useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { CharacterItem } from ".//CharacterItem";
import { Input, TextField } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { fetchCharacters } from "../helpers/fetchCharacters";
import { Container, Item, ItemContainer, Paper, Wrapper } from "./UI/index";

export const Results = () => {
  const queryClient = new QueryClient();
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const { status, data, error, isLoading, isPreviousData } = useQuery(
    ["character", page, searchValue],
    () => fetchCharacters(page, searchValue),
    {
      keepPreviousData: true,
      staleTime: 5000,
    }
  );

  // Prefetch the next page
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

  return (
    <Container>
      <Wrapper>
        {isLoading || error ? (
          <div>Wait for it...</div>
        ) : (
          <Paper>
            {" "}
            <Autocomplete
              freeSolo
              options={data.results}
              value={searchValue}
              onInputChange={(event, newValue) => {
                setSearchValue(newValue);
              }}
              renderInput={(params) => (
                <Input {...params} placeholder="Search characters..." />
              )}
            />
            <ItemContainer>
              {data.results.map((item, id) => {
                return (
                  <Item key={id}>
                    <CharacterItem item={item} />
                  </Item>
                );
              })}
            </ItemContainer>
            <div>Current Page: {page + 1}</div>
            <button
              onClick={() => setPage((old) => Math.max(old - 1, 0))}
              disabled={page === 0}
            >
              Previous Page
            </button>{" "}
            <button
              onClick={() => {
                setPage((old) => (data?.info?.next ? old + 1 : old));
              }}
              disabled={isPreviousData || !data?.info?.next}
            >
              Next Page
            </button>
          </Paper>
        )}
      </Wrapper>
    </Container>
  );
};
