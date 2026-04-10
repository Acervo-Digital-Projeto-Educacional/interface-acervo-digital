import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/login' element={<PLogin />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
