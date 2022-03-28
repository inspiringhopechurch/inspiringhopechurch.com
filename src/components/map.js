import React, { useEffect, useRef } from "react";
import * as PropTypes from "prop-types";
import mapboxgl from "mapbox-gl";
import { mapboxApiKey } from "../../config";
import "./map.sass";

const Map = ({ latitude, longitude }) => {
  const mapContainerRef = useRef(null);
  mapboxgl.accessToken = mapboxApiKey;

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      // See style options here: https://docs.mapbox.com/api/maps/#styles
      // style: 'mapbox://styles/mapbox/streets-v11',
      style: "mapbox://styles/mapbox/outdoors-v11",
      // style: 'mapbox://styles/illogic-al/cj5ehelyd1dor2rpnwckkhrz7',
      center: [latitude, longitude],
      minZoom: 10,
      maxZoom: 20,
      zoom: 17,
      scrollZoom: false,
    });

    // add navigation control (the +/- zoom buttons)
    map.addControl(new mapboxgl.NavigationControl(), "bottom-right");

    // clean up on unmount
    return () => map.remove();
  }, []);

  return <section ref={mapContainerRef} className="map-container" />;
};

Map.propTypes = {
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
};

export { Map };
export default Map;
