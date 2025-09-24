import { useEffect } from "react";
import { useRouter } from "expo-router";
import { useAuthStore } from "@/stores/helpers/auth-store";

export default function Index() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace("/product"); // singular
    } else {
      router.replace("/login");
    }
  }, [isAuthenticated]);

  return null;
}
