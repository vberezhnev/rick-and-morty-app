import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Container, Item, ItemContainer, Paper, Wrapper } from "./UI/index";
import { Input, Autocomplete } from "@mui/material";

import { CharacterItem } from "./CharacterItem";
import { useFetchData } from "../hooks/useFetchData";
import { useDebounce } from "../hooks/useDebounce";

export const Results = () => {
  const queryClient = new QueryClient();
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");
  const debouncedSearchValue = useDebounce(searchValue, 500);

  const { isLoading, isError, data, isPreviousData } = useFetchData(
    page,
    debouncedSearchValue,
    queryClient
  );

  return (
    <Container>
      <Wrapper>
        {isLoading ? (
          <div>Wait for it...</div>
        ) : (
          <Paper>
            <Autocomplete
              options={data?.results ?? []}
              value={debouncedSearchValue}
              onInputChange={(event, newValue) => {
                setSearchValue(newValue);
              }}
              renderInput={(params) => (
                <Input {...params} placeholder="Search characters..." />
              )}
            />
            <ItemContainer>
              {data?.results?.length ? (
                data.results.map((item: any, id: number) => {
                  return (
                    <Item key={id}>
                      <CharacterItem item={item} />
                    </Item>
                  );
                })
              ) : (
                <div>There's nothing</div>
              )}
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
