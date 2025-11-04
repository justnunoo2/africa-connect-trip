import { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

interface Marker {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  description?: string;
}

interface DestinationsMapProps {
  markers: Marker[];
  center?: [number, number];
  zoom?: number;
}

const DestinationsMap = ({ markers, center = [20, 0], zoom = 2 }: DestinationsMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current) return;

    const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
    if (!mapboxToken) {
      console.error('Mapbox token not found in environment variables');
      return;
    }

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v12',
      center: center,
      zoom: zoom,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Add markers
    markers.forEach((marker) => {
      if (marker.latitude && marker.longitude) {
        const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<div class="p-2">
            <h3 class="font-bold text-sm">${marker.name}</h3>
            ${marker.description ? `<p class="text-xs mt-1">${marker.description}</p>` : ''}
          </div>`
        );

        new mapboxgl.Marker({ color: '#0EA5E9' })
          .setLngLat([marker.longitude, marker.latitude])
          .setPopup(popup)
          .addTo(map.current!);
      }
    });

    // Fit bounds to show all markers
    if (markers.length > 0) {
      const bounds = new mapboxgl.LngLatBounds();
      markers.forEach((marker) => {
        if (marker.latitude && marker.longitude) {
          bounds.extend([marker.longitude, marker.latitude]);
        }
      });
      map.current.fitBounds(bounds, { padding: 50, maxZoom: 10 });
    }

    return () => {
      map.current?.remove();
    };
  }, [markers, center, zoom]);

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default DestinationsMap;
