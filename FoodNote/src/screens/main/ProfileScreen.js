import React, { useState, useEffect,useCallback } from "react";
import {
  Text,
  View,
  Button,
  TextInput,
  StyleSheet,
  Modal,
  Pressable,
  Dimensions,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";
import setUserCalories from '../../function/setUserCalories'
import setUsersCalories from "../../function/setUserCalories";
import getUsersCalories from "../../function/getUserCalories";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({}); 
  const [calories, setCalories] = useState(0);


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const value = await AsyncStorage.getItem('user');
        if (value) {
          setUser(JSON.parse(value));
        }
      } catch (error) {
        console.error('Error fetching user:', error.message);
      }
    };

    fetchUser();
  }, []);

  const fetchUserCalories = useCallback(async () => {
    try {
      const userCalories = await getUsersCalories(user.uid);

      if (userCalories !== null) {
        setCalories(userCalories);
      } else {
        console.log('Calories are null for the user:', user.uid);
      }
    } catch (error) {
      console.error('Error fetching user calories:', error.message);
    }
  }, [user]);

  useEffect(() => {
    // Call fetchUserCalories when the component mounts
    fetchUserCalories();
  }, [fetchUserCalories, user.uid]);

  const handleGoalCalInput = (value) => {
    // Check if the value is a number and within the limit of 99999
    const newValue = parseInt(value);

    if (Number.isNaN(newValue)) {
      setCalories(0); //setter for state
    } else if (newValue > 10) {
      setCalories(newValue);
    } else {
      setCalories(newValue);
    }
  

  };

  const handleLogout = () => {
    console.log("Logout");
    AsyncStorage.removeItem("user");
    navigation.replace("Landing");
  };

  return (
    <LinearGradient
      colors={["#FFD52E", "#FFD52E", "#fff"]} // Replace with your desired gradient colors
      start={{ x: 0, y: 0 }} // Gradient start point (top-left)
      end={{ x: 0.5, y: 1 }}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View
          style={{
            width: windowWidth,
            height: windowHeight / 2,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <Text style={styles.textStyle}>Username: {user.username}</Text>
          <Text style={styles.textStyle}>Email: {user.email}</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 290,
            }}
          >
            <Text style={styles.textStyle}>Average Calories:</Text>
            <Text style={styles.textStyle}>38 calories</Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              width: 350,
            }}
          >
            <Text style={styles.textStyle}>Goal Calories:</Text>
            <Text style={styles.textStyle}>{calories}</Text>
            <Pressable
              style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Edit GoalCal</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              setModalVisible(!modalVisible);
              setUserCalories(user.username, goalCalories || 0);
            }}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.textStyle}>Goal Calories</Text>
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TextInput
                    style={styles.textfield}
                    onChangeText={(value) => {
                      handleGoalCalInput(value);
                    }}
                    value={calories.toString()}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textStyle}>calories</Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => {
                    setModalVisible(!modalVisible)
                    setUsersCalories(user.uid, calories )
                } }
                >
                  <Text style={styles.textStyle}>Confirm</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
        </View>
        <View style={[styles.button, styles.buttonOpen]}>
          <Pressable title="Log out" onPress={handleLogout}>
            <Text style={styles.textStyle}>Log out</Text>
          </Pressable>
        </View>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  textfield: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    fontSize: 20,
    borderRadius: 20,
  },
  textStyle: {
    fontSize: 20,
    fontFamily: "Arial",
    fontWeight: "bold",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    flexDirection: "column",
  },
  button: {
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#F194FF",
  },
  textModalStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 25,
    paddingTop: 2,
  },
});

export default ProfileScreen;
