import { useState } from 'react';
import { View, TextInput, Alert, Modal, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import { supabase } from '../../services/supabase'; // Ajuste o caminho se necessário
import MyInput from '../MyInput';
import { useResponsive } from '../../hooks/useResponsive';
import MyButton from '../MyButton';

const ModalVincularAluno = ({
    visible,
    onClose,
    onSucesso
}) => {
    const [emailAluno, setEmailAluno] = useState('');
    const [loading, setLoading] = useState(false);
    const { responsiveSize } = useResponsive();
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);

    const handleVincular = async () => {
        if(!emailAluno) return;
        setLoading(true);

        try {
            const {data:{user}} = await supabase.auth.getUser(); // Pegou o professor

            const {data: aluno, error: erro} = await supabase.from('profiles').select('*').eq("email", emailAluno).eq("funcao", 'Aluno').single()
            
            if(erro || !aluno) {
                Alert.alert("Erro", "Aluno não encontrado ou email incorreto.")
                setLoading(false)
                return;
            }

            if(aluno.professor_id){
                Alert.alert("Ops!", "Aluno já tem um professor!")
                setLoading(false)
                return;
            }

            const { error: erroUpdate } = await supabase
                .from('profiles')
                .update({ professor_id: user.id }) // <--- AQUI A MÁGICA: Coloca SEU ID na ficha dele
                .eq('id', aluno.id);

           if (erroUpdate) throw erroUpdate

            
            // Se chegou aqui, deu tudo certo!
            Alert.alert("Sucesso", "Aluno adicionado!");
            setEmailAluno('');
            onClose(); 
            if (onSucesso) onSucesso();
            

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Falha ao vincular.");
        } finally {
            setLoading(false);
        }
    };

    return(
    <Modal visible={visible} transparent={true} animationType='fade' onRequestClose={onClose}>
        <View style={styles.fundoPreto}> 
            <View style={styles.contentCard}>
                <Text style={styles.titulo}>Adicionar aluno</Text>
                <Text style={styles.subtitulo}>Digite o email do novo aluno</Text>
                <MyInput
                
                value={emailAluno}
                onChangeText={setEmailAluno}
                placeholder="exemplo@email.com"
                fontSize={fontSizeForm}
                height={heightInput}
                keyboardType="email-address"
                autoCapitalize="none"
                placeholderTextColor="#999"
                
                />
                
                <View style={styles.botoesContainer}>
                            
                    {/* Botão Cancelar (Cinza/Simples) */}
                    <MyButton
                    style={styles.btnCancelar}
                    label={'Cancelar'}
                    fontSize={fontSizeForm}
                    height={heightInput}
                    styleText={styles.textoCancelar}
                    onPress={onClose} 
                    />

                    
                    {loading ? <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }}/> : <MyButton
                    label={'Adicionar'}
                    fontSize={fontSizeForm}
                    height={heightInput}
                    onPress={handleVincular} 
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
    titulo:{
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 8,
        textAlign: 'center'
    },
    subtitulo: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20
    },
    input: {
        backgroundColor: '#F5F5F5',
        borderRadius: 8,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24
    },
    btnCancelar: {
        
        
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

export default ModalVincularAluno;










































































// Recebe 3 ordens do pai: "apareça?" (visible), "feche!" (onClose), "deu certo!" (onSucesso)
/*const ModalVincularAluno = ({ visible, onClose, onSucesso }) => {
    const [emailAluno, setEmailAluno] = useState('');
    const [loading, setLoading] = useState(false);

    const handleVincular = async () => {
        if (!emailAluno) return; 
        setLoading(true);

        try {
            // 1. DESCOBRIR QUEM SOU EU (O PROFESSOR)
            const { data: { user } } = await supabase.auth.getUser();
            
            // 2. PROCURAR O ALUNO NO BANCO
            const { data: aluno, error: erroBusca } = await supabase
                .from('profiles')
                .select('*') // Pega a ficha toda
                .eq('email', emailAluno.trim()) // O email tem que ser igual (sem espaços extras)
                .eq('funcao', 'Aluno') // Tem que ser Aluno (não pode roubar aluno de outro professor ou pegar outro prof)
                .single(); // Quero apenas UM resultado

            if (erroBusca || !aluno) {
                Alert.alert("Erro", "Aluno não encontrado ou email incorreto.");
                setLoading(false);
                return;
            }

            // 3. VERIFICAR SE ELE JÁ TEM DONO
            if (aluno.professor_id) {
                Alert.alert("Ops!", "Esse aluno já tem um treinador.");
                setLoading(false);
                return;
            }

            // 4. O VÍNCULO (UPDATE)
            const { error: erroUpdate } = await supabase
                .from('profiles')
                .update({ professor_id: user.id }) // <--- AQUI A MÁGICA: Coloca SEU ID na ficha dele
                .eq('id', aluno.id); // Só na ficha DESTE aluno específico

            if (erroUpdate) throw erroUpdate;

            // Se chegou aqui, deu tudo certo!
            Alert.alert("Sucesso", "Aluno adicionado!");
            setEmailAluno(''); // Limpa o campo
            onSucesso(); // Avisa a tela de trás para atualizar a lista
            onClose(); // Fecha o modal

        } catch (error) {
            console.log(error);
            Alert.alert("Erro", "Falha ao vincular.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.fundoEscuro}>
                <View style={styles.caixaBranca}>
                    <Text style={styles.titulo}>Adicionar Aluno</Text>
                    
                    <TextInput 
                        placeholder="Digite o email do aluno..."
                        value={emailAluno}
                        onChangeText={setEmailAluno}
                        autoCapitalize="none" // Importante para email
                        style={styles.input}
                    />

                    <View style={styles.botoes}>
                        <TouchableOpacity onPress={onClose} style={styles.btnCancelar}>
                            <Text>Cancelar</Text>
                        </TouchableOpacity>
                        
                        <TouchableOpacity onPress={handleVincular} style={styles.btnSalvar}>
                            {loading ? <ActivityIndicator color="white"/> : <Text style={{color: 'white'}}>Vincular</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    fundoEscuro: { 
        flex: 1, 
        backgroundColor: 'rgba(0,0,0,0.5)', 
        justifyContent: 'center', 
        alignItems: 'center' 
    },
    caixaBranca: {
         width: '85%', 
         backgroundColor: 'white', 
         padding: 20, 
         borderRadius: 15, 
         elevation: 10 },
    titulo: { 
        fontSize: 20, 
        fontWeight: 'bold', 
        marginBottom: 15, 
        textAlign: 'center' },
    input: { 
        borderWidth: 1, 
        borderColor: '#ccc', 
        borderRadius: 8, 
        padding: 12, 
        marginBottom: 20, 
        fontSize: 16 },
    botoes: { 
        flexDirection: 'row', 
        justifyContent: 'space-between' },
    btnCancelar: { 
        padding: 10 
    },
    btnSalvar: { 
        backgroundColor: 'black', 
        padding: 10, 
        borderRadius: 8, 
        paddingHorizontal: 20 
    }
});

export default ModalVincularAluno;*/