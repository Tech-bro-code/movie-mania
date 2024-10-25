function loadWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    const watchlistContainer = document.getElementById("watchlist");
  
    if (watchlist.length === 0) {
      watchlistContainer.innerHTML =
        '<p class="text-center">Your watchlist is empty!</p>';
      return;
    }
  
    watchlistContainer.innerHTML = watchlist
      .map((movie) => {
        return `
              <div class="fav-list"> 
              <div class="list-card">
                  <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" class="img-list">
                  <h4 class="title-list">${movie.title}</h4>
                  <p class="view-list">${movie.overview}</p>
                  
                      <button class="rmv-list" onclick="removeFromWatchlist(${movie.id})">Remove</button>
                  </div>
              </div>
          `;
      })
      .join("");
  };
  
  
  function removeFromWatchlist(id) {
    let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];
    watchlist = watchlist.filter((movie) => movie.id !== id);
    localStorage.setItem("watchlist", JSON.stringify(watchlist));
    loadWatchlist();
  };
  
  document.addEventListener("DOMContentLoaded", loadWatchlist);
