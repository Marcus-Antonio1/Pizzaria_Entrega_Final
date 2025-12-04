import React, { useContext } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { UserAuthContext } from "../context/Context";
import { useNavigation } from "@react-navigation/native";
import { getAuth, signOut } from "firebase/auth";

const AccountScreen = () => {
  const { user } = useContext(UserAuthContext);
  const navigation = useNavigation();
  const auth = getAuth();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Conta</Text>

      <View style={styles.box}>
        <Text style={styles.label}>Nome:</Text>
        <Text style={styles.value}>{user?.name || "Não informado"}</Text>

        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user?.email}</Text>
      </View>

      <Pressable
        style={styles.button}
        onPress={() => navigation.navigate("Meus Pedidos")}
      >
        <Text style={styles.buttonText}>Meus Pedidos</Text>
      </Pressable>

      <Pressable
        style={[styles.button, { backgroundColor: "red" }]}
        onPress={() => {
          signOut(auth);
          navigation.reset({
            index: 0,
            routes: [{ name: "Login" }],
          });
        }}
      >
        <Text style={styles.buttonText}>Sair</Text>
      </Pressable>
    </View>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: { fontSize: 26, fontWeight: "700", marginBottom: 20 },
  box: { backgroundColor: "#eee", padding: 15, borderRadius: 8 },
  label: { fontWeight: "700", fontSize: 16, marginTop: 10 },
  value: { fontSize: 16 },
  button: {
    marginTop: 25,
    backgroundColor: "#740005",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: { color: "#fff", fontSize: 18, textAlign: "center" },
});
