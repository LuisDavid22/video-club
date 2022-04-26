import React, { Component } from 'react';
import { getCurrentUser } from '../services/authService';
import Like from './common/like';
import Table from './common/table';
import { Link } from 'react-router-dom';

class MoviesTable extends Component {
  constructor() {
    super();
    const user = getCurrentUser();
    if (user?.isAdmin) {
      console.log(this.columns);
      this.columns.push(this.deleteColumn);
    }
  }
  columns = [
    {
      path: 'title',
      label: 'Title',
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: 'genre.name', label: 'Genre' },
    { path: 'numberInStock', label: 'Stock' },
    { path: 'dailyRentalRate', label: 'Rate' },
    {
      key: 'like',
      content: (movie) => (
        <Like
          isLiked={movie.liked}
          onClick={() => {
            this.props.onLike(movie);
          }}
        />
      ),
    },
  ];
  deleteColumn = {
    key: 'delete',
    content: (movie) => (
      <button
        onClick={() => {
          this.props.onDelete(movie._id);
        }}
        className='btn btn-danger'
      >
        Delete
      </button>
    ),
  };

  render() {
    const { movies, onSort, sortColumn } = this.props;
    return (
      <Table
        data={movies}
        columns={this.columns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
    );
  }
}

export default MoviesTable;
