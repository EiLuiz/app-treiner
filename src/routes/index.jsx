import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import registro from "../pages/registro";
import AreaTreinador from "../pages/areaTreinador";
import AlunoTreino from "../pages/alunoTreino";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator initialRouteName="TreinosAluno" 
    screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login' options={{ headerShown: false }} component={Login}/>
            <Stack.Screen name='Signin' options={{ headerShown: false }} component={registro}/>
            <Stack.Screen name='TreinerHome'   component={AreaTreinador}/>
            <Stack.Screen name='TreinosAluno' initialParams={{ 
            alunoId: '014cf0ed-ba28-4441-bce6-a91253175dc9', // Copie um ID real do seu banco
            alunoNome: 'Luiz' 
        }} options={{ headerShown: false }} component={AlunoTreino}/>
        </Stack.Navigator>
        
    )
}