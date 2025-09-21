// src/app/login.tsx

import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/auth-store";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const login = useAuthStore((s) => s.login);

  const validUsers = [
    { email: "user@cafe.com", password: "123456" },
    { email: "admin@cafe.com", password: "adminpass" },
  ];

  function handleLogin() {
    const isValid = validUsers.some(
      (user) => user.email === email && user.password === password
    );

    if (isValid) {
      login();
      router.replace("/product"); 
    } else {
      Alert.alert("Erro", "Credenciais inválidas.");
    }
  }

  return (
    <View className="flex-1 justify-center items-center bg-gray-900 p-5">
      <Text className="text-white text-2xl font-bold mb-8">Login</Text>

      <TextInput
        placeholder="Email"
        placeholderTextColor="#ccc"
        value={email}
        onChangeText={setEmail}
        className="bg-gray-800 text-white w-full p-4 rounded mb-4"
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        placeholder="Senha"
        placeholderTextColor="#ccc"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        className="bg-gray-800 text-white w-full p-4 rounded mb-6"
      />

      <TouchableOpacity
        onPress={handleLogin}
        className="bg-lime-500 w-full p-4 rounded items-center"
      >
        <Text className="text-white font-bold">Entrar</Text>
      </TouchableOpacity>
    </View>
  );
}
