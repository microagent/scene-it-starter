function saveToWatchlist(imdbID) {
  let movie = movieData.find(currentMovie => {
    return currentMovie.imdbID === imdbID;
  });
  let watchlistJSON = localStorage.getItem("watchlist");
  let watchlist = JSON.parse(watchlistJSON);
  if (!watchlist) {
    watchlist = [];
  }

  watchlist.push(movie);
  watchlistJSON = JSON.stringify(watchlist);
  localStorage.setItem("watchlist", watchlistJSON);
}

function renderMovies(movieArray) {
  movieHTML = movieArray.map(currentMovie => {
    return `<div class="m-1 movie">
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

document.addEventListener("DOMContentLoaded", function() {
  document
    .getElementById("search-form")
    .addEventListener("submit", function(e) {
      e.preventDefault();

      let moviesContainer = document.querySelector(".movies-container");
      let searchString = document.getElementById("search-bar").value;
      let urlEncodedSearchString = encodeURIComponent(searchString);

      axios
        .get(
          `https://www.omdbapi.com/?apikey=3430a78&s=${urlEncodedSearchString}`
        )
        .then(function(response) {
          moviesContainer.innerHTML = renderMovies(response.data.Search);
        })
        .catch(function(error) {
          // handle error
          console.log(error);
        });
    });
});
