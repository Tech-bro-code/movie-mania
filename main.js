const API_KEY = "fbe17a3e20b5937ebb1fd56062650fc1";
const def = "https://api.themoviedb.org/3";
const SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

const shows = {
  fetchTrending: `${def}/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `${def}/discover/tv?api_key=${API_KEY}&with_network=123`,
  fetchTopRated: `${def}/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `${def}/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `${def}/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `${def}/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `${def}/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `${def}/discover/movie?api_key=${API_KEY}&with_genres=99`,
};

 const POSTER_URL = "https://image.tmdb.org/t/p/original"; //base url to load images
  
  const LOGO = "https://netflix-clone-a0b70.web.app/static/media/logo.8c568417.png"

// EXAMPLE QUERY
// https://api.themoviedb.org/3/trending/all/week?api_key=YOUR_API_KEY&language=en-US

const fetchMovies = async () =>{
    try {
        const response = await fetch(`${shows.fetchTrending}`);
        const result = await response.json();
        return result.results;
        // console.log(result);

    } catch (error) {
        console.log(error);
    }
};
//rendering all movies on the webpage from the endpoints.
 const moviesList = document.querySelector('.movie-box');
const showMovies = (results) => {
   
    
    results.forEach(movie =>{


       const movieCard = document.createElement('div');
       movieCard.classList.add('movie-card');

       const movieImage = document.createElement('img');
       movieImage.classList.add('movie-image');
       movieImage.src = `${POSTER_URL + movie.poster_path}`;
       movieImage.alt = movie.title;

       const movieTitle = document.createElement('h3');
       movieTitle.classList.add('movie-title');
       movieTitle.textContent = movie.original_title;

       const MovieOverview = document.createElement('p');
    MovieOverview.classList.add('movie-overview');
    MovieOverview.textContent = movie.overview;

       const movieMore = document.createElement('a');
       movieMore.classList.add('seemore');
       movieMore.innerHTML = `<a class="seemore" href="seemore.html?id=${movie.id}">Read more</a>`;


//        const waList = document.querySelector('.list-btn')
//        waList.innerHTML = `<button class="bg-amber-500 text-white py-1 px-2 rounded" onclick="addToWatchlist(${
//         movie.id
//       }, '${movie.title}', '${movie.poster_path}', '${
// movie.overview
// }')">Add to Watchlist</button>`;

  const movieWatchList = document.createElement('button');
  movieWatchList.classList.add('btn-list');
  movieWatchList.textContent = 'Add to Watchlist'
    movieWatchList.addEventListener('click', () => {
      addToWatchlist(movie.id, movie.title, movie.poster_path, movie.overview);
    })


       movieCard.appendChild(movieImage);
       movieCard.appendChild(movieTitle);
       movieCard.appendChild(MovieOverview);
       movieCard.appendChild(movieMore);
       movieCard.appendChild(movieWatchList);
       moviesList.append(movieCard);
    });
};



function addToWatchlist(id, title, poster_path, overview) {
  const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
  
  if (!watchlist.some((movie) => movie.id === id)) {
    const movie = { id, title, poster_path, overview };
    watchlist.push(movie);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    alert(`${title} has been added to your watchlist.`);
  } else {
    alert("Movie is already in your watchlist.");
  }
};


async function searchMovies(query) {
  moviesList.innerHTML = "";
  try {
    const response = await fetch(`${SEARCH_URL}${encodeURIComponent(query)}`);
    const data = await response.json();
    console.log(data.results);
    const movies = data.results;
    showMovies(movies);
  } catch (error) {
    console.error("Error fetching search results", error);
  }
};


document
  .getElementById("search-bar")
  .addEventListener("submit", function (x) {
    x.preventDefault();
    const query = document.getElementById("search-input").value;
    if (query) {
      searchMovies(query);
    }
  });

//fetch and display on load of page

document.addEventListener('DOMContentLoaded', async () => {
    const listOfMovies = await fetchMovies();
    showMovies(listOfMovies);
    
});

  
  
/*document.addEventListener('DOMContentLoaded', async () => {
  const listOfMovies = await fetchMovies();
  showMovies(listOfMovies);
  
});*/
  
//   fetchTrendingMovies();
