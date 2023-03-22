/* eslint-disable jsx-a11y/no-autofocus */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-registration.svg';
import { AppDispatch, RootState } from '../../redux/store';

import { Step1Form } from './steps-form/step1-form';
import { Step2Form } from './steps-form/step2-form';
import { Step3Form } from './steps-form/step3-form';

import styles from './registration-page.module.css';

export function RegistrationPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const email = useSelector((state: RootState) => state.user.email);
  const username = useSelector((state: RootState) => state.user.username);
  const password = useSelector((state: RootState) => state.user.password);
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const phone = useSelector((state: RootState) => state.user.phone);

  function renderForm() {
    switch (step) {
      case 2:
        return <Step2Form setStep={setStep} />;
      case 3:
        return <Step3Form setIsSuccess={setIsSuccess} />;
      default:
        return <Step1Form step={step} setStep={setStep} />;
    }
  }

  function handleSuccessRegistration() {
    const user = {
      email,
      username,
      password,
      firstName,
      lastName,
      phone,
    };

    localStorage.setItem('token', 'awe2sefF2fxcegf27awdd9');
    localStorage.setItem('user', JSON.stringify(user));

    dispatch({ type: 'IS_LOGGED', payload: true });
    navigate('/');
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
              handleSuccessRegistration();
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
