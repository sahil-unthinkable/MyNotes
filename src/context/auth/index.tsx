import { useState, useEffect, createContext, useContext } from "react";
import { Preferences } from "@capacitor/preferences";
import { AuthContextType, User } from "../../lib/types";
import { userKey } from "../../lib/constants";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const [user, setUser] = useState<User | undefined>(undefined);

  const login = async (user: User) => {
    if (user.name === "") {
      return;
    }

    try {
      await Preferences.set({
        key: userKey,
        value: JSON.stringify(user),
      });
      setUser(user);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = async () => {
    try {
      await Preferences.remove({
        key: userKey,
      });
      setUser(undefined);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      const res = await Preferences.get({ key: userKey });
      setUser(res.value ? JSON.parse(res.value) : undefined);
    })();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
