import Joi from 'joi';
import React from 'react';
import { register } from '../services/userService';
import WithRouterHOC from './common/withRouterHOC';
import Form from './common/form';
import { loginWithJwt } from '../services/authService';

class RegisterForm extends Form {
  state = {
    data: { username: '', password: '', name: '' },
    errors: {},
  };
  schema = Joi.object({
    username: Joi.string()
      .email({ tlds: { allow: false } })
      .required()
      .label('Username'),
    password: Joi.string().min(8).required().label('Password'),
    name: Joi.string().required().label('Name'),
  });

  doSubmit = async () => {
    try {
      const jwt = await register(this.state.data);
      loginWithJwt(jwt);
      window.location = '/';
    } catch (error) {
      if (error.response && error.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = error.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput('username', 'Username')}
          {this.renderInput('password', 'Password', 'password')}
          {this.renderInput('name', 'Name')}

          <button disabled={this.validate()} className='btn btn-primary mt-2'>
            Register
          </button>
        </form>
      </div>
    );
  }
}

export default WithRouterHOC(RegisterForm);
