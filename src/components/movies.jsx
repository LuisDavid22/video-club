import React, { Component } from 'react';
import { toast } from 'react-toastify';
import { getMovies, deleteMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Pagination from './common/pagination';
import { paginate } from '../utils/paginate';
import ListGroup from './common/listGroup';
import MoviesTable from './moviesTable';
import { Link } from 'react-router-dom';
import Search from './common/search';
import _ from 'lodash';

class Movie extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    activePage: 1,
    selectedGenre: '',
    searchQuery: '',
    sortColumn: { path: 'title', order: 'asc' },
  };

  async componentDidMount() {
    const genres = await getGenres();
    const movies = await getMovies();
    this.setState({ movies, genres });
    console.log(movies);
  }

  handleDeleteMovie = async (id) => {
    const originalMovies = this.state.movies;
    const movies = originalMovies.filter((m) => m._id !== id);
    this.setState({ movies });
    try {
      await deleteMovie(id);
    } catch (error) {
      if (error.response && error.response.status === 404)
        toast.error('This movie has already been deleted');

      this.setState({ movies: originalMovies });
    }
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
    this.setState({ selectedGenre: filter, activePage: 1, searchQuery: '' });
    console.log(filter);
  };
  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  handleSearch = (searchQuery) => {
    this.setState({ searchQuery, selectedGenre: '', activePage: 1 });
    //console.log(searchQuery);
  };

  getPagedData = () => {
    const {
      activePage,
      pageSize,
      sortColumn,
      movies: allMovies,
      selectedGenre,
      searchQuery,
    } = this.state;

    let filteredMovies = selectedGenre
      ? allMovies.filter((m) => m.genre.name === selectedGenre)
      : allMovies;

    if (searchQuery) {
      filteredMovies = filteredMovies.filter((m) =>
        String(m.title).toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }

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
    const { user } = this.props;

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
            {user && (
              <Link to='/movies/new' className='btn btn-primary mb-4'>
                New Movie
              </Link>
            )}
            <p>Showing {totalCount} movies in the database</p>
            <Search
              value={this.state.searchQuery}
              placeholder='Search...'
              onChange={this.handleSearch}
            />
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
