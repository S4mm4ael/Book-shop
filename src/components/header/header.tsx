import { Link } from 'react-router-dom';

import avatar from '../../assets/png/avatar.png';
import logo from '../../assets/svg/logo.svg';
import { Burger } from '../burger';

import styles from './header.module.css';

export function Header() {
  return (

    <div className={styles.Header}>
      <Burger />
      <Link className={styles.Header__logo} to='/books/all'>
        <img className={styles.Header__img} src={logo} alt='logo' />
        <p className={styles.Header__text}>Cleverland</p>
      </Link>
      <h1 className={styles.Header__title}>Библиотека</h1>
      <div className={styles.Header__person}>
        <p className={styles.Header__text}>Привет, Иван!</p>
        <img className={styles.Header__avatar} src={avatar} alt='avatar' />
      </div>
    </div>
  );
}
