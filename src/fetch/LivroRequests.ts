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
}

export default new LivroRequests;