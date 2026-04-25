import { type JSX } from "react";
import Navegacao from "../../../components/Navegacao/Navegacao";
import FormUsuario from "../../../components/Formularios/FormUsuario/FormUsuario";
import Rodape from "../../../components/Rodape/Rodape";

function PCadastroUsuario(): JSX.Element {
    return (
        <div className="min-h-screen flex flex-col">
            <Navegacao />
            <FormUsuario />
            <Rodape />
        </div>
    );
}

export default PCadastroUsuario;