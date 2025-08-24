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
  hideLoadMoreButton();
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

    if (currentPage * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End',
        message: "You've reached the end of the results.",
      });
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

  hideLoadMoreButton(); // блокуємо повторні кліки
  showLoader();

  try {
    currentPage++; // ✅ інкремент перед запитом
    const data = await getImagesByQuery(currentQuery, currentPage, 15);

    if (data.hits.length === 0) {
      iziToast.info({
        title: 'End',
        message: "You've reached the end of the results.",
      });
      hideLoader();
      hideLoadMoreButton();
      return;
    }

    createGallery(data.hits);

    // плавний скрол після додавання нових картинок
    const { height: cardHeight } =
      gallery.firstElementChild.getBoundingClientRect();
    window.scrollBy({
      top: cardHeight * 2,
      behavior: 'smooth',
    });

    if (currentPage * 15 < data.totalHits) {
      showLoadMoreButton();
    } else {
      iziToast.info({
        title: 'End',
        message: "You've reached the end of the results.",
      });
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
}

loadMoreBtn.addEventListener('click', loadMoreImages);
