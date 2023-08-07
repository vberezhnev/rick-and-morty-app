import axios from "axios";

export async function fetchCharacters(page = 1, search = "") {
  const { data, status } = await axios.get(
    `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`
  );

  console.log(status);

  return data;
}
