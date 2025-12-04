import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const OrderSuccess = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Image
        style={styles.img}
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/845/845646.png",
        }}
      />

      <Text style={styles.title}>Pedido Confirmado!</Text>
      <Text style={styles.subtitle}>Obrigado pela preferência.</Text>
      <Text style={styles.subtitle}>Seu pedido está a caminho! 🚚🔥</Text>

      {/* BOTÃO PARA VOLTAR */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Voltar para o início</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OrderSuccess;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#740005",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  img: { width: 120, height: 120, marginBottom: 20 },
  title: { fontSize: 26, fontWeight: "700", color: "white", marginBottom: 10 },
  subtitle: { fontSize: 18, fontWeight: "500", color: "#ffe" },
  button: {
    marginTop: 40,
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  buttonText: {
    color: "#740005",
    fontSize: 18,
    fontWeight: "bold",
  },
});
