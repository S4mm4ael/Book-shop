import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import classNames from 'classnames';

import { Card } from '../../components/card';
import { NavigationList } from '../../components/navigation-list';
import { Search } from '../../components/search';
import { useGetAllBooksQuery } from '../../redux/features/books-slice';
import { AppDispatch, RootState } from '../../redux/store';
import { defineRoute } from '../../shared/define-ru-category';
import { Book } from '../../shared/types.books';

import styles from './main-page.module.css';

export function MainPage() {
  const dispatch: AppDispatch = useDispatch();
  const [isListView, setIsList] = useState<boolean>(false);
  const isBurgerOpen: boolean = useSelector((state: RootState) => state.interface.isBurgerOpen);
  const isFetchError: boolean = useSelector((state: RootState) => state.interface.isFetchError);

  const { category } = useParams();

  const { data: books = [], error, isLoading } = useGetAllBooksQuery('');

  useEffect(() => {
    if (!isLoading && books) {
      dispatch({ type: 'IS_LOADING', payload: false });
    }
    if (isLoading) {
      dispatch({ type: 'IS_LOADING', payload: true });
    }
    if (error) {
      dispatch({ type: 'IS_FETCH_ERROR', payload: true });
      // eslint-disable-next-line no-console
      console.log(error);
    }
  });

  function renderBooks(genre: string | undefined) {
    let booksArray: Book[] = [];
    const message = document.getElementById('empty');

    if (!category) {
      booksArray = books;
    }

    if (category) {
      booksArray = books.filter((book: Book) => book.categories.indexOf(defineRoute(genre)) > -1);
    }

    if (booksArray.length !== 0) {
      if (message) {
        message.style.display = 'none';
      }
    }
    if (booksArray.length === 0) {
      if (message) {
        message.style.display = 'block';
      }
    }

    return booksArray.map((book: Book) => <Card key={book.id} bookItem={book} isListView={isListView} />);
  }

  return (
    <section className={classNames(styles.MainPage, { [styles.MainPage_noScroll]: isBurgerOpen })}>
      <div className={styles.MainPage__left}>
        <NavigationList />
      </div>
      <div className={styles.MainPage__right}>
        {!isFetchError && <Search isListView={isListView} changeView={setIsList} />}
        <div
          className={
            isListView ? `${styles.MainPage__books} ${styles.MainPage__books_list}` : `${styles.MainPage__books}`
          }
        >
          {renderBooks(category)}
          <p id='empty' className={styles.MainPage__emptyMessage}>
            В этой категории книг ещё нет
          </p>
        </div>
      </div>
    </section>
  );
}
