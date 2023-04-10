import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';

import avatar from '../../assets/png/avatar.png';
import logo from '../../assets/svg/logo.svg';
import { RootState } from '../../redux/store';
import { UserRegistration } from '../../shared/types.user';
import { Burger } from '../burger';

import styles from './header.module.css';

export function Header() {
  const isLogged: boolean = useSelector((state: RootState) => state.user.isLogged);
  const [user, setUser] = useState<Partial<UserRegistration> | null>(null);
  const [locationName, setLocationName] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    function getUserFromLocal() {
      const userObject = JSON.parse(localStorage.getItem('user')!);
      const authLogin = localStorage.getItem('token');

      if (userObject && authLogin !== 'guest_token') {
        setUser(userObject);
      }
    }
    getUserFromLocal();
  }, []);
  useEffect(() => {
    function getLocation() {
      switch (location.pathname) {
        case '/profile':
          setLocationName('Личный кабинет');
          break;
        case '/terms':
          setLocationName('Правила пользования');
          break;
        case '/contract':
          setLocationName('Договор оферты');
          break;

        default:
          setLocationName('Библиотека');
          break;
      }
    }
    getLocation();
  }, [location]);

  return (
    <div className={styles.Header}>
      <Burger />
      <Link className={styles.Header__logo} to='/books/all'>
        <img className={styles.Header__img} src={logo} alt='logo' />
        <p className={styles.Header__text}>Cleverland</p>
      </Link>
      <h1 className={styles.Header__title}>{locationName}</h1>
      <div className={styles.Header__person}>
        {isLogged && (
          <React.Fragment>
            <p className={styles.Header__text}>Привет, {user ? user?.firstName : 'Гость'}</p>
            <Link to='/profile'>
              <img className={styles.Header__avatar} src={avatar} alt='avatar' />
            </Link>
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
