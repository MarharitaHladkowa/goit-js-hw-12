import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '51834666-cf153cf5c7da2b7bccbcade97';

export async function getImagesByQuery(query, page = 1, perPage = 15) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,
        per_page: perPage,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при запросе к Pixabay:', error);
    throw error; // пробрасываем, чтобы main.js мог обработать
  }
}
