import { View, Text, TextInput, StyleSheet } from 'react-native';

const MyInput = ({
    label, 
    value, 
    onChangeText, 
    placeholder, 
    fontSize, 
    height, 
    secureTextEntry, 
    keyboardType

})=>{return(
    <View style = {styles.cardInput}>
        <Text style = {[styles.textI, {fontSize: fontSize}]}>{label}</Text>
        <TextInput style = {[styles.inputS, {fontSize: fontSize, height: height,}]} value={value} onChangeText={onChangeText} placeholder={placeholder} secureTextEntry={secureTextEntry} keyboardType={keyboardType} ></TextInput>
    </View>
);};


const styles = StyleSheet.create({
    cardInput:{
        flex: 1, 
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
        placeholderTextColor: '#ACACAC',
        borderRadius: 13,
    },

});

export default MyInput;