import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Input } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";

import { Container, Item, ItemContainer, Paper, Wrapper } from "./UI/index";
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

  console.log(data);

  return (
    <Container>
      <Wrapper>
        {isLoading ? (
          <div>Wait for it...</div>
        ) : (
          <Paper>
            {" "}
            <Autocomplete
              options={data.results}
              value={debouncedSearchValue}
              onInputChange={(event, newValue) => {
                setSearchValue(newValue);
                console.log(event);
              }}
              renderInput={(params) => (
                <Input {...params} placeholder="Search characters..." />
              )}
            />
            <ItemContainer>
              {data ? (
                data.results.map((item: any, id: number) => {
                  return (
                    <Item key={id}>
                      <CharacterItem item={item} />
                    </Item>
                  );
                })
              ) : (
                <div>I am sorry</div>
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
