import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import LivroRequests from '../../../fetch/LivroRequests';
import EmprestimoRequests from '../../../fetch/EmprestimoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import type LivroDTO from '../../../dto/LivroDTO';
import type EmprestimoDTO from '../../../dto/EmprestimoDTO';
import Utilitario from '../../../utils/Utilitario';
import { showCustomToast } from '../../../utils/notify';

function FormAtualizarEmprestimo() {
    const navigate = useNavigate();
    const { id_emprestimo } = useParams<{ id_emprestimo: string }>();
    const [alunos, setAlunos] = useState<AlunoDTO[]>([]);
    const [livros, setLivros] = useState<LivroDTO[]>([]);
    const [formData, setFormData] = useState<any>({
        aluno: { id_aluno: 0 },
        livro: { id_livro: 0 },
        data_emprestimo: '',
        data_devolucao: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarDados = async () => {
            const listaAlunos = await AlunoRequests.obterListaDeAlunos();
            const listaLivros = await LivroRequests.obterListaDeLivros();

            if (listaAlunos && Array.isArray(listaAlunos)) {
                setAlunos(listaAlunos);
            }
            if (listaLivros && Array.isArray(listaLivros)) {
                setLivros(listaLivros);
            }

            if (id_emprestimo) {
                const emprestimo = await EmprestimoRequests.obterEmprestimoPorId(Number(id_emprestimo));
                if (emprestimo) {
                    setFormData({
                        aluno: { id_aluno: emprestimo.aluno.id_aluno },
                        livro: { id_livro: emprestimo.livro.id_livro },
                        data_emprestimo: Utilitario.formatarDataParaInput(emprestimo.data_emprestimo),
                        data_devolucao: Utilitario.formatarDataParaInput(emprestimo.data_devolucao)
                    });
                } else {
                    showCustomToast("Empréstimo não encontrado", "Erro", 2);
                    navigate('/lista/emprestimos');
                }
            }
            setLoading(false);
        };

        carregarDados();
    }, [id_emprestimo, navigate]);

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

        if (formData.aluno.id_aluno === 0 || formData.livro.id_livro === 0) {
            showCustomToast("Por favor, selecione um aluno e um livro", "Erro", 2);
            return;
        }

        if (id_emprestimo) {
            try {
                await EmprestimoRequests.atualizarEmprestimo(Number(id_emprestimo), formData as unknown as EmprestimoDTO);
                showCustomToast("Empréstimo atualizado com sucesso", "Sucesso", 1);
                navigate('/lista/emprestimos');
            } catch (error: any) {
                showCustomToast(error.message || "Erro ao atualizar empréstimo", "Atenção", 2);
            }
        }
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <section className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden animate-fade-in transition-all duration-300">
                <header className="bg-slate-700 p-6 text-white text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">Atualizar Empréstimo</h1>
                    <p className="text-slate-300 text-sm mt-1">Gerencie os vínculos entre alunos e obras</p>
                </header>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Aluno */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="id_aluno" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Aluno
                            </label>
                            <select
                                name="id_aluno"
                                id="id_aluno"
                                required
                                value={formData.aluno.id_aluno}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50 h-[3rem] text-slate-700"
                            >
                                <option value="">Selecione um aluno</option>
                                {alunos.map(aluno => (
                                    <option key={aluno.id_aluno} value={aluno.id_aluno}>
                                        {aluno.nome} {aluno.sobrenome}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Livro */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="id_livro" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Livro
                            </label>
                            <select
                                name="id_livro"
                                id="id_livro"
                                required
                                value={formData.livro.id_livro}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50 h-[3rem] text-slate-700"
                            >
                                <option value="">Selecione um livro</option>
                                {livros.map(livro => (
                                    <option key={livro.id_livro} value={livro.id_livro}>
                                        {livro.titulo}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Data do Empréstimo */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="data_emprestimo" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Data do Empréstimo
                            </label>
                            <input
                                type="date"
                                name="data_emprestimo"
                                id="data_emprestimo"
                                required
                                value={formData.data_emprestimo}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Data de Devolução */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="data_devolucao" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Data de Devolução (Opcional)
                            </label>
                            <input
                                type="date"
                                name="data_devolucao"
                                id="data_devolucao"
                                value={formData.data_devolucao}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <input
                            type="submit"
                            value="ATUALIZAR EMPRÉSTIMO"
                            className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600 shadow-md hover:shadow-lg transition-all active:scale-95 uppercase tracking-wide text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/emprestimos')}
                            className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3.5 rounded-lg hover:bg-slate-50 transition-all shadow-sm uppercase tracking-wide text-sm"
                        >
                            VOLTAR PARA LISTAGEM
                        </button>
                    </div>
                </form>
            </div>

            <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}

export default FormAtualizarEmprestimo;
