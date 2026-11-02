
import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";

export type UserRole = "admin" | "client";

export type AuthUser = {
  name: string;
};

type AuthContextType = {
  token: string | null;
  role: UserRole | null;
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (
    accessToken: string,
    userRole: UserRole,
    userName: string
  ) => void;
  logout: () => void;
};

const AuthContext = createContext<
  AuthContextType | undefined
>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({
  children,
}: AuthProviderProps) {
  const [token, setToken] = useState<string | null>(() => {
    return localStorage.getItem("brand_roots_token");
  });

  const [role, setRole] = useState<UserRole | null>(() => {
    const savedRole =
      localStorage.getItem("brand_roots_role");

    if (
      savedRole === "admin" ||
      savedRole === "client"
    ) {
      return savedRole;
    }

    return null;
  });

  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedName =
      localStorage.getItem("brand_roots_user_name");

    return savedName ? { name: savedName } : null;
  });

  function login(
    accessToken: string,
    userRole: UserRole,
    userName: string
  ) {
    localStorage.setItem(
      "brand_roots_token",
      accessToken
    );

    localStorage.setItem(
      "brand_roots_role",
      userRole
    );

    localStorage.setItem(
      "brand_roots_user_name",
      userName
    );

    setToken(accessToken);
    setRole(userRole);
    setUser({ name: userName });
  }

  function logout() {
    localStorage.removeItem("brand_roots_token");
    localStorage.removeItem("brand_roots_role");
    localStorage.removeItem("brand_roots_user_name");

    setToken(null);
    setRole(null);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{
        token,
        role,
        user,
        isAuthenticated: Boolean(token),
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
}
