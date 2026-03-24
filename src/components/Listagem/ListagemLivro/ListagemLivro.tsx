import { type JSX } from "react";
import { useState, useEffect } from "react";
import type LivroDTO from "../../../dto/LivroDTO";
import LivroRequests from "../../../fetch/LivroRequests";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import Utilitario from "../../../utils/Utilitario";

function ListagemLivro(): JSX.Element {
    const [livros, setLivros] = useState<LivroDTO[]>([]);

    useEffect(() => {
        const fetchLivros = async () => {
            try {
                const listaDeLivros = await LivroRequests.obterListaDeLivros();
                setLivros(Array.isArray(listaDeLivros) ? listaDeLivros : []);
            } catch (error) {
                console.error(`Erro ao buscar livros. ${error}`);
                alert("Erro ao criar listagem de livros");
            }
        }

        fetchLivros();
    }, []);

    return (
        <main className="bg-gray-200 h-[76vh]">
            <h1 className="text-[3rem] text-center pt-[1.5rem]">Livros</h1>
            <p className="text-[1.75rem] text-center p-[0.5rem]">Lista de livros</p>

            <div className="overflow-auto h-[60vh]">
                <DataTable
                    value={livros}
                    paginator
                    rows={7}
                    rowsPerPageOptions={[7, 14, 28, 56]}
                    tableStyle={{ minWidth: '50rem' }}
                    rowClassName={() => "hover:bg-blue-50 transition-colors duration-200 even:bg-gray-50"}
                    pt={{
                        root: { className: "rounded-lg shadow-md overflow-hidden max-w-[100rem] mx-auto" },
                        thead: { className: "bg-slate-700" },
                        tbody: { className: "divide-y divide-gray-200" },
                        paginator: {
                            root: { className: "bg-white border-t border-gray-200" },
                            pageButton: { className: "px-3 py-1 rounded hover:bg-blue-100 text-blue-600" },
                        }
                    }}
                >
                    <Column field="titulo" header="Título" style={{ width: '20%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 font-medium" }
                        }}
                    />
                    <Column field="autor" header="Autor" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="editora" header="Editora" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="ano_publicacao" header="Ano de Publicação" style={{ width: '10%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="isbn" header="ISBN" style={{ width: '15%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                    <Column field="quant_total" header="Qtd. Total" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="quant_disponivel" header="Qtd. Disponível" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="quant_aquisicao" header="Qtd. Aquisição" style={{ width: '8%' }}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700 text-center" }
                        }}
                    />
                    <Column field="valor_aquisicao" header="Valor de Aquisição" style={{ width: '10%' }}
                        body={(livro: LivroDTO) => Utilitario.formatarParaReal(livro.valor_aquisicao)}
                        pt={{
                            headerCell: { className: "bg-slate-700 text-white p-3 text-left font-semibold" },
                            bodyCell: { className: "p-3 text-gray-700" }
                        }}
                    />
                </DataTable>
            </div>
        </main>
    );
}

export default ListagemLivro;