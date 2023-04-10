/* eslint-disable complexity */
import React, { useEffect, useState } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames';

import avatar from '../../assets/png/avatar-big.png';
import intersect from '../../assets/png/avatar-intersect.png';
import icon from '../../assets/svg/avatar-icon.svg';
import check from '../../assets/svg/check.svg';
import eyeClosed from '../../assets/svg/eye-closed.svg';
import eyeOpened from '../../assets/svg/eye-open.svg';
import { Card } from '../../components/card';
import { ModalAsk } from '../../components/modal-ask';
// import { ModalError } from '../../components/modal-error';
import { NavigationList } from '../../components/navigation-list';
import { booksArray } from '../../mock/books';
import { AppDispatch, RootState } from '../../redux/store';
import { Book } from '../../shared/types.books';

import styles from './profile-page.module.css';

export function ProfilePage() {
  const dispatch: AppDispatch = useDispatch();
  const [isUserDataChanges, setIsUserDataChanges] = useState<boolean>(false);
  const [isShowAllErrorLogin, setIsShowAllErrorLogin] = useState<boolean>(false);
  const [isShowAllErrorPassword, setIsShowAllErrorPassword] = useState<boolean>(false);
  const [isPasswordShow, setIsPasswordShow] = useState<boolean>(false);
  const [isPasswordEntered, setisPasswordEntered] = useState<boolean>(false);
  const [isErrors, setIsErrors] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate()

  // User creds
  const username = useSelector((state: RootState) => state.user.username);
  const password = useSelector((state: RootState) => state.user.password);
  const firstName = useSelector((state: RootState) => state.user.firstName);
  const lastName = useSelector((state: RootState) => state.user.lastName);
  const email = useSelector((state: RootState) => state.user.email);
  const phone = useSelector((state: RootState) => state.user.phone);
  const bookedBooks = useSelector((state: RootState) => state.user.bookedBooks);

  useEffect(() => {


    if (localStorage.getItem('token') === 'guest_token' ||
      !localStorage.getItem('token')) {
      navigate('/auth')
    }
    // if (booked) {
    //   // eslint-disable-next-line array-callback-return
    //   JSON.parse(booked).map((bookId: number) => {
    //     if (!bookedBooks.find((id: number) => id === +bookId))
    //       dispatch({ type: 'ADD_BOOK', payload: +bookId })
    //   })
    // }

  })




  // UseForm
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({ mode: 'all' });
  // Regexp for validation
  const hasOnlyLatinAndNumbers = (value: string) => /^[a-zA-Z0-9]*$/.test(value);
  const hasLatinSymbol = (value: string) => /[a-zA-Z]/.test(value);
  const hasUpperCaseLetter = (value: string) => /[A-ZА-Я]/.test(value);
  const hasNumber = (value: string) => /\d+/.test(value);

  // Form handling
  const { field: firstNameField, fieldState: firstNameFieldState } = useController({
    name: 'firstName',
    control,
    defaultValue: firstName,
    rules: {
      required: true,
    },
  });
  const { field: lastNameField, fieldState: lastNameFieldState } = useController({
    name: 'lastName',
    control,

    defaultValue: lastName,
    rules: {
      required: true,
    },
  });
  const { field: loginField, fieldState: loginFieldState } = useController({
    name: 'login',
    control,
    defaultValue: username,
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
    defaultValue: password,
    rules: {
      required: true,
      minLength: { value: 8, message: 'Password must be at least 8 characters' },
      validate: {
        hasUpperCaseLetter,
        hasNumber,
      },
    },
  });
  const { field: emailField, fieldState: emailFieldState } = useController({
    name: 'email',
    control,
    defaultValue: email,
    rules: {
      required: true,
      pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
  });
  const onSubmit = () => {
    if (
      !firstNameFieldState.invalid &&
      !lastNameFieldState.invalid &&
      !loginFieldState.invalid &&
      !passwordFieldState.invalid &&
      !errors.phoneNumber &&
      !emailFieldState.invalid
    ) {
      dispatch({ type: 'USER_NAME', payload: loginField.value });
      dispatch({ type: 'PASSWORD', payload: passwordField.value });
      dispatch({ type: 'FIRST_NAME', payload: firstNameField.value });
      dispatch({ type: 'LAST_NAME', payload: lastNameField.value });
      dispatch({ type: 'PHONE', payload: watch('phone') });
      dispatch({ type: 'EMAIL', payload: emailField.value });
      setToLocalStorage();
      setIsErrors(false);
      setIsUserDataChanges(false);
    }
  };

  function setToLocalStorage() {
    const user = {
      email,
      firstName,
      lastName,
      password,
      phone,
      username,
    };

    localStorage.removeItem('user');
    localStorage.setItem('user', JSON.stringify(user));
  }
  function handleProfile(type: string) {
    const token = localStorage.getItem('token')
    const user = localStorage.getItem('user')

    if (type === 'logout' && token) {
      localStorage.removeItem('token')
      navigate('/auth')
    }

    if (type === 'delete' && token && user) {
      if (showModal) {
        setShowModal(false)
      }
      if (!showModal) {
        setShowModal(true)
      }
    }

  }
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
  function renderLoginValidationMessage() {
    if (loginFieldState.invalid && errors.login && errors.login.type === 'required') {
      return (
        <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasLatinSymbol') {
      return (
        <p className={`${styles.Profile__formTips} `}>
          Используйте для логина <span className={`${styles.Profile__formTips_error}`}>латинский алфавит</span> и цифры
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasNumber') {
      return (
        <p className={`${styles.Profile__formTips}`}>
          Используйте для логина латинский алфавит и<span className={`${styles.Profile__formTips_error}`}> цифры</span>
        </p>
      );
    }
    if (loginFieldState.invalid && errors.login && errors.login.type === 'hasOnlyLatinAndNumbers') {
      return (
        <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }
    if (loginFieldState.invalid) {
      return (
        <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
          Используйте для логина латинский алфавит и цифры
        </p>
      );
    }

    return <p className={`${styles.Profile__formTips} `}>Используйте для логина латинский алфавит и цифры</p>;
  }


  function renderBooks() {

    const booked = localStorage.getItem('booked');
    const booksToRender: Book[] = []

    if (booked) {
      // eslint-disable-next-line array-callback-return
      JSON.parse(booked).map((id: number) => {
        const book: Book | undefined = booksArray.books.find((item: Book) => item.id === id)

        if (book) {
          booksToRender.push(book)
        }
      }
      )

      return booksToRender.map((book: Book) => <Card key={book.title} bookItem={book} isListView={true} isProfile={true} />);
    }

    if (!booked) {
      return <p className={styles.Profile__noBooks}>Книг пока нет</p>
    }

    return null
  }

  return (

    <section className={styles.Profile}>
      {showModal && <ModalAsk setVisibility={setShowModal} />}
      <div className={styles.Profile__leftContainer}>
        <NavigationList />
      </div>
      <div className={styles.Profile__rightContainer}>
        <div className={styles.Profile__nameContainer}>
          <img className={styles.Profile__avatar} src={avatar} alt='avatar' />
          <img className={styles.Profile__avatarIntersect} src={intersect} alt='avatar-change' />
          <img className={styles.Profile__avatarIcon} height={32} src={icon} alt='avatar-icon' />
          <h2>
            {firstName}
            <br />
            {lastName}
          </h2>
        </div>
        <form
          key='secondForm'
          className={styles.Profile__form}
          onSubmit={handleSubmit(onSubmit)}
          autoComplete='off'
          noValidate={true}
        >
          <h3>Учётные данные</h3>
          <p className={styles.Profile__tips}>Здесь вы можете отредактировать информацию о себе</p>
          <div className={styles.Profile__inputsContainer}>
            <div className={styles.Profile__inputsContainer_left}>
              <div className={styles.Profile__inputWrapper}>
                <input
                  className={classNames(styles.Profile__formItem, {
                    [styles.Profile__formItem_error]: firstNameFieldState.invalid,
                    [styles.Profile__formItem_disabled]: !isUserDataChanges,
                  })}
                  type='text'
                  required={true}
                  key='firstName'
                  {...firstNameField}
                  value={firstNameField.value || ''}
                />
                <span className={styles.Profile__placeholder}>Имя</span>
                {firstNameFieldState.invalid && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                    Поле не может быть пустым
                  </p>
                )}
                {!firstNameFieldState.invalid && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}> </p>
                )}
              </div>
              <div className={styles.Profile__inputWrapper}>
                <input
                  className={classNames(styles.Profile__formItem, {
                    [styles.Profile__formItem_error]: lastNameFieldState.invalid,
                    [styles.Profile__formItem_disabled]: !isUserDataChanges,
                  })}
                  type='text'
                  required={true}
                  key='lastName'
                  {...lastNameField}
                  value={lastNameField.value || ''}
                />
                <span className={styles.Profile__placeholder}>Фамилия</span>
                {lastNameFieldState.invalid && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                    Поле не может быть пустым
                  </p>
                )}
                {!lastNameFieldState.invalid && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}> </p>
                )}
              </div>
              <div className={styles.Profile__inputWrapper}>
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
                  className={classNames(styles.Profile__formItem, {
                    [styles.Profile__formItem_error]: isShowAllErrorLogin,
                    [styles.Profile__formItem_disabled]: !isUserDataChanges,
                  })}
                  type='text'
                  required={true}
                />
                <span className={styles.Profile__placeholder}>Придумайте логин для входа</span>
                <div>{!isShowAllErrorLogin && renderLoginValidationMessage()}</div>
                {isShowAllErrorLogin && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                    Используйте для логина латинский алфавит и цифры
                  </p>
                )}
              </div>
            </div>
            <div className={styles.Profile__inputsContainer_right}>
              <div className={styles.Profile__inputWrapper}>
                <Controller
                  name='phone'
                  control={control}
                  defaultValue={phone}
                  rules={{
                    required: true,
                    pattern: {
                      value: /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                      message: 'В формате +375 (xx) xxx-xx-xx',
                    },
                  }}
                  render={({ field: phoneField }) => (
                    <InputMask
                      className={classNames(styles.Profile__formItem, {
                        [styles.Profile__formItem_error]: errors.phoneNumber,
                        [styles.Profile__formItem_disabled]: !isUserDataChanges,
                      })}
                      mask='+375 (99) 999-99-99'
                      maskPlaceholder='x'
                      value={phoneField.value || ''}
                      onChange={phoneField.onChange}
                      onBlur={phoneField.onBlur}
                      required={true}
                    />
                  )}
                />
                {!errors.phoneNumber && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}> </p>
                )}
                {errors.phoneNumber && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                    В формате +375 (xx) xxx-xx-xx
                  </p>
                )}
                <span className={styles.Profile__placeholder}>Номер телефона</span>
              </div>
              <div className={styles.Profile__inputWrapper}>
                <input
                  className={classNames(styles.Profile__formItem, {
                    [styles.Profile__formItem_error]: emailFieldState.error,
                    [styles.Profile__formItem_disabled]: !isUserDataChanges,
                  })}
                  key='email'
                  {...emailField}
                  value={emailField.value || ''}
                  type='text'
                  required={true}
                />
                <span className={styles.Profile__placeholder}>E-mail</span>
                {!emailFieldState.invalid && <p className={styles.Profile__formTips}>{'  '}</p>}
                {emailFieldState.invalid && (
                  <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                    Введите корректный e-mail
                  </p>
                )}
              </div>
              <div className={styles.Profile__inputWrapper}>
                {isPasswordEntered && (
                  <div className={styles.Profile__ItemWrapper}>
                    <div className={styles.Profile__inputWrapper}>
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
                        className={classNames(styles.Profile__formItem, {
                          [styles.Profile__formItem_error]: isShowAllErrorPassword,
                          [styles.Profile__formItem_disabled]: !isUserDataChanges,
                        })}
                        type={isPasswordShow ? 'text' : 'password'}
                        required={true}
                        // eslint-disable-next-line jsx-a11y/no-autofocus
                        autoFocus={true}
                        onFocus={() => setisPasswordEntered(true)}
                      />
                      <button
                        className={styles.Profile__formItemImage}
                        type='button'
                        onClick={() => handlePasswordVisibility()}
                      >
                        <div className={styles.Profile__passwordImgContainer}>
                          <img src={isPasswordShow ? eyeOpened : eyeClosed} alt='show/hide' />
                          {!passwordFieldState.invalid && passwordField.value && <img src={check} alt='check' />}
                        </div>
                      </button>
                      <span className={styles.Profile__placeholder}>Пароль</span>
                      <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
                        Пароль не менее 8 символов, с заглавной буквой и цифрой
                      </p>
                      <div />
                    </div>
                  </div>
                )}
                {!isPasswordEntered && (
                  <div>
                    <input
                      className={classNames(styles.Profile__formItem, {
                        [styles.Profile__formItem_disabled]: !isUserDataChanges,
                      })}
                      type='password'
                      placeholder='Введите для изменения'
                      onChange={() => setisPasswordEntered(true)}
                      required={true}
                    />
                    <p className={styles.Profile__formTips}>Пароль не менее 8 символов, с заглавной буквой и цифрой</p>
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className={styles.Profile__buttonContainer}>
            <button className={styles.Profile__formButton} type='button' onClick={() => setIsUserDataChanges(true)}>
              Редактировать
            </button>
            <button
              className={classNames(styles.Profile__formButton, {
                [styles.Profile__formButton_inactive]: !isUserDataChanges,
              })}
              type={isUserDataChanges ? 'submit' : 'button'}
            >
              Сохранить изменения
            </button>
          </div>
          {isErrors && (
            <p className={`${styles.Profile__formTips} ${styles.Profile__formTips_error}`}>
              Пожалуйста, проверьте введённые данные
            </p>
          )}
        </form>
        <div className={styles.Profile__booksContainer}>
          <h3>Забронированные книги</h3>
          <p className={styles.Profile__tips}>
            Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
          </p>
          <ul className={styles.Profile__booksList}>
            {renderBooks()}
          </ul>
        </div>
        <div className={styles.Profile__bottomContainer}>

          <button className={`${styles.Profile__formButton} ${styles.Profile__formButton_logout}`} type='button' onClick={() => handleProfile('logout')}>
            Выйти из профиля
          </button>
          <button className={`${styles.Profile__formButton} ${styles.Profile__formButton_delete}`} type='button' onClick={() => handleProfile('delete')}>
            Удалить профиль
          </button>
        </div>
      </div>

    </section>
  );
}
