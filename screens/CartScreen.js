import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  ScrollView,
  TextInput,
  Alert,
} from "react-native";
import React, { useContext, useState } from "react";
import { CartItems } from "../context/Context";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CartScreen = () => {
  const navigation = useNavigation();
  const { cart, setCart } = useContext(CartItems);
  const [address, setAddress] = useState("");
  const [neighborhood, setNeighborhood] = useState("");
  const [number, setNumber] = useState("");
  const [complement, setComplement] = useState("");

  const total = cart.reduce((sum, item) => {
    const price = Number(item?.price) || 0;
    const qty = Number(item?.quantity) || 0;
    return sum + price * qty;
  }, 0);

  const addQuantity = (pizzaName) => {
    setCart(
      cart.map((item) =>
        item.name === pizzaName
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  const removeQuantity = (pizzaName) => {
    const item = cart.find((item) => item.name === pizzaName);
    if (item && item.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.name === pizzaName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      removeFromCart(pizzaName);
    }
  };

  const removeFromCart = (pizzaName) => {
    setCart(cart.filter((item) => item.name !== pizzaName));
  };

  const handleFinalizarPedido = () => {
    if (!address.trim() || !neighborhood.trim() || !number.trim()) {
      Alert.alert("Atenção", "Por favor, preencha o endereço completo para entrega!");
      return;
    }

    
    navigation.navigate("Order", {
      deliveryAddress: {
        address,
        neighborhood,
        number,
        complement,
      },
    });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "white", flex: 1 }} showsVerticalScrollIndicator={false}>
        {cart.length === 0 ? (
          <View
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: 100,
            }}
          >
            <FontAwesome5 name="shopping-cart" size={80} color="#ddd" />
            <Text style={{ fontSize: 22, fontWeight: "600", marginTop: 20, color: "#999" }}>
              Carrinho Vazio
            </Text>
            <Text style={{ fontSize: 14, color: "#999", marginTop: 10 }}>
              Adicione pizzas deliciosas ao seu carrinho!
            </Text>
          </View>
        ) : (
          <>
            {/* Lista de Pizzas no Carrinho */}
            <View style={{ padding: 10 }}>
              <Text style={{ fontSize: 22, fontWeight: "700", marginBottom: 15, color: "#333" }}>
                Seu Pedido
              </Text>

              {cart.map((item, key) => (
                <View style={styles.cartItem} key={key}>
                  <Image
                    style={styles.cartImage}
                    source={{ uri: item.imageURL }}
                  />

                  <View style={styles.cartInfo}>
                    <Text style={styles.cartName}>{item.name}</Text>

                    {item.description && (
                      <Text style={styles.cartDescription}>
                        {item.description.length > 50
                          ? item.description.substr(0, 50) + "..."
                          : item.description}
                      </Text>
                    )}

                    <Text style={styles.cartPrice}>
                      R$ {(item.price * item.quantity).toFixed(2)}
                    </Text>

                    {/* Controles de Quantidade */}
                    <View style={styles.quantityControls}>
                      <Pressable
                        onPress={() => removeQuantity(item.name)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>

                      <Text style={styles.quantityText}>{item.quantity}</Text>

                      <Pressable
                        onPress={() => addQuantity(item.name)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>

                      <Pressable
                        onPress={() => removeFromCart(item.name)}
                        style={styles.removeButton}
                      >
                        <FontAwesome5 name="trash" size={14} color="#fff" />
                      </Pressable>
                    </View>
                  </View>
                </View>
              ))}
            </View>

            {/* Endereço de Entrega */}
            <View style={styles.addressSection}>
              <Text style={styles.sectionTitle}>
                <FontAwesome5 name="map-marker-alt" size={18} color="#740005" /> Endereço de Entrega
              </Text>

              <TextInput
                placeholder="Rua / Avenida"
                value={address}
                onChangeText={setAddress}
                style={styles.input}
              />

              <View style={{ flexDirection: "row", gap: 10 }}>
                <TextInput
                  placeholder="Número"
                  value={number}
                  onChangeText={setNumber}
                  keyboardType="numeric"
                  style={[styles.input, { flex: 1 }]}
                />

                <TextInput
                  placeholder="Bairro"
                  value={neighborhood}
                  onChangeText={setNeighborhood}
                  style={[styles.input, { flex: 2 }]}
                />
              </View>

              <TextInput
                placeholder="Complemento (opcional)"
                value={complement}
                onChangeText={setComplement}
                style={styles.input}
              />
            </View>
          </>
        )}
      </ScrollView>

      {cart.length > 0 && (
        <View style={styles.footer}>
          <View style={styles.totalSection}>
            <FontAwesome5 name="receipt" size={24} color="#740005" />
            <View style={{ marginLeft: 12 }}>
              <Text style={{ fontSize: 14, color: "gray" }}>Total do Pedido</Text>
              <Text style={styles.totalText}>R$ {total.toFixed(2)}</Text>
            </View>
          </View>

          <Pressable onPress={handleFinalizarPedido} style={styles.finalizeButton}>
            <Text style={styles.finalizeButtonText}>Continuar para Pagamento</Text>
            <FontAwesome5 name="arrow-right" size={16} color="#fff" />
          </Pressable>
        </View>
      )}
    </>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  cartItem: {
    backgroundColor: "#740005",
    padding: 12,
    marginBottom: 12,
    borderRadius: 12,
    flexDirection: "row",
    elevation: 2,
  },
  cartImage: {
    width: 90,
    height: 90,
    borderRadius: 8,
  },
  cartInfo: {
    marginLeft: 12,
    flex: 1,
  },
  cartName: {
    fontSize: 17,
    fontWeight: "bold",
    color: "white",
    marginBottom: 4,
  },
  cartDescription: {
    color: "#fff",
    fontSize: 12,
    opacity: 0.9,
    marginBottom: 6,
  },
  cartPrice: {
    color: "yellow",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 8,
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  quantityButton: {
    backgroundColor: "rgba(255,255,255,0.3)",
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  quantityText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginHorizontal: 12,
    minWidth: 25,
    textAlign: "center",
  },
  removeButton: {
    backgroundColor: "rgba(255,0,0,0.7)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
    marginLeft: 10,
  },
  addressSection: {
    padding: 15,
    backgroundColor: "#f9f9f9",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#333",
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    fontSize: 15,
  },
  footer: {
    padding: 15,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    elevation: 10,
  },
  totalSection: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  totalText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#740005",
  },
  finalizeButton: {
    backgroundColor: "green",
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 10,
  },
  finalizeButtonText: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 17,
  },
});