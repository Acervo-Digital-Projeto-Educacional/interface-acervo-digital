// Classe responsável por fazer requisições à API - aluno
import { SERVER_CFG } from "../AppConfig";
import type AlunoDTO from "../dto/AlunoDTO";

class AlunoRequests {
    private getHeaders() {
        const token = localStorage.getItem('token');
        const headers: HeadersInit = {
            'Content-Type': 'application/json'
        };
        if (token) {
            headers['x-access-token'] = token;
        }
        return headers;
    }

    async obterListaDeAlunos(): Promise<AlunoDTO[] | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const listaDeAlunos: AlunoDTO[] = await respostaAPI.json();
                return listaDeAlunos;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de alunos. ${error}`);
            throw error;
        }
    }

    async enviarFormularioAluno(formAluno: AlunoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(formAluno)
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error: any) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }

    async removerAluno(id_aluno: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                method: 'DELETE',
                headers: this.getHeaders()
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error: any) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }

    async obterAlunoPorId(id_aluno: number): Promise<AlunoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const aluno: AlunoDTO = await respostaAPI.json();
                return aluno;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de aluno por ID. ${error}`);
            throw error;
        }
    }

    async atualizarAluno(id_aluno: number, formAluno: AlunoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_ALUNOS}/${id_aluno}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(formAluno)
            });

            if (!respostaAPI.ok) {
                // Tenta extrair a mensagem de erro enviada pela API
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status} ${respostaAPI.statusText}`);

            return true;
        } catch (error: any) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            // Relança o erro para que o componente (FormAtualizarAluno) possa capturá-lo e exibir no Toast
            throw error;
        }
    }
}

export default new AlunoRequests;