"use client";

import dynamic from "next/dynamic";
import { useAppContext } from "@/contexts/app-context";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import findClosestToilet from "@/utils/findClosestToilet";
import AddIcon from "@mui/icons-material/Add";
import { useState } from "react";
import Coordinates from "@/models/coordinates";
import { MapMode } from "@/components/shattafe-map";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

const ShattafeMap = dynamic(() => import("@/components/shattafe-map"), { ssr: false });

export default function Home() {
  const { toilets, currentLocation, setMapCenter } = useAppContext();
  const [mapMode, setMapMode] = useState<MapMode>("general" as MapMode);

  const handleAddLocation = (coords: Coordinates) => {
    console.log("🏷️ New submit coords:", coords);
    // send coords to your form or API…
    setMapMode("information");
  }; //todo add modal when mapmode === information

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
                  }
                }}
              >
                <ScreenSearchDesktopIcon /> Closest Bidet
              </button>
              <button
                onClick={() => {
                  setMapCenter(currentLocation.duplicate());
                }}
              >
                <CenterFocusStrongIcon /> Recenter
              </button>
              <button
                onClick={() => {
                  setMapMode("location" as MapMode);
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
      </div>
    </div>
  );
}
