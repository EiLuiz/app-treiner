import { StyleSheet, TextInput, Text, View, Image, useWindowDimensions, TouchableOpacity, Pressable, ScrollView, KeyboardAvoidingView, Platform } from "react-native";
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

const Login = () => {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const navigation = useNavigation();

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
    
        <View style = {styles.container}>
            <View style = {styles.header}>
                <Image source = {Logo} resizeMode='contain' style = {[styles.logo, { width: logoSize, height: logoSize }]} />
                <Text style = {[styles.title, { fontSize: fontSizeOla }]}>Olá,
                </Text>
                <Text style = {[styles.subtitle, { fontSize: fontSizeBemVindo }]}>Seja bem-vindo!</Text>
            </View>
            <View style = {styles.content}>
                <View style = {{gap: 50, flex: 1, paddingBottom: 30}}>
                    <View style = {{ alignItems:'center' }}>
                        <Text style = {[styles.texto, {fontSize: fontSizeLogin }]}>Login</Text>
                    </View>
                    
                    <View style = {styles.form}>
                        <MyInput 
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            placeholder="Insira seu email..."
                            fontSize={fontSizeForm}
                            height={heightInput}
                            keyboardType="email-address" // Teclado de email
                        />
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
                    <MyButton
                        label="Login"
                        fontSize={fontSizeForm}
                        height={heightInput}
                        onPress={() => /*navigation.replace('TreinerHome')*/navigation.navigate('TreinerHome')}
                    />
                    <View style={{flexDirection: "row", alignItems:'center', justifyContent: 'center'}}>
                        <Text style = {{fontSize: fontSizeForm}}>Não tem uma conta? {''}
                            <Text style = {[styles.linkFooter, {fontSize: fontSizeForm}]} onPress={() => navigation.navigate('Signin')}>Registre-se...</Text>
                        </Text>
                    </View>
                    

                </View>
            </View>
            
        </View>
    )
}

export default Login