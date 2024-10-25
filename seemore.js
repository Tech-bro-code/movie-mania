const param = new URLSearchParams(window.location.search);
const id = param.get('id');
console.log(id);

const API_KEY = "fbe17a3e20b5937ebb1fd56062650fc1";
const API_URL = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`;

async function fetchMovieDetails() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const movie = await response.json();
        console.log(movie);
        displayMovieDetails(movie);
    } catch (error) {
        console.error('Error fetching movie details:', error);
        document.getElementById('movie-details').innerHTML = `<p>Failed to load movie details.</p>`;
    }
}


function displayMovieDetails(movie) {
    const movieDetailsContainer = document.getElementById('movie-details');
    movieDetailsContainer.innerHTML = `
        <div class="master">
        <img class="img-more" src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
         <div class="hero">
        <h2 class="title">${movie.title}</h2>  
        <p class="para1">${movie.overview}</p> <hr>
        <p class="para2">Release Date: ${movie.release_date}</p>
        <p class="para3">Rating: ${movie.vote_average}/10</p>
        <a class="back-home" href="index.html">Back to list</a>
    </div> </div>`;
}


if (id) {
    fetchMovieDetails();
} else {
    console.log('No movie ID found in URL');
    document.getElementById('movie-details').innerHTML = `<p>No movie selected.</p>`;
}