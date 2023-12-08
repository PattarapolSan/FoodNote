import React from "react";
import { Text ,StyleSheet, View, SafeAreaView,StatusBar, TouchableOpacity} from "react-native";
// import LinearGradient from "react-native-linear-gradient";
import { LinearGradient } from "expo-linear-gradient";

// import { SafeAreaView } from "react-native-safe-area-context";


const LandingScreen = ({navigation}) =>{
    return(
        <LinearGradient
            colors={["#FFD52E", "#FFD52E","#fff"]}// Replace with your desired gradient colors
            start={{ x: 0, y: 0 }} // Gradient start point (top-left)
            end={{ x: 1, y: 1 }}  
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{flex:1}}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.mainView}>
                    {/* <View style={styles.titleView}>
                        <Text style={styles.title}>FoodNote</Text>
                    </View>
                    <View style={styles.bottomContentView}> 
                        <TouchableOpacity style={styles.loginButton}>
                            <Text>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.loginButton}>
                            <Text>Signup</Text>
                        </TouchableOpacity>
                    </View> */}
                    <Text style={{fontSize: 60, paddingLeft: 20}}>Welcome Too</Text>
                    <Text style={{fontSize: 80, paddingLeft: 25, fontWeight:'500'}}>FoodNote</Text>
                    <View style={styles.bottonView}>
                        <TouchableOpacity 
                            style={styles.loginButton}
                            onPress={()=>navigation.replace('Login')}
                        
                        >
                            <Text style={{fontSize: 30}}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={styles.signupButton}
                            onPress={()=>navigation.replace('Signup')}
                        >
                            <Text style={{fontSize: 20}}>Signup</Text>
                        </TouchableOpacity>
                    </View>


                </View>
            </SafeAreaView>
        </LinearGradient>
    );
} 

export default LandingScreen;

const styles = StyleSheet.create({
    mainView: {
        flex: 1,
        // alignItems: 'center',
        justifyContent: 'flex-end',
        // backgroundColor: '#008080'
    },
    titleView: {
        flex:2,
        // backgroundColor:'red',
        justifyContent: "center",
    },
    bottomContentView: {
        flex: 3,
        alignItems:'center',
        justifyContent: 'center'
    },
    title: {
        fontSize: 50,
        color: "#FFD52E"
    },
    loginButton: {
        // backgroundColor: '#FFD52E',
        borderWidth: 1,
        width: 300,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30',

    },
    signupButton: {
        // backgroundColor: '#FFD52E',
        width: 190,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30',
        marginTop: 30

    },
    bottonView: {
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems:'center',
        paddingBottom: 50,
        paddingTop: 100
    }
})
