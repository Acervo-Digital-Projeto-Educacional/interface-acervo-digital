import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import PHome from './pages/PHome/PHome'
import PListaAluno from './pages/PLista/PListaAluno/PListaAluno'
import PListaLivro from './pages/PLista/PListaLivro/PListaLivro'
import PListaEmprestimo from './pages/PLista/PListaEmprestimo/PListaEmprestimo'
import PCadastroAluno from './pages/PCadastro/PCadastroAluno/PCadastroAluno'
import PCadastroLivro from './pages/PCadastro/PCadastroLivro/PCadastroLivro'
import PCadastroEmprestimo from './pages/PCadastro/PCadastroEmprestimo/PCadastroEmprestimo'
import PAtualizarAluno from './pages/PAtualizar/PAtualizarAluno/PAtualizarAluno'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<PHome />} /> 
        <Route path='/aluno' element={<PListaAluno />} /> 
        <Route path='/livro' element={<PListaLivro />} /> 
        <Route path='/emprestimo' element={<PListaEmprestimo />} /> 
        <Route path='/cadastro/aluno' element={<PCadastroAluno />} />
        <Route path='/cadastro/livro' element={<PCadastroLivro />} />
        <Route path='/cadastro/emprestimo' element={<PCadastroEmprestimo />} />
        <Route path='/atualizar/aluno/:id' element={<PAtualizarAluno />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
