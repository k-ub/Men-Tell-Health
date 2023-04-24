import React, { useEffect, useRef, useState } from "react";

interface Props {
    onLocationChange: (lat: number, lng: number) => void;
}

const GoogleMap: React.FC<Props> = ({ onLocationChange }) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const [map, setMap] = useState<google.maps.Map>();
    const [marker, setMarker] = useState<google.maps.Marker>();

    useEffect(() => {
        if (!mapRef.current) return;
        const mapInstance = new google.maps.Map(mapRef.current, {
            center: { lat: 0, lng: 0 },
            zoom: 2,
        });
        setMap(mapInstance);
    }, []);

    const handleMapClick = (event: google.maps.MapMouseEvent) => {
        if (!map || !event.latLng) return;
        const latLng = event.latLng;
        if (marker) {
            marker.setMap(null);
        }
        const newMarker = new google.maps.Marker({
            position: latLng,
            map,
        });
        setMarker(newMarker);
        onLocationChange(latLng.lat(), latLng.lng());
    };
    

    useEffect(() => {
        if (!map) return;
        map.addListener("click", handleMapClick);
        return () => {
            google.maps.event.clearListeners(map, "click");
        };
    }, [map]);

    return (
        <div
            ref={mapRef}
            style={{ width: "100%", height: "300px", marginBottom: "1rem" }}
        ></div>
    );
};

export default GoogleMap;
