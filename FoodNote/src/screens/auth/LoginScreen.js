import React from "react";
import { Text,SafeAreaView, Button } from "react-native";

const LoginScreen = ({navigation}) =>{
    return(
        <SafeAreaView>
            <Text>Login Screen</Text>
            <Button title="Home" onPress={()=> navigation.navigate("Main")}/>
        </SafeAreaView>

    );
}

export default LoginScreen;