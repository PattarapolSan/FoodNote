import React, { useEffect, useState } from "react";
import { Text,View,StyleSheet,Button, SafeAreaView,Pressable, TextInput, ScrollView, TouchableOpacityComponent, TouchableOpacity} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FontAwesome } from "@expo/vector-icons";

const AddListScreen = ({navigation}) => {
    const currentDate = new Date().toDateString();
    const [title, settitle] = useState("nothing")
    const [ingredients, setingredientlist] = useState([{id: 1, name: "name", weight: "kg", calories:"kg"}])
    const [sumcal, setsumcal] = useState(0)


    const handleinputchange = (id, field, value) => {
        const newOne = ingredients.map((ingredient) => 
            ingredient.id === id ? {...ingredient, [field]: value} : ingredient
        )
        
        setingredientlist(newOne)
    }

    useEffect(()=>{
        const totalCalories = ingredients.reduce((acc, ingredient) => {
                return acc + parseInt(ingredient.calories | 0);
        }, 0);
        console.log("type of",typeof(totalCalories))
        setsumcal(totalCalories)
    },[ingredients])

    console.log("Title",title)
    console.log(JSON.stringify(ingredients))

    const handleaddIngredient = () => {
        const newId = ingredients.length + 1;
        setingredientlist([...ingredients, {id: newId, name: 'name', weight: 'kg', calories: "kg"}]);
    }

    const handledeleteingredients = (id) => {
        const newingredient = ingredients.filter((ingredient) => ingredient.id !== id)
        setingredientlist(newingredient)
    }

    

    AsyncStorage.getItem('user').then((value)=> {
        console.log(value);
    })
    return(
        <View style={styles.container}>
            <SafeAreaView style={{flexDirection: "row", marginHorizontal: 16}}>
                <Pressable style={{flex: 1, marginTop: 15}} onPress={() => navigation.goBack()}>
                    <FontAwesome name={"arrow-circle-left"} size={40} color="black"/>
                </Pressable>
            </SafeAreaView>
            
            <View style={styles.addarea}>
                 <View style={styles.Addpagecompt}>
                    <Text style={{fontSize: 30}}>Date: {currentDate}</Text>
                </View>

                <View style={styles.entertitle}>
                    <TextInput style={styles.input} onChangeText={(text) => settitle(text)} placeholder="Enter Titile"></TextInput>
                </View>

                <View style={styles.ingredients}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <Text style={{fontSize: 40 , alignItems: "left"}}>Ingredients</Text>
                        <View style={{ flexDirection: "row", marginTop: 5, justifyContent: "space-around"}}>
                            <Text style={{fontSize: 20}}>Ingredient</Text>
                            <Text style={{fontSize: 20}}>Weight</Text>
                            <Text style={{fontSize: 20}}>Calories</Text>
                        </View>
                        {ingredients.map((ingredients, index) => (
                                <View style={styles.ingredients_add}>
                                    <TextInput 
                                        style={styles.input} 
                                        value={ingredients.name} 
                                        onChangeText={(text) => handleinputchange(ingredients.id, 'name', text)}
                                    />
                                    <TextInput 
                                        style={styles.input} 
                                        value={ingredients.weight} 
                                        onChangeText={(text) => handleinputchange(ingredients.id, 'weight', text)}
                                    />
                                    <TextInput 
                                        style={styles.input} 
                                        value={ingredients.calories} 
                                        onChangeText={(text) => handleinputchange(ingredients.id, 'calories', text)}
                                    />
                                    <Pressable style={{marginTop: 15, alignItems: "center"}} onPress={() =>handledeleteingredients(ingredients.id)}>
                                        <FontAwesome name={"trash"} size={40} color="red"/>
                                    </Pressable> 
                                 </View>
                           ))}
                        <View style={{marginVertical:10}}>
                            <Pressable style={{flex: 1, marginTop: 15, alignItems: "center"}} onPress={handleaddIngredient}>
                                <FontAwesome name={"plus"}  size={40} color="black"/>
                            </Pressable>
                        </View>
                        <View style={styles.addcomponent}>
                            <Text style={{backgroundColor: "rgba(135, 206, 235, 0.8)", fontSize: 30}}>Total calories: {sumcal}</Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        </View>
        

    );
}

const styles = StyleSheet.create({
    container: {
        flex:1
    },
    addarea: {
        backgroundColor: "#fff",
        flex:1,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20,
        alignItems: "center",
        paddingHorizontal: 16
    },
    Addpagecompt: {
        backgroundColor: "rgba(135, 206, 235, 0.8)",
        paddingVertical: 30,
        borderRadius: 5,
        alignItems: "center",
        width: 300
    },
    entertitle: {
        paddingVertical: 30,
        borderRadius: 5,
        alignItems: "center",
    },  
    input: {
        height: 50,
        width: "90%",
        margin: 10,
        borderWidth: 2,
        padding: 10,
        alignItems: "center"
      },
    ingredients: {
        flex:1
    },
    ingredients_add:{
        backgroundColor: "#80F3FF",
        flexDirection: "row",
        marginTop: 10
    },
    addcomponent:{
        flex:1,
        marginTop: 25
    },
    addcomponent_btn: {
        XbackgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#FFF300'
    }
})


export default AddListScreen; 



