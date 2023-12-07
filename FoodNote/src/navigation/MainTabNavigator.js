import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/main/HomeScreen";
import LoginScreen from "../screens/auth/LoginScreen";
import ProfileScreen from "../screens/main/ProfileScreen";


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return(
        <Tab.Navigator >
            <Tab.Screen options={{title:"FoodNote"}} name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default MainTabNavigator