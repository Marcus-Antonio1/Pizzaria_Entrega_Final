import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MenuComponent = () => {
    const navigation = useNavigation();
    return (
        <View style={{ padding: 10 }}>
            <Pressable
                style={{
                    backgroundColor: "#740005",
                    alignItems: "center",
                    padding: 8,
                    marginTop: 14,
                    borderRadius: 15,
                }}
            >
                <Pressable onPress={() => navigation.navigate("Cardápio")}>
                    <Image
                        style={{
                            width: 250,
                            height: 160,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            marginBottom: "2%",
                        }}
                        source={{
                            uri: "https://i0.wp.com/nationalfoods.org/wp-content/uploads/2018/11/National-Dish-of-Italy-Pizza.jpg?fit=1140%2C500&ssl=1",
                        }}
                    />
                    <Text
                        style={{
                            textAlign: "center",
                            fontSize: 17,
                            color: "white",
                            marginTop: 0,
                        }}
                    >
                        Cardápio
                    </Text>
                </Pressable>
            </Pressable>
        </View>
    );
};

export default MenuComponent;

const styles = StyleSheet.create({});
