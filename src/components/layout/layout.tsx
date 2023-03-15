import { useDispatch, useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';

import { AppDispatch, RootState } from '../../redux/store';
import { BurgerShadow } from '../burger-shadow';
import { Footer } from '../footer';
import { Header } from '../header';
import { LoadingScreen } from '../loading-screen';
import { ModalError } from '../modal-error';

export function Layout() {
  const isBurgerOpen: boolean = useSelector((state: RootState) => state.interface.isBurgerOpen);
  const isFetchError: boolean = useSelector((state: RootState) => state.interface.isFetchError);
  const isLoading: boolean = useSelector((state: RootState) => state.interface.isLoading);

  const dispatch: AppDispatch = useDispatch();

  function setLoaded() {
    dispatch({ type: 'IS_LOADING', payload: false });
  }
  setTimeout(setLoaded, 5000);

  return (
    <div className='layout'>
      {isBurgerOpen && <BurgerShadow />}
      {isFetchError && <ModalError />}
      {/* {isLoading && !isFetchError && <LoadingScreen />} */}
      {isLoading && <LoadingScreen />}
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
