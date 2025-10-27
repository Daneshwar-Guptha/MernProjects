import { Outlet, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const ProtectedRoutes = () => {
  const token = Cookies.get('token'); // read cookie safely
  console.log("Token from cookie:", token);

  return token ? <Outlet /> : <Navigate to="/" />;
};

export default ProtectedRoutes;
