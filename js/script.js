//getting the path name -----this js file is linked to every page of the html
const path = window.location.pathname;

async function displaySwiper() {
  const { results } = await fetchAPIData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);
  });
  initSwipper();
}
async function fetchAPIData2(endpoint) {
  const API_URL = `https://api.themoviedb.org/3/movie/`;
  const API_KEY = '706e073505d23947fe9fde8b5f6a5d11';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}

function initSwipper() {
  const swiper = new Swiper('.swiper', {
    // Default parameters
    speed: 5000,
    slidesPerView: 4,
    spaceBetween: 40,
    autoplay: {
      delay: 1000,
      disableOnInteraction: false,
    },
    freeMode: true,
    loop: true,

    // Responsive breakpoints
    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 4,
        spaceBetween: 40,
      },
    },
  });
}

async function getPopularMovies(endpoint) {
  const API_URL = `https://api.themoviedb.org/3/movie/${endpoint}`;
  const API_KEY = '706e073505d23947fe9fde8b5f6a5d11';
  showSpinner();
  const request = await fetch(
    `${API_URL}?api_key=${API_KEY}&include_adult=true`
  );
  const { results } = await request.json();
  results.forEach((result) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = ` 
    <a href="movie-details.html?id=${result.id}">
   ${
     result.poster_path
       ? `
       <img
         src="https://images.tmdb.org/t/p/w500${result.poster_path}"
         class="card-img-top"
         alt="${result.title}"
       />`
       : `
       <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${result.title}"
       />
     `
   }
  </a>
  <div class="card-body">
    <h5 class="card-title">Title - ${result.title}</h5>
    <p class="card-text">
      <small class="text-muted">Release: ${result.release_date}</small>
    </p>
  </div>`;
    document.querySelector('#popular-movies').appendChild(div);
    hideSpinner();
  });
}

async function fetchAPIData(endpoint) {
  const API_KEY = '706e073505d23947fe9fde8b5f6a5d11';
  const API_URL = 'https://api.themoviedb.org/3/';

  showSpinner();

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();

  hideSpinner();

  return data;
}
async function getMovieDetails() {
  let movieId = window.location.search.split('=')[1];
  console.log(movieId);
  const url = `https://api.themoviedb.org/3/movie/now_playing?api_key=706e073505d23947fe9fde8b5f6a5d11&language=en-US`;
  console.log(url);
  const movie = await fetchAPIData(`movie/${movieId}`);
  //image displaying in the background
  getBackdropPath('movie', movie.backdrop_path);
  const div = document.createElement('div');
  div.innerHTML = `<div class="details-top">
  <div>
    <img
      src="https://images.tmdb.org/t/p/w500${movie.poster_path}"
      class="card-img-top"
      alt="movie.title"
    />
  </div>
  <div>
    <h2>${movie.title}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${movie.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date:${movie.release_date}</p>
    <p>
     ${movie.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
      ${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
    </ul>
    <a href=${
      movie.homepage
    } target="_blank" class="btn">Visit Movie Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Movie Info</h2>
  <ul>
    <li><span class="text-secondary">Budget: </span> ${addCommas(
      movie.budget
    )}</li>
    <li><span class="text-secondary">Revenue: </span>${addCommas(
      movie.revenue
    )} </li>
    <li><span class="text-secondary">Runtime: </span>${
      movie.runtime
    } minutes </li>
    <li><span class="text-secondary">Status: </span>${movie.status}</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${movie.production_companies
    .map((company) => `<span>${company.name}</span>`)
    .join(',  ')}</div>
</div>`;
  document.querySelector('#movie-details').appendChild(div);
}

