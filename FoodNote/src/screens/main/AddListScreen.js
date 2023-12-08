import React from "react";
import { Text,View,Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddListScreen = ({navigation}) => {
    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
    })
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
            <Text>Add list Screen</Text>
            <Button 
                title="go to home"
                onPress={()=>{navigation.goBack()}}
            />
        </View>

    );
}

export default AddListScreen; 