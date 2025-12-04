import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { firebaseDatabase } from "../firebaseconfig";
import { ref, onValue } from "firebase/database";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const ordersRef = ref(firebaseDatabase, "orders");
    const unsub = onValue(ordersRef, (snapshot) => {
      if (snapshot.exists()) {
        const list = Object.values(snapshot.val());
        setOrders(list.reverse());
      }
    });

    return unsub;
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Meus Pedidos</Text>

      {orders.map((order, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.date}>
            {new Date(order.createdAt).toLocaleString()}
          </Text>

          {order.items.map((i, k) => (
            <Text key={k} style={styles.item}>
              {i.quantity}x {i.name}
            </Text>
          ))}

          {/* STATUS DO PEDIDO */}
          <Text style={styles.status}>Status: {order.status}</Text>

          <Text style={styles.total}>Total: R$ {order.total}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: { padding: 15 },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  card: {
    backgroundColor: "#740005",
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  date: { color: "#fff", fontSize: 14, marginBottom: 10 },
  item: { color: "#fff", fontSize: 16 },
  status: {
    marginTop: 10,
    fontSize: 16,
    color: "yellow",
    fontWeight: "700",
  },
  total: {
    marginTop: 10,
    color: "yellow",
    fontWeight: "700",
    fontSize: 18,
  },
});
