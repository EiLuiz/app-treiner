import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import AntDesign from '@expo/vector-icons/AntDesign';

const TreinoCard = ({
    name,
    desc,
    onPress,
    close
})=>{
    return(
        <TouchableOpacity onPress={onPress}>
        <View style={styles.card}>
           <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}><Text style={styles.tittle}>{name}</Text><TouchableOpacity onPress={close}><AntDesign name="close-circle" size={20} color="red" /></TouchableOpacity></View> 
            
            <Text style={styles.desc}>{desc}</Text>
        </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        
        
        alignItems: 'flex-start',
        borderLeftWidth: 4, 
        borderLeftColor:'black',
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    tittle:{

        fontSize: 20,
        fontWeight: 'bold',

    },
    desc:{
        marginTop: 5,
        fontSize: 14,
        color: '#a1a1a1'
    }
});

export default TreinoCard;