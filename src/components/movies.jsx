import React, { Component } from 'react';
import { getMovies } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import _ from 'lodash';

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    activePage: 1,
    selectedGenre: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  componentDidMount() {
    this.setState({ movies: getMovies(), genres: getGenres() });
  }

  handleDeleteMovie = (id) => {
    const movies = this.state.movies.filter((m) => m._id !== id);
    this.setState({ movies });
  };
  handleLike = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
    console.log('Movie liked!', movie);
  };
  handlePageChange = (pageNumber) => {
    this.setState({ activePage: pageNumber });
    console.log(pageNumber);
  };
  handleGenreSelect = (filter) => {
    this.setState({ selectedGenre: filter, activePage: 1 });
    console.log(filter);
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  getPagedData = () => {
    const {
      activePage,
      pageSize,
      sortColumn,
      movies: allMovies,
      selectedGenre,
    } = this.state;

    let filteredMovies = selectedGenre
      ? allMovies.filter((m) => m.genre.name === selectedGenre)
      : allMovies;

    const sorted = _.orderBy(
      filteredMovies,
      [sortColumn.path],
      [sortColumn.order]
    );
    const movies = paginate(sorted, activePage, pageSize);

    return { totalCount: filteredMovies.length, data: movies };
  };

  render() {
    const { selectedGenre } = this.state;

    const { totalCount, data: movies } = this.getPagedData();

    if (totalCount === 0) return <p>There are no movies in the database</p>;

    return (
      <div className='container'>
        <div className='row'>
          <div className='col-2'>
            <ListGroup
              items={this.state.genres.map((g) => g.name)}
              selectedItem={selectedGenre}
              defaultItem='All Genres'
              onItemSelect={this.handleGenreSelect}
            />
          </div>
          <div className='col'>
            <p>Showing {totalCount} movies in the database</p>
            <MoviesTable
              movies={movies}
              sortColumn={this.state.sortColumn}
              onLike={this.handleLike}
              onDelete={this.handleDeleteMovie}
              onSort={this.handleSort}
            />
            <Pagination
              itemsCount={totalCount}
              pageSize={this.state.pageSize}
              activePage={this.state.activePage}
              onPageChange={this.handlePageChange}
            />
          </div>
        </div>
      </div>
    );
  }
  //   formatCountText = () => {
  //     const { length: count } = this.state.movies;

  //     if (count === 0) return 'There are no movies in the database';

  //     return `Showing ${count} movies in the database`;
  //   };
}

export default Movie;
