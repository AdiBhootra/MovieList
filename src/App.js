import React from 'react';
import { useState, useEffect } from 'react';
import MovieList from './components/MovieList'
import Heading from './components/Heading'
import SearchBox from './components/SearchBox'
import './App.css';
import Favourite from './components/Favourites'
import DeleteFavourites from './components/deleteFavourites';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [movieList, setMovieList] = useState([])
  const [search, setSearch] = useState('')
  const [favouritesMovie, setFavouritesMovie] = useState([])

  const movieApi = async (search) => {
    const result = await fetch(`http://www.omdbapi.com/?s=${search}&apikey=89fe4693`);
    const response = await result.json()

    if (response.Search) {
      setMovieList(response.Search)
    }
  }

  useEffect(() => {
    movieApi(search)
  }, [search])

  // useEffect(() => {
  //   const movieFavourites = JSON.parse(
  //     localStorage.getItem('Movie-List-App')
  //   );

  //   setFavouritesMovie(movieFavourites);
  // }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem('Movie-List-App', JSON.stringify(items));
  // };

  const addFavouriteMovie = (movie) => {
    const newFavouriteList = [...favouritesMovie, movie];
    setFavouritesMovie(newFavouriteList);
    // saveToLocalStorage(newFavouriteList);
  };

  const removeFavouriteMovie = (movie) => {
    const newFavouriteList = favouritesMovie.filter(
      (favourite) => favourite.imdbID !== movie.imdbID
    );
    setFavouritesMovie(newFavouriteList);
    // saveToLocalStorage(newFavouriteList);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='Movies' />
        <SearchBox search={search} setSearch={setSearch} />
      </div>
      <div className='row'>
        <MovieList
          movies={movieList}
          favouriteComponent={Favourite}
          handleFavouritesClick={addFavouriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Heading heading='Favourites' />
      </div>
      <div className='row'>
        <MovieList movies={favouritesMovie}
          handleFavouritesClick={removeFavouriteMovie}
          favouriteComponent={DeleteFavourites} />
      </div>
    </div>
  );

}

export default App;
