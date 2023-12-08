import React from "react";
import { Text,View,Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ListDetailScreen = ({navigation}) => {
    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
    })
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>List Detail Screen</Text>
            <Button 
                title="go to home"
                onPress={()=>{navigation.goBack()}}
            />
        </View>

    );
}

export default ListDetailScreen; 