import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LivroRequests from '../../../fetch/LivroRequests';
import type LivroDTO from '../../../dto/LivroDTO';
import { showCustomToast } from '../../../utils/notify';

function FormLivro() {
    const navigate = useNavigate();
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

    // Atualiza o state a partir de qualquer input do formulário
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;

        let parsedValue: string | number = value;
        if (type === 'number') {
            parsedValue = Number(value);
        }

        setFormData(prev => ({ ...prev, [name]: parsedValue }));
    };

    // Envia os dados para a requisição
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const resposta = await LivroRequests.enviarFormularioLivro(formData);
        if (resposta) {
            showCustomToast("Livro cadastrado com sucesso.", "Sucesso", 1);
        } else {
            showCustomToast("Erro ao cadastrar livro.", "Erro", 2);
        }
    };

    return (
        <main className="bg-gray-100 flex-1 py-8 sm:py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
            <div className="max-w-4xl mx-auto">
                <form onSubmit={handleSubmit} className="bg-white shadow-2xl rounded-2xl p-6 sm:p-10 border border-slate-200">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl text-center font-bold text-slate-800 mb-8 sm:mb-12">
                        Cadastro de Livro
                    </h1>

                    <div className="space-y-6 sm:space-y-8">
                        {/* Linha 1: Título e Autor */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-[2]">
                                <label htmlFor="titulo" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Título
                                </label>
                                <input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Digite o título do livro"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="autor" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Autor
                                </label>
                                <input
                                    type="text"
                                    name="autor"
                                    id="autor"
                                    required
                                    minLength={3}
                                    onChange={handleChange}
                                    placeholder="Nome do autor"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 2: Editora e Ano */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="editora" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Editora
                                </label>
                                <input
                                    type="text"
                                    name="editora"
                                    id="editora"
                                    required
                                    onChange={handleChange}
                                    placeholder="Nome da editora"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="ano_publicacao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Ano de Publicação
                                </label>
                                <input
                                    type="number"
                                    name="ano_publicacao"
                                    id="ano_publicacao"
                                    required
                                    onChange={handleChange}
                                    placeholder="Ex: 2024"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 3: ISBN e Valor */}
                        <div className="flex flex-col sm:flex-row gap-6">
                            <div className="flex-1">
                                <label htmlFor="isbn" className="block text-sm font-semibold text-slate-700 mb-2">
                                    ISBN
                                </label>
                                <input
                                    type="text"
                                    name="isbn"
                                    id="isbn"
                                    required
                                    pattern="^(?:(?:\d[\ |-]?){9}[\d|X]|(?:\d[\ |-]?){13})$"
                                    maxLength={14}
                                    title="O ISBN deve ser um formato válido de 10 ou 13 dígitos (ex: 8535902775 ou 978-8535902777)"
                                    onChange={handleChange}
                                    placeholder="ISBN-10 ou ISBN-13"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div className="flex-1">
                                <label htmlFor="valor_aquisicao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Valor de Aquisição (R$)
                                </label>
                                <input
                                    type="number"
                                    name="valor_aquisicao"
                                    id="valor_aquisicao"
                                    required
                                    min={0}
                                    step={0.01}
                                    onChange={handleChange}
                                    placeholder="0.00"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Linha 4: Quantidades */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                            <div>
                                <label htmlFor="quant_total" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quant. Total
                                </label>
                                <input
                                    type="number"
                                    name="quant_total"
                                    id="quant_total"
                                    required
                                    min={0}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="quant_disponivel" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quant. Disponível
                                </label>
                                <input
                                    type="number"
                                    name="quant_disponivel"
                                    id="quant_disponivel"
                                    required
                                    min={0}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="quant_aquisicao" className="block text-sm font-semibold text-slate-700 mb-2">
                                    Quant. Aquisição
                                </label>
                                <input
                                    type="number"
                                    name="quant_aquisicao"
                                    id="quant_aquisicao"
                                    required
                                    min={0}
                                    onChange={handleChange}
                                    placeholder="0"
                                    className="w-full px-4 py-3 border-2 border-slate-200 rounded-xl focus:border-slate-500 focus:outline-none transition-all placeholder:text-slate-400"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="mt-10 sm:mt-14 space-y-4">
                        <input
                            type="submit"
                            value="CADASTRAR LIVRO"
                            className="w-full bg-slate-800 text-white py-4 rounded-xl font-bold text-lg cursor-pointer hover:bg-slate-700 shadow-lg hover:shadow-xl transition-all active:scale-[0.98]"
                        />
                        <button
                            type="button"
                            onClick={() => navigate('/lista/livros')}
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

export default FormLivro;
