import { Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ProtectedRoutes from './component/ProtectRoutes/ProtectRoutes';
import Home from './component/Home/Home';
import Dashboard from './component/Dashboard/Dashboard';
import Profile from './component/Profile/Profile';

function App() {


  return (
    <>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route element={<ProtectedRoutes />}>
          <Route  element={<Dashboard />}>
            <Route path='/home' element={<Home />} />
            <Route path='/profile' element={<Profile/>}/>
          </Route>

        </Route>
      </Routes>


    </>
  )
}

export default App
