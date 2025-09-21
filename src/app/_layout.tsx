import React, { useEffect } from "react";
import { Slot, useRouter, usePathname } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium,
  Inter_600SemiBold,
  Inter_700Bold,
} from "@expo-google-fonts/inter";
import { Loading } from "@/components/loading";
import { useAuthStore } from "@/stores/auth-store";
import { useColorScheme } from "react-native";

export default function Layout() {
  const router = useRouter();
  const pathname = usePathname();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const theme = useColorScheme(); // 👈 Detecta o tema do sistema

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Inter_600SemiBold,
    Inter_700Bold,
  });

  useEffect(() => {
    if (!fontsLoaded) return;
    if (!isAuthenticated && pathname !== "/login") {
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
      <Slot />
    </SafeAreaView>
  );
}
