import React from "react";
import { Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
    })
    return(
        <Text>Home Screen</Text>
    );
}

export default HomeScreen; 