/* eslint-disable jsx-a11y/no-autofocus */

import { log } from 'console';

import { useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

import arrow from '../../assets/svg/arrow-registration.svg';
import check from '../../assets/svg/check.svg';
import eyeClosed from '../../assets/svg/eye-closed.svg';
import eyeOpened from '../../assets/svg/eye-open.svg';

import styles from './registration-page.module.css';

export function RegistrationPage() {
  const [isError, setIsError] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [isShowAllErrorLogin, setIsShowAllErrorLogin] = useState<boolean>(false);
  const [isShowAllErrorPassword, setIsShowAllErrorPassword] = useState<boolean>(false);
  const [step, setStep] = useState<number>(1);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordEntered, setisPasswordEntered] = useState<boolean>(false);

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

  const hasOnlyLatinAndNumbers = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
  const hasLatinSymbol = (value: string) => /[a-zA-Z]/.test(value);
  const hasUpperCaseLetter = (value: string) => /[A-ZА-Я]/.test(value);
  const hasNumber = (value: string) => /\d+/.test(value);
  const minLength = (value: string) => /^(?=.*\d).{8,}$/.test(value);

  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { field: loginField, fieldState: loginFieldState } = useController({
    name: 'login',
    control,
    rules: {
      required: true,
      validate: {
        hasOnlyLatinAndNumbers,
        hasLatinSymbol,
        hasNumber,
      },
    },
  });
  const { field: passwordField, fieldState: passwordFieldState } = useController({
    name: 'password',
    control,
    rules: {
      required: true,
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      validate: {
        hasUpperCaseLetter,
        hasNumber,
      },
    },
  });
  const onSubmit = () => {
    setIsShowAllErrorPassword(true);
    if (passwordFieldState.invalid) {
      setIsShowAllErrorPassword(true);
    }
    if (loginFieldState.invalid) {
      setIsShowAllErrorLogin(true);
    }
    if (!loginFieldState.invalid && !passwordFieldState.invalid) {
      setIsShowAllErrorLogin(false);
      setIsShowAllErrorPassword(false);
      setStep(step + 1);
    }
  };

  function renderLoginValidationMessage() {
    if (loginFieldState.invalid && errors.login && errors.login.type === 'required') {
      return (
        <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasLatinSymbol') {
      return (
        <p className={`${styles.Registration__formTips} `}>
          Используйте для логина <span className={`${styles.Registration__formTips_error}`}>латинский алфавит</span> и
          цифры
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasNumber') {
      return (
        <p className={`${styles.Registration__formTips}`}>
          Используйте для логина латинский алфавит и
          <span className={`${styles.Registration__formTips_error}`}> цифры</span>
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasOnlyLatinAndNumbers') {
      return (
        <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }
    if (loginFieldState.invalid) {
      return (
        <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }

    return <p className={`${styles.Registration__formTips} `}>Используйте для логина латинский алфавит и цифры</p>;
  }
  console.log(errors.password);
  function renderPasswordValidationMessage() {
    if (errors.password) {
      return (
        <p className={`${styles.Registration__formTips} `}>
          Пароль
          <span
            className={classNames(styles.Registration__formTips, styles.Registration__formTips_noPadding, {
              [styles.Registration__formTips_error]: !minLength(passwordField.value),
            })}
          >
            {' '}
            не менее 8 символов
          </span>
          , с
          <span
            className={classNames(styles.Registration__formTips, styles.Registration__formTips_noPadding, {
              [styles.Registration__formTips_error]: !hasUpperCaseLetter(passwordField.value),
            })}
          >
            {' '}
            заглавной буквой
          </span>{' '}
          и
          <span
            className={classNames(styles.Registration__formTips, styles.Registration__formTips_noPadding, {
              [styles.Registration__formTips_error]: !hasNumber(passwordField.value),
            })}
          >
            {' '}
            цифрой
          </span>
        </p>
      );
    }

    return (
      <p className={`${styles.Registration__formTips} `}> Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
    );
  }

  function renderForm() {
    switch (step) {
      case 2:
        return (
          <form
            className={styles.Registration__form}
            onSubmit={() => {
              setStep(step + 1);
            }}
            autoComplete='off'
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
        return (
          <form
            className={styles.Registration__form}
            onSubmit={handleSubmit(onSubmit)}
            autoComplete='off'
            noValidate={true}
          >
            <div className={styles.Registration__inputsContainer}>
              <div className={styles.Registration__inputWrapper}>
                <input
                  key='login'
                  id='login'
                  {...loginField}
                  value={loginField.value || ''}
                  onBlur={(e) => {
                    setIsShowAllErrorLogin(false);
                    if (loginFieldState.invalid) {
                      setIsShowAllErrorLogin(true);
                    }

                    return e.target.value;
                  }}
                  onChange={loginField.onChange}
                  className={styles.Registration__formItem}
                  type='text'
                  required={true}
                />
                <span className={styles.Registration__placeholder}>Придумайте логин для входа</span>
                <div>{!isShowAllErrorLogin && renderLoginValidationMessage()}</div>
                {isShowAllErrorLogin && (
                  <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
                    Используйте для логина латинский алфавит и цифры
                  </p>
                )}
              </div>
              {isPasswordEntered && (
                <div className={styles.Registration__ItemWrapper}>
                  <div className={styles.Registration__inputWrapper}>
                    <input
                      key='password'
                      id='password'
                      {...passwordField}
                      value={passwordField.value || ''}
                      onBlur={(e) => {
                        setIsShowAllErrorPassword(false);
                        if (passwordFieldState.invalid && !isShowAllErrorPassword) {
                          setIsShowAllErrorPassword(true);
                        }
                        console.log(isShowAllErrorPassword);

                        return e.target.value;
                      }}
                      onChange={passwordField.onChange}
                      className={styles.Registration__formItem}
                      type={isPasswordShow ? 'text' : 'password'}
                      required={true}
                      autoFocus={true}
                      onFocus={() => setisPasswordEntered(true)}
                    />
                    <button
                      className={styles.Registration__formItemImage}
                      type='button'
                      onClick={() => handlePasswordVisibility()}
                    >
                      <div className={styles.Registration__passwprdImgContainer}>
                        {!passwordFieldState.invalid && passwordField.value && <img src={check} alt='check' />}
                        <img src={isPasswordShow ? eyeOpened : eyeClosed} alt='show/hide' />
                      </div>
                    </button>
                    <span className={styles.Registration__placeholder}>Пароль</span>
                    <div>{!isShowAllErrorPassword && renderPasswordValidationMessage()}</div>
                    <div>
                      {isShowAllErrorPassword && (
                        <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
                          Пароль не менее 8 символов, с заглавной буквой и цифрой
                        </p>
                      )}
                    </div>
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
