import axios from 'axios';

const apiKey = "d6a5c0d6"
const options = {
    method: 'GET',
    url: `http://www.omdbapi.com/?apikey=${apiKey}&t=Game of Thrones&Season=1`
  };

async function fetchGenres(): Promise<void> {
  try {
    const response = await axios.request(options);
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
}


export default fetchGenres;