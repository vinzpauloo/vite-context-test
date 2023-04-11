import { createContext } from "react";

interface AuthContextData {
  isAuthenticated: boolean;
  login?: () => void;
  logout?: () => void;
}

const AuthContext = createContext<AuthContextData>({
  isAuthenticated: false,
});

export const AuthProvider = AuthContext.Provider;
export const AuthConsumer = AuthContext.Consumer;
export default AuthContext;
