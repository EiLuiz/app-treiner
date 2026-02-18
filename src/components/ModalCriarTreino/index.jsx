import { useState } from 'react';
import { View, TextInput, Alert, Modal, Text, TouchableOpacity, StyleSheet, ActivityIndicator, ScrollView, FlatList } from 'react-native';
import { supabase } from '../../services/supabase'; // Ajuste o caminho se necessário
import MyInput from '../MyInput';
import { useResponsive } from '../../hooks/useResponsive';
import MyButton from '../MyButton';

const ModalCriarTreino = ({
    visible,
    onClose,
    onSucesso,
    alunoId,
}) => {
    
    const [listaExercicios, setListaExercicios] = useState([]);
    
    const [nomeTreino, setNomeTreino] = useState('');
    const [descTreino, setDescTreino] = useState('');

    const [nomeEx, setNomeEx] = useState('');
    const [serieEx, setSerieEx] = useState('');
    const [dadosEx, setDadosEx] = useState([]);

    const [loading, setLoading] = useState(false);
    const { responsiveSize } = useResponsive();
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);

    const handleChangeSeries = (texto) => {
        setSerieEx(texto);
        const numero = parseInt(texto);

        if(numero > 0){
            setDadosEx(
                (prev) => {
                    const novoArray = Array.from({ length: numero }, (_, i) => {
                        return prev[i] || { reps: '', carga: '' }; 
                    });
                    return novoArray;
                }
            
            )
        }else{
            setDadosEx([]);
        }
    }

    const handleAddExercicios = () => {
        if(!nomeEx || !serieEx || !repsEx){
            Alert.alert("Erro!", "Você precisa preencher os dados do exercicio!");
            return;
        }
        const novoExercicio = {
            id: Date.now(),
            nome: nomeEx,
            series: serieEx,
            reps: repsEx,
            carga: cargaEx || '0',
        };

        setListaExercicios([...listaExercicios, novoExercicio]);
        setNomeEx('');
        setSerieEx('');
        setCargaEx('');
        setRepsEx('');

    };
    const handleRemoverExercicio = (id_provisorio) =>{
        setListaExercicios(listaExercicios.filter(item => item.id !== id_provisorio ));
    };

    const handleAddTudo = async () => {
        if(!nomeTreino) return;
        setLoading(true);

        try {
            const {data:treino, error: erro} = await supabase.from('treinos').insert([{
                nome: nomeTreino,
                descricao: descTreino,
                aluno_id: alunoId,
            }]).select().single() // Pegou o professor

            if(erro) throw erro;
           
            const idNovoTreino = treino.id;
            
            const exerciciosNovoTreino = listaExercicios.map(item=>({
                nome: item.nome,
                series: item.series,
                carga: item.carga,
                reps: item.reps,
                treino_id: idNovoTreino
            }));
            const {error: erroEx} = await supabase.from('exercicios').insert(exerciciosNovoTreino);
            
            if(erroEx) throw erroEx;

            Alert.alert("Sucesso", "Treino adicionado!");
            setNomeTreino('');
            setDescTreino('');
            setListaExercicios([]);
            onClose(); 
            if (onSucesso) onSucesso();
            

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Falha ao adicionar.");
        } finally {
            setLoading(false);
        }
    };

    return(
    <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={onClose}>
        <View style={styles.fundoPreto}> 
            <View style={styles.contentCard}>
                <View style={styles.header}><Text style={styles.titulo}>Novo treino</Text><TouchableOpacity onPress={onClose}><Text style={styles.buttonClose}>X</Text></TouchableOpacity></View>
                <ScrollView>
                <Text style={styles.subtitulo}>Dados sobre o treino:</Text>
                <MyInput
                
                value={nomeTreino}
                onChangeText={setNomeTreino}
                placeholder="Nome do treino (Ex: Treino A, push)"
                fontSize={fontSizeForm}
                height={heightInput}
                placeholderTextColor="#999"
                />
                <MyInput
                
                value={descTreino}
                onChangeText={setDescTreino}
                placeholder="Descrição (Opcional)"
                fontSize={fontSizeForm}
                height={heightInput}
                placeholderTextColor="#999"
                />
                
                <Text style={styles.subtitulo}>Exercicios ({listaExercicios.length}):</Text>
                {listaExercicios.map(
                    (item)=>(
                        <View key={item.id} style={styles.cardExercicio}>
                            <View style={{flex:1}}>
                                <Text style={styles.cardTitle}>{item.nome}</Text>
                                <Text style={styles.cardDesc}>{item.series} séries x {item.reps} reps ({item.carga}kg)</Text>
                            </View>
                                
                        </View>
                    )
                )}

                <Text style={styles.subtitulo}>Adicionar exercicio:</Text>
                <MyInput
                
                value={nomeEx}
                onChangeText={setNomeEx}
                placeholder="Nome do exercicio (Ex: Remada curvada)"
                fontSize={fontSizeForm}
                height={heightInput}
                placeholderTextColor="#999"
                />
                <MyInput
                value={serieEx}
                onChangeText={handleChangeSeries}
                keyboardType="numeric"
                placeholder="Número de séries"
                fontSize={fontSizeForm}
                height={heightInput}
                placeholderTextColor="#999"
                />
                {dadosEx.map((serie, index) => (
                    <View key={index} style={{flexDirection:"row",justifyContent: 'space-between'}}>
                    <View style={{
                        backgroundColor: '#EAEAEA',
                        width: 100,
                        maxWidth: 500,
                        padding: 10,
                        height: heightInput,
                        borderWidth: 1,
                        borderColor: '#E0E0E0',
                        marginBottom: 24,
                        borderRadius: 13,
                                }}>
                        <Text style={{fontSize: fontSizeForm, color:'#ACACAC'}}>{index+1}º </Text>
                    </View>
                    
                    <MyInput
                    style={{width:100}}
                    value={serie.reps}
                    onChangeText={setRepsEx}
                    placeholder="Reps"
                    fontSize={fontSizeForm}
                    keyboardType="numeric"
                    height={heightInput}
                    placeholderTextColor="#999"
                    />
                    <MyInput
                    style={{width:100}}
                    value={serie.carga}
                    onChangeText={setCargaEx}
                    placeholder="Kg"
                    keyboardType="numeric"
                    fontSize={fontSizeForm}
                    height={heightInput}
                    placeholderTextColor="#999"
                    />
                    </View>
                ))}
                
                
                <MyButton
                    style={styles.btnCancelar}
                    label={'+'}
                    fontSize={fontSizeForm}
                    height={heightInput}
                    styleText={styles.textoCancelar}
                    onPress={handleAddExercicios} 
                    />


                </ScrollView>
                <View style={styles.botoesContainer}>
                            
                    {/* Botão Cancelar (Cinza/Simples) */}
                    

                    
                    {loading ? <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }}/> : <MyButton
                    label={'Salvar treino'}
                    fontSize={fontSizeForm}
                    height={heightInput}
                    onPress={handleAddTudo} 
                    />}

                </View>
            </View>
        </View>

    </Modal>
);}

