import React, { useEffect, useState } from "react";
import { Text,View,StyleSheet,Button, SafeAreaView,Pressable, TextInput, ScrollView, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IngredientsListComponent from "../../components/IngerdientsListComponent";
import { FontAwesome } from "@expo/vector-icons";
import DateTimePicker from '@react-native-community/datetimepicker';
import addMenuToDB from "../../function/addMenutoDB";


const ListDetailScreen = ({navigation, route}) => {

    // const {item} = route.params;

    const [date, setDate] = useState(new Date())
    const [title, setTitle] = useState('')
    const [ingredientsList, setIngredientList] = useState([])
    const [sumcal, setSumcal] = useState(0)
    const [listId, setId] = useState(1);
    const [userId, setUserId] = useState();

    AsyncStorage.getItem('user').then((value)=> {
        const userObj = JSON.parse(value);
        setUserId(userObj.uid);
        console.log(userObj.uid);
    })


    const handleInputchange = (id, field, value) => {
        const newData = ingredientsList.map((ingredient) => 
            ingredient.id === id ? {...ingredient, [field]: value} : ingredient
        )

        setIngredientList(newData)
    }
        

    useEffect(()=>{
        const totalCalories = ingredientsList.reduce((acc, ingredient) => {
                return acc + parseInt(ingredient.calories | 0);
        }, 0);
        // console.log("type of",typeof(totalCalories))
        setSumcal(totalCalories)
    },[ingredientsList])

   
 
    return(
        <SafeAreaView style={{flex:1}}>
                <View style={styles.titleView}>
                    <TextInput style={styles.titleInput} placeholder="Untitled" onChangeText={(value)=>setTitle(value)}/>
                </View>
                <View style={styles.contentView}>
                    <View style={styles.stackView}>
                        <Text  style={{fontSize:25 ,marginVertical: 15}}>Date:</Text>
                        <DateTimePicker 
                            value={date} 
                            mode={'date'} 
                            onChange={(event, selectedDate)=>setDate(selectedDate)} maximumDate={new Date()}
                        />
                    </View>
                    <View style={{alignItems:'center', marginTop:30}}>
                        <Text style={{fontSize:25}}>Ingredients</Text>
                    </View>
                    <ScrollView style={{flex:1, borderBottomWidth:1, borderTopWidth:1, marginTop:4}}> 
                    {
                        ingredientsList.map((ingredients, index) => {
                            return(
                            <IngredientsListComponent 
                                key={index} 
                                id={ingredients.id}
                                name={ingredients.name} 
                                weight={ingredients.weight} 
                                calories={ingredients.calories}
                            />
                            )
                        })
                    } 
                    </ScrollView>
                    <View style={{flexDirection: 'row', justifyContent:'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20}}>
                        <Text style={{fontSize: 30}}>
                            Total Calories
                        </Text>
                        <Text style={{fontSize: 40}}>
                            {sumcal}
                        </Text>
                    </View>


                </View>
        </SafeAreaView>


    );
}

const styles = StyleSheet.create({
    titleView:{
        alignItems:"center"
    },
    contentView: {
        flex:1,
        paddingLeft: 10,
        paddingRight: 10
    },
    stackView:{
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    titleInput: {
        fontSize: 25,
        marginLeft: 10
    },
    addMenu:{
        width: 200,
        height: 60,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: 'center',
        backgroundColor:"#FFD52E"
    }
})


export default ListDetailScreen; 



