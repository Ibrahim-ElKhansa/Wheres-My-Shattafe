"use client";

import dynamic from "next/dynamic";
import { useAppContext } from "@/contexts/app-context";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import findClosestToilet from "@/utils/findClosestToilet";
import AddIcon from "@mui/icons-material/Add";
import { useState, useCallback, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Coordinates from "@/models/coordinates";
import { MapMode } from "@/components/shattafe-map";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import BidetModal from "@/components/bidet-modal";

const ShattafeMap = dynamic(() => import("@/components/shattafe-map"), { ssr: false });

export default function Home() {
  const { toilets, currentLocation, setMapCenter, setMapZoom, session, setAuthModalOpen } = useAppContext();
  const [mapMode, setMapMode] = useState<MapMode>("general" as MapMode);
  const [centerCoordinates, setCenterCoordinates] = useState<Coordinates>(currentLocation.duplicate());
  const searchParams = useSearchParams();

  // Handle authentication feedback from URL parameters
  useEffect(() => {
    const authParam = searchParams.get('auth');
    
    if (authParam === 'required') {
      // Open auth modal when authentication is required
      setAuthModalOpen(true);
    } else if (authParam === 'success') {
      // Could show a success toast here if you want
      console.log('Authentication successful!');
    } else if (authParam === 'error') {
      // Could show an error toast here if you want
      console.error('Authentication failed');
    }

    // Clean up URL parameters after handling them
    if (authParam && window.history.replaceState) {
      const url = new URL(window.location.href);
      url.searchParams.delete('auth');
      window.history.replaceState({}, '', url.toString());
    }
  }, [searchParams, setAuthModalOpen]);

  const handleAddLocation = useCallback((coords: Coordinates) => {
    setCenterCoordinates(coords);
    setMapMode("information");
  }, []);

  return (
    <div className="home-page">
      <div className="home-page__map-container">
        <ShattafeMap mapMode={mapMode} onAddLocation={handleAddLocation} />
        <div className="home-page__map-buttons">
          {mapMode === "general" && (
            <>
              <button
                onClick={() => {
                  const closest = findClosestToilet(currentLocation, toilets);
                  if (closest) {
                    setMapCenter(closest.toilet.getCoordinates());
                    setMapZoom(18);
                  }
                }}
              >
                <ScreenSearchDesktopIcon /> Closest Bidet
              </button>
              <button
                onClick={() => {
                  setMapCenter(currentLocation.duplicate());
                  setMapZoom(16);
                }}
              >
                <CenterFocusStrongIcon /> Recenter
              </button>
              <button
                className="home-page__add-toilet-button"
                onClick={() => {
                  if (session) setMapMode("location" as MapMode);
                  else setAuthModalOpen(true);
                }}
              >
                <AddIcon /> Submit Toilet
              </button>
            </>
          )}
          {mapMode === "location" && (
            <>
              <button
                onClick={() => {
                  setMapMode("information" as MapMode);
                }}
              >
                <CheckIcon /> Confirm Location
              </button>
              <button
                onClick={() => {
                  setMapMode("general" as MapMode);
                }}
              >
                <CloseIcon /> Cancel Submission
              </button>
            </>
          )}
          {mapMode === "information" && (
            <button
              onClick={() => {
                setMapMode("general" as MapMode);
              }}
            >
              <CloseIcon /> Go Back
            </button>
          )}
        </div>
        <BidetModal isOpen={mapMode === "information"} coordinates={centerCoordinates} onClose={() => setMapMode("general" as MapMode)} />
      </div>
    </div>
  );
}
