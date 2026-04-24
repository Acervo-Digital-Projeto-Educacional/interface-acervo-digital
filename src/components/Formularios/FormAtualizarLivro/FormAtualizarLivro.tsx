import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';
import { showCustomToast } from '../../../utils/notify';

function FormAtualizarLivro() {
    const navigate = useNavigate();
    const { id_livro } = useParams<{ id_livro: string }>();
    const [formData, setFormData] = useState<LivroDTO>({
        titulo: '',
        autor: '',
        editora: '',
        ano_publicacao: '',
        isbn: '',
        quant_total: 0,
        quant_disponivel: 0,
        quant_aquisicao: 0,
        valor_aquisicao: 0,
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const carregarLivro = async () => {
            if (id_livro) {
                const livro = await LivroRequests.obterLivroPorId(Number(id_livro));
                if (livro) {
                    setFormData(livro);
                } else {
                    showCustomToast("Livro não encontrado", "Erro", 2);
                    navigate('/lista/livros');
                }
                setLoading(false);
            }
        };
        carregarLivro();
    }, [id_livro, navigate]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = Number(value);
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (id_livro) {
            const resposta = await LivroRequests.atualizarLivro(Number(id_livro), formData);
            if (resposta) {
                showCustomToast("Livro atualizado com sucesso.", "Sucesso", 1);
                navigate('/lista/livros');
            } else {
                showCustomToast("Erro ao atualizar livro.", "Erro", 2);
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
                    <h1 className="text-2xl sm:text-3xl font-bold">Atualizar Livro</h1>
                    <p className="text-slate-300 text-sm mt-1">Edite as informações bibliográficas e de estoque</p>
                </header>

                <form onSubmit={handleSubmit} className="p-6 sm:p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Título */}
                        <div className="flex flex-col gap-1.5 md:col-span-2">
                            <label htmlFor="titulo" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Título do Livro
                            </label>
                            <input
                                type="text"
                                name="titulo"
                                id="titulo"
                                required
                                minLength={3}
                                value={formData.titulo}
                                onChange={handleChange}
                                placeholder="Ex: O Senhor dos Anéis"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Autor */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="autor" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Autor
                            </label>
                            <input
                                type="text"
                                name="autor"
                                id="autor"
                                required
                                minLength={3}
                                value={formData.autor}
                                onChange={handleChange}
                                placeholder="Nome do autor"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Editora */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="editora" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Editora
                            </label>
                            <input
                                type="text"
                                name="editora"
                                id="editora"
                                required
                                value={formData.editora}
                                onChange={handleChange}
                                placeholder="Nome da editora"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Ano de Publicação */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="ano_publicacao" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Ano de Publicação
                            </label>
                            <input
                                type="number"
                                name="ano_publicacao"
                                id="ano_publicacao"
                                required
                                value={formData.ano_publicacao}
                                onChange={handleChange}
                                placeholder="Ex: 2024"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* ISBN */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="isbn" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                ISBN
                            </label>
                            <input
                                type="text"
                                name="isbn"
                                id="isbn"
                                required
                                pattern="^(?:(?:\d[\ |-]?){9}[\d|X]|(?:\d[\ |-]?){13})$"
                                maxLength={14}
                                title="O ISBN deve ser um formato válido de 10 ou 13 dígitos"
                                value={formData.isbn}
                                onChange={handleChange}
                                placeholder="ISBN-10 ou ISBN-13"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Valor de Aquisição */}
                        <div className="flex flex-col gap-1.5">
                            <label htmlFor="valor_aquisicao" className="text-sm font-bold text-slate-700 uppercase tracking-wider">
                                Valor de Aquisição (R$)
                            </label>
                            <input
                                type="number"
                                name="valor_aquisicao"
                                id="valor_aquisicao"
                                required
                                min={0}
                                step={0.01}
                                value={formData.valor_aquisicao}
                                onChange={handleChange}
                                placeholder="0.00"
                                className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                            />
                        </div>

                        {/* Quantidades - Grid interno */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:col-span-2 mt-2">
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="quant_total" className="text-xs font-bold text-slate-500 uppercase">
                                    Quant. Total
                                </label>
                                <input
                                    type="number"
                                    name="quant_total"
                                    id="quant_total"
                                    required
                                    min={0}
                                    value={formData.quant_total}
                                    onChange={handleChange}
                                    className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="quant_disponivel" className="text-xs font-bold text-slate-500 uppercase">
                                    Quant. Disponível
                                </label>
                                <input
                                    type="number"
                                    name="quant_disponivel"
                                    id="quant_disponivel"
                                    required
                                    min={0}
                                    value={formData.quant_disponivel}
                                    onChange={handleChange}
                                    className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                                />
                            </div>
                            <div className="flex flex-col gap-1.5">
                                <label htmlFor="quant_aquisicao" className="text-xs font-bold text-slate-500 uppercase">
                                    Quant. Aquisição
                                </label>
                                <input
                                    type="number"
                                    name="quant_aquisicao"
                                    id="quant_aquisicao"
                                    required
                                    min={0}
                                    value={formData.quant_aquisicao}
                                    onChange={handleChange}
                                    className="w-full border-2 border-slate-200 rounded-lg p-2.5 focus:border-slate-500 focus:outline-none transition-all bg-slate-50"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 mt-10">
                        <input
                            type="submit"
                            value="ATUALIZAR LIVRO"
                            className="flex-1 bg-slate-700 text-white font-bold py-3.5 rounded-lg cursor-pointer hover:bg-slate-600 shadow-md hover:shadow-lg transition-all active:scale-95 uppercase tracking-wide text-sm"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/livros')}
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

export default FormAtualizarLivro;
