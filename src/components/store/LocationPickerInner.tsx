"use client";

import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from "react-leaflet";
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const icon = L.icon({
  iconUrl: "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

interface LocationPickerInnerProps {
  position: { lat: number; lng: number };
  onChange: (pos: { lat: number; lng: number }) => void;
  flyToTrigger?: number;
}

function ClickHandler({ onChange }: { onChange: (pos: { lat: number; lng: number }) => void }) {
  useMapEvents({
    click(e) {
      onChange({ lat: e.latlng.lat, lng: e.latlng.lng });
    },
  });
  return null;
}

function FlyToPosition({
  position,
  trigger,
}: {
  position: { lat: number; lng: number };
  trigger?: number;
}) {
  const map = useMap();
  const prevTrigger = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (trigger === undefined || trigger === prevTrigger.current) return;
    prevTrigger.current = trigger;
    map.flyTo([position.lat, position.lng], 16, { duration: 0.8 });
  }, [trigger, position, map]);

  return null;
}

export default function LocationPickerInner({ position, onChange, flyToTrigger }: LocationPickerInnerProps) {
  return (
    <MapContainer
      center={[position.lat, position.lng]}
      zoom={14}
      className="h-full min-h-[280px] w-full rounded-xl z-0"
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker
        position={[position.lat, position.lng]}
        icon={icon}
        draggable
        eventHandlers={{
          dragend: (e) => {
            const marker = e.target as L.Marker;
            const latlng = marker.getLatLng();
            onChange({ lat: latlng.lat, lng: latlng.lng });
          },
        }}
      />
      <ClickHandler onChange={onChange} />
      <FlyToPosition position={position} trigger={flyToTrigger} />
    </MapContainer>
  );
}