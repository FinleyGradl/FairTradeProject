"use client";

import { useEffect, useState } from "react";
import { haversineDistanceM, formatDistance } from "@/lib/geo";

interface DistanceFromYouProps {
  latitude: number;
  longitude: number;
  className?: string;
}

/**
 * Replaces the old hardcoded "X km from Berlin center" label: this asks the
 * browser for the visitor's real position and computes the distance from
 * there instead of assuming everyone is near one city.
 */
export function DistanceFromYou({ latitude, longitude, className }: DistanceFromYouProps) {
  const [distanceM, setDistanceM] = useState<number | null>(null);
  const [denied, setDenied] = useState(false);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setDistanceM(
          haversineDistanceM(pos.coords.latitude, pos.coords.longitude, latitude, longitude)
        );
      },
      () => setDenied(true),
      { enableHighAccuracy: false, timeout: 8000 }
    );
  }, [latitude, longitude]);

  if (denied || distanceM == null) return null;

  return <span className={className}>{formatDistance(distanceM)} von dir entfernt</span>;
}