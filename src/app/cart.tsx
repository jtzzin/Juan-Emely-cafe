
import { 
  View, 
  Text, 
  Platform, 
  ScrollView, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Alert
} from "react-native";

import { useCartStore } from "@/stores/helpers/cart-store";
import { Product } from "@/components/products";
import { Header } from "@/components/header"; 
import { useRouter } from "expo-router";

// Tipagem dos produtos no carrinho
type ProductDataProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: any;
  price: number;
  ingredients: string[];
  quantity: number; 
};

export default function Cart() { 
  const cartStore = useCartStore();
  const router = useRouter();

  function handleProductRemove(product: ProductDataProps) {
    cartStore.remove(product.id);
  }

  // 🧮 Soma total dos produtos (preço * quantidade)
  const total = cartStore.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleCheckout() {
    // 🚀 Aqui futuramente você pode integrar com API de pagamento ou pedido
    Alert.alert("Pedido finalizado!", "Obrigado pela compra ☕");
    cartStore.clear(); // limpa o carrinho após finalizar
    router.replace("/"); // volta para tela inicial
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title={"Seu carrinho"} /> 

      <ScrollView className="flex-1 p-5">
        {cartStore.items.length > 0 ? (
          <>
            <View className="border-b border-slate-700 pb-4">
              {cartStore.items.map((product) => (
                <Product
                  key={product.id}
                  data={product}
                  onPress={() => handleProductRemove(product)}
                />
              ))}
            </View>

            {/* 🧮 Total do carrinho */}
            <View className="mt-6 p-4 bg-slate-800 rounded-lg">
              <Text className="text-white text-lg font-semibold">
                Total:{" "}
                <Text className="text-lime-400">
                  R$ {total.toFixed(2)}
                </Text>
              </Text>
            </View>

            {/* ✅ Botão de Finalizar Pedido */}
            <TouchableOpacity
              onPress={handleCheckout}
              className="mt-6 bg-lime-500 py-4 rounded-lg items-center shadow-lg"
            >
              <Text className="text-slate-900 font-bold text-lg">
                Finalizar pedido
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text className="text-white font-body text-center mt-8">
            Seu carrinho está vazio.
          </Text>
        )}
        
        <View className="p-5">
          <TouchableOpacity onPress={() => router.back()} className="mt-4">
            <Text className="text-lime-400 font-semibold">← Voltar para o cardápio</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
