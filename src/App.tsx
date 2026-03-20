import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PListaAluno from './pages/PLista/PListaAluno/PListaAluno'
import PListaLivro from './pages/PLista/PListaLivro/PListaLivro'
import PListaEmprestimo from './pages/PLista/PListaEmprestimo/PListaEmprestimo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/aluno' element={<PListaAluno />} /> 
        <Route path='/livro' element={<PListaLivro />} /> 
        <Route path='/emprestimo' element={<PListaEmprestimo />} /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App
