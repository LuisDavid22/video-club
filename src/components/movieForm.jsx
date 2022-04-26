import React from 'react';
import WithRouterHOC from './common/withRouterHOC';
import Form from './common/form';
import { getMovie, saveMovie, updateMovie } from '../services/movieService';
import { getGenres } from '../services/genreService';
import Joi from 'joi';

class MovieForm extends Form {
  state = {
    data: {
      _id: '',
      title: '',
      genreId: '',
      numberInStock: 0,
      dailyRentalRate: 0,
    },
    genres: [],
    errors: {},
  };
  schema = Joi.object({
    _id: Joi.string().allow(''),
    title: Joi.string().required().min(5).label('Title'),
    genreId: Joi.string().required().label('Genre'),
    numberInStock: Joi.number()
      .min(0)
      .max(100)
      .required()
      .label('Number in stock'),
    dailyRentalRate: Joi.number().min(0).max(10).label('Daily rental rate'),
  });

  populateGenres = async () => {
    const genres = await getGenres();
    genres.push({ _id: '', name: 'Choose a genre' });
    this.setState({ genres });
  };
  populateMovie = async () => {
    try {
      const movieId = this.props.params.id;
      if (!movieId) return;
      const movie = await getMovie(movieId);
      this.setState({ data: this.mapToViewModel(movie) });
    } catch (error) {
      if (error.response && error.response.status === 404)
        return this.props.navigate('not-found');
    }
  };

  async componentDidMount() {
    await this.populateGenres();
    await this.populateMovie();
  }

  mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };
  doSubmit = async () => {
    const movie = { ...this.state.data };
    await saveMovie(movie);

    this.props.navigate('/movies');
  };

  render() {
    //console.log(this.validate());
    return (
      <div>
        <h1>MovieForm</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('title', 'Title')}
          {this.renderSelect('genreId', 'Genre', 'genres', '_id', 'name')}
          {this.renderInput('numberInStock', 'Number in stock', 'number')}
          {this.renderInput('dailyRentalRate', 'Rate', 'number')}

          <button className='btn btn-primary' disabled={this.validate()}>
            Save
          </button>
        </form>
      </div>
    );
  }
}

export default WithRouterHOC(MovieForm);

// const MovieForm = () => {
//   const params = useParams();
//   const navigate = useNavigate();

//   const handleNavigate = () => {
//     navigate('/movies');
//   };
//   return (
//     <div>
//       <h1>MovieForm {params.id}</h1>
//       <button className='btn btn-primary' onClick={handleNavigate}>
//         Save
//       </button>
//     </div>
//   );
// };
