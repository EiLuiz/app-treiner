import { Text, View, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from '../areaTreinador/styles'

import { useState, useCallback, useLayoutEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

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
    
    const handleRemoverExercicio = async (id_item) =>{
        try{
            const {error} = await supabase.from('treinos').delete().eq('id', id_item);
            if(error) throw error
        }catch(error){
            console.log(error)
            Alert.alert('Erro','Erro em apagar treino!')
        }finally{
            fetchTreinos();
            Alert.alert('Excluído', 'Item deletado!')
        }

    }
    
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
            onSucesso={()=>fetchTreinos()}
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
                onPress={() => navigation.navigate('Treinos', { 
                                treinoId: item.id,
                            })}
                name={item.nome}
                desc={item.descricao}
                close={()=>handleRemoverExercicio(item.id)}
                />
                }
                ListEmptyComponent={()=> 
                <View style={{alignItems:'center', justifyContent:'center', marginTop:30, gap:20,}}><MaterialCommunityIcons name="dumbbell" size={100} color="#c9c8c8" /><Text style={{fontSize:20, color:"#c9c8c8"}}>O aluno não possui treinos adicionados</Text></View>}
                
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