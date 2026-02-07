
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
        <View style={styles.headerCard}>
          <Text style={[styles.nameCard, {fontSize:fontSizeForm}]}>{name}</Text>
          <View style={styles.labelIcon}>
            <TouchableOpacity onPress={onPressDelete} style={styles.icon}> 
              <FontAwesome5 name="trash-alt"  size={fontSizeForm} color="#FF3B30" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressEdit} style={styles.icon}> 
              <FontAwesome5 name="pen" size={fontSizeForm} color="#4CD964" />
            </TouchableOpacity>
          </View>
          </View>
          <View style={styles.content}>
            <TouchableOpacity onPress={onPressTreino} style={styles.buttonA}> 
              <Text style={styles.textButtonA}>Treino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressDieta} style={styles.buttonB}> 
              <Text style={styles.textButtonB}>Dieta</Text>
            </TouchableOpacity>
          </View>
        

      </View>
    );}

    const styles = StyleSheet.create({
      card:{
        backgroundColor: '#EAEAEA', // O cinza claro do fundo
        borderRadius: 25, // Bordas bem arredondadas
        padding: 15,
        marginBottom: 30,
        width: '100%',
        maxWidth: 500, // Trava para tablet
        alignSelf: 'center',

        // Sombra (Elevation para Android, Shadow para iOS)
        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      headerCard:{
        flexDirection:'row',
        alignItems: 'center',
        justifyContent: 'space-beetwen',
        marginBottom: 15,
        paddingHorizontal: 5,
      },
      nameCard:{
        flex: 1,
      },
      labelIcon:{
        flexDirection: 'row',
        gap: 10,
      },
      content:{
        
        paddingHorizontal: 5,
      },
      buttonA:{
        
        backgroundColor: 'black',
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 13,

        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      textButtonA:{
        color: 'white',
        fontSize: 16,
      },
      buttonB:{
        
        backgroundColor: 'white',
        borderWidth:1,
        justifyContent:'center',
        alignItems:'center',
        paddingVertical: 10,
        marginBottom: 10,
        borderRadius: 13,

        elevation: 5,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      },
      textButtonB:{
        color: '#000',
        fontSize: 16,
      }

    })

    export default ClientCard;