import { useEffect, useState, type JSX } from "react";
import { Card } from "primereact/card";
import { Skeleton } from "primereact/skeleton";
import { Tag } from "primereact/tag";
import { Divider } from "primereact/divider";
import { Message } from "primereact/message";
import EmprestimoRequests from "../../../fetch/EmprestimoRequests";
import type EmprestimoDTO from "../../../dto/EmprestimoDTO";
import Utilitario from "../../../utils/Utilitario";
import { useNavigate } from "react-router-dom";

interface DetalheEmprestimoProps {
    id_emprestimo: number;
}

/**
 * Componente que exibe os detalhes de um empréstimo.
 * Faz a consulta à API com base no ID fornecido e monta a visualização.
 */
function DetalheEmprestimo({ id_emprestimo }: DetalheEmprestimoProps): JSX.Element {
    const [emprestimo, setEmprestimo] = useState<EmprestimoDTO | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        async function buscarDados() {
            setLoading(true);
            setError(null);

            try {
                const dados = await EmprestimoRequests.obterEmprestimoPorId(id_emprestimo);
                if (dados) {
                    setEmprestimo(dados);
                } else {
                    setError("Empréstimo não encontrado.");
                }
            } catch (err) {
                console.error("Erro ao carregar detalhes do empréstimo:", err);
                setError("Ocorreu um erro ao buscar as informações do empréstimo.");
            } finally {
                setLoading(false);
            }
        }

        buscarDados();
    }, [id_emprestimo]);

    // Renderização do estado de carregamento (Skeleton)
    if (loading) {
        return (
            <Card className="shadow-4">
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Skeleton shape="circle" size="4rem" />
                        <div className="flex-1">
                            <Skeleton width="60%" height="2rem" className="mb-2" />
                            <Skeleton width="40%" />
                        </div>
                    </div>
                    <Divider />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i}>
                                <Skeleton width="30%" className="mb-2" />
                                <Skeleton width="80%" height="1.5rem" />
                            </div>
                        ))}
                    </div>
                </div>
            </Card>
        );
    }

    // Renderização do estado de erro
    if (error || !emprestimo) {
        return (
            <div className="flex justify-center p-4">
                <Message severity="error" text={error || "Erro desconhecido."} />
            </div>
        );
    }

    const { aluno, livro } = emprestimo;

    const getStatusEmprestimoSeverity = (status?: string) => {
        switch (status?.toLowerCase()) {
            case "devolvido":
                return "success";
            case "em andamento":
            case "ativo":
                return "info";
            case "atrasado":
                return "danger";
            default:
                return "warning";
        }
    };

    // Renderização dos detalhes do empréstimo
    return (
        <main className="bg-gray-200 flex-1 py-6 sm:py-10 px-4 overflow-y-auto">
            <Card
                title={`Empréstimo #${emprestimo.id_emprestimo}`}
                className="shadow-lg animate-fade-in transition-all duration-300 w-full max-w-4xl p-4 sm:p-6 md:p-8 mx-auto font-bold text-xl"
            >
                {/* Status e datas do empréstimo */}
                <div className="flex flex-col gap-2">
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                        <span className="text-gray-500 font-medium tracking-tight">Status do Empréstimo</span>
                        <div className="flex flex-wrap items-center gap-2">
                            <Tag
                                value={emprestimo.status_emprestimo ?? "Indefinido"}
                                severity={getStatusEmprestimoSeverity(emprestimo.status_emprestimo)}
                                className="px-3 py-1"
                            />
                            {emprestimo.status_emprestimo_registro !== undefined && (
                                <Tag
                                    value={emprestimo.status_emprestimo_registro ? "Registro Ativo" : "Registro Inativo"}
                                    severity={emprestimo.status_emprestimo_registro ? "success" : "danger"}
                                    className="px-3 py-1"
                                />
                            )}
                        </div>
                    </div>

                    <Divider />

                    {/* Datas */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-2">
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data do Empréstimo</span>
                            <span className="text-gray-700 font-medium">
                                {Utilitario.formatarData(emprestimo.data_emprestimo)}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Data de Devolução</span>
                            <span className="text-gray-700 font-medium">
                                {emprestimo.data_devolucao
                                    ? Utilitario.formatarData(emprestimo.data_devolucao)
                                    : "Não devolvido"}
                            </span>
                        </div>
                    </div>

                    <Divider />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-2">

                        {/* Seção do Aluno */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-user text-blue-500"></i> Dados do Aluno
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-blue-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Nome</span>
                                    <span className="text-gray-700 font-medium">
                                        {aluno.nome && aluno.sobrenome
                                            ? `${aluno.nome} ${aluno.sobrenome}`
                                            : "Não informado"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">RA</span>
                                    <span className="text-gray-700 font-medium">{aluno.ra ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">E-mail</span>
                                    <span className="text-gray-700 font-medium break-all">{aluno.email ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Celular</span>
                                    <span className="text-gray-700 font-medium">
                                        {aluno.celular ? Utilitario.formatarTelefone(aluno.celular) : "Não informado"}
                                    </span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Aluno</span>
                                    <Tag
                                        value={aluno.status_aluno ? "Ativo" : "Inativo"}
                                        severity={aluno.status_aluno ? "success" : "danger"}
                                        className="w-fit mt-1 rounded-sm"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Seção do Livro */}
                        <div className="flex flex-col gap-4">
                            <h3 className="text-lg font-semibold text-primary-700 flex items-center gap-2">
                                <i className="pi pi-book text-green-500"></i> Dados do Livro
                            </h3>
                            <div className="flex flex-col gap-3 ml-1 border-l-2 border-green-50 relative pl-4">
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Título</span>
                                    <span className="text-gray-700 font-medium">{livro.titulo ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Autor</span>
                                    <span className="text-gray-700 font-medium">{livro.autor ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Editora</span>
                                    <span className="text-gray-700 font-medium">{livro.editora ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Ano de Publicação</span>
                                    <span className="text-gray-700 font-medium">{livro.ano_publicacao ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">ISBN</span>
                                    <span className="text-gray-700 font-medium">{livro.isbn ?? "Não informado"}</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Status do Livro</span>
                                    <div className="flex flex-wrap gap-2 mt-1">
                                        {livro.status_livro_emprestado && (
                                            <Tag value={livro.status_livro_emprestado} severity="warning" className="rounded-sm" />
                                        )}
                                        <Tag
                                            value={livro.status_livro ? "Disponível" : "Indisponível"}
                                            severity={livro.status_livro ? "success" : "danger"}
                                            className="rounded-sm"
                                        />
                                    </div>
                                </div>
                                <div className="flex flex-col">
                                    <span className="text-xs uppercase text-gray-400 font-bold tracking-wider">Quantidade Disponível</span>
                                    <span className="text-gray-700 font-medium">
                                        {livro.quant_disponivel ?? "—"} / {livro.quant_total ?? "—"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
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
            </Card>

            <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8">
                <button
                    className="w-full bg-slate-700 hover:bg-slate-500 text-white px-4 py-3 md:mb-2 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/atualizar/emprestimo/${emprestimo.id_emprestimo}`)}
                >
                    Editar Empréstimo
                </button>
                <button
                    className="w-full bg-white text-black hover:bg-slate-500 px-4 py-3 rounded-md font-bold transition-all shadow-md active:scale-95"
                    onClick={() => navigate(`/lista/emprestimos`)}
                >
                    Voltar
                </button>
            </div>
        </main>
    );
}

export default DetalheEmprestimo;