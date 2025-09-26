// app/index.tsx (O Cardápio Principal)

import { View, Text, SectionList } from "react-native";
import { MENU } from "@/utils/data/products";
import { Product } from "@/components/products"; 
import { useRouter } from "expo-router";

export default function MenuScreen() {
    const router = useRouter();  

    function handleOpenProduct(id: string) {
        // Redireciona para a tela de detalhes (app/product/[id].tsx)
        router.push(`/product/${id}`); 
    }

    return (
      <View className="flex-1 bg-slate-900">
        
        <SectionList
          sections={MENU}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Product
              data={item}
              onPress={() => handleOpenProduct(item.id)}
            />
          )}
          renderSectionHeader={({ section: { title } }) => (
            <View className="bg-slate-800 p-4">
              <Text className="text-xl font-heading text-white">{title}</Text>
            </View>
          )}
          showsVerticalScrollIndicator={false}
          // AJUSTE: O padding superior é essencial para a lista não ficar escondida atrás do Header.
          contentContainerStyle={{ paddingTop: 120, paddingBottom: 100, paddingHorizontal: 20 }}
        />
      </View>
    );
}