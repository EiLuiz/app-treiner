import { View, Text, TextInput, StyleSheet } from 'react-native';

const MyInput = ({
    label, 
    value, 
    onChangeText, 
    placeholder, 
    fontSize, 
    height, 
    secureTextEntry, 
    keyboardType,
    style,
    labelStyle

})=>{return(
    <View style = {styles.cardInput}>
        <Text style = {[styles.textI, {fontSize: fontSize}, labelStyle]}>{label}</Text>
        <TextInput style = {[styles.inputS, {fontSize: fontSize, height: height, style}]} value={value} placeholderTextColor= '#ACACAC' onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secureTextEntry} keyboardType={keyboardType} ></TextInput>
    </View>
);};


const styles = StyleSheet.create({
    cardInput:{
        
        width:'100%', 
        maxWidth: 500,
    },
    textI:{
        paddingHorizontal: 5,
        fontWeight: 'light',
    },
    inputS:{
        backgroundColor: '#EAEAEA',
        width: '100%',
        maxWidth: 500,
        padding: 10,
        padding: 14,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24,
        borderRadius: 13,
    },

});

export default MyInput;