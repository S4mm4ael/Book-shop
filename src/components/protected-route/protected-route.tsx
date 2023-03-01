import { Navigate, Outlet } from 'react-router-dom';

export function ProtectedRoute() {
  // const location = useLocation();
  const authLogin = localStorage.getItem('token');


  return authLogin
    ? <Outlet />
    : <Navigate to="/auth" replace={true} />;
}

