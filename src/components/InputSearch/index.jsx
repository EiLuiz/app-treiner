import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';

const InputSearch = ({ 
    value, 
    onChangeText, 
    placeholder, 

})=>{return(
    <View style={{
                backgroundColor: '#EAEAEA',
                maxWidth: 500, 
                flexDirection: 'row',
                padding: 10,
                gap: 10,
                alignItems:'center',
                justifyContent:"center",
                width: "40%",
                fontSize: 16,
                borderWidth: 1,
                borderColor: '#E0E0E0',
                borderRadius: 13}}>
                <Ionicons name="search" color='#ACACAC' size={16} style={{alignItems:'center'}}/> 
                <TextInput style={{flex:1}} placeholderTextColor='#ACACAC' onChangeText={onChangeText} value={value} placeholder={placeholder.split('\n', 1)[0]}/>
    </View>
);};




export default InputSearch;