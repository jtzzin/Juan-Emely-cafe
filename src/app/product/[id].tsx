// src/app/products/[id].tsx

import { useLocalSearchParams, useRouter } from "expo-router";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import { MENU, ProductProps } from "@/utils/data/products";

export default function ProductDetails() {
  const { id } = useLocalSearchParams();
  const router = useRouter();

  const product: ProductProps | undefined = MENU.flatMap((cat) => cat.data).find(
    (item) => item.id === id
  );

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
    </ScrollView>
  );
}
