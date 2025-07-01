"use client";

import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import { useState, useEffect } from "react";
import shattafeMarker from "../../public/shattafe-marker.png";

// your custom icon
const customIcon = L.icon({
  iconUrl: shattafeMarker.src,
  iconSize: [64, 64],
  iconAnchor: [32, 60],
  popupAnchor: [0, -1],
});

// fix default marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "/leaflet/images/marker-icon-2x.png",
  iconUrl: "/leaflet/images/marker-icon.png",
  shadowUrl: "/leaflet/images/marker-shadow.png",
});

// helper to recenter the map when props.center changes
function Recenter({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
}

// Type for your toilet data
interface Toilet {
  id: number;
  name: string;
  lat: number;
  lng: number;
}

export default function ShattafeMap() {
  // default center: Beirut
  const defaultCenter: [number, number] = [33.89185540554506, 35.48990515917835];

  const [mapCenter, setMapCenter] = useState<[number, number]>(defaultCenter);
  const [toilets, setToilets] = useState<Toilet[]>([]);
  const [loading, setLoading] = useState(true);

  // load toilet data
  useEffect(() => {
    fetch("/data/toilets.json")
      .then((res) => res.json())
      .then((data: Toilet[]) => {
        setToilets(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load toilets.json", err);
        setLoading(false);
      });

    setMapCenter(defaultCenter);
  }, []);

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
        <Marker key={t.id} position={[t.lat, t.lng]} icon={customIcon}>
          <Popup>{t.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
