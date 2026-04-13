import { type JSX } from "react"

function ListagemLivros(): JSX.Element {
    return (
        <main> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <h1>Livros</h1>

            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Titulo</th>
                        <th>Autor</th>
                        <th>ISBN</th>
                        <th>Quant. Disponível</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody> {/* Dados fictícios (por enquanto) */}
                    <tr>
                        <td>1</td>
                        <td>Livro 7</td>
                        <td>Autor 9</td>
                        <td>7111111111</td>
                        <td>3</td>
                        <td>
                            <a href="#">Atualizar</a>
                            <a href="#">Detalhes</a>
                            <a href="#">Deletar</a>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Livro 4</td>
                        <td>Autor 12</td>
                        <td>4111111111</td>
                        <td>6</td>
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

export default ListagemLivros;