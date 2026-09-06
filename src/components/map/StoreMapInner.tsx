"use client";

import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, CircleMarker, useMap } from "react-leaflet";
import L from "leaflet";
import { Link } from "@/i18n/navigation";
import "leaflet/dist/leaflet.css";
import type { MapStore } from "./StoreMap";

// Fix default marker icons in Next.js
const icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const selectedIcon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function FlyToSelected({
  selectedSlug,
  stores,
}: {
  selectedSlug?: string | null;
  stores: MapStore[];
}) {
  const map = useMap();
  const prevSlug = useRef<string | null>(null);

  useEffect(() => {
    if (!selectedSlug || selectedSlug === prevSlug.current) return;
    prevSlug.current = selectedSlug;
    const store = stores.find((s) => s.slug === selectedSlug);
    if (store) {
      map.flyTo([store.latitude, store.longitude], 15, { duration: 0.8 });
    }
  }, [selectedSlug, stores, map]);

  return null;
}

interface StoreMapInnerProps {
  stores: MapStore[];
  center?: { lat: number; lng: number };
  userLocation?: { lat: number; lng: number } | null;
  selectedSlug?: string | null;
  onSelectStore?: (slug: string) => void;
  className?: string;
}

export default function StoreMapInner({
  stores,
  center = { lat: 52.52, lng: 13.405 },
  userLocation,
  selectedSlug,
  onSelectStore,
  className,
}: StoreMapInnerProps) {
  return (
    <div className={className}>
      <MapContainer
        center={[center.lat, center.lng]}
        zoom={12}
        className="h-full min-h-[300px] w-full rounded-xl z-0"
        scrollWheelZoom
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <FlyToSelected selectedSlug={selectedSlug} stores={stores} />
        {userLocation && (
          <CircleMarker
            center={[userLocation.lat, userLocation.lng]}
            radius={8}
            pathOptions={{ color: "#4A7C59", fillColor: "#4A7C59", fillOpacity: 0.8 }}
          />
        )}
        {stores.map((store) => (
          <Marker
            key={store.id}
            position={[store.latitude, store.longitude]}
            icon={store.slug === selectedSlug ? selectedIcon : icon}
            eventHandlers={{
              click: () => onSelectStore?.(store.slug),
            }}
          >
            <Popup>
              <div className="min-w-[160px]">
                <p className="font-semibold">{store.name}</p>
                {store.avgRating != null && (
                  <p className="text-sm text-gray-600">★ {store.avgRating.toFixed(1)}</p>
                )}
                <Link
                  href={`/stores/${store.slug}`}
                  className="mt-1 inline-block text-sm text-sage dark:text-sage-300 underline"
                >
                  View store →
                </Link>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}
