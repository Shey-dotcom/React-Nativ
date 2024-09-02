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

export const forgotFn = async ({ email }) => {
  try {
    const result = await fetch(`${API_URL}/api/v1/auth/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    return { error: e.message };
  }
};

export const changeFn = async ({ password, confirm, jwt }) => {
  try {
    const result = await fetch(`${API_URL}/api/v1/auth/change-password`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${jwt}`,
      },
      credentials: true,
      body: JSON.stringify({ password, confirm }),
    });
    const json = await result.json();
    return json;
  } catch (e) {
    console.log({ e });
    return { error: e.message };
  }
};

export const currentWeatherCall = async (queryKey) => {
  const [_, lat, lon] = queryKey;

  return {
    coord: {
      lon: 10.99,
      lat: 44.34,
    },
    weather: [
      {
        id: 501,
        main: "Rain",
        description: "moderate rain",
        icon: "10d",
      },
    ],
    base: "stations",
    main: {
      temp: 298.48,
      feels_like: 298.74,
      temp_min: 297.56,
      temp_max: 300.05,
      pressure: 1015,
      humidity: 64,
      sea_level: 1015,
      grnd_level: 933,
    },
    visibility: 10000,
    wind: {
      speed: 0.62,
      deg: 349,
      gust: 1.18,
    },
    rain: {
      "1h": 3.16,
    },
    clouds: {
      all: 100,
    },
    dt: 1661870592,
    sys: {
      type: 2,
      id: 2075663,
      country: "IT",
      sunrise: 1661834187,
      sunset: 1661882248,
    },
    timezone: 7200,
    id: 3163858,
    name: "Zocca",
    cod: 200,
  };

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.EXPO_PUBLIC_API_KEY}&units=metric`;
    const result = await fetch(url);
    const json = await result.json();
    return json;
  } catch (e) {
    return { error: e.message };
  }
};
