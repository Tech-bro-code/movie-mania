const API_KEY = "fbe17a3e20b5937ebb1fd56062650fc1";
const def = "https://api.themoviedb.org/3";

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
        const response = await fetch(`${shows.fetchComedyMovies}`);
        const result = await response.json();
        return result.results;
        // console.log(result);

    } catch (error) {
        console.log(error);
    }
};
//rendering all movies on the webpage from the endpoints.

const showMovies = (results) => {
    const moviesList = document.querySelector('.movie-box');
    
    results.forEach(movie =>{


       const movieCard = document.createElement('div');
       movieCard.classList.add('movie-card');

       const movieImage = document.createElement('img');
       movieImage.classList.add('movie-image');
       movieImage.src = `${POSTER_URL + movie.poster_path}`;
       movieImage.alt = movie.title;

       const movieTitle = document.createElement('h3');
       movieTitle.classList.add('movie-title');
       movieTitle.textContent = movie.title;

       const movieOverview = document.createElement('p');
       movieOverview.classList.add('movie-overview');
       movieOverview.textContent = movie.genre_ids;

       const movieRating = document.createElement('p');
       movieRating.classList.add('movie-rating');
       movieRating.textContent = `Ratings: ${movie.vote_average}`;

       movieCard.appendChild(movieImage);
       movieCard.appendChild(movieTitle);
       movieCard.appendChild(movieOverview);
       movieCard.appendChild(movieRating);

       moviesList.append(movieCard);
    });
};

//fetch and display on load of page

document.addEventListener('DOMContentLoaded', async () => {
    const listOfMovies = await fetchMovies();
    showMovies(listOfMovies);
    
})