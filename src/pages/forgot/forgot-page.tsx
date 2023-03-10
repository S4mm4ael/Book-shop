/* eslint-disable complexity */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-forgot.svg'
import eyeClosed from '../../assets/svg/eye-closed.svg'
import eyeOpened from '../../assets/svg/eye-open.svg'

import styles from './forgot-page.module.css'


export function ForgotPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [isOk, setIsOk] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordRepeatShow, setIsPasswordRepeatShow] = useState<boolean>(false);
  const [isPasswordEntered, setIsPasswordEntered] = useState<boolean>(false);


  function handlePasswordVisibility(isPrimaryPassword: boolean) {
    if (isPasswordEntered) {
      if (isPrimaryPassword) {
        if (isPasswordShow === false) {
          setIsPasswordShow(true)
        }
        if (isPasswordShow === true) {
          setIsPasswordShow(false)
        }
      }
      if (!isPrimaryPassword) {
        if (isPasswordRepeatShow === false) {
          setIsPasswordRepeatShow(true)
        }
        if (isPasswordRepeatShow === true) {
          setIsPasswordRepeatShow(false)
        }
      }


    }
  }


  return <section className={styles.Forgot}>
    <h1 className={styles.Forgot__mainTitle}>Cleverland</h1>
    {isError && !isSend &&
      <div className={styles.Forgot__errorContainer}>
        <h2 className={styles.Forgot__title}>Данные не сохранились</h2>
        <p className={styles.Forgot__registrationP}>Что-то пошло не так. Попробуйте ещё раз</p>
        <button className={styles.Forgot__formButton} type="submit"
          onClick={() => setIsError(false)}>Повторить</button>
      </div>
    }
    {!isError && isOk &&
      <div className={styles.Forgot__errorContainer}>
        <h2 className={styles.Forgot__title}>Новые данные сохранены</h2>
        <p className={styles.Forgot__registrationP}>Зайдите в личный кабинет, используя свои логин и новый пароль</p>
        <Link to="/auth">
          <button className={styles.Forgot__formButton} type="submit"
            onClick={() => setIsError(false)}>вход</button>
        </Link>

      </div>
    }
    {!isError && isSend && <div className={styles.Forgot__successContainer}>
      <h2 className={styles.Forgot__title}>Письмо выслано</h2>
      <p className={styles.Forgot__registrationP}>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
    </div>

    }
    {!isError && !isSend && !email && <div className={`${styles.Forgot__formContainer} ${styles.Forgot__formContainer_restore}`}>
      <div className={styles.Forgot__toForgotLinkContainer}>
        <Link className={styles.Forgot__toForgotLink} to="/auth">
          <img src={arrow} alt="arrow-back" />
          <span>вход в личный кабинет</span>
        </Link>
      </div>
      <div className={styles.Forgot__formItemWrapper}>
        <h2 className={`${styles.Forgot__title} `}>Восстановление пароля</h2>
        <form className={styles.Forgot__form} action="">
          <input className={`${styles.Forgot__formItem} ${styles.Forgot__formItem_restore}`} type="email" placeholder='Email' />
          <p className={`${styles.Forgot__formForgot} ${styles.Forgot__formForgot_restore}`}>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
          <button className={styles.Forgot__formButton} type="submit"
            onClick={() => setEmail(true)}>Восстановить</button>
          <div className={styles.Forgot__registrationContainer}>
            <p className={styles.Forgot__registrationP}>Нет учётной записи?</p>
            <Link className={styles.Forgot__registrationLink} to="/registration">Регистрация</Link>
          </div>
        </form>

      </div>

    </div>}
    {!isError && !isSend && email && !isOk && <div className={`${styles.Forgot__formContainer} ${styles.Forgot__formContainer_restore}`}>
      <div className={`${styles.Forgot__formItemWrapper} ${styles.Forgot__formItemWrapper_restore}`}>
        <h2 className={`${styles.Forgot__title} ${styles.Forgot__title_top}`}>Восстановление пароля</h2>
        <form className={styles.Forgot__form} action="">
          {isPasswordEntered &&
            <div className={styles.Forgot__ItemWrapper}>
              <input className={`${styles.Forgot__formItem} ${styles.Forgot__formItem_restore}`} type={isPasswordShow ? 'text' : 'password'} placeholder='Новый пароль' onChange={() => setIsPasswordEntered(true)} />
              <button className={styles.Forgot__formItemImage} type="button" onClick={() => handlePasswordVisibility(true)}><img src={isPasswordShow ? eyeOpened : eyeClosed} alt="show/hide" /> </button>
              <p className={`${styles.Forgot__formForgot} ${styles.Forgot__formForgot_restore} ${styles.Forgot__formForgot_restoreDouble}`}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
              <input className={`${styles.Forgot__formItem} ${styles.Forgot__formItem_restore}`} type={isPasswordRepeatShow ? 'text' : 'password'} placeholder='Повторите пароль' onChange={() => setIsPasswordEntered(true)} />
              <button className={`${styles.Forgot__formItemImage}, ${styles.Forgot__formItemImage_second}`} type="button" onClick={() => handlePasswordVisibility(false)}><img src={isPasswordRepeatShow ? eyeOpened : eyeClosed} alt="show/hide" /> </button>
            </div>}
          {!isPasswordEntered && <div className={styles.Forgot__ItemWrapper}>
            <input className={styles.Forgot__formItem} type="password" placeholder='Новый пароль' onChange={() => setIsPasswordEntered(true)} />
            <p className={`${styles.Forgot__formForgot} ${styles.Forgot__formForgot_restore} ${styles.Forgot__formForgot_restoreDouble}`}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
            <input className={styles.Forgot__formItem} type={isPasswordRepeatShow ? 'text' : 'password'} placeholder='Повторите пароль' onChange={() => setIsPasswordEntered(true)} />

          </div>}
          <button className={`${styles.Forgot__formButton} ${styles.Forgot__formButton_restore}`} type="submit"
            onClick={() => setIsOk(true)} >сохранить изменения</button>
          <div className={styles.Forgot__registrationContainer}>
            <p className={`${styles.Forgot__formForgot} ${styles.Forgot__formForgot_restore} ${styles.Forgot__formForgot_restoreTip}`}>После сохранения войдите в библиотеку, <br />используя новый пароль</p>

          </div>
        </form>

      </div>

    </div>}
  </section >
}


