import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import warning from '../../assets/svg/warning-circle.svg';

import styles from './modal-ask.module.css';

interface ModalAskProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalAsk(props: ModalAskProps) {
  const navigate = useNavigate()
  // const isLoading: boolean = useSelector((state: RootState) => state.interface.isLoading);

  function closeModal() {
    props.setVisibility(false)

  }
  function deleteUser() {
    localStorage.clear()
    navigate('/auth')
  }

  return (
    <div className={classNames(styles.ModalAsk)} data-test-id='error'>
      <img src={warning} alt='warning' />
      <p>Вы уверены, что хотите удалить профиль?</p>
      <button className={styles.ModalAsk__answerYes} type='button' onClick={() => deleteUser()}>
        Да
      </button>
      <button className={styles.ModalAsk__answerNo} type='button' onClick={() => closeModal()}>
        Нет
      </button>

    </div >
  );
}
