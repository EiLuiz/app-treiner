import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../pages/login";
import registro from "../pages/registro";
import AreaTreinador from "../pages/areaTreinador";

const Stack = createNativeStackNavigator();

export default function Routes(){
    return(
        <Stack.Navigator>
            <Stack.Screen name='Login' options={{ headerShown: false }} component={Login}/>
            <Stack.Screen name='Signin' options={{ headerShown: false }} component={registro}/>
            <Stack.Screen name='TreinerHome'  component={AreaTreinador}/>
        </Stack.Navigator>
        
    )
}