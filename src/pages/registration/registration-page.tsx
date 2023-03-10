/* eslint-disable jsx-a11y/no-autofocus */

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import arrow from '../../assets/svg/arrow-registration.svg';
import eyeClosed from '../../assets/svg/eye-closed.svg';
import eyeOpened from '../../assets/svg/eye-open.svg';

import styles from './registration-page.module.css';

export function RegistrationPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordEntered, setisPasswordEntered] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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

  function renderForm(step: number) {
    switch (step) {
      case 2:
        return (
          <form
            className={styles.Registration__form}
            onSubmit={() => {
              setStep(step + 1);
            }}
          >
            <div className={styles.Registration__inputsContainer}>
              <div className={styles.Registration__inputWrapper}>
                <input className={styles.Registration__formItem} type='text' required={true} />
                <span className={styles.Registration__placeholder}>Имя</span>
                <p className={styles.Registration__formTips}> </p>
              </div>

              <div className={styles.Registration__inputWrapper}>
                <input className={styles.Registration__formItem} type='text' required={true} />
                <span className={styles.Registration__placeholder}>Фамилия</span>
                <p className={styles.Registration__formTips}> </p>
              </div>
            </div>
            <button className={styles.Registration__formButton} type='submit'>
              Следующий шаг
            </button>
          </form>
        );
      case 3:
        return (
          <form
            className={styles.Registration__form}
            onSubmit={() => {
              setIsSuccess(true);
              setStep(step + 1);
            }}
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
        return (
          <form
            className={styles.Registration__form}
            onSubmit={handleSubmit((data) => {
              setStep(step + 1);
              console.log(data);
            })}
          >
            <div className={styles.Registration__inputsContainer}>
              <div className={styles.Registration__inputWrapper}>
                <input
                  {...register('login', {
                    minLength: {
                      value: 2,
                      message: 'поле не может быть пустым',
                    },
                  })}
                  className={styles.Registration__formItem}
                  type='text'
                  required={true}
                />
                <span className={styles.Registration__placeholder}>Придумайте логин для входа</span>
                <p className={styles.Registration__formTips}>Используйте для логина латинский алфавит и цифры</p>
              </div>
              {isPasswordEntered && (
                <div className={styles.Registration__ItemWrapper}>
                  <div className={styles.Registration__inputWrapper}>
                    <input
                      {...register('password', {
                        minLength: {
                          value: 8,
                          message: 'не менее 8 символов',
                        },
                      })}
                      className={styles.Registration__formItem}
                      type={isPasswordShow ? 'text' : 'password'}
                      required={true}
                      autoFocus={true}
                      onChange={() => setisPasswordEntered(true)}
                    />
                    <button
                      className={styles.Registration__formItemImage}
                      type='button'
                      onClick={() => handlePasswordVisibility()}
                    >
                      <img src={isPasswordShow ? eyeOpened : eyeClosed} alt='show/hide' />{' '}
                    </button>
                    <span className={styles.Registration__placeholder}>Пароль</span>
                    <p className={styles.Registration__formTips}>
                      Пароль не менее 8 символов, с заглавной буквой и цифрой
                    </p>
                  </div>
                </div>
              )}
              {!isPasswordEntered && (
                <div>
                  <input
                    className={styles.Registration__formItem}
                    type='password'
                    placeholder='Пароль'
                    onChange={() => setisPasswordEntered(true)}
                    required={true}
                  />
                  <p className={styles.Registration__formTips}>
                    Пароль не менее 8 символов, с заглавной буквой и цифрой
                  </p>
                </div>
              )}
            </div>
            <button className={styles.Registration__formButton} type='submit'>
              Следующий шаг
            </button>
          </form>
        );
    }
  }
  console.log(errors);

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
          {renderForm(step)}
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
