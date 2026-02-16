import { StyleSheet, TextInput, Text, View, Image, Keyboard, useWindowDimensions, TouchableWithoutFeedback, Alert, ActivityIndicator, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
import { Link } from "@react-navigation/native";
import Logo from '../../assets/Logo.png'
import { useState } from "react";
import {
  useNavigation,
} from '@react-navigation/native';
import LogoBlack from '../../assets/Logo_black.png'
import styles from './styles'
import MyInput from "../../components/MyInput";
import { useResponsive } from "../../hooks/useResponsive";
import MyButton from "../../components/MyButton";
import { supabase } from '../../services/supabase';

const Login = () => {
    const [email, setEmail] = useState('teste@gmail.com');
    const [senha, setSenha] = useState('123456');
    const navigation = useNavigation();

    const [loading, setLoading] = useState(false);

    const handleLogin = async () => {
        // 1. Validação simples
        if (email === '' || senha === '') {
            Alert.alert("Erro", "Por favor, preencha email e senha.");
            return;
        }

        setLoading(true);

        try {
            // 2. Chama o Supabase para logar
            const { error } = await supabase.auth.signInWithPassword({
                email: email,
                password: senha,
            });

            if (error) throw error;

            // 3. Se não deu erro, navega.
            // Usamos .replace para que o usuário não consiga voltar para o Login apertando "Voltar"
            navigation.replace('TreinerHome');

        } catch (error) {
            // Tratamento de erro (Senha errada ou usuário não existe)
            Alert.alert("Falha no Login", "Email ou senha incorretos.");
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    };

    const {width, height} = useWindowDimensions();
    
    const { responsiveSize } = useResponsive();
    // Aplicando as medidas exatas que você passou:
    const logoSize = responsiveSize(220); 
    const fontSizeOla = responsiveSize(48);
    const fontSizeBemVindo = responsiveSize(24);
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);
    return (
        <KeyboardAvoidingView
                style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} 
                keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20} 
            >
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Image source = {Logo} resizeMode='contain' style = {[styles.logo, { width: logoSize, height: logoSize }]} />
                <Text style = {[styles.title, { fontSize: fontSizeOla }]}>Olá,
                </Text>
                <Text style = {[styles.subtitle, { fontSize: fontSizeBemVindo }]}>Seja bem-vindo!</Text>
            </View>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            
            <View style = {styles.content}>
                <ScrollView 
                contentContainerStyle={{ flexGrow: 1 }} 
                showsVerticalScrollIndicator={false}
                keyboardShouldPersistTaps="handled"
            >
                <View style = {{gap: 50, flex: 1, paddingBottom: 30}}>
                    <View style = {{ alignItems:'center' }}>
                        <Text style = {{fontSize: fontSizeLogin }}>Login</Text>
                    </View>
                    
                    <View style = {styles.form}>
                        <MyInput 
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Insira seu email..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            keyboardType="email-address"
                            autoCapitalize="none" />
                        <MyInput 
                            label="Senha"
                            value={senha}
                            onChangeText={setSenha}
                            placeholder="Insira sua senha..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            secureTextEntry={true} // Esconde a senha
                        />
                    </View>
                    {loading ? (
                                <ActivityIndicator size="large" color="black" style={{ marginTop: 20 }} />
                            ) : (
                                <MyButton
                                    label="Login" 
                                    fontSize={fontSizeForm}
                                    height={heightInput}
                                    onPress={handleLogin} 
                                />
                            )}
                    <View style={{flexDirection: "row", alignItems:'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: fontSizeForm}}>Não tem uma conta? {''}
                            <Text style = {[styles.linkFooter, {fontSize: fontSizeForm}]} onPress={() => navigation.navigate('Signin')}>Registre-se...</Text>
                        </Text>
                    </View>
                    

                </View>
                </ScrollView>
            </View>
            
            </TouchableWithoutFeedback>
            
        </View>
        </KeyboardAvoidingView>
    )
}

export default Login