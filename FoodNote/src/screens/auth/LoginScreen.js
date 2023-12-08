import React, { useState,useEffect } from "react";
import { Text,SafeAreaView,View, Button, StyleSheet,TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import {getAuth, signInWithEmailAndPassword} from 'firebase/auth'
import app from "../../config/FireBase";
import AsyncStorage from '@react-native-async-storage/async-storage';

const auth = getAuth();

const LoginScreen = ({navigation}) =>{
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');


    const handleLogin = () => {
          signInWithEmailAndPassword(auth,email, password).then((userCredential) => {
            const user = userCredential.user;
            console.log(user.displayName)
            console.log('User signed in:', user.uid);
            AsyncStorage.setItem('user', JSON.stringify({
                uid: user.uid,
                email: user.email,
                username: user.displayName,
              }));
            const currentTime = new Date().getTime();
            AsyncStorage.setItem('lastActivityTimestamp', currentTime.toString());
            navigation.replace('Main')
          })
        .catch ((error) => {
          console.error('Error signing in:', error.message);
            }
        )
      }
    
    
    return(
        <LinearGradient
        colors={["#FFD52E", "#FFD52E","#fff"]}// Replace with your desired gradient colors
        start={{ x: 0, y: 0 }} // Gradient start point (top-left)
        end={{ x: 1, y: 1 }}  
        style={{ flex: 1 }}
    >
        <SafeAreaView style={{flex:1}}>
            <View style={styles.inputView}>
                <Text style={{fontSize:80, marginBottom: 40}}>FoodNote</Text>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Email" 
                        inputMode="email" 
                        onChangeText={(value)=>{setEmail(value)}}
                    />
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Password" 
                        secureTextEntry={true} 
                        inputMode="text" 
                        onChangeText={(value)=>{setPassword(value)}}
                    />
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={handleLogin}
                    >
                        <Text style={{fontSize: 25}}>Login</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginTop: 40}}>
                <Text style={{fontSize: 20, marginBottom:10}}>Don't have an account?</Text>
                    <Button
                    title="Sign Up"
                    color={'black'}
                    onPress={()=>navigation.replace('Signup')}
                    />
                </View>
            </View>
        </SafeAreaView>
    </LinearGradient>
    );
}

export default LoginScreen;

const styles = StyleSheet.create({
    textView: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    inputView: {
        flex:3,
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingBottom: 80
        // backgroundColor: 'red'
    },
    inputField:{
        borderRadius: 15,
        width: 300,
        height: 60,
        marginBottom: 20,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    stackView:{
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 30,
        marginBottom:10,
        paddingLeft: 5
    },
    loginButton: {
        borderWidth: 1,
        borderRadius: 15,
        width: 250,
        height:60,
        justifyContent: 'center',
        alignItems: 'center',
    }
})