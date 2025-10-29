import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
  const token = Cookies.get('token');
 return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
