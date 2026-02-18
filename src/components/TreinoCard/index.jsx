import { View, StyleSheet, Text } from 'react-native'

const TreinoCard = ({
    name,
    desc
})=>{
    return(
        <View style={styles.card}>
            <Text style={styles.tittle}>{name}</Text>
            
            <Text style={styles.desc}>{desc}</Text>
        </View>
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