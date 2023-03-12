/* eslint-disable jsx-a11y/no-autofocus */

import { Dispatch, SetStateAction, useState } from 'react';
import { useController, useForm } from 'react-hook-form';
import classNames from 'classnames';

import check from '../../../assets/svg/check.svg';
import eyeClosed from '../../../assets/svg/eye-closed.svg';
import eyeOpened from '../../../assets/svg/eye-open.svg';

import styles from '../registration-page.module.css';

type Step1FormProps = {
  step: number;
  setStep: Dispatch<SetStateAction<number>>;
};

export function Step1Form({ step, setStep }: Step1FormProps) {
  const [isShowAllErrorLogin, setIsShowAllErrorLogin] = useState<boolean>(false);
  const [isShowAllErrorPassword, setIsShowAllErrorPassword] = useState<boolean>(false);

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

  return (
    <form className={styles.Registration__form} onSubmit={handleSubmit(onSubmit)} autoComplete='off' noValidate={true}>
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
            <p className={styles.Registration__formTips}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
          </div>
        )}
      </div>
      <button className={styles.Registration__formButton} type='submit'>
        Следующий шаг
      </button>
    </form>
  );
}
