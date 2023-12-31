import React,{useEffect} from "react";
import { Text ,StyleSheet, View, SafeAreaView,StatusBar, TouchableOpacity} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from '@react-native-async-storage/async-storage';



const LandingScreen = ({navigation}) =>{



    useEffect(() => {
        const checkAuthentication = async () => {
          try {
            const currentTime = new Date().getTime();
            const userString = await AsyncStorage.getItem('user');
            if (userString) {
              const user = JSON.parse(userString);
    
              const lastActivityTimestamp = await AsyncStorage.getItem('lastActivityTimestamp');
    
              if (lastActivityTimestamp) {
                const timeDiff = currentTime - parseInt(lastActivityTimestamp, 10);
    
                const sessionTimeout = 2 * 24 * 60 * 60 * 1000;
    
                if (timeDiff > sessionTimeout) {
                  console.log('Session has timed out. Please log in again.');
                  AsyncStorage.removeItem('user');
                  navigation.replace('Login');
                  return;
                }
              }
              
              console.log('User is already authenticated:', user.uid);
              AsyncStorage.setItem('lastActivityTimestamp', currentTime.toString());
              navigation.replace('Main');
            }
          } catch (error) {
            console.error('Error checking authentication:', error.message);
          }
        };
    
        checkAuthentication();
      }, [navigation]);
    
    
    return(
        <LinearGradient
            colors={["#FFD52E", "#FFD52E","#fff"]}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }}  
            style={{ flex: 1 }}
        >
            <SafeAreaView style={{flex:1}}>
                <StatusBar barStyle="dark-content" />
                <View style={styles.mainView}>
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
        justifyContent: 'flex-end',
    },
    titleView: {
        flex:2,
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
        borderWidth: 1,
        width: 300,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '30',

    },
    signupButton: {
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
