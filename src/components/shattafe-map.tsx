"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useEffect, useRef } from "react";
import shattafeMarker from "../../public/shattafe-marker.png";
import pendingShattafeMarker from "../../public/pending-shattafe-marker.png";
import userLocationMarker from "../../public/user-location-marker.png";
import { useAppContext } from "@/contexts/app-context";
import Coordinates from "@/models/coordinates";
export type MapMode = "general" | "location" | "information";

const shattafeIcon = L.icon({
  iconUrl: shattafeMarker.src,
  iconSize: [64, 64],
  iconAnchor: [32, 60],
  popupAnchor: [0, -1],
});

const pendingShattafeIcon = L.icon({
  iconUrl: pendingShattafeMarker.src,
  iconSize: [64, 64],
  iconAnchor: [32, 60],
  popupAnchor: [0, -1],
});

const userLocationIcon = L.icon({
  iconUrl: userLocationMarker.src,
  iconSize: [48, 48],
  iconAnchor: [24, 46],
  popupAnchor: [0, -1],
});

L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

interface ShattafeMapProps {
  mapMode: MapMode;
  onAddLocation: (coords: Coordinates) => void;
}

export default function ShattafeMap({ mapMode, onAddLocation }: ShattafeMapProps) {
  const { toilets, loading, currentLocation, mapCenter, setMapCenter, mapZoom } = useAppContext();
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!currentLocation.isEmpty()) {
      setMapCenter(currentLocation);
    }
  }, [currentLocation, setMapCenter]);

  useEffect(() => {
    if (mapMode === "information" && mapRef.current) {
      const c = mapRef.current.getCenter();
      onAddLocation(new Coordinates(c.lat, c.lng));
    }
  }, [mapMode, onAddLocation]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setView([mapCenter.lat, mapCenter.lng], mapZoom, { animate: true });
    }
  }, [mapCenter, mapZoom]);

  if (loading) {
    return <p>Loading map data…</p>;
  }

  return (
    <div style={{ position: "relative", height: "100%", width: "100%" }}>
      <MapContainer
        ref={(inst) => {
          mapRef.current = inst as unknown as L.Map;
        }}
        center={mapCenter}
        zoom={mapZoom}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> &copy; <a href="https://carto.com/">CartoDB</a>'
        />

        {/* General markers */}
        {mapMode === "general" &&
          toilets.map((t) => (
            <Marker key={t.id} position={[t.lat, t.lng]} icon={t.status && t.status === "approved" ? shattafeIcon : pendingShattafeIcon}>
              <Popup>{t.name}</Popup>
            </Marker>
          ))}

        {/* User location */}
        {mapMode === "general" && !currentLocation.isEmpty() && (
          <Marker position={currentLocation} icon={userLocationIcon}>
            <Popup>Your Current Location</Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Center crosshair for location mode */}
      {mapMode === "location" && (
        <img
          src={shattafeMarker.src}
          alt="Center Crosshair"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -94%)",
            pointerEvents: "none",
            width: 64,
            height: 64,
            opacity: 0.8,
            zIndex: 1000,
          }}
        />
      )}
    </div>
  );
}
