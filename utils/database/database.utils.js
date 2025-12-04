import { child, get, ref } from "firebase/database";
import { firebaseDatabase } from "../../firebaseconfig";
import { PizzaFlavour } from "../../models/pizzaFlavour";

export const GetPizzas = async () => {
  const databaseReference = ref(firebaseDatabase);

  const data = await get(child(databaseReference, "pizzas"));

  try {
    if (data.exists()) {
      let PizzaFlavours = [];

      data.forEach((flavour) => {
        const values = flavour.val();

        const id = flavour.key; 
        const name = values.name;
        const description = values.description;
        const imageURL = values.imageURL;
        const price = values.price;

        PizzaFlavours.push(
          new PizzaFlavour(id, description, imageURL, name, price)
        );
      });

      return PizzaFlavours;
    } else {
      console.log("Nenhum dado no banco de dados");
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
