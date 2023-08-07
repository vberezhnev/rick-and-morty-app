import axios from "axios";

export async function fetchCharacters(page = 1, search = "") {
  try {
    let response = await axios({
      method: "get",
      url: `https://rickandmortyapi.com/api/character?page=${page}&name=${search}`,
    });

    let data = response.data;
    if (data && data.results && data.results.length > 0) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    console.log(`Woops! Something went wrong: ${error}`);
  }
}
