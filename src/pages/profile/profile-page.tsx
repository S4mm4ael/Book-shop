import { useController, useForm } from 'react-hook-form';
import classNames from 'classnames';

import avatar from '../../assets/png/avatar.png';

import styles from './profile-page.module.css';

export function ProfilePage() {
  const { control, handleSubmit } = useForm({ mode: 'all' });

  const { field: firstNameField, fieldState: firstNameFieldState } = useController({
    name: 'firstName',
    control,
    rules: {
      required: true,
    },
  });
  const { field: lastNameField, fieldState: lastNameFieldState } = useController({
    name: 'lastName',
    control,
    rules: {
      required: true,
    },
  });
  const onSubmit = () => {
    if (!firstNameFieldState.invalid && !lastNameFieldState.invalid) {
      console.log(firstNameField.value);
      console.log(lastNameField.value);
    }
  };

  return (
    <section className={styles.Profile}>
      <div className={styles.Profile__nameContainer}>
        <img src={avatar} alt='avatar' />
        <h2>
          Имя
          <br />
          Фамилия
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
        <div className={styles.Registration__inputsContainer}>
          <div className={styles.Registration__inputWrapper}>
            <input
              className={classNames(styles.Registration__formItem, {
                [styles.Registration__formItem_error]: firstNameFieldState.invalid,
              })}
              type='text'
              required={true}
              key='firstName'
              {...firstNameField}
              value={firstNameField.value || ''}
            />
            <span className={styles.Registration__placeholder}>Имя</span>
            {firstNameFieldState.invalid && (
              <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
                Поле не может быть пустым
              </p>
            )}
            {!firstNameFieldState.invalid && (
              <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}> </p>
            )}
          </div>

          <div className={styles.Registration__inputWrapper}>
            <input
              className={classNames(styles.Registration__formItem, {
                [styles.Registration__formItem_error]: lastNameFieldState.invalid,
              })}
              type='text'
              required={true}
              key='lastName'
              {...lastNameField}
              value={lastNameField.value || ''}
            />
            <span className={styles.Registration__placeholder}>Фамилия</span>
            {lastNameFieldState.invalid && (
              <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
                Поле не может быть пустым
              </p>
            )}
            {!lastNameFieldState.invalid && (
              <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}> </p>
            )}
          </div>
        </div>
        <button className={styles.Registration__formButton} type='submit'>
          Следующий шаг
        </button>
      </form>
      <div className={styles.Profile__booksContainer}>
        <h3>Забронированные книги</h3>
        <p className={styles.Profile__tips}>
          Здесь вы можете просмотреть забронированную книгу, а так же отменить бронь
        </p>
        <ul className={styles.Profile__booksList}>
          <li> Книга 1</li>
          <li> Книга 1</li>
          <li> Книга 1</li>
          <li> Книга 1</li>
        </ul>
      </div>
    </section>
  );
}
