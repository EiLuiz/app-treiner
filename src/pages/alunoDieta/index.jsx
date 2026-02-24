import { Text, View, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from './styles'

import { useState, useCallback, useLayoutEffect } from "react";
import { useResponsive } from "../../hooks/useResponsive";
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

import Header from "../../components/Header";
import ClientCard from "../../components/ClientCard";
import MyButton from "../../components/MyButton";
import InputSearch from "../../components/InputSearch";
import TreinoCard from "../../components/TreinoCard";

import { supabase } from "../../services/supabase";

const AlunoDieta = ()=>{
    const [search, setSearch] = useState('')
    const [modalVisivel, setModalVisivel] = useState(false); 
    const [loading, setLoading] = useState(false);
    const [dietas, setDietas] = useState([]);

    const route = useRoute();
    const { responsiveSize } = useResponsive();
    const { alunoId, alunoNome } = route.params;
    const heightInput = responsiveSize(46);
    const fontSizeForm = responsiveSize(20);
    const fontSizeLogin = responsiveSize(36);
    const navigation = useNavigation(); 

    const fetchDietas = async ()=>{
        setLoading(true);
        try {
            const { data: listdieta, error: erro} = await supabase.from('dietas').select('*').eq('aluno_id', alunoId);

            console.log("Mochila trouxe o ID:", alunoId, " | O Supabase devolveu:", listdieta);
            if(erro) throw erro;

            setDietas(listdieta || []);
            
            
        } catch (error) {
            Alert.alert("Erro", "Erro em exibir lista de dietas")
            console.log(error)
        }finally{
            setLoading(false);
        }
    };
    

    useFocusEffect(
        useCallback(
            ()=>{fetchDietas()}, []
        )
    );


    return(
        <View style={styles.container}>
            <Header
                label= "Área de dietas"
                onPress={()=>navigation.goBack()}  
            />
            <View style={styles.content}>
                <View style= {{alignItems:"center", marginVertical:30, marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style= {{fontSize: 30, fontWeight:"bold" }}>Dietas do {alunoNome.split(' ')[0]}</Text> 
                    <InputSearch placeholder="Pesquisar dieta..." value={search} onChangeText={setSearch}/>
                </View> 
                {loading?<ActivityIndicator size="large" color="black" style={{ marginTop: 20, flex:1 }}/>: <FlatList
                style={{padding: 10}}
                data= {dietas}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>
                <Text>{item.nome}</Text>
                }
                ListEmptyComponent={()=> 
                <View style={{alignItems:'center', justifyContent:'center', marginTop:30, gap:20,}}><MaterialCommunityIcons name="food-apple" size={100} color="#c9c8c8" /><Text style={{fontSize:20, color:"#c9c8c8"}}>O aluno não possui dietas adicionadas</Text></View>}
                
                />}
            </View>
        </View>
    )
}

export default AlunoDieta;