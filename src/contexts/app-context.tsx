"use client";

import Coordinates from "@/models/coordinates";
import Toilet, { ToiletInterface } from "@/models/toilet";
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";

export interface AppContextType {
  toilets: Toilet[];
  setToilets: React.Dispatch<React.SetStateAction<Toilet[]>>;
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  currentLocation: Coordinates;
  setCurrentLocation: React.Dispatch<React.SetStateAction<Coordinates>>;
  mapCenter: Coordinates;
  setMapCenter: React.Dispatch<React.SetStateAction<Coordinates>>;
}

const defaultContext: AppContextType = {
  toilets: [],
  setToilets: () => {},
  loading: true,
  setLoading: () => {},
  currentLocation: Coordinates.getEmpty(),
  setCurrentLocation: () => {},
  mapCenter: Coordinates.getBeirutCenter(),
  setMapCenter: () => {},
};

const AppContext = createContext<AppContextType>(defaultContext);

interface AppProviderProps {
  children: ReactNode;
}

export const AppContextProvider: FC<AppProviderProps> = ({ children }) => {
  const defaultCenter = Coordinates.getBeirutCenter();

  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>(Coordinates.getEmpty());
  const [mapCenter, setMapCenter] = useState<Coordinates>(defaultCenter);

  useEffect(() => {
    fetch("/data/toilets.json")
      .then((res) => res.json())
      .then((data: ToiletInterface[]) => {
        setToilets(data.map((toilet) => Toilet.convertFromInterface(toilet)));
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load toilets.json", err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setCurrentLocation(new Coordinates(pos.coords.latitude, pos.coords.longitude));
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

  return <AppContext.Provider value={{ toilets, setToilets, loading, setLoading, currentLocation, setCurrentLocation, mapCenter, setMapCenter }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};

export default AppContext;
