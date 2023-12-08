import React,{useState} from "react";
import { Text,View,Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation}) => {
    const [user, setUser] = useState('No user');
    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
        setUser(value);
    })

    const handleLogout = () => {
        console.log("Logout");
        AsyncStorage.removeItem('user');
        navigation.replace("Landing");
    }
    return(
        <View style={{flex:1, alignItems:'center', justifyContent:'center'}}>
        <Text>{user}</Text>
        <Button 
            title="Log out"
            onPress={handleLogout}
        />
    </View>
    );
}

export default ProfileScreen; 