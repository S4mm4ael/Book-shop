import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const authLogin = localStorage.getItem('token');

  const dispatch = useDispatch();

  if (authLogin && authLogin !== 'guest_token') {
    dispatch({ type: 'IS_LOGGED', payload: true });
    const userData = localStorage.getItem('user');

    if (userData) {
      const user = JSON.parse(userData);

      dispatch({ type: 'USER_NAME', payload: user.username });
      dispatch({ type: 'PASSWORD', payload: user.password });
      dispatch({ type: 'FIRST_NAME', payload: user.firstName });
      dispatch({ type: 'LAST_NAME', payload: user.lastName });
      dispatch({ type: 'PHONE', payload: user.phone });
      dispatch({ type: 'EMAIL', payload: user.email });
    }
  }

  return authLogin ? <Outlet /> : <Navigate to='/auth' replace={true} />;
}
