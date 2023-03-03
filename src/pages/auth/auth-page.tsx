
import styles from './auth-page.module.css'

type AuthProps = {
  contentView: string;
};

export function AuthPage({ contentView }: AuthProps) {
  return <section className={styles.Auth}>
    <div className={styles.Auth__formContainer}>
      <h1 className={styles.Auth__title}>Вход в личный кабинет</h1>
      <form className={styles.Auth__form} action="">
        <input className={styles.Auth__formItem} type="text" placeholder='Логин' />
        <input className={styles.Auth__formItem} type="text" placeholder='Пароль' />
        <p className={styles.Auth__formForgot}>Забыли логин или пароль?</p>
        <button className={styles.Auth__formButton} type="submit"  >Вход</button>
      </form>
    </div>



  </section >

}

