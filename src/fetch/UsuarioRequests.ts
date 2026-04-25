// Classe responsável por fazer requisições à API - usuários
import { SERVER_CFG } from "../AppConfig";
import type UsuarioDTO from "../dto/UsuarioDTO";

class UsuarioRequests {
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

    async enviarFormularioUsuario(formUsuario: UsuarioDTO): Promise<boolean> {
        try {
            const respostaAPI = await fetch(`${SERVER_CFG.SERVER_URL}${SERVER_CFG.ENDPOINT_USUARIOS}`, {
                method: 'POST',
                headers: this.getHeaders(),
                body: JSON.stringify(formUsuario)
            });

            if (!respostaAPI.ok) {
                const errorData = await respostaAPI.json().catch(() => ({}));
                const errorMessage = errorData.mensagem || `Erro ${respostaAPI.status}: ${respostaAPI.statusText}`;
                throw new Error(errorMessage);
            }

            console.info(`${respostaAPI.status}: ${respostaAPI.statusText}`);

            return true;
        } catch (error) {
            console.error(`Erro ao fazer consulta à API. ${error}`);
            throw error;
        }
    }
}

export default new UsuarioRequests;