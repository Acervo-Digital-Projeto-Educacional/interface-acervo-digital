// Classe responsável por fazer requisições à API - livro
import { SERVER_CFG } from "../AppConfig";
import type LivroDTO from "../dto/LivroDTO";

class LivroRequests {
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

    async obterListaDeLivros(): Promise<LivroDTO[] | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const listaDeLivros: LivroDTO[] = await respostaAPI.json();
                return listaDeLivros;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            throw error;
        }
    }

    async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(formLivro)
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

    async removerLivro(id_livro: number): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
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

    async obterLivroPorId(id_livro: number): Promise<LivroDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
                headers: this.getHeaders()
            });

            if (respostaAPI.ok) {
                const livro: LivroDTO = await respostaAPI.json();
                return livro;
            } else {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }
        } catch (error: any) {
            console.error(`Erro ao fazer a consulta de livro por ID. ${error}`);
            throw error;
        }
    }

    async atualizarLivro(id_livro: number, formLivro: LivroDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}/${id_livro}`, {
                method: 'PUT',
                headers: this.getHeaders(),
                body: JSON.stringify(formLivro)
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

export default new LivroRequests;