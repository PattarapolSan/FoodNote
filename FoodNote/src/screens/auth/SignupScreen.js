import React from "react";
import { Text,SafeAreaView,View, Button, StyleSheet,TextInput } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { TouchableOpacity } from "react-native-gesture-handler";



const SigupScreen = ({navigation}) =>{
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
                    <TextInput style={styles.inputField} placeholder="Email" inputMode="email"></TextInput>
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Username</Text>
                    <TextInput style={styles.inputField} placeholder="Username"></TextInput>
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Password</Text>
                    <TextInput style={styles.inputField} placeholder="Password" secureTextEntry={true}inputMode="text" ></TextInput>
                </View>
                <View style={styles.stackView}>
                    <Text style={styles.inputLabel}>Confirmed Password</Text>
                    <TextInput style={styles.inputField} placeholder="Confirmed Password" secureTextEntry={true}inputMode="text" ></TextInput>
                </View>
                <View style={{marginTop: 30}}>
                    <TouchableOpacity style={styles.loginButton}>
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