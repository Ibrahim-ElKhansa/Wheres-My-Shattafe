"use client";

import Coordinates from "@/models/coordinates";
import Toilet, { Gender, Status, ToiletDTO } from "@/models/toilet";
import React, { createContext, useContext, useState, ReactNode, FC, useEffect } from "react";
import { createClient } from "@/utils/supabase/client";
import { Session, SupabaseClient } from "@supabase/supabase-js";

type ToiletRow = {
  id: string;
  name: string;
  lat: number;
  lng: number;
  location_type: string;
  gender: Gender;
  description: string | null;
  upvote_count: number;
  downvote_count: number;
  status: Status;
  submitted_at: string;
  submitted_by_id: string;
};
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
  authModalOpen: boolean;
  setAuthModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
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
  authModalOpen: false,
  setAuthModalOpen: () => {},
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
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
    const loadToilets = async () => {
      setLoading(true);

      // pull all toilet rows
      const { data: rows, error } = await supabase.from("toilets").select(`
          id,
          name,
          lat,
          lng,
          gender,
          location_type,
          description,
          upvote_count,
          downvote_count,
          status,
          submitted_at,
          submitted_by_id
        `); //todo any user can still see the toilets table which is wrong

      if (error) {
        console.error("Error loading toilets:", error);
        setToilets([]);
      } else if (rows) {
        // map snake_case → your ToiletDTO then into Toilet model
        const dtos: ToiletDTO[] = rows.map((r: ToiletRow) => ({
          id: r.id,
          name: r.name,
          lat: r.lat,
          lng: r.lng,
          locationType: r.location_type,
          gender: r.gender,
          description: r.description ?? undefined,
          upvoteCount: r.upvote_count,
          downvoteCount: r.downvote_count,
          status: r.status,
          submittedAt: r.submitted_at,
          submittedById: r.submitted_by_id,
        }));

        setToilets(dtos.map((dto) => Toilet.fromDTO(dto)));
      }

      setLoading(false);
    };

    loadToilets();
  }, [supabase]);

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

  return (
    <AppContext.Provider
      value={{ supabase, session, setSession, toilets, setToilets, loading, setLoading, currentLocation, setCurrentLocation, mapCenter, setMapCenter, authModalOpen, setAuthModalOpen }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  return useContext(AppContext);
};

export default AppContext;
