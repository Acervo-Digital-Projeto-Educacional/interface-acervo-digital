import { useState, useRef, useEffect, type JSX } from "react";
import { Avatar } from 'primereact/avatar';
import { useNavigate } from 'react-router-dom';
import AuthRequests from "../../fetch/AuthRequests";
import appIcon from "../../assets/app-icon.png";

interface NavItem {
    label: string;
    icon: string;
    url: string;
}

function Navegacao(): JSX.Element {
    const [isAuthenticated] = useState(() => {
        const isAuth = localStorage.getItem('isAuth');
        const token = localStorage.getItem('token');
        return !!(isAuth && token && AuthRequests.checkTokenExpiry());
    });
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const navigate = useNavigate();

    const nome = localStorage.getItem('nome') || 'Usuário';
    const email = localStorage.getItem('email') || '';
    const avatarImage = "https://primefaces.org/cdn/primereact/images/avatar/amyelsner.png";

    // Fecha o menu ao clicar fora
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setMenuOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Bloqueia scroll do body quando menu mobile está aberto
    useEffect(() => {
        document.body.style.overflow = menuOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [menuOpen]);

    const navItems: NavItem[] = [
        { label: 'Home', icon: 'pi pi-home', url: '/' },
        ...(isAuthenticated ? [
            { label: 'Alunos', icon: 'pi pi-users', url: '/lista/alunos' },
            { label: 'Livros', icon: 'pi pi-book', url: '/lista/livros' },
            { label: 'Empréstimos', icon: 'pi pi-send', url: '/lista/emprestimos' },
        ] : []),
    ];

    const handleNavClick = (url: string) => {
        navigate(url);
        setMenuOpen(false);
    };

    return (
        <header className="bg-slate-700 relative z-50">
            {/* ── Barra principal ── */}
            <div className="flex items-center justify-between px-4 py-3 min-h-[64px]">

                {/* Lado esquerdo: logo + itens desktop */}
                <div className="flex items-center gap-6">
                    <img
                        alt="logo"
                        src={appIcon}
                        className="h-10 w-auto cursor-pointer"
                        onClick={() => navigate('/')}
                    />

                    {/* Menu desktop — oculto em mobile */}
                    <nav className="hidden md:flex items-center gap-1">
                        {navItems.map((item) => (
                            <button
                                key={item.url}
                                onClick={() => navigate(item.url)}
                                className="flex items-center gap-2 text-white text-sm px-3 py-2 rounded hover:bg-white/10 transition-colors"
                            >
                                <i className={item.icon} />
                                <span>{item.label}</span>
                            </button>
                        ))}
                    </nav>
                </div>

                {/* Lado direito: ações do usuário + botão hamburguer */}
                <div className="flex items-center gap-3">
                    {/* Ações do usuário — sempre visíveis */}
                    {isAuthenticated ? (
                        <div className="flex items-center gap-2 md:gap-3">
                            <div className="hidden sm:flex flex-col items-end">
                                <p className="text-white font-semibold m-0 text-sm leading-tight">{nome}</p>
                                <p className="text-white/70 text-xs m-0 leading-tight">{email}</p>
                            </div>
                            <Avatar image={avatarImage} shape="circle" className="!w-9 !h-9" />
                            <button
                                className="hidden md:flex bg-white text-slate-700 px-4 py-1.5 rounded border-none cursor-pointer items-center gap-1.5 hover:bg-gray-100 transition-colors text-sm font-medium"
                                onClick={AuthRequests.removeToken}
                            >
                                <i className="pi pi-sign-out text-xs" />
                                <span>Sair</span>
                            </button>
                        </div>
                    ) : (
                        <button
                            className="hidden md:flex bg-white font-bold text-slate-700 px-4 py-1.5 rounded border-none cursor-pointer items-center gap-1.5 hover:bg-gray-100 transition-colors text-sm"
                            onClick={() => navigate('/login')}
                        >
                            <i className="pi pi-sign-in text-xs" />
                            <span>Login</span>
                        </button>
                    )}

                    {/* Botão hamburguer — visível só em mobile */}
                    <button
                        className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-white/10 transition-colors gap-[5px]"
                        onClick={() => setMenuOpen((v) => !v)}
                        aria-label="Abrir menu"
                        aria-expanded={menuOpen}
                    >
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? 'rotate-45 translate-y-[7px]' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 ${menuOpen ? 'opacity-0 scale-x-0' : ''}`} />
                        <span className={`block w-6 h-0.5 bg-white transition-all duration-300 origin-center ${menuOpen ? '-rotate-45 -translate-y-[7px]' : ''}`} />
                    </button>
                </div>
            </div>

            {/* ── Gaveta mobile ── */}
            <div
                ref={menuRef}
                className={`md:hidden absolute top-full left-0 right-0 bg-slate-800 shadow-xl overflow-hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <nav className="flex flex-col px-4 py-3 gap-1">
                    {navItems.map((item) => (
                        <button
                            key={item.url}
                            onClick={() => handleNavClick(item.url)}
                            className="flex items-center gap-3 text-white text-base px-3 py-3 rounded hover:bg-white/10 transition-colors text-left w-full"
                        >
                            <i className={`${item.icon} w-5 text-center`} />
                            <span>{item.label}</span>
                        </button>
                    ))}

                    {/* Divisor */}
                    <div className="border-t border-white/10 my-2" />

                    {/* Ação de login/logout no mobile */}
                    {isAuthenticated ? (
                        <button
                            className="flex items-center gap-3 text-red-300 text-base px-3 py-3 rounded hover:bg-white/10 transition-colors w-full"
                            onClick={() => { AuthRequests.removeToken(); setMenuOpen(false); }}
                        >
                            <i className="pi pi-sign-out w-5 text-center" />
                            <span>Sair</span>
                        </button>
                    ) : (
                        <button
                            className="flex items-center gap-3 text-white text-base px-3 py-3 rounded hover:bg-white/10 transition-colors w-full"
                            onClick={() => { navigate('/login'); setMenuOpen(false); }}
                        >
                            <i className="pi pi-sign-in w-5 text-center" />
                            <span>Login</span>
                        </button>
                    )}
                </nav>
            </div>

            {/* Overlay escuro ao abrir o menu */}
            {menuOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 z-[-1]"
                    onClick={() => setMenuOpen(false)}
                />
            )}
        </header>
    );
}

export default Navegacao;