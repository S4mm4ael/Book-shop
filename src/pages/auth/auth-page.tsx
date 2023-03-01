
import styles from './auth-page.module.css'

type AuthProps = {
  contentView: string;
};

export function AuthPage({ contentView }: AuthProps) {
  return <section className={styles.Auth}>auth-page</section>;
}

