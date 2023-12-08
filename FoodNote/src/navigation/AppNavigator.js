import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import MainTabNavigator from "./MainTabNavigator";
import LoginScreen from "../screens/auth/LoginScreen";
import LandingScreen from "../screens/main/LandingScreen";
import SigupScreen from "../screens/auth/SignupScreen";



const Stack = createStackNavigator();


const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}} initialRouteName="Landing">
                <Stack.Screen name="Landing" component={LandingScreen}/>
                <Stack.Screen name="Login" component={LoginScreen}/>    
                <Stack.Screen name="Signup" component={SigupScreen}/>    
                <Stack.Screen name="Main" component={MainTabNavigator}/>
            </Stack.Navigator>
        </NavigationContainer>

    )
}

export default AppNavigator;