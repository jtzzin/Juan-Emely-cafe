// app/product/[id].tsx (Trecho Ajustado)

import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MENU, ProductProps } from "@/utils/data/products";
import { useCartStore } from "@/stores/helpers/cart-store";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const add = useCartStore((state) => state.add);

  const product = MENU.flatMap((cat) => cat.data).find((item) => item.id === id);

  if (!product) {
    return (
      <View className="flex-1 items-center justify-center bg-gray-900">
        <Text className="text-white">Produto não encontrado.</Text>
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-gray-900 p-5">
      <TouchableOpacity onPress={() => router.back()} className="mb-4">
        <Text className="text-lime-400 font-semibold">← Voltar</Text>
      </TouchableOpacity>

      <Image
        source={product.cover}
        className="w-full h-40 rounded-lg mb-6"
        resizeMode="cover"
      />

      <Text className="text-white text-2xl font-bold mb-2">{product.title}</Text>
      <Text className="text-gray-400 mb-4">{product.description}</Text>

      <Text className="text-white font-bold mb-2">Ingredientes:</Text>
      {product.ingredients.map((item, index) => (
        <Text key={index} className="text-gray-300">• {item}</Text>
      ))}

      <Text className="text-lime-400 text-xl font-bold mt-6">
        R$ {product.price.toFixed(2)}
      </Text>

      <TouchableOpacity
        onPress={() => {
          add(product);
          console.log("Adicionado ao carrinho:", product.title);
          // ✅ AJUSTE: NAVEGAÇÃO AUTOMÁTICA
          router.push("/cart"); 
        }}
        className="mt-6 bg-lime-500 py-3 rounded-lg items-center"
      >
        <Text className="text-white font-bold text-lg">Adicionar ao Carrinho</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}