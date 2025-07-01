"use client";

import dynamic from "next/dynamic";
import { useAppContext } from "@/contexts/app-context";
import CenterFocusStrongIcon from "@mui/icons-material/CenterFocusStrong";
import ScreenSearchDesktopIcon from "@mui/icons-material/ScreenSearchDesktop";
import findClosestToilet from "@/utils/findClosestToilet";

const ShattafeMap = dynamic(() => import("@/components/shattafe-map"), { ssr: false });

export default function Home() {
  const { toilets, currentLocation, setMapCenter } = useAppContext();

  return (
    <div className="home-page">
      <div className="home-page__map-container">
        <ShattafeMap />
        <div className="home-page__map-buttons">
          <button
            onClick={() => {
              console.log("Find closest toilet button clicked");
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
              console.log("Recenter button clicked");
              setMapCenter(currentLocation.duplicate());
            }}
          >
            <CenterFocusStrongIcon /> Recenter
          </button>
        </div>
      </div>
    </div>
  );
}
