// import React,{useState} from "react";
// import { Text,View,Button, TextInput, StyleSheet } from "react-native";
// import AsyncStorage from '@react-native-async-storage/async-storage';

// const ProfileScreen = ({navigation}) => {
//     const [text, setText] = React.useState('Pigeon');
//     const [email, setEmail] = React.useState('kritsakorn.s@hotmail.com');

//     const [user, setUser] = useState('No user');
//     AsyncStorage.getItem('user').then((value)=> {
//         console.log(value);
//         setUser(value);
//     })

//     const handleLogout = () => {
//         console.log("Logout");
//         AsyncStorage.removeItem('user');
//         navigation.replace("Landing");
//     }
//     return(
//         <View style={{flex:1, alignItems:'center', justifyContent:'center', backgroundColor:'pink' }}>
//         <View style={{alignItems:'flex-start'}}>
//           <View style={{flexDirection:'row', alignItems:'center'}}>
//             <Text style={styles.textStyle}>Username</Text>
//             <TextInput
//               style={styles.textfield}
//               onChangeText={setText}
//               value={text}
//             />
//           </View>
//           <View style={{flexDirection:'row', alignItems:'center'}}>
//             <Text style={styles.textStyle}>Email</Text>
//             <TextInput
//               style={styles.textfield}
//               onChangeText={setEmail}
//               value={email}
//             />
//           </View>
//           <View style={{flexDirection:'row', alignItems:'center'}}>
//             <Text style={styles.textStyle}>Average Calories</Text>
//             <Text style={styles.textStyle}>38 calories</Text>
//           </View>
//           <View style={{flexDirection:'row', alignItems:'center'}}>
//             <Text style={styles.textStyle}>Goal Calories</Text>
//             <Text style={styles.textStyle}>38 calories</Text>
//             <Button title="Edit"/>
//           </View>
//         </View>
//         <View style={{backgroundColor:'red'}}>
//         <Button
//             title="Log out"
//             onPress={handleLogout}
//         />
//         </View>
//         <Text>{user}</Text>
//     </View>
//     );
// };

// const styles = StyleSheet.create({
//   textfield: {
//     height: 40,
//     margin: 12,
//     borderWidth: 1,
//     padding: 10,
//     fontSize: '20px'
//   },
//   textStyle: {
//     fontSize: '20px'
//   }
// });

// export default ProfileScreen;

import React, { useState, useEffect } from "react";
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

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

const ProfileScreen = ({ navigation }) => {
  // const [text, setText] = React.useState('Pigeon');
  // const [email, setEmail] = React.useState('kritsakorn.s@hotmail.com');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState({}); // Initialize user as an empty object
  const [goalCalories, setGoalCalories] = useState(50);
  const [showGoalCalInput, setShowGoalCalInput] = useState(false); // State to manage the visibility of the goal calories input field

  useEffect(() => {
    AsyncStorage.getItem("user")
      .then((value) => {
        console.log(value);
        if (value) {
          setUser(JSON.parse(value)); // Parse the stored string to an object
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleGoalCalInput = (value) => {
    // Check if the value is a number and within the limit of 99999
    const newValue = parseInt(value);
    if (!isNaN(newValue) && newValue <= 99999) {
      setGoalCalories(newValue);
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
            <Text style={styles.textStyle}>{goalCalories}</Text>
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
                    value={goalCalories.toString()}
                    keyboardType="numeric"
                  />

                  <Text style={styles.textStyle}>calories</Text>
                </View>
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}
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
    borderRadius: 20,
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
