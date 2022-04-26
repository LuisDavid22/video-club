import React, { Component } from 'react';
import Joi from 'joi';
import Input from './input';
import Select from './select';

class Form extends Component {
  validate = () => {
    const { error } = this.schema.validate(this.state.data, {
      abortEarly: false,
    });
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const sch = Joi.object({ [name]: this.schema.extract(name) });
    const { error } = sch.validate(obj);
    return error ? error.details[0].message : null;
  };

  handleChange = ({ currentTarget: input }) => {
    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value;
    this.setState({ data, errors });
    console.log(data);
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate();
    this.setState({ errors: errors || {} });
    if (errors) return;

    this.doSubmit();
  };

  renderInput = (name, label, type = 'text') => {
    const { data, errors } = this.state;
    return (
      <Input
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleChange}
        error={errors[name]}
        type={type}
      />
    );
  };

  renderSelect = (name, label, options, sourceValue, sourceDisplay) => {
    return (
      <Select
        name={name}
        label={label}
        value={this.state.data[name]}
        options={this.state[options]}
        sourceValue={sourceValue}
        sourceDisplay={sourceDisplay}
        onChange={this.handleChange}
        error={this.state.errors[name]}
      />
    );
  };
}

export default Form;
