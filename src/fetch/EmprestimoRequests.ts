// Classe responsável por fazer requisições à API - emprestimo
import { SERVER_CFG } from "../AppConfig";
import type EmprestimoDTO from "../dto/EmprestimoDTO";

class EmprestimoRequests {
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

    async obterListaDeEmprestimos(): Promise<EmprestimoDTO[] | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos: EmprestimoDTO[] = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
            throw error;
        }
    }

    async enviarFormularioEmprestimo(formEmprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(formEmprestimo)
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

    async removerEmprestimo(id_emprestimo: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}/${id_emprestimo}`, {
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

    async obterEmprestimoPorId(id_emprestimo: number): Promise<EmprestimoDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}/${id_emprestimo}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const emprestimo: EmprestimoDTO = await respostaAPI.json();
                return emprestimo;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de empréstimo por ID. ${error}`);
            throw error;
        }
    }

    async atualizarEmprestimo(id_emprestimo: number, formEmprestimo: EmprestimoDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_EMPRESTIMOS}/${id_emprestimo}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(formEmprestimo)
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
}

export default new EmprestimoRequests;