const styles = StyleSheet.create({
    fundoPreto: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.6)',
        alignItems: 'center',
        justifyContent: 'center'
    },
    
    contentCard:{
        backgroundColor: 'white',
        width: '100%',
        borderRadius: 16,
        padding: 24,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.34,
        shadowRadius: 6.27,
        elevation: 10,
    },
    header:{
        flexDirection: 'row', justifyContent: 'space-between'
    },
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 20,
        textAlign: 'center'
    },
    buttonClose:{
        color: 'red',
        fontSize: 20,
        fontWeight: 'bold'

    },
    subtitulo: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
        
        
        flexDirection: 'row', 
    },
    cardExercicio:{
        flexDirection: "row", alignItems: 'center', backgroundColor:'white', padding: 12, borderRadius: 8, marginBottom: 8, borderLeftWidth: 4, borderLeftColor:'black'
    },
    cardTitle:{
        fontWeight: 'bold', fontSize: 16
    },
    cardDesc:{
        color:'#666',fontSize: 14
    },
    
    btnCancelar: {
        width: 60,
        marginBottom: 30,
        borderWidth: 1,
        borderColor: '#DDD',
        backgroundColor: 'transparent'
    },
    btnConfirmar: {
        flex: 1,
        paddingVertical: 14,
        borderRadius: 8,
        backgroundColor: '#000', // Preto destaque
        alignItems: 'center',
        elevation: 2
    },
    textoConfirmar: {
        color: '#FFF',
        fontWeight: 'bold',
        fontSize: 16
    },
    textoCancelar: {
        color: '#000000',
        
    },
    botoesContainer: {
        
        gap: 12 // Espaço entre os botões
    },

})

export default ModalCriarTreino;