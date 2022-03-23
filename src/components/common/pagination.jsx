/* eslint-disable jsx-a11y/anchor-is-valid */
import _ from 'lodash';
import PropTypes from 'prop-types';

const Pagination = ({ itemsCount, pageSize, activePage, onPageChange }) => {
  const pagesCount = Math.ceil(itemsCount / pageSize);
  if (pagesCount === 1) return null;
  const pages = _.range(1, pagesCount + 1);

  return (
    <nav aria-label='Page navigation example'>
      <ul className='pagination'>
        {pages.map((page) => {
          return (
            <li
              key={page}
              className={page === activePage ? 'page-item active' : 'page-item'}
              style={{ cursor: 'pointer' }}
            >
              <a
                onClick={() => {
                  onPageChange(page);
                }}
                className='page-link'
              >
                {page}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  activePage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};
export default Pagination;
