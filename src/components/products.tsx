import { forwardRef } from "react";
import {
  TouchableOpacity,
  TouchableOpacityProps,
  Image,
  View,
  Text,
} from "react-native";
import { ImageSourcePropType } from "react-native";

type ProductDataProps = {
  id: string;
  title: string;
  description: string;
  thumbnail: ImageSourcePropType;
  price: number;
  ingredients: string[];
  quantity?: number; // opcional (só aparece no carrinho)
};

type ProductProps = TouchableOpacityProps & {
  data: ProductDataProps;
};

export const Product = forwardRef<
  React.ComponentRef<typeof TouchableOpacity>,
  ProductProps
>(({ data, ...rest }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      className="w-full flex-row items-center pb-4"
      {...rest}
    >
      <Image source={data.thumbnail} className="w-20 h-20 rounded-md" />

      <View className="flex-1 ml-3">
        <View className="flex-row items-center justify-between">
          <Text className="text-slate-100 font-subtitle text-base flex-1">
            {data.title}
          </Text>

          {/* Exibe quantidade no carrinho */}
          {data.quantity !== undefined && (
            <Text className="text-lime-400 font-subtitle text-sm ml-2">
              x{data.quantity}
            </Text>
          )}
        </View>

        <Text className="text-slate-400 text-xs leading-5 mt-0.5">
          {data.description}
        </Text>

        {/* Preço do produto */}
        <Text className="text-lime-400 text-sm font-heading mt-1">
          R$ {data.price.toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
});

// Sem alterações necessárias aqui.