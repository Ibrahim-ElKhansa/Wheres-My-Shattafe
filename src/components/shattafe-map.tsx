"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useEffect } from "react";
import shattafeMarker from "../../public/shattafe-marker.png";
import userLocationMarker from "../../public/user-location-marker.png";
import { useAppContext } from "@/contexts/app-context";
import Coordinates from "@/models/coordinates";

// your custom icon
const customShattafeIcon = L.icon({
  iconUrl: shattafeMarker.src,
  iconSize: [64, 64],
  iconAnchor: [32, 60],
  popupAnchor: [0, -1],
});

// user location icon
const userLocationIcon = L.icon({
  iconUrl: userLocationMarker.src,
  iconSize: [48, 48],
  iconAnchor: [24, 46],
  popupAnchor: [0, -1],
});

// fix default marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

function Recenter({ center }: { center: Coordinates }) {
  const map = useMap();

  useEffect(() => {
    map.setView(center.convertToNumberArray());
  }, [center, map]);

  return null;
}

export default function ShattafeMap() {
  const { toilets, loading, currentLocation, mapCenter, setMapCenter } = useAppContext();

  useEffect(() => {
    if (!currentLocation.isEmpty()) {
      setMapCenter(currentLocation);
    }
  }, [currentLocation]);

  if (loading) {
    return <p className="p-4">Loading map data…</p>;
  }

  return (
    <MapContainer center={mapCenter} zoom={14} style={{ height: "100%", width: "100%" }}>
      <Recenter center={mapCenter} />

      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://osm.org">OpenStreetMap</a> &copy; <a href="https://carto.com/">CartoDB</a>'
      />

      {toilets.map((t) => (
        <Marker key={t.id} position={[t.lat, t.lng]} icon={customShattafeIcon}>
          <Popup>{t.name}</Popup>
        </Marker>
      ))}
      {!currentLocation.isEmpty() && (
        <Marker position={currentLocation} icon={userLocationIcon}>
          <Popup>Your Current Location</Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
