import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useGetAllBooksQuery } from '../../../redux/features/books-slice';
import { AppDispatch } from '../../../redux/store';
import { Category } from '../../../shared/types.books';

import styles from '../navigation-list.module.css';

export function CategoryItem({ name, path }: Category) {
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { data: books = [] } = useGetAllBooksQuery('');

  function handleClick() {
    dispatch({ type: 'IS_BURGER_OPEN', payload: false })
    dispatch({ type: 'CATEGORY', payload: path })
  }

  function renderCount() {
    let count = 0;

    for (let i = 0; i < books.length; i++) {
      if (books[i].categories.includes(name)) {
        count += 1;
      }
    }

    return <span>{count}</span>

  }

  return (
    <React.Fragment>
      <pre
        className={`${styles.NavigationList__booksItem} ${location.pathname === `/books/:${path}` && `${styles.NavigationList__booksItem_active}`
          }`}
      >
        <Link to={`/books/:${path}`} onClick={() => handleClick()}>
          {name}
        </Link>
      </pre>
      <span
        className={`${styles.NavigationList__booksItemCount}
    ${name === 'humor' ? styles.NavigationList__booksItemCount_lower : styles.NavigationList__booksItemCount_standart}
    ${name === 'non-fiction'
            ? styles.NavigationList__booksItemCount_lower
            : styles.NavigationList__booksItemCount_standart
          }`}
      >
        {renderCount()}
      </span>
    </React.Fragment>
  );
}
