"use client";

import Coordinates from "@/models/coordinates";
import Toilet, { ToiletDTO } from "@/models/toilet";
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session, SupabaseClient } from "@supabase/supabase-js";

export interface AppContextType {
  supabase: SupabaseClient;
  session: Session | null;
  setSession: React.Dispatch<React.SetStateAction<Session | null>>;
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
  supabase: createClient(),
  session: null,
  setSession: () => {},
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

const defaultCenter = Coordinates.getBeirutCenter();

export const AppContextProvider: FC<AppProviderProps> = ({ children }) => {
  const [supabase] = useState(() => createClient());
  const [session, setSession] = useState<Session | null>(null);

  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentLocation, setCurrentLocation] = useState<Coordinates>(Coordinates.getEmpty());
  const [mapCenter, setMapCenter] = useState<Coordinates>(defaultCenter);

  useEffect(() => {
    // fetch existing session
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // subscribe to session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase]);

  useEffect(() => {
    fetch("/data/toilets.json")
      .then((res) => res.json())
      .then((data: ToiletDTO[]) => {
        setToilets(data.map((toilet) => Toilet.fromDTO(toilet)));
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

  return <AppContext.Provider value={{ supabase, session, setSession, toilets, setToilets, loading, setLoading, currentLocation, setCurrentLocation, mapCenter, setMapCenter }}>{children}</AppContext.Provider>;
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};

export default AppContext;
