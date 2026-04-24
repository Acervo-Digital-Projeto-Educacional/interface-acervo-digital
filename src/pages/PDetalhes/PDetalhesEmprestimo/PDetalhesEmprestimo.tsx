import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import DetalheEmprestimo from "../../../components/Listagem/DetalhesEmprestimo/DetalhesEmprestimo";
import Rodape from "../../../components/Rodape/Rodape";
import { useParams } from "react-router-dom";

function PDetalhesEmprestimo(): JSX.Element {
    const { id_emprestimo } = useParams();

    return (
        <>
            <Navegacao />
            <DetalheEmprestimo id_emprestimo={Number(id_emprestimo)} />
            <Rodape />
        </>
    );
}

export default PDetalhesEmprestimo;