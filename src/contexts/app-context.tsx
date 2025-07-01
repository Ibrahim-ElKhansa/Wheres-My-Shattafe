"use client";

import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from 'react';

export interface AppContextType {
  currentLocation: [number, number];
  setCurrentLocation: React.Dispatch<React.SetStateAction<[number, number]>>;
}

const defaultContext: AppContextType = {
  currentLocation: [0, 0],
  setCurrentLocation: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppProviderProps> = ({ children }) => {
  const [currentLocation, setCurrentLocation] = useState<[number, number]>([0, 0]);
  
  useEffect(() => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            setCurrentLocation([pos.coords.latitude, pos.coords.longitude]);
          },
          (err) => {
            console.warn("Geolocation error:", err);
          },
          {
            enableHighAccuracy: true,
            timeout: 10_000,
            maximumAge: 0,
          }
        );
      }
    }, []);

  return (
    <AppContext.Provider value={{ currentLocation, setCurrentLocation }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};

export default AppContext;
