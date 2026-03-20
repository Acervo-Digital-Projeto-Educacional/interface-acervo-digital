import type { JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import Rodape from "../../../components/Rodape/Rodape";

function PListaEmprestimo(): JSX.Element {
    return (
        <>
            <Navegacao />
            <h1>Está é a página do empréstimo</h1>
            <Rodape />
        </>
    );
}

export default PListaEmprestimo;