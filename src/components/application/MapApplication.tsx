import React, { MutableRefObject, useEffect, useRef } from "react";
import { Map, View } from "ol";
import TileLayer from "ol/layer/Tile";
import { OSM } from "ol/source";
import { useGeographic } from "ol/proj";
import "./Application.css";
import "ol/ol.css";

useGeographic();

const map = new Map({
  view: new View({ center: [11, 60], zoom: 10 }),

  layers: [new TileLayer({ source: new OSM() })],
});

export function MapApplication() {
  function handleFocusUser(e: React.MouseEvent) {
    e.preventDefault();
    navigator.geolocation.getCurrentPosition((pos) => {
      const { latitude, longitude } = pos.coords;
      map.getView().animate({
        center: [longitude, latitude],
        zoom: 10,
      });
    });
  }
  const mapRef = useRef() as MutableRefObject<HTMLDivElement>;

  useEffect(() => {
    map.setTarget(mapRef.current);
  }, []);

  return (
    <>
      <header>Test kart</header>
      <nav>
        <a href={"#"} onClick={handleFocusUser}>
          Focus on me
        </a>
      </nav>
      <div ref={mapRef}></div>
    </>
  );
}
