// Tipagem recomendada
export interface ProductProps {
  id: string;
  title: string;
  price: number;
  description: string;
  cover: any;
  thumbnail: any;
  ingredients: string[];
}

export const MENU: { title: string; data: ProductProps[] }[] = [
  {
    title: "Cafés",
    data: [
      {
        id: "1",
        title: "Cappuccino",
        price: 3.5,
        description: "Café expresso com leite vaporizado e espuma cremosa.",
        cover: require("../../assets/products/cover/Coffe1.png"),
        thumbnail: require("../../assets/products/thumbnail/Coffe1.png"),
        ingredients: ["Espresso", "Leite vaporizado", "Espuma de leite"],
      },
      {
        id: "2",
        title: "Latte",
        price: 4.0,
        description: "Café expresso com bastante leite vaporizado.",
        cover: require("../../assets/products/cover/Coffe2.png"),
        thumbnail: require("../../assets/products/thumbnail/Coffe2.png"),
        ingredients: ["Mel", "Leite vaporizado"],
      }
    ] 
  },
  {
    title: "Premium",
    data: [
      {
        id: "3",
        title: "Mate",
        price: 5.0,
        description: "cafe 3",
        cover: require("../../assets/products/cover/Coffe3.png"),
        thumbnail: require("../../assets/products/thumbnail/Coffe3.png"),
        ingredients: ["Segredo", "Doce"],
      }
    ]
  }
];



// CATEGORIAS extraídas dos títulos do MENU
export const CATEGORIES = MENU.map((category) => category.title);
