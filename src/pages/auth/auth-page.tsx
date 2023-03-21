/* eslint-disable jsx-a11y/no-interactive-element-to-noninteractive-role */
/* eslint-disable jsx-a11y/no-autofocus */
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import arrowBlack from '../../assets/svg/arrow-registration.svg';
import eyeClosed from '../../assets/svg/eye-closed.svg';
import eyeOpened from '../../assets/svg/eye-open.svg';
import { RootState } from '../../redux/store';

import styles from './auth-page.module.css';

export function AuthPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordEntered, setisPasswordEntered] = useState<boolean>(false);

  const [userLogin, setUserLogin] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  const login: string = useSelector((state: RootState) => state.user.username);
  const password: string = useSelector((state: RootState) => state.user.password);

  function handlePasswordVisibility() {
    if (isPasswordEntered) {
      if (isPasswordShow === false) {
        setIsPasswordShow(true);
      }
      if (isPasswordShow === true) {
        setIsPasswordShow(false);
      }
    }
  }
  function handleLoginChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserLogin(e.target.value);
  }
  function handlePasswordChange(e: React.ChangeEvent<HTMLInputElement>) {
    setUserPassword(e.target.value);
  }
  function handleSubmit() {
    if (userLogin === login && userPassword === password) {
      console.log('success');
    } else {
      console.log('no');
    }
  }

  return (
    <section className={styles.Auth}>
      <h1 className={styles.Auth__mainTitle}>Cleverland</h1>
      {isError && (
        <div className={styles.Auth__errorContainer}>
          <h2 className={styles.Auth__title}>Вход не выполнен</h2>
          <p className={styles.Auth__registrationP}>Что-то пошло не так. Попробуйте ещё раз</p>
          <button className={styles.Auth__formButton} type='submit' onClick={() => setIsError(false)}>
            Повторить
          </button>
        </div>
      )}
      {!isError && (
        <div className={styles.Auth__formContainer}>
          <h2 className={styles.Auth__title}>Вход в личный кабинет</h2>
          <form className={styles.Auth__form} onSubmit={() => handleSubmit()}>
            <div className={styles.Auth__inputWrapper}>
              <input
                className={styles.Auth__formItem}
                type='text'
                value={userLogin}
                required={true}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleLoginChange(e)}
              />
              <span className={styles.Auth__placeholder}>Логин</span>
            </div>

            {isPasswordEntered && (
              <div className={styles.Auth__ItemWrapper}>
                <div className={styles.Auth__inputWrapper}>
                  <input
                    className={styles.Auth__formItem}
                    autoFocus={true}
                    type={isPasswordShow ? 'text' : 'password'}
                    required={true}
                    value={userPassword}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                      handlePasswordChange(e);
                    }}
                  />
                  <span className={styles.Auth__placeholder}>Пароль</span>
                  <button
                    className={styles.Auth__formItemImage}
                    type='button'
                    onClick={() => handlePasswordVisibility()}
                  >
                    <img src={isPasswordShow ? eyeOpened : eyeClosed} alt='show/hide' />{' '}
                  </button>
                </div>
              </div>
            )}
            {!isPasswordEntered && (
              <input
                className={styles.Auth__formItem}
                type='password'
                placeholder='Пароль'
                onChange={() => setisPasswordEntered(true)}
              />
            )}
            <p className={styles.Auth__formForgot}>
              <Link to='/forgot-pass'>Забыли логин или пароль?</Link>
            </p>
            <button className={styles.Auth__formButton} type='submit'>
              Вход
            </button>
          </form>
          <div className={styles.Auth__registrationContainer}>
            <Link className={`${styles.Auth__registrationLink} ${styles.Auth__registrationLink_back}`} to='/'>
              <img className={styles.Auth__registrationLink_backArrow} src={arrowBlack} alt='arrow' />
              Вернуться на главную
            </Link>
            <Link className={styles.Auth__registrationLink} to='/registration'>
              Регистрация <img src={arrowBlack} alt='arrow' />
            </Link>
          </div>
          <div className={styles.Auth__registrationContainer} />
        </div>
      )}
    </section>
  );
}
