import { StyleSheet, Text, View, Image } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        width: '100%',
        
        
    },
    title: {
        color: '#fff',
        //fontSize: 48, // Fonte maior para o "Olá,"
        fontWeight: 'bold',
    },
    subtitle:{
        color: '#fff',
        //fontSize: 24,
        marginTop: 5,
    },
    
    header: {
        height: '35%',
        justifyContent: 'flex-end', // Texto alinhado embaixo
        paddingHorizontal: 40,
        paddingBottom: 30, // Um respiro para o texto não colar no cartão branco
        position: 'relative', // Garante que a imagem absoluta fique presa DENTRO deste header
    },
    logo: {
        //width: '53%',
        //height: '76%',
        position: 'absolute',
        right: 2, 
        top: 2, 
        opacity: 0.36
    },
    img: {
        justifyContent: 'flex-end',
        marginVertical: 20,
        
    },
    texto:{
        
    },
    form:{
        flex: 1,
        alignItems: 'flex-start',
        gap: 20,

    },
    textForm:{
        paddingHorizontal: 5,
        fontWeight: 'light',
    },
    descInput:{
        flex: 1, 
        width:'100%', 
        maxWidth: 500,
    },
    inputForm:{
        backgroundColor: '#EAEAEA',
        width: '100%',
        padding: 10,
        placeholderTextColor: '#ACACAC',
        borderRadius: 13,
    },
    content: {
        alignSelf: 'center',
        paddingTop: 30,
        flex: 1,
        paddingHorizontal: 40,
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        width: '100%',
        maxWidth: 500,
    },

    linkFooter: {
        color: 'blue',
        
    }/*
    card: {
        backgroundColor: '#eee',
        padding: 20,
        borderRadius: 10,
        boxShadow: '4px 4px rgba(0,0,0,0.1)'
    },*/
    
});

export default styles;