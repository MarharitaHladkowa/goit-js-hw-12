import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('#searchForm');
const loadMoreBtn = document.getElementById('loadMoreBtn');
const gallery = document.querySelector('.gallery');

let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', async e => {
  e.preventDefault();
  const query = form.elements['search-text'].value.trim();

  if (!query) {
    iziToast.error({
      title: 'Error',
      message: 'Please enter a search term!',
    });
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  showLoader();

  try {
    const data = await getImagesByQuery(query, currentPage, 15);
    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
      });
      return;
    }

    createGallery(data.hits);

    // Показуємо кнопку Load more, якщо є більше зображень
    if (data.hits.length > 0 && currentPage * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      hideLoadMoreButton();
    }
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again!',
    });
  } finally {
    hideLoader();
  }
});

// Функція для завантаження додаткових зображень
async function loadMoreImages() {
  if (!currentQuery) return;

  showLoader();
  try {
    const data = await getImagesByQuery(currentQuery, currentPage + 1, 15);

    if (data.hits.length === 0) {
      iziToast.warning({
        title: 'No more images',
        message: 'There are no more images to load.',
      });
      hideLoader();
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);
    currentPage++;
    hideLoader();
  } catch (err) {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Try again!',
    });
    hideLoader();
  }
}

// Обробник події для кнопки "Load more"
loadMoreBtn.addEventListener('click', loadMoreImages);
