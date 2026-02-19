import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Logo from '../../assets/Logo.png';
import { useResponsive } from "../../hooks/useResponsive";

const Header = ({
    label,
    onPress,
}) =>{ 
    const { responsiveSize } = useResponsive();
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46); 
    return(
    <View style = {styles.header}>
        {onPress ? (
                <TouchableOpacity onPress={onPress}>
                    <FontAwesome5 name="arrow-left" size={logoSize} color="white" />
                </TouchableOpacity>
            ) : (
                // View vazia do mesmo tamanho para manter o alinhamento
                <View style={{ width: logoSize, height: logoSize }} />
            )}
        <Text style={[styles.text, {fontSize: fontSizeForm}]}>{label}</Text>
        <Image source = {Logo} resizeMode='contain' style = {{ width: logoSize, height: logoSize }} />
    </View>
)}

const styles = StyleSheet.create({
    header:{
        height: '10%', // Diminui um pouco a altura pois não tem logo gigante
        flexDirection: 'row', // Coloca itens lado a lado
        justifyContent: 'space-between', // Separa nas extremidades
        alignItems: 'center', // Centraliza verticalmente
        paddingHorizontal: 30,
        paddingTop: 10,
    },
    text:{
        fontWeight:'bold',
        color: "white",
    },})

export default Header;