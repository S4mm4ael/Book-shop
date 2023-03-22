import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const authLogin = localStorage.getItem('token');
  const dispatch = useDispatch();

  if (authLogin && authLogin !== 'guest_token') {
    dispatch({ type: 'IS_LOGGED', payload: true });
  }

  return authLogin ? <Outlet /> : <Navigate to='/auth' replace={true} />;
}
