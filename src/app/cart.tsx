import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Alert,
  Linking,
  KeyboardAvoidingView,
  Platform,
} from "react-native";

import { Header } from "@/components/header";
import { productCartProps, useCartStore } from "@/stores/cart-store";
import { Product } from "@/components/products";
import { formatCurrency } from "@/utils/functions/format-currency";
import { Input } from "@/components/input";
import { Button } from "@/components/button";
import { Feather } from "@expo/vector-icons";
import { LinkButton } from "@/components/link-button";
import { useRouter } from "expo-router";

const PHONE_NUMBER = "5519992642050"; // meu tel de exemplo

export default function Cart() {
  const [address, setAddress] = useState("");
  const cartStore = useCartStore();
  const router = useRouter();

  const total = formatCurrency(
    cartStore.products.reduce(
      (sum, product) => sum + product.price * product.quantity,
      0
    )
  );

  function handleProductRemove(product: productCartProps) {
    Alert.alert("Remover item", `Deseja remover ${product.title}?`, [
      { text: "Cancelar", style: "cancel" },
      {
        text: "Remover",
        style: "destructive",
        onPress: () => cartStore.remove(product.id),
      },
    ]);
  }

  function handleOrder() {
    if (address.trim().length === 0) {
      return Alert.alert("Endereço obrigatório", "Informe o endereço completo.");
    }

    const productsList = cartStore.products
      .map((item) => `\n• ${item.quantity}x ${item.title}`)
      .join("");

    const message = `
🍔 *NOVO PEDIDO*
📍 Endereço: ${address}
${productsList}
💰 Total: ${total}
    `;

    Linking.openURL(
      `https://api.whatsapp.com/send?phone=${PHONE_NUMBER}&text=${encodeURIComponent(
        message
      )}`
    );

    cartStore.clear();
    router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-slate-900"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <Header title="Seu Carrinho" cartQuantityItem={cartStore.products.length} />

      <ScrollView className="flex-1 p-5">
        {cartStore.products.length > 0 ? (
          <View className="border-b border-slate-700 pb-4">
            {cartStore.products.map((product) => (
              <Product
                key={product.id}
                data={product}
                onPress={() => handleProductRemove(product)}
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
          <Text className="text-lime-400 text-2xl font-heading">{total}</Text>
        </View>

        <Input
          placeholder="Endereço completo: rua, número, bairro, CEP..."
          onChangeText={setAddress}
          value={address}
          returnKeyType="done"
          onSubmitEditing={handleOrder}
        />
      </ScrollView>

      <View className="p-5 gap-5">
        <Button onPress={handleOrder}>
          <Button.Text>Enviar pedido</Button.Text>
          <Button.Icon>
            <Feather name="arrow-right-circle" size={20} />
          </Button.Icon>
        </Button>

        <LinkButton title="Voltar ao cardápio" href="/" />
      </View>
    </KeyboardAvoidingView>
  );
}
