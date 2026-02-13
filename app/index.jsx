import { StyleSheet, Text, View, Image } from "react-native";
import { StatusBar } from "expo-status-bar";
import Login from '../src/pages/login'
import Routes from "../src/routes";

const App = () => {
    return(
    <>
    <StatusBar/>
    <Routes />
    </>
      
    )
}

export default App

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
})