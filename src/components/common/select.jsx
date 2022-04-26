import React from 'react';

const Select = ({
  name,
  label,
  options,
  onChange,
  error,
  value,
  sourceValue,
  sourceDisplay,
}) => {
  return (
    <div className='form-group'>
      <label htmlFor={name}>{label}</label>
      <select
        name={name}
        onChange={onChange}
        value={value}
        className='form-control'
      >
        {options.map((item) => {
          return (
            <option
              key={item[sourceValue]}
              value={item[sourceValue]}
              // selected={item[sourceDisplay] === 'Comedy' ? 'selected' : ''}
            >
              {item[sourceDisplay]}
            </option>
          );
        })}
      </select>
      {error && <div className='alert alert-danger'>{error}</div>}
    </div>
  );
};

export default Select;
