import React, { Component } from 'react';
import Like from './common/like';
import Table from './common/table';

class MoviesTable extends Component {
  columns = [
    { path: 'title', label: 'Title' },
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
    {
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
    },
  ];

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
