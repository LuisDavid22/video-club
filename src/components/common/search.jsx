import React from 'react';

const Search = ({ value, placeholder, onChange }) => {
  return (
    <div className='form-group'>
      <input
        type='text'
        className='form-control'
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.currentTarget.value)}
      />
    </div>
  );
};

export default Search;
