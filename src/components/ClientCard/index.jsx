
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useResponsive } from '../../hooks/useResponsive';

const ClientCard = ({ 
    name, 
    onPressDieta, 
    onPressTreino, 
    onPressDelete, 
    onPressEdit 
}) => {
    const { responsiveSize } = useResponsive();
    const logoSize = responsiveSize(30); 
    const fontSizeLogin = responsiveSize(36);
    const fontSizeForm = responsiveSize(20);
    const heightInput = responsiveSize(46);

    return (
        <View style={styles.card}>
            {/* Lado Esquerdo: Ícone e Nome */}
            <View style={styles.infoContainer}>
                <View style={styles.avatar}>
                    <Text style={styles.avatarText}>{name.charAt(0).toUpperCase()}</Text>
                </View>
                <Text style={styles.name}>{name}</Text>
            </View>

            {/* Lado Direito: Botões de Ação */}
            <View style={styles.actions}>
                <TouchableOpacity onPress={onPressTreino} style={styles.actionBtn}>
                    <Text style={styles.btnText}>💪 Treino</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={onPressDieta} style={[styles.actionBtn, {backgroundColor: '#4CAF50'}]}>
                    <Text style={styles.btnText}>🍎 Dieta</Text>
                </TouchableOpacity> 
                
            </View>
        </View>
    );;}

    const styles = StyleSheet.create({
      card: {
        backgroundColor: 'white',
        padding: 15,
        borderRadius: 12,
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        elevation: 3, // Sombra no Android
        shadowColor: '#000', // Sombra no iOS
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    infoContainer: { flexDirection: 'row', alignItems: 'center', flex: 1 },
    avatar: {
        width: 40, height: 40, borderRadius: 20,
        backgroundColor: 'black', justifyContent: 'center', alignItems: 'center',
        marginRight: 12
    },
    avatarText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
    name: { fontSize: 16, fontWeight: '600', color: '#333' },
    actions: { flexDirection: 'row', gap: 5 },
    actionBtn: {
        paddingVertical: 6, paddingHorizontal: 12,
        backgroundColor: 'black', borderRadius: 6
    },
    btnText: { color: 'white', fontSize: 12, fontWeight: 'bold' }

    })

    export default ClientCard;