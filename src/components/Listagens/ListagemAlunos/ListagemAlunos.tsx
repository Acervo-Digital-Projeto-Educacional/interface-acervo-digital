import { type JSX } from "react";

function ListagemAlunos(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>Alunos</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>RA</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>Telefone</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody> {/* Dados fictícios (por enquanto) */}
                    <tr>
                        <td>1</td>
                        <td>A123456</td>
                        <td>Felisberto Felis</td>
                        <td>felisberto@email.com</td>
                        <td>(16) 9 9999-9999</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>A626351</td>
                        <td>Pedro Roque</td>
                        <td>roque_febroso@email.com</td>
                        <td>(16) 9 1245-0666</td>
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

export default ListagemAlunos;