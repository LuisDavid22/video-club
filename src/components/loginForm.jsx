import React from 'react';
import Joi from 'joi';
import Form from './common/form';
import WithRouterHOC from './common/withRouterHOC';
import { login, getCurrentUser } from '../services/authService';
import { Navigate } from 'react-router-dom';

class LoginForm extends Form {
  state = { data: { username: '', password: '' }, errors: {} };

  schema = Joi.object({
    username: Joi.string().required().label('Username'),
    password: Joi.string().required().label('Password'),
  });

  doSubmit = async () => {
    try {
      const { username, password } = this.state.data;
      await login(username, password);
      const { state } = this.props.location;
      window.location = state ? state.from.pathname : '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    if (getCurrentUser()) return <Navigate to='/' />;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}

          <button disabled={this.validate()} className='btn btn-primary mt-2'>
            Login
          </button>
        </form>
      </div>
    );
  }
}

export default WithRouterHOC(LoginForm);
