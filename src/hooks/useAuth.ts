'use client';

import { useSession, signIn, signOut } from "next-auth/react";

export function useAuth() {
  const { data: session, status } = useSession();

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      return result;
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };

  const loginWithGoogle = async () => {
    try {
      await signIn("google", { callbackUrl: "/" });
    } catch (error) {
      console.error("Google login error:", error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut({ callbackUrl: "/" });
    } catch (error) {
      console.error("Logout error:", error);
      throw error;
    }
  };

  const register = async (email: string, password: string, name: string) => {
    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password, name }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || "Registration failed");
      }

      // Auto-login after successful registration
      await login(email, password);
      return { success: true };
    } catch (error) {
      console.error("Registration error:", error);
      throw error;
    }
  };

  return {
    user: session?.user,
    isAuthenticated: !!session?.user,
    isLoading: status === "loading",
    login,
    loginWithGoogle,
    logout,
    register,
  };
}
