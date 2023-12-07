import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/auth/LoginScreen";



const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Login">
                <Stack.Screen name="Login" component={LoginScreen}/>    
                <Stack.Screen name="Main" component={MainTabNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppNavigator;