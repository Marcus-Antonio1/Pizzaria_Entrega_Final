import React, { useEffect, useState, useContext } from "react";
import { View, Text, ScrollView, Pressable, StyleSheet, Image } from "react-native";
import { firebaseDatabase } from "../firebaseconfig";
import { ref, onValue } from "firebase/database";
import { CartItems } from "../context/Context";
import { useNavigation } from "@react-navigation/native";

const PizzaScreen = () => {
  const [pizzas, setPizzas] = useState([]);
  const { cart, setCart } = useContext(CartItems);
  const navigation = useNavigation();

  useEffect(() => {
    const pizzasRef = ref(firebaseDatabase, "pizzas");
    const unsub = onValue(pizzasRef, (snapshot) => {
      if (snapshot.exists()) {
        const list = Object.values(snapshot.val());
        setPizzas(list);
      }
    });

    return () => unsub();
  }, []);

  const addToCart = (pizza) => {
    const exists = cart.find((item) => item.name === pizza.name);
    if (exists) {
      setCart(
        cart.map((item) =>
          item.name === pizza.name
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...pizza, quantity: 1 }]);
    }
  };

  const removeFromCart = (pizzaName) => {
    const exists = cart.find((item) => item.name === pizzaName);
    if (exists && exists.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.name === pizzaName
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );
    } else {
      setCart(cart.filter((item) => item.name !== pizzaName));
    }
  };

  const getQuantityInCart = (pizzaName) => {
    const item = cart.find((item) => item.name === pizzaName);
    return item ? item.quantity : 0;
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#f5f5f5" }}>
      <ScrollView style={{ flex: 1, padding: 15 }} showsVerticalScrollIndicator={false}>
        {pizzas.map((pizza, index) => {
          const quantity = getQuantityInCart(pizza.name);
          
          return (
            <View key={index} style={styles.pizzaCard}>
              {/* Imagem da Pizza */}
              {pizza.imageURL && (
                <Image
                  source={{ uri: pizza.imageURL }}
                  style={styles.pizzaImage}
                  resizeMode="cover"
                />
              )}

              <View style={styles.pizzaInfo}>
                {/* Nome */}
                <Text style={styles.pizzaName}>{pizza.name}</Text>
                
                {/* Descrição */}
                {pizza.description && (
                  <Text style={styles.pizzaDescription}>
                    {pizza.description}
                  </Text>
                )}
                
                {/* Preço */}
                <Text style={styles.pizzaPrice}>
                  R$ {Number(pizza.price).toFixed(2)}
                </Text>

                {/* Botões de Adicionar/Remover */}
                <View style={styles.quantityContainer}>
                  {quantity > 0 ? (
                    <View style={styles.quantityControls}>
                      <Pressable
                        onPress={() => removeFromCart(pizza.name)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>-</Text>
                      </Pressable>

                      <Text style={styles.quantityText}>{quantity}</Text>

                      <Pressable
                        onPress={() => addToCart(pizza)}
                        style={styles.quantityButton}
                      >
                        <Text style={styles.quantityButtonText}>+</Text>
                      </Pressable>
                    </View>
                  ) : (
                    <Pressable
                      onPress={() => addToCart(pizza)}
                      style={styles.addButton}
                    >
                      <Text style={styles.addButtonText}>Adicionar</Text>
                    </Pressable>
                  )}
                </View>
              </View>
            </View>
          );
        })}
      </ScrollView>

      {cart.length > 0 && (
        <Pressable
          onPress={() => navigation.navigate("Carrinho")}
          style={styles.floatingButton}
        >
          <Text style={styles.floatingButtonText}>
            Ver Carrinho ({cart.reduce((acc, item) => acc + item.quantity, 0)})
          </Text>
        </Pressable>
      )}
    </View>
  );
};

export default PizzaScreen;

const styles = StyleSheet.create({
  pizzaCard: {
    backgroundColor: "#fff",
    borderRadius: 12,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: "hidden",
  },
  pizzaImage: {
    width: "100%",
    height: 200,
  },
  pizzaInfo: {
    padding: 15,
  },
  pizzaName: {
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
    marginBottom: 8,
  },
  pizzaDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 10,
    lineHeight: 20,
  },
  pizzaPrice: {
    fontSize: 22,
    fontWeight: "700",
    color: "#740005",
    marginBottom: 12,
  },
  quantityContainer: {
    alignItems: "flex-start",
  },
  quantityControls: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#740005",
    borderRadius: 25,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  quantityButton: {
    width: 35,
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 17.5,
  },
  quantityButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "700",
  },
  quantityText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    marginHorizontal: 20,
    minWidth: 30,
    textAlign: "center",
  },
  addButton: {
    backgroundColor: "#740005",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },
  floatingButton: {
    position: "absolute",
    bottom: 20,
    right: 20,
    left: 20,
    backgroundColor: "#740005",
    paddingVertical: 15,
    paddingHorizontal: 22,
    borderRadius: 30,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    alignItems: "center",
  },
  floatingButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
});