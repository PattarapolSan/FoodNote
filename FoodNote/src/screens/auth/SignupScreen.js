import React, {useState} from "react";
import { Text,SafeAreaView,View, Button, StyleSheet,TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";
import {getAuth, createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import app from "../../config/FireBase";


const SigupScreen = ({navigation}) =>{
    const [email,setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');
    const [confirmedPassword,setConfirmedPassword] = useState('');

    const auth = getAuth();

    const handleSignup = async() => {
        console.log(email, username, password);
           // Check if the password and confirmPassword match
    if (password !== confirmedPassword) {
        console.error("Passwords do not match");
        // You can show an error message to the user here
        return;
      }
      createUserWithEmailAndPassword(auth, email, password).then((response)=> {
        const user = response.user;
        updateProfile(user, {displayName:username});
        console.log('User signed up:', user.uid, 'with username:', user.displayName);
        navigation.replace('Login')
      })
      .catch((error) => {
        console.error('Error signing up:', error.message);
      })
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
                <Text style={{fontSize:80, marginBottom: 10}}>FoodNote</Text>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Email</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Email" 
                        inputMode="email"
                        onChangeText={(value)=>setEmail(value)}
                    />
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Username" 
                        onChangeText={(value)=>setUsername(value)}
                    />
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Password" 
                        secureTextEntry={true}
                        inputMode="text"
                        onChangeText={(value)=>setPassword(value)}
                    />
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Confirmed Password</Text>
                    <TextInput 
                        style={styles.inputField} 
                        placeholder="Confirmed Password" 
                        secureTextEntry={true}
                        inputMode="text" 
                        onChangeText={(value)=>setConfirmedPassword(value)}
                    />
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity 
                        style={styles.loginButton}
                        onPress={handleSignup}
                    >
                        <Text style={{fontSize: 25}}>Sign Up</Text>
                    </TouchableOpacity>
                </View>

                <View style={{marginTop: 40}}>
                    <Text style={{fontSize: 20, marginBottom:10}}>Already have an account?</Text>
                    <Button
                        title="Login"
                        color={'black'}
                        onPress={() => navigation.replace('Login')}
                    />
                </View>
            </View>
        </SafeAreaView>
    </LinearGradient>
    );
}



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
        height: 50,
        marginBottom: 20,
        fontSize: 18,
        paddingLeft: 10,
        backgroundColor: '#fff'
    },
    stackView:{
        justifyContent: 'center',
    },
    inputLabel: {
        fontSize: 20,
        marginBottom:5,
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


export default SigupScreen;