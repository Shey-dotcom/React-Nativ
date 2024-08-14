import React from "react";
import * as SecureStore from "expo-secure-store";
import { API_URL, KEYS } from "../constants";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchMe, loginFn, registerFn } from "./handlers";

const AuthContext = React.createContext({
  jwt: null,
  me: null,
  loading: false,
  login: () => {},
  register: () => {},
  logout: () => {},
});

export const useAuth = () => {
  return React.useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = React.useState({
    jwt: null,
    me: null,
    loading: false,
  });

  const { data: me, isLoading: loadingMe } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const { mutateAsync: mutateLogin, isPending: loggingIn } = useMutation({
    mutationKey: ["login"],
    mutationFn: loginFn,
  });
  const { mutateAsync: mutateRegister, isPending: registerIn } = useMutation({
    mutationKey: ["register"],
    mutationFn: registerFn,
  });

  React.useEffect(() => {
    setAuthState((s) => ({
      ...s,
      loading: loadingMe || loggingIn || registerIn,
      me,
    }));
  }, [loadingMe, me, loggingIn, registerIn]);

  React.useEffect(() => {
    (async () => {
      // Load token on startup
      const data = await SecureStore.getItemAsync(KEYS.JWT);
      if (data) {
        const object = JSON.parse(data);
        // Set our context state
        setAuthState((s) => ({ ...s, jwt: object.jwt }));
      }
    })();
  }, []);

  const login = async (email, password) => {
    const data = await mutateLogin({ email, password });
    if (!!data?.jwt) {
      setAuthState((s) => ({ ...s, jwt: data.jwt }));
    } else {
      setAuthState((s) => ({ ...s, jwt: null }));
    }
    return data;
  };

  const register = async (email, password) => {
    try {
      const result = await fetch(`${API_URL}/api/v1/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: true,
      });
      const json = await result.json();
      if (json.error) {
        return { error: json.error };
      }
      setAuthState({
        jwt: json.jwt,
      });
      await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
      return json;
    } catch (e) {
      return { error: e.message };
    }
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(KEYS.JWT);
    setAuthState({
      jwt: null,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        login,
        logout,
        authState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
