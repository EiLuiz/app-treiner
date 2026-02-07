import { Text, View, TextInput, Image, useWindowDimensions, TouchableOpacity, Alert, ScrollView, KeyboardAvoidingView, Platform, FlatList } from "react-native";
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


const Registro = () =>{
    const [nome, setNome] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senhaAgain, setSenhaAgain] = useState('');
    const navigation = useNavigation();

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
    return (
        
        <View style = {styles.container}>
            <Header
            
            onPress={handleVoltar}
            logoSize={logoSize}
            width={logoSize}
            height={logoSize}
            
            />
            
            <KeyboardAvoidingView
                    style={{ flex: 1 }}
                    behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                >
            <View style = {styles.content}>
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
                            label="CPF"
                            value={cpf}
                            onChangeText={setCpf}
                            placeholder="Insira seu cpf..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            keyboardType="numeric" // Teclado numérico
                        />
                        <MyInput 
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Insira seu email..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            keyboardType="email-address" // Teclado de email
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
                    <MyButton
                        label={etapa===1 ? "Próximo":"Concluir Registro"}
                        fontSize={fontSizeForm}
                        height={heightInput}
                        onPress={etapa===1 ? handleProximo : () => navigation.navigate('TreinerHome')}
                    />
                
                    {etapa === 1 && (
                    <View style={{flexDirection: "row", alignItems:'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: fontSizeForm}}>Já tem uma conta? {''}
                            <Text style = {[styles.linkFooter, {fontSize: fontSizeForm}]} onPress={() => navigation.navigate('Login')}>Entre...</Text>
                        </Text>
                    </View>
                    )}
                    

                </View>
            </View>
            </KeyboardAvoidingView>
            
        </View>
    )
}

export default Registro;