import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PListagemLivro from './pages/PListagem/PListagemLivro/PListagemLivro'
import PListagemEmprestimo from './pages/PListagem/PListagemEmprestimo/PListagemEmprestimo'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PAtualizarAluno from './pages/PAtualizar/PAtualizarAluno/PAtualizarAluno'
import PDetalhesLivro from './pages/PDetalhes/PDetalhesLivro/PDetalhesLivro'
import PAtualizarLivro from './pages/PAtualizar/PAtualizarLivro/PAtualizarLivro'
// import ProtectedRoute from './components/Rotas/ProtectedRoutes'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/lista/livros' element={<PListagemLivro />} />
        <Route path='/lista/emprestimos' element={<PListagemEmprestimo />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
        <Route path='/detalhes/livro/:id_livro' element={<PDetalhesLivro />} />
        <Route path='/atualizar/aluno/:id_aluno' element={<PAtualizarAluno />} />
        <Route path='/atualizar/livro/:id_livro' element={<PAtualizarLivro />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
