import { API_URL, KEYS } from "../constants";
import * as SecureStore from "expo-secure-store";

export const fetchMe = async () => {
  const p = await SecureStore.getItemAsync(KEYS.JWT);
  if (!p) return null;
  const { jwt } = JSON.parse(p);
  const result = await fetch(`${API_URL}/api/v1/auth/me`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
    credentials: true,
  });
  const me = await result.json();
  return me;
};

export const loginFn = async ({ email, password }) => {
  try {
    // fetch POST request to /login
    const result = await fetch(`${API_URL}/api/v1/auth/login`, {
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

    await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
    return json;
  } catch (e) {
    return { error: e.message };
  }
};

export const registerFn = async ({ email, password }) => {
  try {
    // fetch POST request to /login
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

    await SecureStore.setItemAsync(KEYS.JWT, JSON.stringify(json));
    return json;
  } catch (e) {
    return { error: e.message };
  }
};
