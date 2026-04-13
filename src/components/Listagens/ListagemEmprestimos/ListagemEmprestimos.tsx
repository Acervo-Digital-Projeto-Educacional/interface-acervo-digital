import { type JSX } from "react";

function ListagemEmprestimos(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>Empréstimos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Aluno</th>
                        <th>Livro</th>
                        <th>Retirada</th>
                        <th>Devolução</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody> {/* Dados fictícios (por enquanto) */}
                    <tr>
                        <td>1</td>
                        <td>Pedro Roque</td>
                        <td>O Senhor dos Anéis: A Sociedade do Anel</td>
                        <td>01/04/2026</td>
                        <td>08/04/2026</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Roberto Silva</td>
                        <td>O Hobbit</td>
                        <td>11/04/2026</td>
                        <td>18/04/2026</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                </tbody>
            </table>
        </main>
    );
}

export default ListagemEmprestimos;