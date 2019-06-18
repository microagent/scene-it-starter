let watchlistJSON = localStorage.getItem("watchlist");
let watchlist = JSON.parse(watchlistJSON);

function renderMovies(movieArray) {
  console.log("hello world!");
  movieHTML = movieArray.map(currentMovie => {
    return `<div class="mr-3 movie">
    <div class="card h-100" style="width: 18rem;">
      <img
        class="card-img-top"
        src=${currentMovie.Poster}
        alt="Card image cap"
      />
      <div class="card-body">
        <h5 class="card-title">${currentMovie.Title}</h5>
        <p class="card-text">
          ${currentMovie.Year}
        </p>
        <button class='btn btn-primary' onclick='saveToWatchlist("${
          currentMovie.imdbID
        }")'>Add</button>
      </div>
    </div>
  </div>`;
  });
  return movieHTML.join("");
}
let moviesContainer = document.querySelector(".movies-container");
moviesContainer.innerHTML = renderMovies(watchlist);
