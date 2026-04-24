import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PLogin from './pages/PLogin/PLogin'
import ProtectedRoute from './components/Rotas/ProtectedRoutes'

/* COMPONENTES DE ALUNO */
import PListagemAluno from './pages/PListagem/PListagemAluno/PListagemAluno'
import PDetalhesAluno from './pages/PDetalhes/PDetalhesAluno/PDetalhesAluno'
import PAtualizarAluno from './pages/PAtualizar/PAtualizarAluno/PAtualizarAluno'
import PCadastroAluno from './pages/PCadastro/PCadastroAluno/PCadastroAluno'

/* COMPONENTES DE LIVRO */
import PListagemLivro from './pages/PListagem/PListagemLivro/PListagemLivro'
import PDetalhesLivro from './pages/PDetalhes/PDetalhesLivro/PDetalhesLivro'
import PAtualizarLivro from './pages/PAtualizar/PAtualizarLivro/PAtualizarLivro'
import PCadastroLivro from './pages/PCadastro/PCadastroLivro/PCadastroLivro'

/* COMPONENTES DE EMPRESTIMO */
import PListagemEmprestimo from './pages/PListagem/PListagemEmprestimo/PListagemEmprestimo'
import PDetalhesEmprestimo from './pages/PDetalhes/PDetalhesEmprestimo/PDetalhesEmprestimo'
import PAtualizarEmprestimo from './pages/PAtualizar/PAtualizarEmprestimo/PAtualizarEmprestimo'
import PCadastroEmprestimo from './pages/PCadastro/PCadastroEmprestimo/PCadastroEmprestimo'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} />
        <Route path='/login' element={<PLogin />} />

        {/* ROTAS DE ALUNOS */}
        <Route path='/lista/alunos' element={<PListagemAluno />} />
        <Route path='/detalhes/aluno/:id_aluno' element={<PDetalhesAluno />} />
        <Route path='/atualizar/aluno/:id_aluno' element={<PAtualizarAluno />} />
        <Route path='/cadastro/aluno' element={<PCadastroAluno />} />

        {/* ROTAS DE LIVROS */}
        <Route path='/lista/livros' element={<PListagemLivro />} />
        <Route path='/detalhes/livro/:id_livro' element={<PDetalhesLivro />} />
        <Route path='/atualizar/livro/:id_livro' element={<PAtualizarLivro />} />
        <Route path='/cadastro/livro' element={<PCadastroLivro />} />

        {/* ROTAS DE EMPRÉSTIMOS */}
        <Route path='/lista/emprestimos' element={<PListagemEmprestimo />} />
        <Route path='/detalhes/emprestimo/:id_emprestimo' element={<PDetalhesEmprestimo />} />
        <Route path='/atualizar/emprestimo/:id_emprestimo' element={<PAtualizarEmprestimo />} />
        <Route path='/cadastro/emprestimo' element={<PCadastroEmprestimo />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
