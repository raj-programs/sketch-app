import './App.css'
import DrawCanvas from './components/canvas'
import Login from './pages/loginpage'
import { Routes, Route } from "react-router-dom"
import SignUp from './pages/signuppage'
import Dashboard from './pages/dashboard'

function App() {
  
  return (
    <>
    <Routes>
     <Route path='/' element={<DrawCanvas />}/>
     <Route path='/dashboard' element={<Dashboard />}/>
     </Routes>
    </>
  )
}

export default App
