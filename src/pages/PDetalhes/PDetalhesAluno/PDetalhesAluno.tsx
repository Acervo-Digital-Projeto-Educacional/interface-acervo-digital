import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalhesAluno from "../../../components/Listagem/DetalhesAluno/DetalhesAluno";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesAluno(): JSX.Element {
    const { id_aluno } = useParams();

    return (
        <>
            <Navegacao />
            <DetalhesAluno id_aluno={Number(id_aluno)} />
            <Rodape />
        </>
    );
}

export default PDetalhesAluno;