import React from "react";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from "../screens/main/HomeScreen";
import ProfileScreen from "../screens/main/ProfileScreen";
import { FontAwesome,Ionicons } from "@expo/vector-icons";


const Tab = createBottomTabNavigator();

const MainTabNavigator = () => {
    return(
        <Tab.Navigator 
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
    
              if (route.name === 'Home') {
                iconName = focused ? 'list' : 'list-outline';

                return <Ionicons name={iconName} size={size} color={color} />;
              } else if (route.name === 'Profile') {
                iconName = focused ? 'user' : 'user-o';
                return <FontAwesome name={iconName} size={size} color={color} />;
              }
    

    
              return null;
            },
          })}
          tabBarOptions={{
            activeTintColor: '#DAA520',
            inactiveTintColor: 'gray',
          }}>
            <Tab.Screen options={{title:"FoodNote"}} name="Home" component={HomeScreen}/>
            <Tab.Screen name="Profile" component={ProfileScreen}/>
        </Tab.Navigator>
    )
}

export default MainTabNavigator