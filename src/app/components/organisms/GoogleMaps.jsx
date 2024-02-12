"use client";

import React from "react";
import {
  APIProvider,
  Map,
  useMap,
  AdvancedMarker,
  ControlPosition,
  InfoWindow,
  Pin,
} from "@vis.gl/react-google-maps";
import { useEffect, useState } from "react";
import Image from "next/image";

/**
 * Renders a Google Maps component.
 *
 * @component
 * @description This component uses the @vis.gl/react-google-maps package to render a Google Maps component. It also renders a collection of markers on the map.
 * @param {Object[]} markerData - An array of marker data objects.
 * @param {Object} [activeMarker=null] - The active marker object.
 * @returns {JSX.Element} The GoogleMaps component.
 */
const GoogleMaps = ({ markerData, activeMarker = null }) => {
  const [loading, setLoading] = useState(true);

  return (
    <div className="w-full h-full">
      <div aria-live="assertive" className="sr-only">
        {loading ? (
          <p className="sr-only">Waiting for map to load</p>
        ) : (
          <p className="sr-only">Map loaded</p>
        )}
      </div>
      <APIProvider apiKey={[process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY]}>
        <Map
          center={
            markerData && markerData.length > 0
              ? {
                  lat: parseInt(markerData[0].latitude),
                  lng: parseInt(markerData[0].longitude),
                }
              : { lat: 51.05, lng: 3.71667 } // Ghent
          }
          mapId={process.env.NEXT_PUBLIC_GOOGLE_MAP_ID}
          backgroundColor="#226E59"
          streetViewControl={false}
          clickableIcons={false}
          maxZoom={15}
          minZoom={3}
          zoom={7}
          fullscreenControlOptions={{
            position: ControlPosition.LEFT_TOP,
          }}
          zoomControlOptions={{
            position: ControlPosition.LEFT_TOP,
          }}
          onTilesLoaded={() => {
            setLoading(false);
          }}
        >
          {!loading ? (
            <Markers
              key={markerData && markerData.length > 0 ? markerData[0].id : 0}
              points={markerData}
              activeMarker={activeMarker}
            />
          ) : null}
        </Map>
      </APIProvider>
    </div>
  );
};

/**
 * Renders a collection of markers on a Google Map.
 *
 * @component
 * @description This component uses the @vis.gl/react-google-maps package to render a collection of markers on a Google Map. It also renders an info window for each marker.
 * @param {Object[]} points - The array of points to be marked on the map.
 * @param {number|null} activeMarker - The index of the active marker, or null if no marker is active.
 * @returns {JSX.Element} The rendered component.
 */
const Markers = ({ points, activeMarker }) => {
  const map = useMap();
  const [infowindowShownIndex, setInfowindowShownIndex] = useState(false);

  useEffect(() => {
    if (activeMarker !== null) {
      map.panTo({
        lat: parseInt(points[activeMarker].latitude),
        lng: parseInt(points[activeMarker].longitude),
      });
      setInfowindowShownIndex(activeMarker);
    } else {
      setInfowindowShownIndex(false);
    }
  }, [activeMarker, map, points]);

  const closeInfoWindow = () => setInfowindowShownIndex(false);

  const toggleInfoWindow = (index) => {
    setInfowindowShownIndex(index);
  };

  return (
    <>
      {points.map((point, index) => (
        <React.Fragment key={point.id}>
          <AdvancedMarker
            title={point.title}
            position={{
              lat: parseInt(point.latitude),
              lng: parseInt(point.longitude),
            }}
            active={activeMarker === index}
            onClick={() => {
              toggleInfoWindow(index);
            }}
          >
            <Pin
              background={"#226E59"}
              glyphColor={"#fff"}
              borderColor={"#fff"}
              scale={1}
            >
              <div className="w-[2rem] h-[2rem] rounded-full p-2 bg-background relative">
                <Image
                  role="img"
                  width={20}
                  height={20}
                  src={require(`../../assets/images/routeyou-logo.svg`)}
                  alt={`Image for ${point.title} event`}
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
            </Pin>
          </AdvancedMarker>
          {infowindowShownIndex === index && (
            <InfoWindow
              position={{
                lat: parseInt(points[infowindowShownIndex].latitude),
                lng: parseInt(points[infowindowShownIndex].longitude),
              }}
              onCloseClick={() => {
                closeInfoWindow();
              }}
              ariaLabel={`Info window for ${point.title} event marker`}
            >
              <div className="flex flex-col gap-2 rounded">
                {point.image ? (
                  <div className="flex flex-col w-[11rem] h-[11rem] pl-[0.5rem] justify-center  items-center">
                    <div className="w-[10rem] aspect-square">
                      <Image
                        role="img"
                        width={100}
                        height={100}
                        quality={100}
                        src={point.image}
                        alt={`Image for ${point.title} event marker`}
                        className="w-[10rem] aspect-square object-cover rounded-[0.8rem]"
                      />
                    </div>
                  </div>
                ) : null}
              </div>
            </InfoWindow>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export default GoogleMaps;
