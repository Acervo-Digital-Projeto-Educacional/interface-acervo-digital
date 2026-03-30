// Classe responsável por fazer requisições à API - livro
import { SERVER_CFG } from "../AppConfig";
import type LivroDTO from "../dto/LivroDTO";

class LivroRequests {
    async obterListaDeLivros(): Promise<LivroDTO | undefined> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`);

            if (respostaAPI.ok) {
                const listaDeLivros: LivroDTO = await respostaAPI.json();
                return listaDeLivros;
            } else {
                throw new Error("Não foi possível listar os livros");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de livros. ${error}`);
            return;
        }
    }
    async enviarFormularioLivro(formLivro: LivroDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_LIVROS}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formLivro)
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

export default new LivroRequests;