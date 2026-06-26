import './App.css'
import DrawCanvas from './components/canvas'
import Login from './pages/loginpage'
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/signuppage'

function App() {
  
  return (
    <>
    <Routes>
     <Route path='/' element={<DrawCanvas />}/>
     <Route path='/login' element={<Login />}/>
     <Route path='/signup' element={<SignUp />} />
     </Routes>
    </>
  )
}

export default App
