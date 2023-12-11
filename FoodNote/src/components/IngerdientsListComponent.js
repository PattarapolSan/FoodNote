import React from 'react'
import { StyleSheet, View,TextInput,Pressable,Text } from 'react-native';
import { FontAwesome } from "@expo/vector-icons";


const IngredientsListComponent = (props) => {
        return(
            <View style={styles.ingredients_add}>
                <View style={{flexDirection: 'column'}}>
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputLabel}>Name:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Ingredient Name'
                        value={props.name}
                        editable={props.edit}
                        onChangeText={(value) => props.onChangeText(props.id, "name", value)}
                    />
                    </View>
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputLabel}>Weight:</Text>
                    <TextInput 
                        style={styles.input} 
                        placeholder='Weigth'
                        keyboardType='numeric'
                        value={props.weight}
                        editable={props.edit}
                        onChangeText={(value) => props.onChangeText(props.id, "weight", value)}
                    />
                    </View>
                    <View style={styles.inputWrap}>
                        <Text style={styles.inputLabel}>Calories:</Text>
                    <TextInput 
                        style={styles.input} 
                        value={props.calories}
                        keyboardType='numeric'
                        placeholder='Calories'
                        editable={props.edit}
                        onChangeText={(value) => props.onChangeText(props.id, "calories", value)}
                    />
                    </View>

                </View>

                {
                    props.showTrash?
                    <View style={{justifyContent: 'center', paddingRight: 40}}>
                        <Pressable style={{ alignItems: "center"}} onPress={() => props.onPress(props.id)}>
                            <FontAwesome name={"trash"} size={30} color="red"/>
                        </Pressable> 
                    </View>
                    :
                    <View style={{justifyContent: 'center', paddingRight: 40}}>

                    </View>

                }

         </View>
        );
}


const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        marginLeft: 10
      },
      ingredients_add:{
        backgroundColor: "#fff",
        marginTop: 10,
        paddingTop: 5,
        paddingLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderRadius: 20
    },
    inputWrap:{
        flex:1,
        flexDirection: 'row',
        marginBottom: 5
    },
    inputLabel: {
        fontSize: 18
    }
    })

export default IngredientsListComponent;

