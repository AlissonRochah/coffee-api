import "dotenv/config";
import mongoose from "mongoose";
import { CoffeeModel } from "./models/Coffee";

const coffeeList = [
  {
    id: 1,
    name: "Expresso Tradicional",
    price: 7.49,
    img: "/expresso.png",
    categories: ["Tradicional"],
    desc: "O tradicional café feito com água quente e grãos moídos",
  },
  {
    id: 2,
    name: "Expresso Americano",
    price: 6.99,
    img: "/americano.png",
    categories: ["Tradicional"],
    desc: "Expresso diluído, menos intenso que o tradicional",
  },
  {
    id: 3,
    name: "Expresso Cremoso",
    price: 8.49,
    img: "/expresso-cremoso.png",
    categories: ["Tradicional"],
    desc: "Café expresso tradicional com espuma cremosa",
  },
  {
    id: 4,
    name: "Expresso Gelado",
    price: 9.49,
    img: "/cold-coffee.png",
    categories: ["Tradicional", "Gelado"],
    desc: "Bebida preparada com café expresso e cubos de gelo",
  },
  {
    id: 5,
    name: "Café com Leite",
    price: 8.19,
    img: "/coffee-milk.png",
    categories: ["Tradicional", "Com Leite"],
    desc: "Meio a meio de expresso tradicional com leite vaporizado",
  },
  {
    id: 6,
    name: "Latte",
    price: 8.99,
    img: "/latte.png",
    categories: ["Tradicional", "Com Leite"],
    desc: "Uma dose de café expresso com o dobro de leite e espuma cremosa",
  },
  {
    id: 7,
    name: "Capuccino",
    price: 8.69,
    img: "/capuccino.png",
    categories: ["Tradicional", "Com Leite"],
    desc: "Bebida com canela feita de doses iguais de café, leite e espuma",
  },
  {
    id: 8,
    name: "Macchiato",
    price: 7.99,
    img: "/macchiato.png",
    categories: ["Tradicional", "Com Leite"],
    desc: "Café expresso misturado com um pouco de leite quente e espuma",
  },
  {
    id: 9,
    name: "Mocaccino",
    price: 9.49,
    img: "/mocaccino.png",
    categories: ["Tradicional"],
    desc: "Café expresso com calda de chocolate, pouco leite e espuma",
  },
  {
    id: 10,
    name: "Chocolate Quente",
    price: 7.89,
    img: "/hot-chocolate.png",
    categories: ["Tradicional", "Com Leite"],
    desc: "Bebida feita com chocolate dissolvido no leite quente e café",
  },
  {
    id: 11,
    name: "Cubano",
    price: 12.99,
    img: "/cubano.png",
    categories: ["Especial", "Alcoólico", "Gelado"],
    desc: "Drink gelado de café expresso com rum, creme de leite e hortelã",
  },
  {
    id: 12,
    name: "Havaiano",
    price: 10.49,
    img: "/havaiano.png",
    categories: ["Especial"],
    desc: "Bebida adocicada preparada com café e leite de coco",
  },
  {
    id: 13,
    name: "Árabe",
    price: 11.19,
    img: "/arabe.png",
    categories: ["Especial"],
    desc: "Bebida preparada com grãos de café árabe e especiarias",
  },
  {
    id: 14,
    name: "Irlandês",
    price: 13.49,
    img: "/irish.png",
    categories: ["Especial", "Alcoólico"],
    desc: "Bebida a base de café, uísque irlandês, açúcar e chantilly",
  }
];

async function run() {
  await mongoose.connect(process.env.MONGODB_URI!);
  await CoffeeModel.deleteMany({});
  await CoffeeModel.insertMany(coffeeList);
  console.log("Seed done.");
  await mongoose.disconnect();
}

run().catch((e) => {
  console.error(e);
  process.exit(1);
});
