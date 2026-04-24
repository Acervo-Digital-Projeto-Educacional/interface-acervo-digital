import toast from 'react-hot-toast';
import success from "../assets/success-successful.gif";
import error from "../assets/error-windows.gif";
import doubt from "../assets/doubt.gif";

export const showCustomToast = (message: string, title: string, image_code: number) => {
    let image: string = '';

    // Definindo a imagem com base no código
    switch (image_code) {
        case 1:
            image = success;
            break;
        case 2:
            image = error;
            break;
        default:
            image = doubt;
            break;
    }

    // Definindo a cor do título com base no código
    // 1 = Verde (text-green-600), 2 = Vermelho (text-red-600), Default = Cinza escuro
    const titleColor = image_code === 1
        ? 'text-green-600'
        : image_code === 2
            ? 'text-red-600'
            : 'text-gray-900';

    toast.custom((t) => (
        <div
            className={`${t.visible ? 'animate-enter' : 'animate-leave'
                } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        >
            <div className="flex-1 w-0 p-4">
                <div className="flex items-start">
                    <div className="flex-shrink-0 pt-0.5">
                        <img
                            className="h-10 w-10 rounded-full"
                            src={image}
                            alt="icon"
                        />
                    </div>
                    <div className="ml-3 flex-1">
                        {/* Aplicando a cor dinâmica aqui */}
                        <p className={`text-sm font-bold ${titleColor}`}>
                            {title}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                            {message}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex border-l border-gray-200">
                <button
                    onClick={() => toast.dismiss(t.id)}
                    className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none"
                >
                    Fechar
                </button>
            </div>
        </div>
    ));
};