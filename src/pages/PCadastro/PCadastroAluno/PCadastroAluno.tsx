import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import FormAluno from "../../../components/Formularios/FormAluno/FormAluno";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroAluno(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormAluno />
            <Rodape />
        </div>
    );
}

export default PCadastroAluno;