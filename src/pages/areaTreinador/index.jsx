import { StyleSheet, TextInput, Text, View, Image, useWindowDimensions, FlatList, TouchableOpacity,Pressable, ScrollView, KeyboardAvoidingView, Platform, Alert } from "react-native";
import styles from './styles'
import { useState, useCallback } from "react";
import Header from "../../components/Header";
import { useLayoutEffect } from 'react';
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import ClientCard from "../../components/ClientCard";
import MyButton from "../../components/MyButton";
import ModalVincularAluno from "../../components/ModalVincularAluno";
import { supabase } from "../../services/supabase";


const AreaTreinador = () => {
    const { responsiveSize } = useResponsive(); 
    const navigation = useNavigation();

    const [modalVisivel, setModalVisivel] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [alunos, setAlunos] = useState([]);

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

    const fetchAlunos = async () => {
        try {
            const {data: {user}} = await supabase.auth.getUser();
            if(!user) return

            const { data, error } = await supabase.from("profiles").select("*").eq("professor_id", user.id)

            if(error) throw error;

            setAlunos(data || [])


        } catch (error) {
            console.log("erro em carregar lista", error.message);
        }finally{
            setLoading(false)
        }
    }

    

    useFocusEffect(
        useCallback(
            ()=>{fetchAlunos()}, []
        )
    );
    // futuramente: fetchAlunos();

    return(
        <View style={styles.container}>
            <Header
                label= "Área do treinador"
                
                logoSize={logoSize}
                width={logoSize}
                height={logoSize}
                sizeFont={fontSizeForm}
            />
            <ModalVincularAluno visible={modalVisivel} onClose={() => setModalVisivel(false)} onSucesso={fetchAlunos} />
            <View style = {styles.content}>
        <View style= {{alignItems:"center", justifyContent:'Center', margin:20}}>
        <Text style= {[styles.texto, {fontSize: fontSizeLogin }]}>Alunos</Text>
        </View>

        {loading ? <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }}/> : <FlatList 

            data = {alunos}
            keyExtractor={(item)=>item.id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{padding: 5, paddingTop: 10}}
            renderItem={({item})=>{

                return (<ClientCard
                name={item.nome}
                onPressDieta={() =>console.log("Apertei Dieta!")}
                onPressTreino={() =>console.log("Apertei Treino!")}
                />   )
            }}                 
        />}
        
        
        
        
        
        
       
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