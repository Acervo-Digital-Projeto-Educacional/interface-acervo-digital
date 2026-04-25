import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AlunoRequests from '../../../fetch/AlunoRequests';
import type AlunoDTO from '../../../dto/AlunoDTO';
import Utilitario from '../../../utils/Utilitario';
import { showCustomToast } from '../../../utils/notify';

function FormAtualizarAluno() {
    const navigate = useNavigate();
    const { id_aluno } = useParams<{ id_aluno: string }>();
    const [formData, setFormData] = useState<AlunoDTO>({
        nome: '',
        sobrenome: '',
        data_nascimento: new Date(),
        endereco: '',
        email: '',
        celular: ''
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarAluno = async () => {
            if (id_aluno) {
                const aluno = await AlunoRequests.obterAlunoPorId(Number(id_aluno));
                if (aluno) {
                    setFormData(aluno);
                } else {
                    showCustomToast("Aluno não encontrado", "Erro", 2);
                    navigate('/lista/alunos');
                }
                setLoading(false);
            }
        };
        carregarAluno();
    }, [id_aluno, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        if (name === 'celular') {
            const celularFormatado = Utilitario.formatarTelefone(value);
            setFormData(prev => ({ ...prev, [name]: celularFormatado }));
            return;
        }

        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!Utilitario.validarEmail(formData.email)) {
            showCustomToast("E-mail inválido", "Erro no e-mail", 2);
            return;
        }
        if (id_aluno) {
            const resposta = await AlunoRequests.atualizarAluno(Number(id_aluno), formData);
            if (resposta) {
                showCustomToast("Aluno atualizado com sucesso", "Sucesso", 1);
                // Admin volta para a lista; user vai para os próprios detalhes
                const role = localStorage.getItem('role');
                navigate(role === 'admin' ? '/lista/alunos' : `/detalhes/aluno/${id_aluno}`);
            } else {
                showCustomToast("Erro ao atualizar aluno", "Erro", 2);
            }
        }
    };

    const voltarDestino = () => {
        const role = localStorage.getItem('role');
        return role === 'admin' ? '/lista/alunos' : `/detalhes/aluno/${id_aluno}`;
    };

    if (loading) {
        return <div className="flex justify-center items-center h-[76vh]">Processando...</div>;
    }

    return (
        <section className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <div className="w-full max-w-4xl mx-auto bg-white rounded-xl shadow-xl border border-slate-300 overflow-hidden animate-fade-in transition-all duration-300">
                <header className="bg-slate-700 p-6 text-white text-center">
                    <h1 className="text-2xl sm:text-3xl font-bold">Atualizar Aluno</h1>
                    <p className="text-slate-300 text-sm mt-1">Edite as informações do cadastro do aluno</p>
                </header>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Nome */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="nome" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Nome
                            </label>
                            <input
                                type="text"
                                name="nome"
                                id="nome"
                                required
                                minLength={3}
                                value={formData.nome}
                                onChange={handleChange}
                                placeholder="Nome do aluno"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Sobrenome */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="sobrenome" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Sobrenome
                            </label>
                            <input
                                type="text"
                                name="sobrenome"
                                id="sobrenome"
                                required
                                minLength={3}
                                value={formData.sobrenome}
                                onChange={handleChange}
                                placeholder="Sobrenome do aluno"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Data de Nascimento */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="data_nascimento" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Data de Nascimento
                            </label>
                            <input
                                type="date"
                                name="data_nascimento"
                                id="data_nascimento"
                                value={Utilitario.formatarDataParaInput(formData.data_nascimento)}
                                onChange={handleChange}
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Celular */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="celular" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Celular
                            </label>
                            <input
                                type="tel"
                                name="celular"
                                id="celular"
                                value={Utilitario.formatarTelefone(formData.celular as string)}
                                onChange={handleChange}
                                placeholder="(xx) x xxxx-xxxx"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Endereço */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label htmlFor="endereco" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Endereço Residencial
                            </label>
                            <input
                                type="text"
                                name="endereco"
                                id="endereco"
                                minLength={6}
                                value={formData.endereco}
                                onChange={handleChange}
                                placeholder="Rua, número, bairro, cidade - UF"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* E-mail */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label htmlFor="email" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                E-mail Acadêmico
                            </label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="exemplo@email.com"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <input
                            type="submit"
                            value="ATUALIZAR CADASTRO"
                            className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600 shadow-md hover:shadow-lg transition-all active:scale-95 uppercase tracking-wide text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => navigate(voltarDestino())}
                            className="flex-1 bg-white border-2 border-slate-200 text-slate-600 font-bold py-3.5 rounded-lg hover:bg-slate-50 transition-all shadow-sm uppercase tracking-wide text-sm"
                        >
                            VOLTAR
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

export default FormAtualizarAluno;
