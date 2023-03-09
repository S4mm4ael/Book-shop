import { useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-forgot.svg'
import arrowBlack from '../../assets/svg/arrow-registration.svg'
import eyeClosed from '../../assets/svg/eye-closed.svg'
import eyeOpened from '../../assets/svg/eye-open.svg'

import styles from './auth-page.module.css'

type AuthProps = {
  contentView: string;
};

export function AuthPage({ contentView }: AuthProps) {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSend, setIsSend] = useState<boolean>(false);
  const [email, setEmail] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordRecoverShow, setIsPasswordRecoverShow] = useState<boolean>(false);
  const [isPasswordRecoverRepeatShow, setIsPasswordRecoverRepeatShow] = useState<boolean>(false);
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

  if (contentView === 'restore') {
    return <section className={styles.Auth}>
      <h1 className={styles.Auth__mainTitle}>Cleverland</h1>
      {isError && !isSend &&
        <div className={styles.Auth__errorContainer}>
          <h2 className={styles.Auth__title}>Данные не сохранились</h2>
          <p className={styles.Auth__registrationP}>Что-то пошло не так. Попробуйте ещё раз</p>
          <button className={styles.Auth__formButton} type="submit"
            onClick={() => setIsError(false)}>Повторить</button>
        </div>

      }
      {!isError && isSend && <div className={styles.Auth__successContainer}>
        <h2 className={styles.Auth__title}>Письмо выслано</h2>
        <p className={styles.Auth__registrationP}>Перейдите в вашу почту, чтобы воспользоваться подсказками по восстановлению пароля</p>
      </div>

      }
      {!isError && !isSend && !email && <div className={`${styles.Auth__formContainer} ${styles.Auth__formContainer_restore}`}>
        <div className={styles.Auth__toAuthLinkContainer}>
          <Link className={styles.Auth__toAuthLink} to="/auth">
            <img src={arrow} alt="arrow-back" />
            <span>вход в личный кабинет</span>
          </Link>
        </div>
        <div className={styles.Auth__formItemWrapper}>
          <h2 className={styles.Auth__title}>Восстановление пароля</h2>
          <form className={styles.Auth__form} action="">
            <input className={`${styles.Auth__formItem} ${styles.Auth__formItem_restore}`} type="email" placeholder='Email' />
            <p className={`${styles.Auth__formForgot} ${styles.Auth__formForgot_restore}`}>На это email  будет отправлено письмо с инструкциями по восстановлению пароля</p>
            <button className={styles.Auth__formButton} type="submit"
              onClick={() => setIsSend(true)}>Восстановить</button>
            <div className={styles.Auth__registrationContainer}>
              <p className={styles.Auth__registrationP}>Нет учётной записи?</p>
              <Link className={styles.Auth__registrationLink} to="/registration">Регистрация</Link>
            </div>
          </form>

        </div>

      </div>}
      {!isError && !isSend && email && <div className={`${styles.Auth__formContainer} ${styles.Auth__formContainer_restore}`}>
        <div className={`${styles.Auth__formItemWrapper} ${styles.Auth__formItemWrapper_restore}`}>
          <h2 className={styles.Auth__title}>Восстановление пароля</h2>
          <form className={styles.Auth__form} action="">

            {/* <input className={`${styles.Auth__formItem} ${styles.Auth__formItem_restore}`} type="password" placeholder='Новый пароль' />
            <p className={`${styles.Auth__formForgot} ${styles.Auth__formForgot_restore}`}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
            <input className={`${styles.Auth__formItem} ${styles.Auth__formItem_restore}`} type="password" placeholder='Повторите пароль' /> */}

            {isPasswordEntered &&
              <div className={styles.Auth__ItemWrapper}>
                <input className={styles.Auth__formItem} type={isPasswordRecoverShow ? 'text' : 'password'} placeholder='Новый пароль' onChange={() => setisPasswordEntered(true)} />
                <button className={styles.Auth__formItemImage} type="button" onClick={() => handlePasswordVisibility()}><img src={isPasswordRecoverShow ? eyeOpened : eyeClosed} alt="show/hide" /> </button>
              </div>}
            {!isPasswordEntered && <input className={styles.Auth__formItem} type="password" placeholder='Новый пароль' onChange={() => setisPasswordEntered(true)} />}



            <button className={`${styles.Auth__formButton} ${styles.Auth__formButton_restore}`} type="submit"
              onClick={() => setIsSend(true)} >сохранить изменения</button>
            <div className={styles.Auth__registrationContainer}>
              <p className={`${styles.Auth__formForgot} ${styles.Auth__formForgot_restore} ${styles.Auth__formForgot_restoreTip}`}>После сохранения войдите в библиотеку, <br />используя новый пароль</p>

            </div>
          </form>

        </div>

      </div>}
    </section >
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
