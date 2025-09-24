import { create } from "zustand";
import { ProductProps } from "@/utils/data/products";

export type productCartProps = ProductProps & {
  quantity: number;
};

type CartStore = {
  products: productCartProps[];
  add: (product: ProductProps) => void;
  remove: (productId: string) => void;
  clear: () => void;
};

export const useCartStore = create<CartStore>((set, get) => ({
  products: [],

  add: (product) => {
    set((state) => {
      // Verifica se o produto já existe no carrinho
      const productIndex = state.products.findIndex((p) => p.id === product.id);

      if (productIndex !== -1) {
        // Atualiza a quantidade se o produto já estiver no carrinho
        const updatedProducts = state.products.map((p, i) =>
          i === productIndex ? { ...p, quantity: p.quantity + 1 } : p
        );
        console.log("Produto atualizado:", updatedProducts);
        return { products: updatedProducts };
      } else {
        // Adiciona produto novo com quantity 1
        const updatedProducts = [...state.products, { ...product, quantity: 1 }];
        console.log("Produto adicionado:", updatedProducts);
        return { products: updatedProducts };
      }
    });
  },

  remove: (productId) => {
    set((state) => {
      const updatedProducts = state.products.filter((p) => p.id !== productId);
      console.log("Produto removido:", updatedProducts);
      return { products: updatedProducts };
    });
  },

  clear: () => set({ products: [] }),
}));
