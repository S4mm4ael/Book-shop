import { useState } from 'react';
import { Link } from 'react-router-dom';

import arrowBlack from '../../assets/svg/arrow-registration.svg'
import eyeClosed from '../../assets/svg/eye-closed.svg'
import eyeOpened from '../../assets/svg/eye-open.svg'

import styles from './auth-page.module.css'


export function AuthPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordEntered, setisPasswordEntered] = useState<boolean>(false);


  function handlePasswordVisibility() {
    if (isPasswordEntered) {
      if (isPasswordShow === false) {
        setIsPasswordShow(true)
      }
      if (isPasswordShow === true) {
        setIsPasswordShow(false)
      }

    }
  }

  return <section className={styles.Auth
  } >
    <h1 className={styles.Auth__mainTitle}>Cleverland</h1>
    {isError &&
      <div className={styles.Auth__errorContainer}>
        <h2 className={styles.Auth__title}>Вход не выполнен</h2>
        <p className={styles.Auth__registrationP}>Что-то пошло не так. Попробуйте ещё раз</p>
        <button className={styles.Auth__formButton} type="submit"
          onClick={() => setIsError(false)} >Повторить</button>
      </div>
    }
    {
      !isError && <div className={styles.Auth__formContainer}>
        <h2 className={styles.Auth__title}>Вход в личный кабинет</h2>
        <form className={styles.Auth__form} action="">
          <input className={styles.Auth__formItem} type="text" placeholder='Логин' />
          {isPasswordEntered &&
            <div className={styles.Auth__ItemWrapper}>
              <input className={styles.Auth__formItem} type={isPasswordShow ? 'text' : 'password'} placeholder='Пароль' onChange={() => setisPasswordEntered(true)} />
              <button className={styles.Auth__formItemImage} type="button" onClick={() => handlePasswordVisibility()}><img src={isPasswordShow ? eyeOpened : eyeClosed} alt="show/hide" /> </button>
            </div>}
          {!isPasswordEntered && <input className={styles.Auth__formItem} type="password" placeholder='Пароль' onChange={() => setisPasswordEntered(true)} />}
          <Link to="/forgot-pass"><p className={styles.Auth__formForgot}>Забыли логин или пароль?</p></Link>
          <button className={styles.Auth__formButton} type="submit"
            onClick={() => setIsError(true)} >Вход</button>
        </form>
        <div className={styles.Auth__registrationContainer}>
          <p className={styles.Auth__registrationP}>Нет учётной записи?</p>
          <Link className={styles.Auth__registrationLink} to="/registration">Регистрация <img src={arrowBlack} alt="arrow" /></Link>

        </div>

      </div >
    }
  </section >





}
