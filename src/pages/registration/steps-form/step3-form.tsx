/* eslint-disable jsx-a11y/no-autofocus */
import { Dispatch, SetStateAction } from 'react';
import { Controller, useController, useForm } from 'react-hook-form';
import InputMask from 'react-input-mask';
import classNames from 'classnames';

import styles from '../registration-page.module.css';

type Step3FormProps = {
  setIsSuccess: Dispatch<SetStateAction<boolean>>;
};

export function Step3Form({ setIsSuccess }: Step3FormProps) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'all' });

  const { field: emailField, fieldState: emailFieldState } = useController({
    name: 'email',
    control,
    rules: {
      required: true,
      pattern: /^[\w.-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
    },
  });
  const onSubmit = () => {
    console.log(0);
    if (!errors.phoneNumber && !emailFieldState.invalid) {
      console.log(1);
    }
  };

  return (
    <form
      key='thirdForm'
      className={styles.Registration__form}
      onSubmit={handleSubmit(onSubmit)}
      autoComplete='off'
      noValidate={true}
    >
      <div className={styles.Registration__inputsContainer}>
        <div className={styles.Registration__inputWrapper}>
          <Controller
            name='phoneNumber'
            control={control}
            rules={{
              required: true,
              pattern: {
                value: /^\+375 \([0-9]{2}\) [0-9]{3}-[0-9]{2}-[0-9]{2}$/,
                message: 'В формате +375 (xx) xxx-xx-xx',
              },
            }}
            render={({ field }) => (
              <InputMask
                className={classNames(styles.Registration__formItem, {
                  [styles.Registration__formItem_error]: errors.phoneNumber,
                })}
                // mask={[
                //   '+',
                //   '3',
                //   '7',
                //   '5',
                //   ' ',
                //   '(',
                //   /\x/,
                //   /\d/,
                //   ')',
                //   ' ',
                //   /\d/,
                //   /\d/,
                //   /\d/,
                //   '-',
                //   /\d/,
                //   /\d/,
                //   '-',
                //   /\d/,
                //   /\d/,
                // ]}
                mask='+375 (99) 999-99-99'
                maskPlaceholder='x'
                value={field.value || ''}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required={true}
              />
            )}
          />
          {!errors.phoneNumber && (
            <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}> </p>
          )}
          {errors.phoneNumber && (
            <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
              В формате +375 (xx) xxx-xx-xx
            </p>
          )}
          <span className={styles.Registration__placeholder}>Номер телефона</span>
        </div>
        <div className={styles.Registration__inputWrapper}>
          <input
            className={classNames(styles.Registration__formItem, {
              [styles.Registration__formItem_error]: emailFieldState.error,
            })}
            key='email'
            {...emailField}
            value={emailField.value || ''}
            type='text'
            required={true}
          />
          <span className={styles.Registration__placeholder}>E-mail</span>
          {!emailFieldState.invalid && <p className={styles.Registration__formTips}>{'  '}</p>}
          {emailFieldState.invalid && (
            <p className={`${styles.Registration__formTips} ${styles.Registration__formTips_error}`}>
              Введите корректный e-mail
            </p>
          )}
        </div>
      </div>
      <button className={styles.Registration__formButton} type='submit'>
        зарегистрироваться
      </button>
    </form>
  );
}
