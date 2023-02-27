import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import { useGetAllBooksQuery } from '../../../redux/features/books-slice';
import { AppDispatch } from '../../../redux/store';
import { Category } from '../../../shared/types.books';

import styles from '../navigation-list.module.css';

export function CategoryItem({ name, path }: Category) {
  const [isDesktopSize, setDesktopSize] = useState(window.innerWidth > 945);
  const location = useLocation();
  const dispatch: AppDispatch = useDispatch();

  const { data: books = [] } = useGetAllBooksQuery('');

  useEffect(() => {
    const updateMedia = () => {
      setDesktopSize(window.innerWidth > 945);
    };

    window.addEventListener('resize', updateMedia);

    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  function handleClick() {
    dispatch({ type: 'IS_BURGER_OPEN', payload: false });
    dispatch({ type: 'CATEGORY', payload: path });
  }

  function renderCount() {
    let count = 0;

    for (let i = 0; i < books.length; i++) {
      if (books[i].categories.includes(name)) {
        count += 1;
      }
    }

    return (
      <span data-test-id={isDesktopSize ? `navigation-book-count-for-${path}` : `burger-book-count-for-${path}`}>
        {count}
      </span>
    );
  }

  return (
    <React.Fragment>
      <pre
        data-test-id={isDesktopSize ? `navigation-${path}` : `burger-${path}`}
        className={`${styles.NavigationList__booksItem} ${
          location.pathname === `/books/:${path}` && `${styles.NavigationList__booksItem_active}`
        }`}
      >
        <Link to={`/books/:${path}`} onClick={() => handleClick()}>
          {name}
        </Link>
      </pre>
      <span
        className={`${styles.NavigationList__booksItemCount}
    ${name === 'humor' ? styles.NavigationList__booksItemCount_lower : styles.NavigationList__booksItemCount_standart}
    ${
      name === 'non-fiction'
        ? styles.NavigationList__booksItemCount_lower
        : styles.NavigationList__booksItemCount_standart
    }`}
      >
        {renderCount()}
      </span>
    </React.Fragment>
  );
}
