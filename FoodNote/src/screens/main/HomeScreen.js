import React from "react";
import { Text,View,Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({navigation}) => {
    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
    })
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Home Screen</Text>
            <Button 
                title="go add list"
                onPress={()=>{navigation.navigate("AddList")}}
            />
            <Button 
                title="go list detail"
                onPress={()=>{navigation.navigate("ListDetail")}}
            />
        </View>

    );
}

export default HomeScreen; 