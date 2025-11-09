// src/components/MapView.tsx

import { useEffect, useRef, useState } from "react";

import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

import { MarkerClusterer } from "@googlemaps/markerclusterer";

import debounce from "lodash.debounce";

import { fetchListingsInBounds } from "../services/listings";

import type { CarListing } from "../types/listing";



type Props = {

  defaultCenter?: google.maps.LatLngLiteral;

  defaultZoom?: number;

  onListingClick?: (id: string) => void;

};



export default function MapView({ defaultCenter = { lat: 32.7767, lng: -96.7970 }, defaultZoom = 11, onListingClick }: Props) {

  console.log("MapView component rendering");

  const mapRef = useRef<HTMLDivElement>(null);

  const mapInstance = useRef<google.maps.Map>();

  const markersRef = useRef<google.maps.Marker[]>([]);

  const clusterRef = useRef<MarkerClusterer>();

  const infoRef = useRef<google.maps.InfoWindow>();

  const [count, setCount] = useState(0);

  const [queryInput, setQueryInput] = useState<HTMLInputElement | null>(null);

  const [error, setError] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);



  useEffect(() => {

    console.log("MapView useEffect running");

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string;

    console.log("API Key check:", apiKey ? `${apiKey.substring(0, 10)}...` : "undefined");
    console.log("mapRef.current:", mapRef.current);

    if (!apiKey || apiKey === "<PASTE_KEY_HERE>") {

      console.log("API key not configured, setting error");

      setError("Google Maps API key is not configured. Please set VITE_GOOGLE_MAPS_API_KEY in your .env file.");

      setLoading(false);

      return;

    }

    if (!mapRef.current) {

      console.log("mapRef.current is null, returning");

      return;

    }

    let cancelled = false;

    setLoading(true);

    setError(null);



    console.log("Starting to load Google Maps...");

    // Add timeout to detect if libraries never load
    const loadTimeout = setTimeout(() => {
      if (!cancelled) {
        console.error("TIMEOUT: Google Maps libraries did not load after 15 seconds");
        setLoading(false);
        setError("Timeout: Google Maps API failed to load. Please check your API key and ensure Maps JavaScript API is enabled.");
      }
    }, 15000);

    // Set API options first
    setOptions({

      apiKey,

      version: "weekly",

    });



    // Load libraries using the new functional API
    Promise.all([

      importLibrary("maps"),

      importLibrary("places"),

    ]).then(([maps, places]) => {

      clearTimeout(loadTimeout);

      console.log("Google Maps libraries loaded successfully", { maps, places });

      if (cancelled || !mapRef.current) {

        console.log("Component cancelled or ref not available");

        return;

      }

      if (!maps || !places) {

        console.error("Google Maps libraries are invalid");

        setLoading(false);

        setError("Failed to load Google Maps: Invalid response from API");

        return;

      }

      // Verify that maps has the required properties
      // Note: ControlPosition might be on google.maps, not on the maps namespace
      const googleMaps = window.google?.maps || maps;
      
      if (!maps.Map || !googleMaps.ControlPosition || !maps.InfoWindow) {

        console.error("Google Maps library is incomplete:", { 
          maps, 
          googleMaps, 
          hasControlPosition: !!googleMaps.ControlPosition,
          hasMap: !!maps.Map,
          hasInfoWindow: !!maps.InfoWindow
        });

        setLoading(false);

        setError("Failed to load Google Maps: Library is incomplete. Please check if ad blockers are blocking the Google Maps script.");

        return;

      }

      try {

        console.log("Initializing map...");

        setLoading(false);



        mapInstance.current = new maps.Map(mapRef.current, {

        center: defaultCenter,

        zoom: defaultZoom,

        mapTypeControl: false,

        streetViewControl: false,

        fullscreenControl: true,

      });



      infoRef.current = new maps.InfoWindow();



      const input = document.createElement("input");

      input.type = "text";

      input.placeholder = "Search location…";

      input.style.cssText = "width:260px;padding:10px 12px;border-radius:12px;border:1px solid #ddd;box-shadow:0 1px 4px rgba(0,0,0,0.08);";

      setQueryInput(input);



      const controlDiv = document.createElement("div");

      controlDiv.style.margin = "12px";

      controlDiv.appendChild(input);

      mapInstance.current.controls[googleMaps.ControlPosition.TOP_LEFT].push(controlDiv);



      const locateBtn = document.createElement("button");

      locateBtn.textContent = "Locate Me";

      locateBtn.style.cssText = "margin:12px;padding:10px 12px;border-radius:12px;border:1px solid #ddd;background:#fff;cursor:pointer;box-shadow:0 1px 4px rgba(0,0,0,0.08);";

      mapInstance.current.controls[googleMaps.ControlPosition.TOP_RIGHT].push(locateBtn);

      locateBtn.addEventListener("click", () => {

        navigator.geolocation?.getCurrentPosition((pos) => {

          const center = { lat: pos.coords.latitude, lng: pos.coords.longitude };

          mapInstance.current?.panTo(center);

          mapInstance.current?.setZoom(12);

        });

      });



      const countDiv = document.createElement("div");

      countDiv.style.cssText = "margin:12px;padding:8px 12px;border-radius:999px;background:#111;color:#fff;font-weight:600;";

      countDiv.textContent = "0 results";

      mapInstance.current.controls[googleMaps.ControlPosition.TOP_CENTER].push(countDiv);



      // Places Autocomplete

      const autocomplete = new places.Autocomplete(input, {

        fields: ["geometry", "name"],

        types: ["(cities)"],

      });

      autocomplete.addListener("place_changed", () => {

        const place = autocomplete.getPlace();

        const loc = place.geometry?.location;

        if (loc) {

          mapInstance.current?.panTo({ lat: loc.lat(), lng: loc.lng() });

          mapInstance.current?.setZoom(11);

        }

      });



      // Clusterer

      clusterRef.current = new MarkerClusterer({ map: mapInstance.current });



      // Debounced fetch on bounds change

      const onIdle = debounce(async () => {

        try {

          const b = mapInstance.current?.getBounds();

          if (!b) return;

          const bounds = {

            north: b.getNorthEast().lat(),

            south: b.getSouthWest().lat(),

            east: b.getNorthEast().lng(),

            west: b.getSouthWest().lng(),

          };

          const listings = await fetchListingsInBounds(bounds);

          setCount(listings.length);

          countDiv.textContent = `${listings.length} result${listings.length === 1 ? "" : "s"}`;

          // Pass both maps and the global google.maps for compatibility
          const googleMapsForMarkers = window.google?.maps || maps;
          renderMarkers(googleMapsForMarkers, listings);

        } catch (err) {

          console.error("Error in onIdle:", err);

          setError(`Error loading listings: ${err instanceof Error ? err.message : String(err)}`);

        }

      }, 300);



      mapInstance.current.addListener("idle", onIdle);

      onIdle(); // initial load

      } catch (err) {

        if (cancelled) return;

        setLoading(false);

        setError(`Error initializing map: ${err instanceof Error ? err.message : String(err)}`);

        console.error("Map initialization error:", err);

      }

    }).catch((err) => {
      clearTimeout(loadTimeout);

      console.error("Promise rejection - Failed to load Google Maps:", err);
      console.error("Error details:", {
        message: err?.message,
        name: err?.name,
        stack: err?.stack,
        err: err
      });

      if (cancelled) return;

      setLoading(false);

      let errorMessage = `Failed to load Google Maps: ${err instanceof Error ? err.message : String(err)}`;
      
      // Check if it's a blocking issue
      if (err?.message?.includes("blocked") || err?.message?.includes("ERR_BLOCKED")) {
        errorMessage = "Google Maps is being blocked. Please disable ad blockers or browser extensions that might be blocking the Google Maps script.";
      }

      setError(errorMessage);

    });



    return () => { 
      cancelled = true; 
      clearTimeout(loadTimeout);
    };

  }, [defaultCenter, defaultZoom]);



  function renderMarkers(maps: typeof google.maps, listings: CarListing[]) {

    try {

      // Clear old

      if (clusterRef.current) {

        clusterRef.current.clearMarkers();

      }

      markersRef.current.forEach(m => m.setMap(null));

      markersRef.current = [];



      // Use google.maps.Marker if available, otherwise try maps.Marker
      const MarkerClass = window.google?.maps?.Marker || maps.Marker;

      if (!MarkerClass || typeof MarkerClass !== 'function') {

        console.error("Marker class not available:", { 

          hasGoogleMaps: !!window.google?.maps,

          hasMapsMarker: !!maps.Marker,

          MarkerClass,

          maps 

        });

        throw new Error("Marker class is not available. Google Maps library may not be fully loaded.");

      }

      listings.forEach(listing => {

        const marker = new MarkerClass({

          position: { lat: listing.lat, lng: listing.lng },

          title: listing.title,

        });



        marker.addListener("click", () => {

          const html = `

            <div style="max-width:240px">

              <div style="font-weight:600;margin-bottom:4px">${listing.title}</div>

              <div style="margin-bottom:6px">$${listing.price.toLocaleString()} • ${listing.mileage.toLocaleString()} mi</div>

              <a href="${listing.url}" target="_blank" rel="noopener">Open listing ↗</a>

            </div>`;

          infoRef.current?.setContent(html);

          infoRef.current?.open({ map: mapInstance.current, anchor: marker });

          onListingClick?.(listing.id);

        });



        markersRef.current.push(marker);

      });



      if (clusterRef.current) {

        clusterRef.current.addMarkers(markersRef.current);

      }

    } catch (err) {

      console.error("Error rendering markers:", err);

      setError(`Error rendering markers: ${err instanceof Error ? err.message : String(err)}`);

    }

  }



  if (error) {

    return (

      <div style={{ width: "100%", height: "100%", minHeight: 480, display: "flex", alignItems: "center", justifyContent: "center", padding: "20px", textAlign: "center" }}>

        <div style={{ maxWidth: "500px" }}>

          <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "8px", color: "#dc2626" }}>Error loading map</h3>

          <p style={{ color: "#6b7280", fontSize: "14px" }}>{error}</p>

        </div>

      </div>

    );

  }

  return (
    <div style={{ width: "100%", height: "100%", minHeight: 480, position: "relative" }}>
      {loading && (
        <div style={{ 
          position: "absolute", 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: "flex", 
          alignItems: "center", 
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 1000
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: "16px", color: "#6b7280" }}>Loading map...</div>
          </div>
        </div>
      )}
      <div 
        style={{ 
          width: "100%", 
          height: "100%", 
          minHeight: 480,
          backgroundColor: "#f3f4f6"
        }} 
        ref={mapRef} 
      />
    </div>
  );

}

