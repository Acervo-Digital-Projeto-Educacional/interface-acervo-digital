import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListaAluno from './pages/PLista/PListaAluno/PListaAluno'
import PListaLivro from './pages/PLista/PListaLivro/PListaLivro'
import PListaEmprestimo from './pages/PLista/PListaEmprestimo/PListaEmprestimo'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PAtualizarAluno from './pages/PAtualizar/PAtualizarAluno/PAtualizarAluno'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListaAluno />} />
        <Route path='/lista/livros' element={<PListaLivro />} />
        <Route path='/lista/emprestimos' element={<PListaEmprestimo />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
        <Route path='/atualizar/aluno/:id_aluno' element={<PAtualizarAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
