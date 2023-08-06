import axios from "axios";

export async function fetchCharacters(page = 1, search = "") {
  const { data } = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
  );
  return data;
}
