import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51834666-cf153cf5c7da2b7bccbcade97';

export async function getImagesByQuery(query) {
  const response = await axios.get(BASE_URL, {
    params: {
      key: API_KEY,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });
  return response.data;
}
пше;
