import { type JSX } from "react";

function ListagemAlunos(): JSX.Element {
    return (
        <main className="bg-gray-200 h-[76vh]"> {/* Web Semântica SEO (Search Engine Optimizer) */}
            <div className="w-8/10 flex m-auto p-12">
                <h1 className="w-9/10 text-3xl text-center">Alunos</h1>
                <a href="#" className="w-1/10 p-3 text-md bg-slate-700 rounded-md text-center text-white font-bold flex items-center justify-center hover:cursor-pointer">
                    Novo Aluno
                </a>
            </div>

            <div className="w-8/10 max-w-[80%] max-h-7/10 overflow-auto overscroll-none m-auto border border-slate-800">
                <table className="table-auto w-full border-collapse text-sm">
                    <thead className="bg-slate-700 sticky top-0 z-10">
                        <tr>
                            <th className="border border-slate-600 text-white">ID</th>
                            <th className="border border-slate-600 text-white p-4">RA</th>
                            <th className="border border-slate-600 text-white">Nome</th>
                            <th className="border border-slate-600 text-white">E-mail</th>
                            <th className="border border-slate-600 text-white">Telefone</th>
                            <th className="border border-slate-600 text-white">Ações</th>
                        </tr>
                    </thead>
                    <tbody> {/* Dados fictícios (por enquanto) */}
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>1</td>
                            <td className="p-3">A123456</td>
                            <td>Felisberto Felis</td>
                            <td>felisberto@email.com</td>
                            <td>(16) 9 9999-9999</td>
                            <td>
                                <a href="#" className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a href="#" className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a href="#" className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>

                        {/* APAGAR */}
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                        <tr className="border-b-2 text-center odd:bg-slate-300 even:bg-slate-100 hover:bg-slate-600 hover:text-white hover:cursor-pointer">
                            <td>2</td>
                            <td className="p-1.5">A626351</td>
                            <td>Pedro Roque</td>
                            <td>roque_febroso@email.com</td>
                            <td>(16) 9 1245-0666</td>
                            <td>
                                <a className="inline-block bg-sky-600 p-2 m-2 w-1/5 rounded-md text-white text-center">Detalhes</a>
                                <a className="inline-block bg-emerald-400 p-2 m-2 w-1/5 rounded-md text-white">Atualizar</a>
                                <a className="inline-block bg-red-600 p-2 m-2 w-1/5 rounded-md text-white">Deletar</a>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </main>
    );
}

export default ListagemAlunos;