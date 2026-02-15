import { StyleSheet, Text, View, Image } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#333',
        width: '100%',
        
        
    },
    dropdown: {
        backgroundColor: '#EAEAEA',
        borderRadius: 13,
        borderWidth: 0,
        paddingVertical: 0, // IMPORTANTE
    },
    dropdownContainer:{
        backgroundColor: '#EAEAEA',
        borderRadius: 13,
        borderWidth: 0,
        position:'relative',   // 🔑 NÃO absolute
        top: 0,
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
        height: '10%', // Diminui um pouco a altura pois não tem logo gigante
        flexDirection: 'row', // Coloca itens lado a lado
        justifyContent: 'space-between', // Separa nas extremidades
        alignItems: 'center', // Centraliza verticalmente
        paddingHorizontal: 30,
        paddingTop: 10,
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
        maxWidth: 500,
        padding: 10,
        placeholderTextColor: '#ACACAC',
        borderRadius: 13,
    },
    content: {
        alignSelf: 'center',
        paddingTop: 20,
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff',
        borderTopLeftRadius: 70,
        borderTopRightRadius: 70,
        width: '100%',
        maxWidth: 500,
    },
    button: {
        backgroundColor: "black",
        width: '100%',
        maxWidth: 500,
        borderRadius: 50,
        alignItems:'center',
        justifyContent: 'center',
    },
    textButton: {
        color:"#ffff",
    },
    textFooter:{

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