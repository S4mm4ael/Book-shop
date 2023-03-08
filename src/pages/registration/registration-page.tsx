
import React, { useState } from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-registration.svg'

import styles from './registration-page.module.css'

export function RegistrationPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  function renderForm(step: number) {
    switch (step) {
      case 2:
        return <form className={styles.Registration__form} action="">
          <div className={styles.Registration__inputsContainer}>
            <div >
              <input className={styles.Registration__formItem} type="text" placeholder='Имя' />
              <p className={styles.Registration__formTips} >{' '}</p>
            </div>
            <div >
              <input className={styles.Registration__formItem} type="text" placeholder='Фамилия' />
              <p className={styles.Registration__formTips} >{' '}</p>
            </div>
          </div>
          <button className={styles.Registration__formButton} type="submit"
            onClick={() => { setStep(step + 1) }} >Следующий шаг</button>
        </form>
      case 3:
        return <form className={styles.Registration__form} action="">
          <div className={styles.Registration__inputsContainer}>
            <div >
              <input className={styles.Registration__formItem} type="text" placeholder='Номер телефона' />
              <p className={styles.Registration__formTips} >{'  '}</p>
            </div>
            <div >
              <input className={styles.Registration__formItem} type="email" placeholder='E-mail' />
              <p className={styles.Registration__formTips} >{' '}</p>
            </div>
          </div>
          <button className={styles.Registration__formButton} type="submit"
            onClick={() => { setIsSuccess(true); setStep(step + 1) }} >зарегистрироваться</button>
        </form>
      default:
        return <form className={styles.Registration__form} action="">
          <div className={styles.Registration__inputsContainer}>
            <div >
              <input className={styles.Registration__formItem} type="text" placeholder='Придумайте логин для входа' />
              <p className={styles.Registration__formTips} >Используйте для логина латинский алфавит и цифры</p>
            </div>
            <div >
              <input className={styles.Registration__formItem} type="text" placeholder='Пароль' />
              <p className={styles.Registration__formTips}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
            </div>
          </div>
          <button className={styles.Registration__formButton} type="submit"
            onClick={() => { setStep(step + 1) }} >Следующий шаг</button>
        </form>

    }
  }



  return <section className={styles.Registration}>
    {isError && <div className={styles.Registration__errorContainer}>
      <h2 className={styles.Registration__title}>Данные не сохранились</h2>
      <p className={styles.Registration__registrationP}>Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.</p>
      <button className={styles.Registration__formButton} type="submit"
        onClick={() => { setIsError(false); setStep(1); setIsSuccess(false) }} >назад к регистрации</button>
    </div>
    }
    {!isError && isSuccess && <div className={styles.Registration__errorContainer}>
      <h2 className={styles.Registration__title}>Регистрация успешна</h2>
      <p className={styles.Registration__registrationP}>Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль</p>
      <button className={styles.Registration__formButton} type="submit"
        onClick={() => { setIsError(true); setStep(1) }} >вход</button>
    </div>
    }
    {!isError && !isSuccess && <React.Fragment> <h1 className={styles.Registration__mainTitle}>Cleverland</h1>
      <div className={styles.Registration__formContainer}>
        <h2 className={styles.Registration__title}>Регистрация</h2>
        <p className={styles.Registration__step}>{step.toString()} шаг из 3</p>
        {renderForm(step)}

        <div className={styles.Registration__registrationContainer}>
          <p className={styles.Registration__registrationP}>Есть учётная запись?</p>
          <Link className={styles.Registration__registrationLink} to="/auth">войти<img src={arrow} alt="arrow" /></Link>
        </div>

      </div></React.Fragment>}
  </section >

}

