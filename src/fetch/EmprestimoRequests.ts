const API_URL = import.meta.env.VITE_API_SERVER_URL;

// Classe responsável por fazer requisições à API - emprestimo
class EmprestimoRequests {
    private serverURL;
    private endpointEmprestimo;

    constructor() {
        this.serverURL = API_URL;
        this.endpointEmprestimo = '/api/emprestimos';
    }

    async obterListaDeEmprestimos() {
        try {
            const token = localStorage.getItem('token');

            const respostaAPI = await fetch(`${this.serverURL}${this.endpointEmprestimo}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${token}`
                }
            });

            if (respostaAPI.ok) {
                const listaDeEmprestimos = await respostaAPI.json();
                return listaDeEmprestimos;
            } else {
                throw new Error("Não foi possível listar os empréstimos.");
            }
        } catch (error) {
            console.error(`Erro ao fazer a consulta de empréstimos. ${error}`);
            return;
        }
    }
}

export default new EmprestimoRequests;