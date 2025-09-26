

import React, { useEffect } from "react";
import { Stack, useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/loading";
import { useAuthStore } from "@/stores/helpers/auth-store";
import { useColorScheme, View } from "react-native"; 
import { Header } from "@/components/header"; 

const PUBLIC_ROUTES = ["/login"];

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useColorScheme();

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;

    const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

    // 🔒 Redireciona para login se não autenticado e não estiver numa rota pública
    if (!isAuthenticated && !isPublicRoute) {
      router.replace("/login");
    }
  }, [fontsLoaded, isAuthenticated, pathname, router]);

  if (!fontsLoaded) {
    return <Loading />;
  }

  return (
    <SafeAreaView
      className={theme === "dark" ? "bg-gray-900 flex-1" : "bg-white flex-1"}
    >
      <Stack>
        {/* Tela principal (index.tsx) */}
        <Stack.Screen
          name="index"
          options={{
            title: "",
            header: () => (
              <View className="bg-slate-900">
                <Header title="Produtos" />
              </View>
            ),
            headerShown: true,
            headerTransparent: true,
          }}
        />

        {/* Tela de detalhes do produto */}
        <Stack.Screen name="product/[id]" options={{ headerShown: false }} />

        {/* Tela do carrinho */}
        <Stack.Screen name="cart" options={{ headerShown: false }} />

        {/* Tela de login */}
        <Stack.Screen name="login" options={{ headerShown: false }} />
      </Stack>
    </SafeAreaView>
  );
}
