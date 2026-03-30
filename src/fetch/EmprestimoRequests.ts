// Classe responsável por fazer requisições à API - emprestimo
import { SERVER_CFG } from "../AppConfig";
import type EmprestimoDTO from "../dto/EmprestimoDTO";

class EmprestimoRequests {
    async obterListaDeEmprestimos(): Promise<EmprestimoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}`);

            if(respostaAPI.ok) {
                const listaDeEmprestimos: EmprestimoDTO = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error("Não foi possível listar os empréstimos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
            return;
        }
    }

    async enviarFormularioEmprestimo(formEmprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formEmprestimo)
            });

            if (!respostaAPI.ok) {
                throw new Error(`Erro ${respostaAPI.status}: ${respostaAPI.statusText}`);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            return false;
        }
    }
}

export default new EmprestimoRequests;