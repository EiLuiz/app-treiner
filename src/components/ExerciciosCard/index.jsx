import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

const ExerciciosCard = ({
    dados,
    close
})=>{
    const series = dados.series_detalhes || []
    return(
        
        <View style={styles.card}>
            <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}><Text style={styles.tittle}>{dados.nome}</Text><TouchableOpacity onPress={close}><AntDesign name="close-circle" size={20} color="red" /></TouchableOpacity></View>
            <View style={styles.subTitleSeries}>
                <View style={styles.rowTitle}><Text style={{fontSize: 16, color:'#ACACAC'}}>Series</Text></View>
                <View style={styles.rowTitle}><Text style={{fontSize: 16, color:'#ACACAC'}}>Reps</Text></View>
                <View style={styles.rowTitle}><Text style={{fontSize: 16, color:'#ACACAC'}}>Carga</Text></View>

            </View>
            {series.map((serie, index)=>{
                return(
                    <View key={index} style={styles.linhaSerie}>
                        <View style={styles.row}><Text style={{fontSize: 16, color:'#ACACAC'}}>{index+1}º</Text></View>
                        <View style={styles.row}><Text style={{fontSize: 16, color:'#ACACAC'}}>{serie.reps}</Text></View>
                        <View style={styles.row}><Text style={{fontSize: 16, color:'#ACACAC'}}>{serie.carga}Kg</Text></View>
                    </View>
                )
            })}
            
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
    linhaSerie: {
        gap: 20,
        flexDirection:"row",
        justifyContent: 'space-between'
    },
    subTitleSeries:{
        gap:20,
        flexDirection:"row",
        justifyContent: 'space-between'
    },
    rowTitle:{
        width: 80,
        maxWidth: 500,
        padding: 10,
        
        alignItems: 'center',
    },
    row:{
        alignItems: 'center',
        backgroundColor: '#EAEAEA',
        width: 80,
        maxWidth: 500,
        padding: 10,
        borderWidth: 1,
        borderColor: '#E0E0E0',
        marginBottom: 24,
        borderRadius: 13
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

export default ExerciciosCard;