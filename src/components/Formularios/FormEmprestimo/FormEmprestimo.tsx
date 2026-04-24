import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import { showCustomToast } from '../../../utils/notify';

function FormEmprestimo() {
    const navigate = useNavigate();
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState<any>({
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: new Date().toISOString().split('T')[0],
        data_devolucao: ''
    });

    useEffect(() => {
        const carregarDados = async () => {
            const listaAlunos = await AlunoRequests.obterListaDeAlunos();
            const listaLivros = await LivroRequests.obterListaDeLivros();

            if (listaAlunos && Array.isArray(listaAlunos)) {
                setAlunos(listaAlunos);
            } else if (listaAlunos) {
                // Se a API retornar apenas um objeto (improvável, mas tratando conforme o DTO atual)
                setAlunos([listaAlunos as any]);
            }

            if (listaLivros && Array.isArray(listaLivros)) {
                setLivros(listaLivros);
            } else if (listaLivros) {
                setLivros([listaLivros as any]);
            }
        };

        carregarDados();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        if (name === 'id_aluno') {
            setFormData((prev: any) => ({
                ...prev,
                aluno: { ...prev.aluno, id_aluno: Number(value) }
            }));
        } else if (name === 'id_livro') {
            setFormData((prev: any) => ({
                ...prev,
                livro: { ...prev.livro, id_livro: Number(value) }
            }));
        } else {
            setFormData((prev: any) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validação básica
        if (formData.aluno.id_aluno === 0 || formData.livro.id_livro === 0) {
            showCustomToast("Por favor, selecione um aluno e um livro.", "Erro", 2);
            return;
        }

        const resposta = await EmprestimoRequests.enviarFormularioEmprestimo(formData as unknown as EmprestimoDTO);
        if (resposta) {
            showCustomToast("Empréstimo cadastrado com sucesso.", "Sucesso", 1);
        } else {
            showCustomToast("Erro ao cadastrar empréstimo.", "Error", 2);
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Empréstimo
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Aluno e Livro */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="id_aluno" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Aluno
                                </label>
                                <select
                                    name="id_aluno"
                                    id="id_aluno"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white appearance-none"
                                >
                                    <option value="">Selecione um aluno</option>
                                    {alunos.map(aluno => (
                                        <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                            {aluno.nome} {aluno.sobrenome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="flex-1">
                                <label htmlFor="id_livro" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Livro
                                </label>
                                <select
                                    name="id_livro"
                                    id="id_livro"
                                    required
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all bg-white appearance-none"
                                >
                                    <option value="">Selecione um livro</option>
                                    {livros.map(livro => (
                                        <option key={livro.id_livro} value={livro.id_livro}>
                                            {livro.titulo}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Linha 2: Datas */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="data_emprestimo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data do Empréstimo
                                </label>
                                <input
                                    type="date"
                                    name="data_emprestimo"
                                    id="data_emprestimo"
                                    required
                                    value={formData.data_emprestimo}
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="data_devolucao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Data de Devolução (Opcional)
                                </label>
                                <input
                                    type="date"
                                    name="data_devolucao"
                                    id="data_devolucao"
                                    onChange={handleChange}
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR EMPRÉSTIMO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="w-full bg-white border-2 border-slate-300 text-slate-600 py-4 rounded-xl font-bold text-lg hover:bg-slate-50 transition-all active:scale-[0.98]"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>
        </main>
    );
}

export default FormEmprestimo;
