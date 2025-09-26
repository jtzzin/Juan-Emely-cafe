import { create } from "zustand";

// Tipagem do produto que vai para o carrinho
export type ProductCartProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
  price: number;
  ingredients: string[];
  quantity: number;
};

// Estado do carrinho
type CartState = {
  items: ProductCartProps[];
  add: (product: Omit<ProductCartProps, "quantity">) => void;
  remove: (id: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>((set) => ({
  items: [],

  // adiciona item (se já existe, só aumenta quantidade)
  add: (product) =>
    set((state) => {
      const exists = state.items.find((item) => item.id === product.id);

      if (exists) {
        return {
          items: state.items.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  // remove um item pelo id
  remove: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),

  // limpa todo o carrinho
  clear: () => set({ items: [] }),
}));
