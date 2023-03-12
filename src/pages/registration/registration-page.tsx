/* eslint-disable jsx-a11y/no-autofocus */

import { SetStateAction, useState } from 'react';
import { Link } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-registration.svg';

import { Step1Form } from './steps-form/step1-form';
import { Step2Form } from './steps-form/step2-form';

import styles from './registration-page.module.css';

export function RegistrationPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);

  function renderForm() {
    switch (step) {
      case 2:
        return <Step2Form step={step} setStep={setStep} />;
      case 3:
        return (
          <form
            className={styles.Registration__form}
            onSubmit={() => {
              setIsSuccess(true);
              setStep(step + 1);
            }}
            autoComplete='off'
          >
            <div className={styles.Registration__inputsContainer}>
              <div className={styles.Registration__inputWrapper}>
                <input className={styles.Registration__formItem} type='text' required={true} />
                <span className={styles.Registration__placeholder}>Номер телефона</span>
                <p className={styles.Registration__formTips}>{'  '}</p>
              </div>
              <div className={styles.Registration__inputWrapper}>
                <input className={styles.Registration__formItem} type='text' required={true} />
                <span className={styles.Registration__placeholder}>E-mail</span>
                <p className={styles.Registration__formTips}>{'  '}</p>
              </div>
            </div>
            <button className={styles.Registration__formButton} type='submit'>
              зарегистрироваться
            </button>
          </form>
        );
      default:
        return <Step1Form step={step} setStep={setStep} />;
    }
  }

  return (
    <section className={styles.Registration}>
      <h1 className={styles.Registration__mainTitle}>Cleverland</h1>
      {isError && (
        <div className={styles.Registration__errorContainer}>
          <h2 className={`${styles.Registration__title} ${styles.Registration__title_center}`}>
            Данные не сохранились
          </h2>
          <p className={styles.Registration__registrationP}>
            Такой логин или e-mail уже записан в системе. Попробуйте зарегистрироваться по другому логину или e-mail.
          </p>
          <button
            className={styles.Registration__formButton}
            type='submit'
            onClick={() => {
              setIsError(false);
              setStep(1);
              setIsSuccess(false);
            }}
          >
            назад к регистрации
          </button>
        </div>
      )}
      {!isError && isSuccess && (
        <div className={styles.Registration__errorContainer}>
          <h2 className={`${styles.Registration__title} ${styles.Registration__title_center}`}>Регистрация успешна</h2>
          <p className={styles.Registration__registrationP}>
            Регистрация прошла успешно. Зайдите в личный кабинет, используя свои логин и пароль
          </p>
          <button
            className={styles.Registration__formButton}
            type='submit'
            onClick={() => {
              setIsError(true);
              setStep(1);
            }}
          >
            вход
          </button>
        </div>
      )}
      {!isError && !isSuccess && (
        <div className={styles.Registration__formContainer}>
          <h2 className={styles.Registration__title}>Регистрация</h2>
          <p className={styles.Registration__step}>{step.toString()} шаг из 3</p>
          {renderForm()}
          <div className={styles.Registration__registrationContainer}>
            <p className={styles.Registration__registrationP}>Есть учётная запись?</p>
            <Link className={styles.Registration__registrationLink} to='/auth'>
              войти
              <img src={arrow} alt='arrow' />
            </Link>
          </div>
        </div>
      )}
    </section>
  );
}
