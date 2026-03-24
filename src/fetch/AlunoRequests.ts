// Classe responsável por fazer requisições à API - aluno
import { SERVER_CFG } from "../AppConfig";
import type AlunoDTO from "../dto/AlunoDTO";

class AlunoRequests {
    async obterListaDeAlunos(): Promise<AlunoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LISTAR_ALUNOS}`);

            if(respostaAPI.ok) {
                const listaDeAlunos: AlunoDTO = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                throw new Error("Não foi possível listar os alunos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de alunos. ${error}`);
            return;
        }
    }
}

export default new AlunoRequests;