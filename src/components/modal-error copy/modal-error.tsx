import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import cross from '../../assets/svg/cross-black.svg';
import warning from '../../assets/svg/warning-circle.svg';
import { RootState } from '../../redux/store';

import styles from './modal-error.module.css';

export function ModalError() {
  const refModal = useRef<HTMLDivElement>(null);

  const isLoading: boolean = useSelector((state: RootState) => state.interface.isLoading);

  function closeModal() {
    if (refModal.current) {
      refModal.current.style.display = 'none'
    }

  }

  return (
    <div ref={refModal} className={classNames(styles.ModalError)} data-test-id='error'>
      <img src={warning} alt='warning' />
      <p>Что-то пошло не так. Обновите страницу через некоторое время.</p>
      <button className={styles.ModalError__close} type='button' onClick={() => closeModal()}>
        {' '}
        <img src={cross} alt='close' />
      </button>
    </div >
  );
}
