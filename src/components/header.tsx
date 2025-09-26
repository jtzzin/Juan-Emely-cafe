// src/components/header.tsx

import { Image, View, Text, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router";
import colors from "tailwindcss/colors";
import { useCartStore } from "@/stores/helpers/cart-store"; 

type HeaderProps = {
  title: string;
};

export function Header({ title }: HeaderProps) {
  const cartQuantityItem = useCartStore((state) =>
    state.items.reduce((acc, item) => acc + item.quantity, 0)
  );

  return (
    <View className="flex-row items-center justify-between border-b border-slate-700 pb-5 pt-2 px-5">
      <View className="flex-row items-center gap-2">
        <Image
          // 🛑 CORREÇÃO DO CAMINHO: 'src/components/' para 'assets/' na raiz.
          source={require("./logo.png")} 
          className="h-6 w-32"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-heading">{title}</Text>
      </View>

      {cartQuantityItem > 0 ? (
        <Link href="/cart" asChild>
          {/* ✅ Usando Pressable para que o Link funcione corretamente */}
          <Pressable className="relative"> 
            <View className="p-2 border border-slate-700 rounded-full">
              <Feather name="shopping-bag" color={colors.white} size={24} />
            </View>
            <View className="absolute -top-1 -right-1 bg-lime-400 w-5 h-5 rounded-full items-center justify-center border border-white">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItem}
              </Text>
            </View>
          </Pressable>
        </Link>
      ) : (
        <Link href="/cart" asChild>
          <Pressable className="relative p-2">
            <Feather name="shopping-bag" color={colors.white} size={24} />
          </Pressable>
        </Link>
      )}
    </View>
  );
}