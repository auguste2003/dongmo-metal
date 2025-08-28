
'use client'

import {
  APIProvider,
  Map as GoogleMap,
  AdvancedMarker,
} from '@vis.gl/react-google-maps'
import { firebaseConfig } from '@/lib/firebase'
import { MapPin } from 'lucide-react'

export function Map() {
  if (!firebaseConfig.mapsApiKey) {
    return (
      <div className="flex h-full w-full items-center justify-center bg-muted">
        <p className="text-muted-foreground">
          Google Maps API Key is missing.
        </p>
      </div>
    )
  }

  const position = { lat: 4.0511, lng: 9.7679 } // Douala, Cameroon

  return (
    <APIProvider apiKey={firebaseConfig.mapsApiKey}>
      <GoogleMap
        defaultCenter={position}
        defaultZoom={14}
        mapId="metal-expressions-map"
        gestureHandling={'greedy'}
        disableDefaultUI={true}
      >
        <AdvancedMarker position={position}>
            <div className="bg-primary rounded-full p-2 shadow-lg">
                <MapPin className="h-6 w-6 text-primary-foreground" />
            </div>
        </AdvancedMarker>
      </GoogleMap>
    </APIProvider>
  )
}
