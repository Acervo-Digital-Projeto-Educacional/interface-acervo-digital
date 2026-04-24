import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import ListagemLivros from "../../../components/Listagem/ListagemLivros/ListagemLivros";
import Rodape from "../../../components/Rodape/Rodape";

function PListagemLivro(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <ListagemLivros />
            <Rodape />
        </div>
    );
}

export default PListagemLivro;