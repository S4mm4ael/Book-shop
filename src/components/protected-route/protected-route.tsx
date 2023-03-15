import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  // add mock to token
  localStorage.setItem('token', 'testToken');
  //
  const authLogin = localStorage.getItem('token');

  return authLogin ? <Outlet /> : <Navigate to='/auth' replace={true} />;
}
