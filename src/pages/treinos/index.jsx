import { Text, View, FlatList, Alert, ActivityIndicator } from "react-native";
import styles from '../areaTreinador/styles'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native';
import { useState, useCallback, useLayoutEffect } from "react";
import Header from "../../components/Header";
import { supabase } from "../../services/supabase";
import InputSearch from "../../components/InputSearch";

const Treinos = () => {
    const route = useRoute();
    const { treinoId } = route.params;
    const [nomeTreino, setNomeTreino] = useState({});
    const [loading, setLoading] = useState(false);
    const [exercicios, setExercicios] = useState([]);
    const navigation = useNavigation(); 
    const [search,setSearch] = useState({});
    const fetchExercicios = async () =>{
        setLoading(true);
        try {
            const {data: listExercicios, error: erro} = await supabase.from('exercicios').select("*").eq('treino_id', treinoId)

            if(erro) throw erro;

            setExercicios(listExercicios || []);

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Erro em exibir lista de exercicios")
        }finally{
            setLoading(false);
        }
    }
    const fetchNomeTreino = async () => {
            try {
                const { data, error } = await supabase.from("treinos").select("*").eq("id", treinoId)
    
                if(error) throw error;
    
                setNomeTreino(data[0])
    
    
            } catch (error) {
                console.log("Erro em buscar treino", error.message);
                setLoading(false);
            }
        }


    useFocusEffect(
        useCallback(
            ()=>{fetchNomeTreino();
                fetchExercicios();
            }, []
        )
    );

    const listaFiltrada = exercicios.filter((item)=> item.nome.toLowerCase().indexOf(search.toLowerCase()) > -1)


    return(
        <View style={styles.container}>

            <Header
            label={nomeTreino?.nome ? nomeTreino.nome.toUpperCase() : "CARREGANDO..."}
            onPress={()=>navigation.goBack()}
            />
            <View style={styles.content}>
                <View style= {{alignItems:"center", marginVertical:30, marginHorizontal:5, flexDirection: 'row', justifyContent: 'space-between',}}>
                    <Text style= {{fontSize: 30, fontWeight:"bold" }}>Exercicios:</Text> 
                    <InputSearch placeholder="Pesquisar exercicio..." value={search} onChangeText={setSearch}/>
                </View> 
                {loading?<ActivityIndicator size="large" color="black" style={{ marginTop: 20, flex:1 }}/>: <FlatList
                style={{padding: 10}}
                data= {listaFiltrada}
                keyExtractor={(item)=>item.id}
                renderItem={({item})=>
                    <View></View>
                /*<TreinoCard
                onPress={() => navigation.navigate('Treinos', { 
                                treinoId: item.id,
                            })}
                name={item.nome}
                desc={item.descricao} 
                />*/
                }
                
                />}
            </View>
        </View>
    )
}
export default Treinos;