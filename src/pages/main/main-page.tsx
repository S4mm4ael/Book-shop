import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
  const category: string | undefined = useSelector((state: RootState) => state.data.category);
  const sorting: boolean = useSelector((state: RootState) => state.data.sorting);
  const searchQuery: string | undefined = useSelector((state: RootState) => state.data.searchQuery);

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
  }, [isLoading, books, dispatch, error])


  function renderBooks() {
    let booksArray: Book[] = [];

    booksArray = filterBooks()
    booksArray = searchBooks(booksArray)
    booksArray = sortBooks(booksArray)

    return booksArray.map((book: Book) => <Card key={book.id} bookItem={book} isListView={isListView} />);
  }

  function filterBooks() {

    const message = document.getElementById('empty');
    let booksArrayFiltered: Book[] = []

    if (category === undefined) {
      booksArrayFiltered = books;
    }

    if (category) {
      booksArrayFiltered = books.filter((book: Book) => book.categories.indexOf(defineRoute(category)) > -1);

    }
    if (booksArrayFiltered.length !== 0) {
      if (message) {
        message.style.display = 'none';
      }
    }
    if (booksArrayFiltered.length === 0) {
      if (message) {
        message.style.display = 'block';
      }
    }

    return booksArrayFiltered
  }

  function sortBooks(booksArray: Book[]) {
    let booksArraySorted: Book[] = []

    if (!sorting) {
      booksArraySorted = booksArray.slice().sort((a, b) => a.rating - b.rating)
    }
    if (sorting) {
      booksArraySorted = booksArray.slice().sort((a, b) => b.rating - a.rating)
    }

    return booksArraySorted
  }

  function searchBooks(booksArray: Book[]) {
    let booksArraySearched: Book[] = []

    if (!searchQuery) {
      booksArraySearched = booksArray

    }
    if (searchQuery) {
      const regexp = new RegExp(searchQuery, 'ig')

      booksArraySearched = booksArray.filter((book: Book) => book.title.match(regexp))
    }

    return booksArraySearched
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
          {renderBooks()}
          <p id='empty' className={styles.MainPage__emptyMessage}>
            В этой категории книг ещё нет
          </p>
        </div>
      </div>
    </section>
  );
}
