import { useCartStore } from "@/stores/helpers/cart-store"; // Certifique-se de importar corretamente
import { View, Text, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Product } from "@/components/products"; // O componente que exibe os produtos

export default function CartScreen() {
  const cartStore = useCartStore();  // Pega os produtos do carrinho
  const { products, remove } = cartStore;

  // Calcular o total do carrinho
  const total = products.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  // Função para remover o produto do carrinho
  function handleProductRemove(productId: string) {
    remove(productId);
  }

  return (
    <ScrollView className="flex-1 p-5 bg-slate-900">
      {products.length > 0 ? (
        <View className="border-b border-slate-700 pb-4">
          {products.map((product) => (
            <Product
              key={product.id} // Certifique-se de que 'id' está acessível
              data={product}
              onPress={() => handleProductRemove(product.id)} // Remover o produto pelo 'id'
            />
          ))}
        </View>
      ) : (
        <Text className="text-slate-400 text-center my-8 font-body">
          Seu carrinho está vazio
        </Text>
      )}

      <View className="flex-row items-center gap-2 mt-5 mb-4">
        <Text className="text-white text-xl font-subtitle">Total</Text>
        <Text className="text-lime-400 text-2xl font-heading">
          R$ {total.toFixed(2)}
        </Text>
      </View>

      {/* Outros componentes como input de endereço e botões podem ser colocados aqui */}
    </ScrollView>
  );
}
