import React, { useEffect, useRef } from "react";
import mapboxgl from "!mapbox-gl";
import { mapboxApiKey, title } from "../../config";
import "./map.sass";

const Map = ({ latitude, longitude }: MapProps) => {
  const mapContainerRef = useRef<HTMLElement>(null);
  mapboxgl.accessToken = mapboxApiKey;

  useEffect(() => {
    let options = { root: document.querySelector("main"), };
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting === true) {
          map.easeTo({ bearing: 40, duration: 5000, pitch: 0, zoom: 17 })
        }
      });
    }, options);
    mapContainerRef.current && observer.observe(mapContainerRef.current);

    const coordinates = [longitude, latitude];
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: "mapbox://styles/mapbox/outdoors-v11",
      // style: 'mapbox://styles/illogic-al/cj5ehelyd1dor2rpnwckkhrz7',
      center: coordinates,
      minZoom: 13,
      maxZoom: 19,
      scrollZoom: false,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");
    const popup = new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
      offset: 30,
    }).setHTML(`<h1>${title}</h1>`);

    const marker = new mapboxgl.Marker({
      color: "#221f53",
    })
      .setLngLat(coordinates)
      .setPopup(popup)
      .addTo(map);
    marker.togglePopup();

    // cleanup
    return () => {
      map.remove();
      observer.disconnect();
    };
  }, [longitude, latitude]);

  return <section ref={mapContainerRef} className="map-container" />;
};

type MapProps = {
  latitude: number,
  longitude: number,
};

export { Map };
export default Map;
