"use client";

import dynamic from "next/dynamic";

const ShattafeMap = dynamic(
  () => import("@/components/shattafe-map"),
  { ssr: false }
);

export default function Home() {
  return (
    <div className="home-page">
      
      <div className="home-page__map-container">
        <ShattafeMap />
      </div>
    </div>
  );
}
