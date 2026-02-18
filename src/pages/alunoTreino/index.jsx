import { Text, View, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from '../areaTreinador/styles'

import { useState, useCallback, useLayoutEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';

import Header from "../../components/Header";
import ClientCard from "../../components/ClientCard";
import MyButton from "../../components/MyButton";
import ModalVincularAluno from "../../components/ModalVincularAluno";
import InputSearch from "../../components/InputSearch";
import TreinoCard from "../../components/TreinoCard";

import { supabase } from "../../services/supabase";
import ModalCriarTreino from "../../components/ModalCriarTreino";


const AlunoTreino = () => {
    const [search, setSearch] = useState('')
    const [modalVisivel, setModalVisivel] = useState(false); 
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
    
    
    const fetchTreinos = async () =>{
        setLoading(true);
        try {
            const {data: listTreinos, error: erro} = await supabase.from('treinos').select("*").eq('aluno_id', alunoId)

            if(erro) throw erro;

            setTreinos(listTreinos || []);

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro em exibir lista de alunos")
        }finally{
            setLoading(false);
        }
    }
    
    const listaFiltrada = treinos.filter((item)=> item.nome.toLowerCase().indexOf(search.toLowerCase()) > -1)
    
    useFocusEffect(
        useCallback(
            ()=>{fetchTreinos()}, []
        )
    );
    return(
        <View style={styles.container}>
            <Header
                label= "Área de treino"
                onPress={()=>navigation.goBack()}
                
            />
            <ModalCriarTreino
            visible={modalVisivel}
            alunoId={alunoId}
            onClose={()=>setModalVisivel(false)}
            onSucesso={()=>console.log("Deun tuddadada")}
            />
            <View style = {styles.content}>
                <View style= {{alignItems:"center", marginVertical:30, marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style= {{fontSize: 30, fontWeight:"bold" }}>Treinos do {alunoNome.split(' ')[0]}</Text> 
                    <InputSearch placeholder="Pesquisar treino..." value={search} onChangeText={setSearch}/>
                </View> 
                {loading?<ActivityIndicator size="large" color="black" style={{ marginTop: 20, flex:1 }}/>: <FlatList
                style={{padding: 10}}
                data= {listaFiltrada}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>
                <TreinoCard
                name={item.nome}
                desc={item.descricao}
                />
                }
                
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

export default AlunoTreino;