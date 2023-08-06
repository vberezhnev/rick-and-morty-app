import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CharacterItem } from "./CharacterItem";
import { Input } from "@mui/material";
import Autocomplete from "@mui/material/Autocomplete";
import { Container, Item, ItemContainer, Paper, Wrapper } from "@/UI/index";
import { useFetchData } from "@/hooks/useFetchData";

export const Results = () => {
  const queryClient = new QueryClient();
  const [page, setPage] = useState(0);
  const [searchValue, setSearchValue] = useState("");

  const { isLoading, isError, data, isPreviousData } = useFetchData(
    page,
    searchValue,
    queryClient
  );

  return (
    <Container>
      <Wrapper>
        {isLoading || isError ? (
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
