import { Text, View, FlatList, Alert } from "react-native";
import styles from '../areaTreinador/styles'

import { useState, useCallback, useLayoutEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import Header from "../../components/Header";
import ClientCard from "../../components/ClientCard";
import MyButton from "../../components/MyButton";
import ModalVincularAluno from "../../components/ModalVincularAluno";
import InputSearch from "../../components/InputSearch";

import { supabase } from "../../services/supabase";
import ModalCriarTreino from "../../components/ModalCriarTreino";

const AlunoTreino = () => {
    const [search, setSearch] = useState('')
    const [modalVisivel, setModalVisivel] = useState(true); 
    const [loading, setLoading] = useState(false);
    const [treinos, setTreinos] = useState([]);
    const route = useRoute();
    const { responsiveSize } = useResponsive();
    const { alunoId, alunoNome } = route.params;
    const heightInput = responsiveSize(46);
    const fontSizeForm = responsiveSize(20);
    const fontSizeLogin = responsiveSize(36);
    const navigation = useNavigation(); 

    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown: false,
        });
    }, [navigation]);
    
    
    
    
    return(
        <View style={styles.container}>
            <Header
                label= "Área de treino"
                onPress={()=>navigation.goBack()}
                onSucesso={()=>console.log("Deun tuddadada")}
            />
            <ModalCriarTreino
            visible={modalVisivel}
            alunoId={alunoId}
            onClose={()=>setModalVisivel(false)}
            />
            <View style = {styles.content}>
                <View style= {{alignItems:"center", marginVertical:30, marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style= {{fontSize: fontSizeLogin }}>Treinos do {alunoNome}</Text> 
                    <InputSearch placeholder="Pesquisar treino..." value={search} onChangeText={setSearch}/>
                </View>

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

export default AlunoTreino;