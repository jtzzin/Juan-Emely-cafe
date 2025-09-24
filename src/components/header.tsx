import { Image, View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { Link } from "expo-router"; // Usando Link para navegação
import colors from "tailwindcss/colors";
import { useCartStore } from "@/stores/helpers/cart-store";

type HeaderProps = {
  title: string;
  cartQuantityItem?: number;
};

export function Header({ title, cartQuantityItem = 0 }: HeaderProps) {
  return (
    <View className="flex-row items-center justify-between border-b border-slate-700 pb-5 pt-2 px-5">
      <View className="flex-row items-center gap-2">
        <Image
          source={require("@/assets/logo.png")}
          className="h-6 w-32"
          resizeMode="contain"
        />
        <Text className="text-white text-xl font-heading">{title}</Text>
      </View>

      {cartQuantityItem > 0 ? (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative">
            <View className="p-2 border border-slate-700 rounded-full">
              <Feather name="shopping-bag" color={colors.white} size={24} />
            </View>
            <View className="absolute -top-1 -right-1 bg-lime-400 w-5 h-5 rounded-full items-center justify-center border border-white">
              <Text className="text-slate-900 font-bold text-xs">
                {cartQuantityItem}
              </Text>
            </View>
          </TouchableOpacity>
        </Link>
      ) : (
        <Link href="/cart" asChild>
          <TouchableOpacity className="relative p-2">
            <Feather name="shopping-bag" color={colors.white} size={24} />
          </TouchableOpacity>
        </Link>
      )}
    </View>
  );
}
