import React from 'react';
import PropTypes from 'prop-types';

const ListGroup = ({ items, defaultItem, onItemSelect, selectedItem }) => {
  const styles = { cursor: 'pointer' };
  const classes = 'list-group-item ';

  if (!selectedItem) selectedItem = defaultItem;
  return (
    <ul className='list-group'>
      <li
        style={styles}
        className={selectedItem === defaultItem ? classes + 'active' : classes}
        onClick={() => {
          onItemSelect('');
        }}
      >
        {defaultItem}
      </li>
      {items.map((item) => {
        return (
          <li
            key={item}
            style={styles}
            className={selectedItem === item ? classes + 'active' : classes}
            onClick={() => {
              onItemSelect(item);
            }}
          >
            {item}
          </li>
        );
      })}
    </ul>
  );
};

ListGroup.propTypes = {
  items: PropTypes.array.isRequired,
  selectedItem: PropTypes.string.isRequired,
  defaultItem: PropTypes.string.isRequired,
  onItemSelect: PropTypes.func.isRequired,
};

export default ListGroup;
