import { Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';
import ProtectedRoutes from './component/ProtectRoutes/ProtectRoutes';
import Home from './component/Home/Home';

function App() {
  

  return (
    <>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path ='/signup' element={<SignUp/>}/>
     <Route path = '/forgot-password' element={<ForgotPassword/>}/>
     <Route element= {<ProtectedRoutes/>}>
     <Route path = '/home' element={<Home/>}/>
     </Route>
    </Routes>
    
     
    </>
  )
}

export default App
