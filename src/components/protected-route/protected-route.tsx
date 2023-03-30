import { useDispatch } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  const authLogin = localStorage.getItem('token');
  const dispatch = useDispatch();
  const userData = localStorage.getItem('user');

  if (authLogin && authLogin !== 'guest_token') {
    dispatch({ type: 'IS_LOGGED', payload: true });

    if (userData) {
      const user = JSON.parse(userData);

      console.log(user);

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
