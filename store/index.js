import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import * as SecureStore from "expo-secure-store";
import { KEYS } from "../constants";

const storage = {
  getItem: async (name) => {
    try {
      const item = await SecureStore.getItemAsync(name);
      return JSON.parse(item);
    } catch (error) {
      return null;
    }
  },
  setItem: async (name, value) => {
    try {
      await SecureStore.setItemAsync(name, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  },
  removeItem: async (name) => {
    try {
      await SecureStore.deleteItemAsync(name);
      return true;
    } catch (error) {
      return false;
    }
  },
};

export const useMeStore = create()(
  persist(
    (set) => ({
      me: null,
      login: (me) => set((state) => ({ ...state, me })),
      logout: () => set((state) => ({ ...state, me: null })),
    }),
    { storage: createJSONStorage(() => storage), name: KEYS.ME }
  )
);

export const useJwtStore = create()(
  persist(
    (set) => ({
      jwt: null,
      set: (jwt) => set((state) => ({ ...state, jwt })),
      destroy: () => set((state) => ({ ...state, jwt: null })),
    }),
    { storage: createJSONStorage(() => storage), name: KEYS.JWT }
  )
);

export const useLocationStore = create()(
  persist(
    (set) => ({
      location: null,
      update: (location) => set((state) => ({ ...state, location })),
    }),
    { storage: createJSONStorage(() => storage), name: KEYS.LOCATION }
  )
);

export const useSettingsStore = create()(
  persist(
    (set) => ({
      settings: null,
      update: (settings) => set((state) => ({ ...state, settings })),
    }),
    { storage: createJSONStorage(() => storage), name: KEYS.SETTINGS }
  )
);
