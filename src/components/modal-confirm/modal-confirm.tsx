import { useEffect } from 'react';
// import { useSelector } from 'react-redux';
import classNames from 'classnames';

import check from '../../assets/svg/check.svg';

import styles from './modal-confirm.module.css';

interface ModalConfirmProps {
  setVisibility: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ModalConfirm(props: ModalConfirmProps) {
  // const isLoading: boolean = useSelector((state: RootState) => state.interface.isLoading);

  useEffect(() => {
    function closeModal() {
      props.setVisibility(false)
    }

    setTimeout(closeModal, 1500);
  }
  );




  return (
    <div className={classNames(styles.ModalConfirm)} data-test-id='confirm'>
      <img src={check} alt='check' />
      <p>Книга забронирована!</p>
    </div >
  );
}
