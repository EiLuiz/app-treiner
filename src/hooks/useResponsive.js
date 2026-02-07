import { useWindowDimensions } from 'react-native';

export const useResponsive = () => {
    // O Hook é chamado AQUI DENTRO, o que é permitido
    const { width } = useWindowDimensions();

    // Sua lógica de travar no tablet
    const larguraEfetiva = width > 500 ? 500 : width;

    // A função de cálculo
    const responsiveSize = (size) => {
        return (larguraEfetiva / 412) * size;
    };

    // Retornamos a função para quem quiser usar
    return { responsiveSize, larguraEfetiva };
};