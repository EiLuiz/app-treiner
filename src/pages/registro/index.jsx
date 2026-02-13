import { Text, View, TextInput, Image, useWindowDimensions, TouchableOpacity,  Alert, ActivityIndicator, ScrollView, KeyboardAvoidingView, TouchableWithoutFeedback, // <--- Importante para fechar o teclado
    Keyboard, Platform, FlatList } from "react-native";
import Logo from '../../assets/Logo.png';
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import styles from './styles'
import DropDownPicker from "react-native-dropdown-picker";
import MyInput from "../../components/MyInput";
import { useResponsive } from "../../hooks/useResponsive";
import Header from "../../components/Header";
import MyButton from "../../components/MyButton";
import { supabase } from '../../services/supabase';


const Registro = () =>{
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAgain, setSenhaAgain] = useState('');
    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);
    const [funcao, setFuncao] = useState(null);
    const [items, setItems] = useState([
        { label: 'Professor', value: 'Professor' },
        { label: 'Aluno', value: 'Aluno' },
    ])

    const [etapa, setEtapa] = useState(1);

    const { responsiveSize } = useResponsive();
    // Aplicando as medidas exatas que você passou:
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);
    
    const handleVoltar = () => {
        if(etapa===2){
            setEtapa(1)
        }else{
            navigation.goBack()
        }
    };
    const handleProximo = () => {
        if (nome === '' || email === '') {
            Alert.alert("Atenção", "Preencha os campos antes de continuar.");
            return;
        }
        setEtapa(2);
    };
    const handleConcluirRegistro = async () => {
        // 1. Validações básicas
        if (senha === '' || senhaAgain === '' || !funcao) {
            Alert.alert("Erro", "Preencha a senha e escolha uma função.");
            return;
        }

        if (senha !== senhaAgain) {
            Alert.alert("Erro", "As senhas não coincidem.");
            return;
        }

        if (senha.length < 6) {
            Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
            return;
        }

        setLoading(true);

        try {
            // 2. Criar Usuário na Autenticação do Supabase
            const { data: authData, error: authError } = await supabase.auth.signUp({
                email: email,
                password: senha,
            });

            if (authError) throw authError;

            // 3. Salvar dados extras na tabela 'profiles'
            // O ID deve ser o mesmo criado na autenticação (authData.user.id)
            const { error: profileError } = await supabase
                .from('profiles')
                .insert([
                    { 
                        id: authData.user.id,
                        nome: nome,
                        funcao: funcao,
                        email: email
                    }
                ]);

            if (profileError) {
                // Se der erro ao salvar perfil, seria bom deletar o user do Auth ou tratar manualmente
                throw new Error("Erro ao salvar perfil do usuário: " + profileError.message);
            }

            Alert.alert("Sucesso", "Conta criada com sucesso!", [
                { text: "OK", onPress: () => navigation.navigate('Login') }
            ]);

        } catch (error) {
            Alert.alert("Erro no Registro", error.message);
        } finally {
            setLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // 'height' costuma funcionar melhor no Android
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} // Ajuste fino
            >
        <View style = {styles.container}>
            <Header
            
            onPress={handleVoltar}
            logoSize={logoSize}
            width={logoSize}
            height={logoSize}
            
            />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            
            <View style = {styles.content}>
                <ScrollView 
                        contentContainerStyle={{ flexGrow: 1 }} 
                        showsVerticalScrollIndicator={false}
                        keyboardShouldPersistTaps="handled" // Permite clicar nos botões mesmo com teclado aberto
            >
                <View style = {{gap: 50, flex:1, paddingBottom: 30}}>
                    <View style = {{ alignItems:'center' }}>
                        <Text style = {[styles.texto, {fontSize: fontSizeLogin }]}>{etapa === 1 ? "Dados Pessoais" : "Segurança"}</Text>
                        <View style={{flexDirection: 'row', gap: 10, marginTop: 10}}>
                            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: etapa === 1 ? 'black' : '#ccc'}} />
                            <View style={{width: 10, height: 10, borderRadius: 5, backgroundColor: etapa === 2 ? 'black' : '#ccc'}} />
                        </View>
                    </View>
            

                    <View style = {styles.form}>
                        {etapa === 1 && (
                            <>
                            <MyInput 
                                label="Nome completo"
                                value={nome}
                                onChangeText={setNome}
                                placeholder="Insira seu nome..."
                                fontSize={fontSizeForm}
                                height={heightInput}
                            />
                        <MyInput 
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Insira seu email..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            keyboardType="email-address"
                            autoCapitalize="none" 
                        />
                            </>
                        )}
                        {etapa ===2 &&(
                            <>
                            <MyInput 
                                label="Senha"
                                value={senha}
                                onChangeText={setSenha}
                                placeholder="Insira sua senha..."
                                fontSize={fontSizeForm}
                                height={heightInput}
                                secureTextEntry={true} // Esconde a senha
                            />
                            <MyInput 
                                label="Senha novamente"
                                value={senhaAgain}
                                onChangeText={setSenhaAgain}
                                placeholder="Repita a senha..."
                                fontSize={fontSizeForm}
                                height={heightInput}
                                secureTextEntry={true}
                            />
                        
                        <View style = {[styles.descInput, { zIndex: 100, elevation: 20 }]}>
                            <Text style = {[styles.textForm, {fontSize: fontSizeForm}]}>Função:</Text>
                            <DropDownPicker open={open} value={funcao} items={items}
                                listMode="SCROLLVIEW"
                                dropDownDirection="AUTO"
                                setOpen={setOpen}
                                setValue={setFuncao}
                                setItems={setItems}
                                placeholder="Escolha"
                                listItemHeight={heightInput}
                                itemSeparator={false}

                                style={[styles.dropdown, { height: heightInput }]}
                                dropDownContainerStyle={[
                                    styles.dropdownContainer,
                                    { maxHeight: heightInput * 3 }
                                ]}

                                textStyle={{
                                    fontSize: fontSizeForm,
                                    lineHeight: fontSizeForm * 1.2,
                                }}

                                listItemLabelStyle={{
                                    fontSize: fontSizeForm,
                                    lineHeight: fontSizeForm * 1.2,
                                }}

                                zIndex={3000}
                                zIndexInverse={1000}/>
                            
                        </View>
                            </>
                        )}
                        

                    </View>
                    {loading ? (
                            <ActivityIndicator size="large" color="black" style={{marginTop: 20}} />
                        ) : (
                            <MyButton
                                // Muda o texto do botão conforme a etapa
                                label={etapa === 1 ? "Próximo" : "Concluir Registro"} 
                                fontSize={fontSizeForm}
                                height={heightInput}
                                // Se for etapa 1, vai pro proximo. Se for 2, chama o Supabase
                                onPress={etapa === 1 ? handleProximo : handleConcluirRegistro}
                            />
                        )}
                
                    {etapa === 1 && (
                    <View style={{flexDirection: "row", alignItems:'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: fontSizeForm}}>Já tem uma conta? {''}
                            <Text style = {[styles.linkFooter, {fontSize: fontSizeForm}]} onPress={() => navigation.navigate('Login')}>Entre...</Text>
                        </Text>
                    </View>
                    )}
                    

                </View>
                </ScrollView>
            </View>
            
            </TouchableWithoutFeedback>
            
            
        </View>
        </KeyboardAvoidingView>
    )
}

export default Registro;