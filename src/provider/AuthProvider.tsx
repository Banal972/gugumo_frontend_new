"use client";
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }: AuthProvider) => {
  return (
    <SessionProvider refetchOnWindowFocus={false}>{children}</SessionProvider>
  );
};

export default AuthProvider;

interface AuthProvider {
  children: React.ReactNode;
}
