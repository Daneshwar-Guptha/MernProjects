import { Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';
import ForgotPassword from './component/ForgotPassword/ForgotPassword';

function App() {
  

  return (
    <>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path ='/signup' element={<SignUp/>}/>
     <Route path = '/forgot-password' element={<ForgotPassword/>}/>
    </Routes>
    
     
    </>
  )
}

export default App
