import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import {
  useNavigation,
} from '@react-navigation/native';
const MyButton = ({
    label, 
    fontSize, 
    height,
    onPress,
    style,
    styleText,

})=>{return(
    <View>
    <TouchableOpacity onPress={onPress} style = {[styles.button, {height: height,}, style ]}>
        <Text style = {[styles.textButton, {fontSize: fontSize}, styleText]}>{label}</Text>
    </TouchableOpacity>
    </View>
);};


const styles = StyleSheet.create({
    button: {
        backgroundColor: "black",
        width: '100%',
        maxWidth: 500,
        borderRadius: 25,
        alignSelf: 'center',
        alignItems: 'center',
        height: 50,
        justifyContent: 'center',
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        zIndex: 10,
    },
    buttonTeste:{
        position: 'absolute',
        bottom: 20, // Distância do fundo da área branca
        alignSelf: 'center', // Centraliza horizontalmente
        backgroundColor: 'black',
        width: '100%', // Largura quase total ou fixa (ex: 60px se quiser bolinha)
        height: 50,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        zIndex: 10,
    },
    textButton: {
        color:"#ffff",
    },

});

export default MyButton;