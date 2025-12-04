import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Image,
    ScrollView,
    Pressable
  } from "react-native";
  import React  ,{useContext}from "react";
  import MenuComponent from "../components/MenuComponent";
  import { useNavigation } from "@react-navigation/native";
  import {CartItems} from "../context/Context";
  
  const HomeScreen = () => {
    const data = [
      {
        id: "0",
        image:
          "https://cdn.accon.app/16927566135805601988518935983-1080p.jpg",
      },
      {
        id: "1",
        image:
          "https://i.pinimg.com/originals/e6/87/ba/e687ba5d5950c726540b7615ae0199dc.png",
      },
      {
        id: "2",
        image:
          "https://www.designi.com.br/images/preview/10000741.jpg",
      },
    ];
    return (
      <SafeAreaView>

        <View style={{ padding: 10}}>
          <Image
            style={{ width: "100%", height: 120, borderRadius: 7 }}
            source={{
              uri: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1200,h_480/https://agenciacomversa.com.br/wp-content/uploads/2020/10/imagem_cabecalho-interno.png",
            }}
          />
        </View>
        
        <MenuComponent />
  

  
        <View style={{ padding: 10 }}>
          <Image
            style={{ width: "100%", height: 120, borderRadius: 7 }}
            source={{
              uri: "https://expressodelivery.com.br/blog/wp-content/uploads/2015/10/forno-a-lenha-pizzaria.png",
            }}
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {data.map((item, key) => (
            <View style={{ margin: 10 }} key={key}>
              <Image
                style={{ width: 220, height: 130 }}
                source={{ uri: item.image }}
              />
            </View>
          ))}
        </ScrollView>
  
      </SafeAreaView>
    );
  };
  
  export default HomeScreen;
  
  const styles = StyleSheet.create({});