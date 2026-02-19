import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import registro from "../pages/registro";
import AreaTreinador from "../pages/areaTreinador";
import AlunoTreino from "../pages/alunoTreino";
import Treinos from "../pages/treinos";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Login'  component={Login}/>
            <Stack.Screen name='Signin'  component={registro}/>
            <Stack.Screen name='TreinerHome'   component={AreaTreinador}/>
            <Stack.Screen name='TreinosAluno'  component={AlunoTreino}/>
            <Stack.Screen name='Treinos' component={Treinos} />
        </Stack.Navigator>
        
    )
}