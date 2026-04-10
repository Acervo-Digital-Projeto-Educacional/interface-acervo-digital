import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesLivro from "../../../components/Listagem/DetalhesLivro/DetalhesLivro";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesLivro(): JSX.Element {
    const { id_livro } = useParams();
    return (
        <>
            <Navegacao />
            <DetalhesLivro id_livro={Number(id_livro)} />
            <Rodape />
        </>
    );
}

export default PDetalhesLivro;