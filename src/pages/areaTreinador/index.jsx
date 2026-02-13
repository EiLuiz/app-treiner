import { StyleSheet, TextInput, Text, View, Image, useWindowDimensions, TouchableOpacity,Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import styles from './styles'
import { useState } from "react";
import Header from "../../components/Header";
import { useLayoutEffect } from 'react';
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation } from '@react-navigation/native';
import ClientCard from "../../components/ClientCard";
import MyButton from "../../components/MyButton";
import ModalVincularAluno from "../../components/ModalVincularAluno";


const AreaTreinador = () => {
    const { responsiveSize } = useResponsive();
    const navigation = useNavigation();

    const [modalVisivel, setModalVisivel] = useState(false);

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false, // Esconde o header padrão para você usar o seu personalizado
        });
    }, [navigation]);
    
        // Aplicando as medidas exatas que você passou:
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);

    const recarregarLista = () => {
    console.log("Aqui vamos recarregar a lista de alunos...");
    // futuramente: fetchAlunos();
};
    return(
        <View style={styles.container}>
            <Header
                label= "Área do treinador"
                
                logoSize={logoSize}
                width={logoSize}
                height={logoSize}
                sizeFont={fontSizeForm}
            />
            <ModalVincularAluno visible={modalVisivel} onClose={() => setModalVisivel(false)} onSucesso={recarregarLista} />
            <View style = {styles.content}>
        <View style= {{alignItems:"center", justifyContent:'Center', margin:20}}>
        <Text style= {[styles.texto, {fontSize: fontSizeLogin }]}>Alunos</Text>
        </View>
        <ScrollView showsVerticalScrollIndicator={false} style={{padding:10}}>
        
        
        <ClientCard
        name='Luiz'
        onPressDieta={() =>console.log("Apertei Dieta!")}
        onPressTreino={() =>console.log("Apertei Treino!")}
        />
        
        
        </ScrollView>
        <View style={{paddingHorizontal:20,}}>
            <MyButton
            style={{position:'absolute', bottom: 20}}
            label='+'
            fontSize= {fontSizeForm} 
            height={heightInput}
            onPress={()=>setModalVisivel(true)}
            />
        </View>

        </View>
        </View>
    );
}

export default AreaTreinador;