import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";

export default function MapView({ lat, lon }) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);

  const isValidLatLon = (lat, lon) =>
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= -90 && lat <= 90 &&
    lon >= -180 && lon <= 180;

  // Initialize map
  useEffect(() => {
    if (mapRef.current) return;

    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: {
        version: 8,
        sources: {
          osm: {
            type: "raster",
            tiles: [
              "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://b.tile.openstreetmap.org/{z}/{x}/{y}.png",
              "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png"
            ],
            tileSize: 256,
            attribution:
              '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          }
        },
        layers: [
          {
            id: "osm",
            type: "raster",
            source: "osm"
          }
        ]
      },
      center: [0, 0],
      zoom: 2
    });
  }, []);

  // Update map marker
  useEffect(() => {
    if (!mapRef.current || !lat || !lon) return;

    if (!isValidLatLon(Number(lat), Number(lon))) return;

    const lngLat = [Number(lon), Number(lat)];

    mapRef.current.flyTo({
      center: lngLat,
      zoom: 13,
      essential: true
    });

    if (!markerRef.current) {
      markerRef.current = new maplibregl.Marker()
        .setLngLat(lngLat)
        .addTo(mapRef.current);
    } else {
      markerRef.current.setLngLat(lngLat);
    }
  }, [lat, lon]);

  return (
    <section style={{ marginTop: "2rem" }}>
      <h2>Map</h2>
      <div
        ref={mapContainerRef}
        style={{
          height: "400px",
          width: "100%",
          borderRadius: "8px"
        }}
      />
    </section>
  );
}
