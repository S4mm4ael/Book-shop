import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';

import strokeDown from '../../assets/svg/stroke-down-black.svg';
import strokeUp from '../../assets/svg/stroke-up-black.svg';
import { Comment } from '../../components/comment/comment';
import { NavigationList } from '../../components/navigation-list';
import { SliderBook } from '../../components/slider-book';
import { useGetBookQuery } from '../../redux/features/books-slice';
import { AppDispatch, RootState } from '../../redux/store';
import { defineRoute } from '../../shared/define-ru-category';
import { renderStars } from '../../shared/render-stars';
import { CommentBook } from '../../shared/types.books';

import styles from './book-page.module.css';

export function BookPage() {
  const dispatch: AppDispatch = useDispatch();
  const [isDesktopSize, setDesktopSize] = useState(window.innerWidth > 768);
  const [isCommentsOpen, setIsCommentsOpen] = useState<boolean>(true);
  const isBurgerOpen: boolean = useSelector((state: RootState) => state.interface.isBurgerOpen);
  const { bookId } = useParams();
  const { category } = useParams();
  const { data: book, error, isLoading } = useGetBookQuery(`${bookId}`);

  const updateMedia = () => {
    setDesktopSize(window.innerWidth > 768);
  };

  useEffect(() => {
    if (!isLoading && book) {
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
  useEffect(() => {
    window.addEventListener('resize', updateMedia);

    return () => window.removeEventListener('resize', updateMedia);
  }, []);

  function renderComments(comments: CommentBook[]) {
    return comments.map((comment) => (
      <Comment
        key={comment.id}
        avatar={comment.user.avatarUrl}
        name={comment.user.firstName + comment.user.lastName}
        rating={comment.rating}
        date={comment.createdAt}
        text={comment.text}
      />
    ));
  }

  return (
    <section className={styles.BookPage}>
      {isBurgerOpen && !error && <NavigationList />}
      <div className={styles.BookPage__route}>
        {isDesktopSize ? (
          <div className={styles.BookPage__routeContainer}>
            <Link to={`/books/${category}`}>
              <span>{category && defineRoute(category)}</span>
            </Link>{' '}
            /<span>{book?.title}</span>
          </div>
        ) : (
          <div className={styles.BookPage__route_tablet}>
            <Link to='/'>
              <span>{book?.categories[0]} книги</span>
            </Link>{' '}
            / {book?.title}
          </div>
        )}
      </div>
      {error ? (
        <div> </div>
      ) : (
        <React.Fragment>
          <div className={styles.BookPage__book}>
            {isDesktopSize ? (
              <div className={styles.BookPage__bookWrapper}>
                <div className={styles.BookPage__slider}>
                  {book && <SliderBook isDesktopSize={isDesktopSize} images={book.images} />}
                </div>
                <div className={styles.BookPage__text}>
                  <h1 className={styles.BookPage__title}>{book?.title}</h1>
                  <div className={styles.BookPage__authors}>
                    <p>{book?.authors.map((author) => `${author}, `)}</p>
                    <span>{book?.issueYear}</span>
                  </div>
                  <button type='button' className={`${styles.BookPage__bookIt}`}>
                    Забронировать
                  </button>
                  <div className={styles.BookPage__about}>
                    <h5>О книге</h5>
                    <article className={styles.BookPage__article}>{book?.description}</article>
                  </div>
                </div>
              </div>
            ) : (
              <div className={styles.BookPage__bookWrapper}>
                <div className={styles.BookPage__bookWrapper_tablet}>
                  <div className={styles.BookPage__slider}>
                    {book && <SliderBook isDesktopSize={isDesktopSize} images={book.images} />}
                  </div>
                  <div className={styles.BookPage__bookWrapperRight_tablet}>
                    <h1 className={styles.BookPage__title}>{book?.title}</h1>
                    <div className={styles.BookPage__authors}>
                      <p>{book?.authors.map((author) => `${author}, `)}</p>
                      <span>{book?.issueYear}</span>
                    </div>
                    <button type='button' className={`${styles.BookPage__bookIt}`}>
                      Забронировать
                    </button>
                  </div>
                </div>
                <div className={styles.BookPage__text}>
                  <div className={styles.BookPage__about}>
                    <h5>О книге</h5>
                    <article className={styles.BookPage__article}>{book?.description}</article>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className={styles.BookPage__properties}>
            <div className={styles.BookPage__rating}>
              <h5>Рейтинг</h5>
              {book && (
                <div className={styles.BookPage__ratingStars}>
                  {renderStars(book.rating)} <span>{book.rating}</span>
                </div>
              )}
            </div>
            <div className={styles.BookPage__details}>
              <h5>Подробная информация</h5>
              <div className={styles.BookPage__detailsBook}>
                <div className={styles.BookPage__detailsLeft}>
                  <ul className={styles.BookPage__detailsList}>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Издательство</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.publish}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Год издания</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.issueYear}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Страниц</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.pages}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Переплёт</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.cover}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Формат</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.format}</span>
                    </li>
                  </ul>
                </div>
                <div className={styles.BookPage__detailsRight}>
                  <ul className={styles.BookPage__detailsList}>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Жанр</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.categories.map((el) => `${el}`)}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Вес</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.weight} г</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>ISBN</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.ISBN}</span>
                    </li>
                    <li className={styles.BookPage__listItem}>
                      <span className={styles.BookPage__listItemProperty}>Изготовитель</span>
                      <span className={styles.BookPage__listItemPValue}>{book?.producer}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.BookPage__comments}>
              <div className={styles.BookPage__commentsHeader}>
                <h5>
                  Отзывы{' '}
                  <span className={styles.BookPage__commentsCount}>{book?.comments && book?.comments.length}</span>
                </h5>
                <button
                  data-test-id='button-hide-reviews'
                  onClick={() => (isCommentsOpen ? setIsCommentsOpen(false) : setIsCommentsOpen(true))}
                  type='button'
                  className={styles.BookPage__stroke}
                >
                  <img src={isCommentsOpen ? strokeUp : strokeDown} alt='stroke' />
                </button>
              </div>
              <div className={styles.BookPage__commentSection}>
                <ul className={styles.BookPage__commentList}>
                  {book?.comments ? isCommentsOpen && renderComments(book?.comments) : 'Комментариев пока нет'}
                </ul>
                <button data-test-id='button-rating' type='button' className={`${styles.BookPage__bookIt}`}>
                  Оценить книгу
                </button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </section>
  );
}
