import React, { useEffect, useState, useCallback } from "react";
import { Text, View, Button, Dimensions, ScrollView, StyleSheet, Touchable } from "react-native";
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { caloriesGoalState, todayCaloriesState } from '../../util/globalState';
import getUsersCalories from "../../function/getUserCalories";
import getListItems from "../../function/getListItems";
import ProgressBar from 'react-native-progress/Bar';
import HomeListComponent from "../../components/HomeListComponent";
import { TouchableOpacity } from "react-native-gesture-handler";

const HomeScreen = ({ navigation }) => {
    const [calories, setCalories] = useRecoilState(caloriesGoalState);
    const [user, setUser] = useState({});
    const [menuList, setMenuList] = useState([]);
    const [todayCal, setTodayCal] = useRecoilState(todayCaloriesState);
    const screenWidth = Dimensions.get('window').width;

    const today = new Date().toISOString().split('T')[0];

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

    const fetchListItems = useCallback(async () => {
        try {
            const items = await getListItems(user.uid);

            if (items !== null) {
                const sortedDates = Object.keys(items).sort((a, b) => new Date(b) - new Date(a));
                setMenuList(sortedDates.map(date => ({ date, items: items[date] })));
            } else {
                console.log('List items are null for the user:', user.uid);
                setMenuList([])
            }
        } catch (error) {
            console.error('Error fetching list items:', error.message);
        }
    }, [user]);

    useEffect(() => {
        // Call fetchListItems when the component mounts
        fetchListItems();
    }, [fetchListItems]);

    useFocusEffect(
        React.useCallback(() => {
            // Call fetchListItems when the screen comes into focus
            fetchListItems();
        }, [fetchListItems])
    );

    useEffect(() => {
        // Calculate today's calories when menuList changes
        let todayCaloriesSum = 0;
        menuList.forEach(({ date, items }) => {
            if (date === today) {
                items.forEach(item => {
                    todayCaloriesSum += item.calories || 0;
                });
            }
        });
        setTodayCal(todayCaloriesSum);
    }, [menuList, today]);

    const progress = todayCal / calories;

    return (
        <View style={{ flex: 1, paddingTop: 15 }}>
            <View style={styles.titleView}>
                <Text style={{ marginBottom: 15, fontSize: 20 }}>Daily Calories Goal</Text>
                <ProgressBar progress={progress || 0} width={screenWidth - 40} height={25} color="#DAA520" />
            </View>
            <View style={{flexDirection:'row', justifyContent:'space-between', paddingRight:20, paddingLeft:20}}>
                    <Text  style={{fontSize: 20 }}>{today}</Text>
                    <Text style={{fontSize: 20 }}>{todayCal} / {calories}</Text>
                </View>
            <View style={styles.contentView}>
                <ScrollView style={{ flex: 1, paddingTop: 10 }}>
                    {menuList.map(({ date, items, index }) => {
                        return (
                            <HomeListComponent key={index} date={date} items={items}/>
                        );
                    })}
                </ScrollView>
            </View>
            <View style={{height:120, alignItems:'center', justifyContent:'center'}}>
                <TouchableOpacity 
                    style={{backgroundColor:'#FFD52E', width:180, height:60, borderRadius:20, alignItems:'center', justifyContent:'center'}}
                    onPress={()=>navigation.navigate("AddList")}
                    >
                     <Text style={{fontSize:20}}>Add List</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    date: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    contentView: {
        flex: 1,
    },
    titleView: {
        alignItems: "center"
    },
});

export default HomeScreen;
