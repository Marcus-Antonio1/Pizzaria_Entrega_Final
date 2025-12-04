import React, { useContext, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { CartItems } from "../context/Context";
import { useNavigation, useRoute } from "@react-navigation/native";
import { firebaseDatabase } from "../firebaseconfig";
import { ref, push } from "firebase/database";

const OrderData = () => {
  const { cart, setCart } = useContext(CartItems);
  const navigation = useNavigation();
  const route = useRoute();

  
  const deliveryAddress = route.params?.deliveryAddress || {};

  const [payment, setPayment] = useState("dinheiro");
  const [troco, setTroco] = useState("");

  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const sendOrder = async () => {
    if (payment === "dinheiro" && troco.trim() === "") {
      return Alert.alert("Atenção", "Informe o troco para quanto você precisa!");
    }

    
    if (!deliveryAddress.address || !deliveryAddress.number) {
      return Alert.alert("Erro", "Endereço de entrega incompleto!");
    }

    const order = {
      items: cart,
      total,
      payment,
      troco: payment === "dinheiro" ? troco : null,
      deliveryAddress: {
        address: deliveryAddress.address,
        number: deliveryAddress.number,
        neighborhood: deliveryAddress.neighborhood,
        complement: deliveryAddress.complement || "",
      },
      status: "Em preparo",
      createdAt: Date.now(),
    };

    try {
      await push(ref(firebaseDatabase, "orders"), order);
      setCart([]);
      navigation.navigate("OrderSuccess");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível finalizar o pedido. Tente novamente.");
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Endereço de Entrega */}
      <View style={styles.addressBox}>
        <Text style={styles.addressTitle}>📍 Entregar em:</Text>
        <Text style={styles.addressText}>
          {deliveryAddress.address}, {deliveryAddress.number}
        </Text>
        {deliveryAddress.neighborhood && (
          <Text style={styles.addressText}>
            Bairro: {deliveryAddress.neighborhood}
          </Text>
        )}
        {deliveryAddress.complement && (
          <Text style={styles.addressText}>
            Complemento: {deliveryAddress.complement}
          </Text>
        )}
      </View>

      <Text style={styles.title}>Forma de Pagamento</Text>

      <Pressable
        onPress={() => setPayment("dinheiro")}
        style={[styles.option, payment === "dinheiro" && styles.selected]}
      >
        <Text style={[styles.optionText, payment === "dinheiro" && { color: "#fff" }]}>
          💵 Dinheiro
        </Text>
      </Pressable>

      {payment === "dinheiro" && (
        <TextInput
          placeholder="Precisa de troco para quanto?"
          keyboardType="numeric"
          value={troco}
          onChangeText={setTroco}
          style={styles.input}
        />
      )}

      <Pressable
        onPress={() => setPayment("pix")}
        style={[styles.option, payment === "pix" && styles.selected]}
      >
        <Text style={[styles.optionText, payment === "pix" && { color: "#fff" }]}>
          📱 PIX
        </Text>
      </Pressable>

      {payment === "pix" && (
        <View style={styles.pixBox}>
          <Text style={{ color: "#fff", fontSize: 15, marginBottom: 5 }}>
            Chave PIX: 84996655515
          </Text>
          <Text style={{ color: "#fff", fontSize: 15 }}>
            Nome: Pizzaria República Italiana
          </Text>
        </View>
      )}

      <Pressable
        onPress={() => setPayment("cartao")}
        style={[styles.option, payment === "cartao" && styles.selected]}
      >
        <Text style={[styles.optionText, payment === "cartao" && { color: "#fff" }]}>
          💳 Cartão na entrega
        </Text>
      </Pressable>

      <Pressable style={styles.finishButton} onPress={sendOrder}>
        <Text style={styles.finishText}>
          Finalizar Pedido - R$ {total.toFixed(2)}
        </Text>
      </Pressable>
    </View>
  );
};

export default OrderData;

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    padding: 20, 
    backgroundColor: "#fff" 
  },
  addressBox: {
    backgroundColor: "#f0f0f0",
    padding: 15,
    borderRadius: 10,
    marginBottom: 25,
    borderLeftWidth: 4,
    borderLeftColor: "#740005",
  },
  addressTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginBottom: 8,
    color: "#333",
  },
  addressText: {
    fontSize: 14,
    color: "#555",
    marginBottom: 3,
  },
  title: { 
    fontSize: 24, 
    fontWeight: "700", 
    marginBottom: 20,
    color: "#333",
  },
  option: {
    backgroundColor: "#f5f5f5",
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selected: {
    backgroundColor: "#740005",
    borderColor: "#740005",
  },
  optionText: { 
    color: "#333", 
    fontSize: 18,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f5f5f5",
    padding: 14,
    borderRadius: 8,
    marginBottom: 20,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  pixBox: {
    backgroundColor: "#740005",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  finishButton: {
    backgroundColor: "green",
    padding: 18,
    borderRadius: 10,
    marginTop: 30,
    elevation: 3,
  },
  finishText: { 
    color: "#fff", 
    fontSize: 20, 
    textAlign: "center", 
    fontWeight: "700" 
  },
});