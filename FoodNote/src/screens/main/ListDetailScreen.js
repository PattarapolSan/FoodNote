import React, { useState } from "react";
import { Text, View, StyleSheet, SafeAreaView, Pressable, ScrollView, Modal } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import IngredientsListComponent from "../../components/IngerdientsListComponent";
import deleteMenuDB from "../../function/deleteMenuDB";
import { FontAwesome } from "@expo/vector-icons";


const ListDetailScreen = ({ navigation, route }) => {
    const { title, date, calories, ingredients, index } = route.params
    const [ingredientsList, setIngredientList] = useState(ingredients || [])
    const [userId, setUserId] = useState();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);

    AsyncStorage.getItem('user').then((value) => {
        const userObj = JSON.parse(value);
        setUserId(userObj.uid);
    })

    const handleDelete = () => {
        setShowConfirmationModal(true);
    }

    const handleConfirmation = () => {
        deleteMenuDB(userId, date, index);
        navigation.goBack();
    }

    const handleCancelConfirmation = () => {
        setShowConfirmationModal(false);
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.titleView}>
                <Text style={styles.titleInput}>{title}</Text>
            </View>
            <View style={styles.contentView}>
                <View style={styles.stackView}>
                    <Text style={{ fontSize: 25, marginVertical: 15 }}>Date:</Text>
                    <Text style={{ fontSize: 25, marginVertical: 15, marginLeft: 10 }}>{date}</Text>
                </View>
                <View style={{ alignItems: 'center', marginTop: 30 }}>
                    <Text style={{ fontSize: 25 }}>Ingredients</Text>
                </View>
                <ScrollView style={{ flex: 1, borderBottomWidth: 1, borderTopWidth: 1, marginTop: 4 }}>
                    {
                        ingredientsList.map((ingredients, index) => {
                            return (
                                <IngredientsListComponent
                                    key={index}
                                    id={ingredients.id}
                                    name={ingredients.name}
                                    weight={ingredients.weight}
                                    calories={ingredients.calories}
                                    edit={false}
                                />
                            )
                        })
                    }
                </ScrollView>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, marginTop: 20 }}>
                    <Text style={{ fontSize: 30 }}>
                        Total Calories
                    </Text>
                    <Text style={{ fontSize: 40 }}>
                        {calories}
                    </Text>
                </View>
                <View>
                    <Pressable style={{ alignItems: 'flex-start' }} onPress={handleDelete}>
                        <FontAwesome name={"trash"} size={30} color="black" />
                    </Pressable>
                </View>

                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={showConfirmationModal}
                    onRequestClose={() => setShowConfirmationModal(false)}
                >
                    <View style={styles.modalView}>
                        <Text style={{ fontSize: 25, marginBottom: 20 }}>Delete this item?</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', width: 300}}>
                            <Pressable style={[styles.button, styles.confirmButton]} onPress={handleConfirmation}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Confirm</Text>
                            </Pressable>
                            <Pressable style={[styles.button, styles.cancelButton]} onPress={handleCancelConfirmation}>
                                <Text style={{ fontSize: 20, color: 'white' }}>Cancel</Text>
                            </Pressable>
                        </View>
                    </View>
                </Modal>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    titleView: {
        alignItems: "center"
    },
    contentView: {
        flex: 1,
        paddingLeft: 10,
        paddingRight: 10
    },
    stackView: {
        paddingTop: 10,
        flexDirection: 'row',
        alignItems: "center",
    },
    titleInput: {
        fontSize: 25,
        marginLeft: 10
    },
    modalView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
    },
    button: {
        borderRadius: 10,
        padding: 10,
        marginTop: 10,
        width: 100,
        alignItems: 'center',
    },
    confirmButton: {
        backgroundColor: 'green',
    },
    cancelButton: {
        backgroundColor: 'red',
    },
});

export default ListDetailScreen;
