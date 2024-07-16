import './style.css';

// Ejercicio 1: Obtener un chiste aleatorio
document
  .getElementById('get-joke-btn')
  .addEventListener('click', async function () {
    const url = 'https://icanhazdadjoke.com/';
    try {
      const response = await fetch(url, {
        headers: { Accept: 'application/json' },
      });
      const data = await response.json();
      document.getElementById('joke').textContent = data.joke;
    } catch (error) {
      console.error('Error al obtener el chiste:', error);
      document.getElementById('joke').textContent =
        'No se pudo obtener un chiste en este momento.';
    }
  });

// Ejercicio 2: Listar publicaciones de un blog
document.addEventListener('DOMContentLoaded', async function () {
  const url = 'https://jsonplaceholder.typicode.com/posts';
  try {
    const response = await fetch(url);
    const posts = await response.json();
    const postList = document.getElementById('post-list');
    posts.forEach((post) => {
      const postItem = document.createElement('li');
      postItem.innerHTML = `<h2>${post.title}</h2><p>${post.body.substring(
        0,
        100,
      )}...</p><a href="post.html?id=${post.id}">Leer más</a>`;
      postList.appendChild(postItem);
    });
  } catch (error) {
    console.error('Error al obtener las publicaciones:', error);
    document.getElementById('post-list').innerHTML =
      '<li>No se pudieron obtener las publicaciones en este momento.</li>';
  }
});

// Ejercicio 3: Buscador de películas
document
  .getElementById('search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('search-input').value;
    searchMovies(query);
  });

async function searchMovies(query) {
  const url = `http://www.omdbapi.com/?apikey=${
    import.meta.env.VITE_API_KEY2
  }&s=${query}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === 'True') {
      displayMovies(data.Search);
    } else {
      console.error('No se encontraron películas:', data.Error);
      displayError('results', data.Error);
    }
  } catch (error) {
    console.error('Error al realizar la petición a OMDB API:', error);
    displayError('results', 'Error al realizar la petición a OMDB API');
  }
}

function displayMovies(movies) {
  const results = document.getElementById('results');
  results.innerHTML = '';

  movies.forEach((movie) => {
    const movieElement = document.createElement('div');
    movieElement.classList.add('movie');

    const imgElement = document.createElement('img');
    imgElement.src = movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg';
    imgElement.alt = movie.Title;

    const titleElement = document.createElement('h2');
    titleElement.textContent = movie.Title;

    const yearElement = document.createElement('p');
    yearElement.textContent = `Año: ${movie.Year}`;

    movieElement.appendChild(imgElement);
    movieElement.appendChild(titleElement);
    movieElement.appendChild(yearElement);

    results.appendChild(movieElement);
  });
}

// Ejercicio 4: Buscador de imágenes aleatorias
document
  .getElementById('image-search-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();
    const query = document.getElementById('image-search-input').value;
    searchImages(query);
  });

async function searchImages(query) {
  const url = `https://api.unsplash.com/search/photos?query=${query}&client_id=${
    import.meta.env.VITE_API_KEY1
  }`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    displayImages(data.results);
  } catch (error) {
    console.error('Error al realizar la petición a Unsplash API:', error);
    displayError(
      'image-gallery',
      'Error al realizar la petición a Unsplash API',
    );
  }
}

function displayImages(images) {
  const gallery = document.getElementById('image-gallery');
  gallery.innerHTML = ''; // Limpiar galería antes de mostrar nuevas imágenes

  images.forEach((image) => {
    const imgElement = document.createElement('div');
    imgElement.classList.add('image');

    const imageElement = document.createElement('img');
    imageElement.src = image.urls.small;
    imageElement.alt = image.alt_description || 'Imagen de Unsplash';

    const titleElement = document.createElement('h2');
    titleElement.textContent = image.alt_description || 'Sin título';

    imgElement.appendChild(imageElement);
    imgElement.appendChild(titleElement);

    gallery.appendChild(imgElement);
  });
}

function displayError(elementId, message) {
  const element = document.getElementById(elementId);
  element.innerHTML = `<p>${message}</p>`;
}
