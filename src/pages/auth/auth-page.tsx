
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './auth-page.module.css'

type AuthProps = {
  contentView: string;
};

export function AuthPage({ contentView }: AuthProps) {
  const [isError, setIsError] = useState<boolean>(false);

  return <section className={styles.Auth}>
    {isError && <div className={styles.Auth__errorContainer}>
      <h2 className={styles.Auth__title}>Вход не выполнен</h2>
      <p className={styles.Auth__registrationP}>Что-то пошло не так. Попробуйте ещё раз</p>
      <button className={styles.Auth__formButton} type="submit"
        onClick={() => setIsError(false)} >Повторить</button>
    </div>
    }
    {!isError && <React.Fragment> <h1 className={styles.Auth__mainTitle}>Cleverland</h1>
      <div className={styles.Auth__formContainer}>
        <h2 className={styles.Auth__title}>Вход в личный кабинет</h2>
        <form className={styles.Auth__form} action="">
          <input className={styles.Auth__formItem} type="text" placeholder='Логин' />
          <input className={styles.Auth__formItem} type="text" placeholder='Пароль' />
          <p className={styles.Auth__formForgot}>Забыли логин или пароль?</p>
          <button className={styles.Auth__formButton} type="submit"
            onClick={() => setIsError(true)} >Вход</button>
        </form>
        <div className={styles.Auth__registrationContainer}>
          <p className={styles.Auth__registrationP}>Нет учётной записи?</p>
          <Link className={styles.Auth__registrationLink} to="/registration">Регистрация</Link>
        </div>

      </div></React.Fragment>}
  </section >

}
