import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

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
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [tokenSubmitted, setTokenSubmitted] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !tokenSubmitted || !mapboxToken) return;

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
  }, [markers, center, zoom, tokenSubmitted, mapboxToken]);

  if (!tokenSubmitted) {
    return (
      <div className="w-full h-[400px] rounded-lg border bg-card p-8 flex flex-col items-center justify-center gap-4">
        <div className="max-w-md w-full space-y-4">
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Mapbox Token Required</h3>
            <p className="text-sm text-muted-foreground">
              Enter your Mapbox public token to view the interactive map. Get one at{' '}
              <a 
                href="https://mapbox.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                mapbox.com
              </a>
            </p>
          </div>
          <div className="space-y-2">
            <Label htmlFor="mapbox-token">Mapbox Public Token</Label>
            <Input
              id="mapbox-token"
              type="text"
              placeholder="pk.eyJ1Ijoi..."
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && mapboxToken) {
                  setTokenSubmitted(true);
                }
              }}
            />
            <button
              onClick={() => setTokenSubmitted(true)}
              disabled={!mapboxToken}
              className="w-full px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Load Map
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-[400px] rounded-lg overflow-hidden border">
      <div ref={mapContainer} className="absolute inset-0" />
    </div>
  );
};

export default DestinationsMap;
