import { Route, Routes} from 'react-router-dom'
import './App.css'
import Login from './component/Login/Login';
import SignUp from './component/SignUp/SignUp';

function App() {
  

  return (
    <>
    <Routes>
     <Route path='/' element={<Login/>}/>
     <Route path ='/signup' element={<SignUp/>}/>
    </Routes>
    
     
    </>
  )
}

export default App