function addCommas(num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

//getting the popular tv series
async function getTvSeries(endpoint) {
  const API_URL = `https://api.themoviedb.org/3/tv/${endpoint}`;
  const API_KEY = '706e073505d23947fe9fde8b5f6a5d11';
  showSpinner();
  const request = await fetch(`${API_URL}?api_key=${API_KEY}`);
  const { results } = await request.json();
  results.forEach((show) => {
    const div = document.createElement('div');
    div.className = 'card';
    div.innerHTML = ` 
    <a href="tv-details.html?id=${show.id}">
   ${
     show.poster_path
       ? `
       <img
         src="https://images.tmdb.org/t/p/w500${show.poster_path}"
         class="card-img-top"
         alt="${show.name}"
       />`
       : `
       <img
         src="images/no-image.jpg"
         class="card-img-top"
         alt="${show.name}"
       />
     `
   }
  </a>
  <div class="card-body">
    <h5 class="card-title">${show.name}</h5>
    <p class="card-text">
      <small class="text-muted">Released - ${show.first_air_date}</small>
    </p>
  </div>`;
    document.querySelector('#popular-shows').appendChild(div);
    hideSpinner();
  });
}

async function getTvDetails() {
  const tvId = window.location.search.split('=')[1];
  const request = await fetch(
    `https://api.themoviedb.org/3/tv/${tvId}?api_key=706e073505d23947fe9fde8b5f6a5d11&language=en-US`
  );
  const show = await request.json();
  getBackdropPath('tv', show.backdrop_path);
  console.log(show);
  const div = document.createElement('div');
  div.innerHTML = `
  <div class="details-top">
  <div>
  ${
    show.poster_path
      ? `<img src="https://image.tmdb.org/t/p/w500${show.poster_path}" class="card-img-top" alt="Show Name" />`
      : `<img src="../images/no-image.jpg" class="card-img-top" alt="Show Name" />`
  }
    
  </div>
  <div>
    <h2>${show.name}</h2>
    <p>
      <i class="fas fa-star text-primary"></i>
      ${show.vote_average.toFixed(1)} / 10
    </p>
    <p class="text-muted">Release Date: ${show.first_air_date}</p>
    <p>
      ${show.overview}
    </p>
    <h5>Genres</h5>
    <ul class="list-group">
    ${show.genres
      .map((genre) => {
        return `<li>${genre.name}</li>`;
      })
      .join('')}
    </ul>
    <a href="${
      show.homepage
    }" target="_blank" class="btn">Visit Show Homepage</a>
  </div>
</div>
<div class="details-bottom">
  <h2>Show Info</h2>
  <ul>
    <li><span class="text-secondary">Number Of Episodes:</span> ${
      show.number_of_episodes
    }</li>
    <li>
      <span class="text-secondary">Last Episode To Air:</span> ${
        show.last_air_date
      }
    </li>
    <li><span class="text-secondary">Season:</span> ${
      show.number_of_seasons
    }</li>
  </ul>
  <h4>Production Companies</h4>
  <div class="list-group">${show.production_companies
    .map((company) => {
      return ` <span>${company.name}</span>`;
    })
    .join('')}</div>
</div>`;
  document.querySelector('#show-details').appendChild(div);
}

//active links
function setActiveLiks() {
  const links = document.querySelectorAll('ul a');
  links.forEach((links) => {
    if (links.getAttribute('href') == path) {
      links.classList.add('active');
    }
  });
}
function showSpinner() {
  document.querySelector('.spinner').classList.add('show');
}
function hideSpinner() {
  document.querySelector('.spinner').classList.remove('show');
}

function initApp() {
  //creating routes to handle different end point of app
  switch (path) {
    case '/':
    case '/index.html':
      getPopularMovies('popular');
      displaySwiper();
      console.log('swipper');
      break;
    case '/shows.html':
      console.log('Shows');
      getTvSeries('popular');
      break;
    case '/movie-details.html':
      getMovieDetails();
      break;
    case '/search.html':
      console.log('search');
      break;
    case '/tv-details.html':
      console.log('tv');
      getTvDetails();
      break;
  }
  setActiveLiks();
}

function getBackdropPath(type, path) {
  const overLayDiv = document.createElement('div');
  overLayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${path})`;
  overLayDiv.style.backgroundSize = 'cover';
  overLayDiv.style.backgroundPosition = 'center';
  overLayDiv.style.backgroundRepeat = 'no-repeat';
  overLayDiv.style.position = 'absolute';
  overLayDiv.style.top = 0;
  overLayDiv.style.left = 0;
  overLayDiv.style.zIndex = -1;
  overLayDiv.style.opacity = '0.1';
  overLayDiv.style.width = '100vw';
  overLayDiv.style.height = '100vh';
  if (type === 'movie') {
    document.querySelector('#movie-details').appendChild(overLayDiv);
  } else {
    document.querySelector('#show-details').appendChild(overLayDiv);
  }
}
initApp();
