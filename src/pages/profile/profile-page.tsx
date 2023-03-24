import { useController, useForm } from 'react-hook-form';
import classNames from 'classnames';

import avatar from '../../assets/png/avatar-big.png';
import intersect from '../../assets/png/avatar-intersect.png';
import icon from '../../assets/svg/avatar-icon.svg';

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
        <img className={styles.Profile__avatar} src={avatar} alt='avatar' />
        <img className={styles.Profile__avatarIntersect} src={intersect} alt='avatar-change' />
        <img className={styles.Profile__avatarIcon} height={32} src={icon} alt='avatar-icon' />
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
        <div className={styles.Profile__inputsContainer}>
          <div className={styles.Profile__inputWrapper}>
            <input
              className={classNames(styles.Profile__formItem, {
                [styles.Profile__formItem_error]: firstNameFieldState.invalid,
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
        </div>
        <button className={styles.Profile__formButton} type='button'>
          Редактировать
        </button>
        <button className={styles.Profile__formButton} type='submit'>
          Сохранить изменения
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
      <div className={styles.Profile__bottomContainer}>
        <button type='button'>Выйти из профиля</button>
      </div>
    </section>
  );
}
