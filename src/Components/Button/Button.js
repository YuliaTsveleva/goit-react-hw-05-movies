import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';
import { BiChevronsDown } from 'react-icons/bi';

function Button({ loadMore }) {
  return (
    <button id="loadMore" onClick={loadMore} type="button" className={s.Button}>
      <BiChevronsDown size="40" />
    </button>
  );
}
export default Button;

Button.propTypes = {
  loadMore: PropTypes.func,
};
