// components/MapComponent.tsx
'use client';

import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { Dealer } from '@/types';

import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import userLocationIcon from '@/assets/pin.png'; // Ensure you have this file

const defaultIcon = new L.Icon({
  iconRetinaUrl: markerIcon2x.src,
  iconUrl: markerIcon.src,
  shadowUrl: markerShadow.src,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const userIcon = new L.Icon({
  iconUrl: userLocationIcon.src, // Path to your custom icon
  iconSize: [35, 45], // Adjust size as needed
  iconAnchor: [17, 35],
  popupAnchor: [1, -34],
  shadowUrl: markerShadow.src,
  shadowSize: [41, 41],
});

const FitBounds = ({ bounds }: { bounds: L.LatLngBounds | null }) => {
  const map = useMap();
  if (bounds) {
    map.fitBounds(bounds);
  }
  return null;
};

const MapComponent = ({ dealers, userLocation }: { dealers: Dealer[], userLocation?: { latitude: number, longitude: number } }) => {
  if (!Array.isArray(dealers) || dealers.length === 0) {
    return <div>This car is not available at this moment.</div>;
  }

  // Create bounds to include all dealers and user location if available
  const bounds = L.latLngBounds(
    dealers.map(dealer => L.latLng(dealer.attributes.latitude, dealer.attributes.longitude))
  );

  if (userLocation) {
    bounds.extend(L.latLng(userLocation.latitude, userLocation.longitude));
  }

  return (
    <MapContainer
      center={bounds.getCenter()}
      zoom={13}
      style={{ height: '500px', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {dealers.map(dealer => (
        <Marker
          key={dealer.id}
          position={[dealer.attributes.latitude, dealer.attributes.longitude]}
          icon={defaultIcon}
        >
          <Popup>{dealer.attributes.title}</Popup>
        </Marker>
      ))}
      {userLocation && (
        <Marker
          position={[userLocation.latitude, userLocation.longitude]}
          icon={userIcon}
        >
          <Popup>Your Location</Popup>
        </Marker>
      )}
      <FitBounds bounds={bounds} />
    </MapContainer>
  );
};

export default MapComponent;
