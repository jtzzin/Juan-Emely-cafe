import { View, Text, SectionList, Image, TouchableOpacity } from "react-native";
import { MENU } from "@/utils/data/products";
import { useAuthStore } from "@/stores/helpers/auth-store";
import { useRouter } from "expo-router";

export default function Products() {
  const logout = useAuthStore((s) => s.logout);
  const router = useRouter();

  function handleOpenProduct(id: string) {
    router.push(`/product/${id}`);
  }

  function handleLogout() {
    logout();
    router.replace("/login");
  }

  return (
    <View className="flex-1 bg-gray-900 pt-10 px-4">
      <View className="flex-row justify-between items-center mb-6">
        <Text className="text-white text-2xl font-bold">Produtos</Text>
        <TouchableOpacity onPress={handleLogout}>
          <Text className="text-red-500 font-semibold text-lg transition-all duration-300 transform hover:scale-105">
            Sair
          </Text>
        </TouchableOpacity>
      </View>

      <SectionList
        sections={MENU}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleOpenProduct(item.id)}>
            <View className="bg-gray-800 p-4 rounded mb-4">
              <View className="flex-row items-center">
                <Image
                  source={item.thumbnail}
                  className="w-16 h-16 rounded mr-4"
                  resizeMode="cover"
                />
                <View className="flex-1">
                  <Text className="text-white text-lg font-bold">{item.title}</Text>
                  <Text className="text-gray-400 text-sm">{item.description}</Text>
                  <Text className="text-lime-400 mt-1 font-semibold">
                    R$ {item.price.toFixed(2)}
                  </Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text className="text-white text-xl font-bold mt-6 mb-2">{title}</Text>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}
