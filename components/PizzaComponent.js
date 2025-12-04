import React, { useContext, useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable, Image } from "react-native";
import { CartItems } from "../context/Context";
import Toast from "react-native-toast-message";

const PizzaComponent = ({ pizza }) => {
  
  if (!pizza) return null;

  const { cart, setCart } = useContext(CartItems);

  
  const [selected, setSelected] = useState(false);
  const [size, setSize] = useState("Medium");
  const [additems, setAddItems] = useState(0);

  
  useEffect(() => {
    const exists = cart.find((c) => c.id === pizza.id && c.size === size);
    if (exists) {
      setAddItems(Number(exists.quantity || 0));
      setSelected(Boolean(exists.quantity && exists.quantity > 0));
    } else {
      setAddItems(0);
      setSelected(false);
    }
    
  }, [cart, pizza.id, size]);

  const showToast = (type = "success", message = "") => {
    
    Toast.show({
      type,
      text1: message,
    });
  };

  const addToCart = () => {
    
    const cartItem = {
      id: pizza.id,
      name: pizza.name || "Sem nome",
      description: pizza.description || "",
      imageURL: pizza.imageURL || "",
      price: Number(pizza.price) || 0,
      size: size,
      quantity: 1,
    };

    
    const existing = cart.find(
      (c) => c.id === cartItem.id && (c.size || "Medium") === cartItem.size
    );

    if (existing) {
      
      const updated = cart.map((c) =>
        c.id === cartItem.id && (c.size || "Medium") === cartItem.size
          ? { ...c, quantity: Number(c.quantity || 0) + 1 }
          : c
      );
      setCart(updated);
      setAddItems((v) => v + 1);
    } else {
      
      setCart([...cart, cartItem]);
      setAddItems(1);
      setSelected(true);
    }

    showToast("success", "Adicionado");
  };

  const removeFromCart = () => {
    const existing = cart.find(
      (c) => c.id === pizza.id && (c.size || "Medium") === size
    );

    if (!existing) {
      
      return;
    }

    if (existing.quantity <= 1) {
      
      setCart(cart.filter((c) => !(c.id === pizza.id && (c.size || "Medium") === size)));
      setAddItems(0);
      setSelected(false);
    } else {
      
      const updated = cart.map((c) =>
        c.id === pizza.id && (c.size || "Medium") === size
          ? { ...c, quantity: Number(c.quantity || 0) - 1 }
          : c
      );
      setCart(updated);
      setAddItems((v) => Math.max(0, v - 1));
    }

    showToast("info", "Removido");
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.card}>
        <Image
          style={styles.image}
          
          source={{ uri: pizza.imageURL || "https://via.placeholder.com/200" }}
        />

        <View style={styles.info}>
          <Text style={styles.title}>
            {String(pizza.name || "Sem nome").substr(0, 14)}
          </Text>

          <Text style={styles.desc}>
            {(pizza.description || "Descrição indisponível").substr(0, 20) + "..."}
          </Text>

          <View style={styles.row}>
            <View>
              <Text style={styles.priceLabel}>Preço</Text>
              <Text style={styles.priceValue}>R$ {Number(pizza.price || 0)}</Text>
            </View>

            {selected ? (
              <View style={styles.counter}>
                <Pressable onPress={removeFromCart}>
                  <Text style={styles.counterBtn}>-</Text>
                </Pressable>

                <Text style={styles.counterValue}>{additems}</Text>

                <Pressable onPress={addToCart}>
                  <Text style={styles.counterBtn}>+</Text>
                </Pressable>
              </View>
            ) : (
              <Pressable onPress={addToCart} style={styles.addButton}>
                <Text style={styles.addText}>Adicionar</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Pressable>
    </View>
  );
};

export default PizzaComponent;

const styles = StyleSheet.create({
  container: { paddingHorizontal: 6, paddingVertical: 6 },
  card: { borderEndColor: "#fff", borderWidth: 0.1 },
  image: { height: 200, aspectRatio: 1 / 1, resizeMode: "cover" },
  info: { backgroundColor: "#740005", padding: 10 },
  title: { fontSize: 15, fontWeight: "bold", color: "white" },
  desc: { color: "white", marginTop: 4 },
  row: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  priceLabel: { color: "white", fontSize: 15 },
  priceValue: { color: "white", fontSize: 18 },
  addButton: { backgroundColor: "#444801", padding: 5, borderRadius: 4 },
  addText: { color: "white", fontWeight: "bold" },
  counter: {
    backgroundColor: "#444801",
    padding: 4,
    marginLeft: 15,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
  },
  counterBtn: { fontSize: 20, color: "white", paddingHorizontal: 10, fontWeight: "600" },
  counterValue: { fontSize: 18, color: "white", paddingHorizontal: 6, fontWeight: "600" },
});
