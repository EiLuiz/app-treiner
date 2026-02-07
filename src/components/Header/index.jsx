import { View, TouchableOpacity, Image, Text, StyleSheet } from 'react-native'
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Logo from '../../assets/Logo.png';

const Header = ({
    label,
    onPress,
    logoSize,
    width,
    height,
    sizeFont
}) =>{ return(
    <View style = {styles.header}>
        {onPress ? (
                <TouchableOpacity onPress={onPress}>
                    <FontAwesome5 name="arrow-left" size={logoSize} color="white" />
                </TouchableOpacity>
            ) : (
                // View vazia do mesmo tamanho para manter o alinhamento
                <View style={{ width: logoSize, height: logoSize }} />
            )}
        <Text style={[styles.text, {fontSize: sizeFont}]}>{label}</Text>
        <Image source = {Logo} resizeMode='contain' style = {{ width: width, height: height }} />
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
        color: "white",
    },})

export default Header;