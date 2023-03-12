/* eslint-disable jsx-a11y/no-autofocus */

import { Dispatch, SetStateAction } from 'react';
import { useController, useForm } from 'react-hook-form';
import classNames from 'classnames';

import styles from '../registration-page.module.css';

type Step2FormProps = {
  setStep: Dispatch<SetStateAction<number>>;
};

export function Step2Form({ setStep }: Step2FormProps) {
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
      setStep(3);
    }
  };

  return (
    <form
      key='secondForm'
      className={styles.Registration__form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      noValidate={true}
    >
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
  );
}
