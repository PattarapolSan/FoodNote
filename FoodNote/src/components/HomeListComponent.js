import React,{useEffect, useState} from 'react'
import { StyleSheet, View,TextInput,Pressable,Text, TouchableOpacity } from 'react-native';

const HomeListComponent = (props) => {
 
        


        const SubListComponent = (props) => {
            return(
                <View style={styles.subList}>
                    <View style={{flex:4}}>
                        <Text style={{fontSize:18}}>{props.item.title || "-"}</Text>
                    </View>
                    <View style={{flexDirection: 'row', flex:2, justifyContent:'space-between'}}>
                        <Text style={{fontSize:18}}>Calories:</Text>
                        <Text style={{fontSize:18}}>{props.item.calories || "0"}</Text>
                    </View>

                </View>
            )
        }

        

        return(
        <View style={styles.mainContainer}>
            <Text style={{fontSize:20, color:"#DAA520"}}>{props.date}</Text>
            {props.items.map((item, index)=>{

                return(
                    <TouchableOpacity
                        onPress={() => {
                            props.navigation.navigate('ListDetail',
                            {
                                title: item.title,
                                date: props.date,
                                calories: item.calories,
                                ingredients: item.ingredients,
                                index: index
                            }
                            )
                        }}
                    >
                          <SubListComponent index={index} item={item} date={props.date}/>
                    </TouchableOpacity>
                )

            })}
            
         </View>
        );
}


const styles = StyleSheet.create({

      mainContainer:{
        backgroundColor: "white",
        marginTop: 5,
        paddingTop: 5,
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderRadius: 20,
        flex: 1
    },
    subList: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        marginBottom: 5, 
        borderWidth:1, 
        height:40, 
        alignItems:'center', 
        paddingRight:10, 
        paddingLeft:10,
        borderRadius: 10,
        marginTop: 5
    }
});
export default HomeListComponent;

