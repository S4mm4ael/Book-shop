import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import avatar from '../../assets/png/avatar.png';
import logo from '../../assets/svg/logo.svg';
import { RootState } from '../../redux/store';
import { Burger } from '../burger';

import styles from './header.module.css';

export function Header() {
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged);

  return (
    <div className={styles.Header}>
      <Burger />
      <Link className={styles.Header__logo} to='/books/all'>
        <img className={styles.Header__img} src={logo} alt='logo' />
        <p className={styles.Header__text}>Cleverland</p>
      </Link>
      <h1 className={styles.Header__title}>Библиотека</h1>
      <div className={styles.Header__person}>
        {isLogged && (
          <React.Fragment>
            <p className={styles.Header__text}>Привет, Иван!</p>
            <img className={styles.Header__avatar} src={avatar} alt='avatar' />
          </React.Fragment>
        )}
        {!isLogged && (
          <React.Fragment>
            <p className={styles.Header__text}>
              <Link to='/auth'>Вход в профиль</Link>
            </p>
            <img className={styles.Header__avatar_dimmed} src={avatar} alt='avatar' />
          </React.Fragment>
        )}
      </div>
    </div>
  );
}
