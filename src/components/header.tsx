import { Image, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "tailwindcss/colors";
import { Link } from "expo-router";

type HeaderProps = {
  title: string;
  cartQuantityItem?: number;
};

export function Header({ title, cartQuantityItem = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-slate-700 pb-5 px-5">
      {/* Logo e título */}
      <View className="flex-row items-center gap-3">
        <Image source={require("@/assets/logo.png")} className="h-6 w-32" />
        <Text className="text-white text-xl font-heading">{title}</Text>
      </View>

      {/* Botão do carrinho */}
      <Link href="/cart" asChild>
        <TouchableOpacity className="relative p-2">
          <Feather name="shopping-bag" color={colors.white} size={26} />
          {cartQuantityItem > 0 && (
            <View className="absolute -top-1 -right-1 bg-lime-400 w-5 h-5 rounded-full items-center justify-center border border-white">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItem}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      </Link>
    </View>
  );
}
