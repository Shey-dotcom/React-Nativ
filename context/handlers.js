import { API_URL } from "../constants";
export const fetchMe = async (jwt) => {
  if (!!!jwt) return null;
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
    return json;
  } catch (e) {
    return { error: e.message };
  }
};

export const registerFn = async ({ email, password }) => {
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
    return json;
  } catch (e) {
    return { error: e.message };
  }
};
export const logoutFn = async ({ jwt }) => {
  try {
    const result = await fetch(`${API_URL}/api/v1/auth/logout`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      credentials: true,
    });
    const json = await result.json();
    return json;
  } catch (e) {
    return { error: e.message };
  }
};

export const currentWeatherCall = async (queryKey) => {
  const [_, lat, lon] = queryKey;
  try {
    const result = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}`
    );
    const json = await result.json();
    return json;
  } catch (e) {
    return { error: e.message };
  }
};
