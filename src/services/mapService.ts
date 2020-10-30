import L, { LatLng } from 'leaflet';

/**
 * ================
 * OPTIONS
 * ================
 *
 * @option URL: Use the url below for layouts.
 *    DARK:  https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png
 *    LIGHT: https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png
 *
 * @option icon: To add custom icon add the following to return object.
 *    icon: L.icon({
 *      iconUrl: require("@/assets/pin.svg"),
 *      iconSize: [32, 37],
 *      iconAnchor: [16, 37],
 *    }),
 */
export const ATTRIBUTION: string = '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
export const MAP_OPTIONS: object = { zoomSnap: 0.5, zoomControl: false, attribution: ATTRIBUTION};
export const TILE_OPTIONS: object = { minZoom: 2, maxZoom: 10, zoomOffset: 0 };
export const URL: string = 'https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png';
export const ZOOM: number = 2.0;
export const CENTER: LatLng = L.latLng(0, 0);

// Set boudaries to prevent panning out of borders
export const southWest = L.latLng(-89.98155760646617, -180);
export const northEast = L.latLng(89.99346179538875, 180);
export const BOUNDS = L.latLngBounds(southWest, northEast);


/**
 * ================
 * Create Map
 * ================
 *
 * @param containerId::string - Id of an HTMLElement to bind the map
 * @param leaf::LeafletObject - map and layer initialization
 *
 */
export default function createMap(containerId: string, leaf: any) {
  /**
   * define boundaries to prevent the map to be dragged out
   * of the drawing area's borders.
   *    panInsideBounds(bounds, {...}) will do the trick!
   */
  const map = leaf.map(containerId, MAP_OPTIONS).setView(CENTER, ZOOM);
  map.attributionControl.addAttribution(ATTRIBUTION);
  // map.setMaxBounds(BOUNDS);

  // Add tileLayer
  const tileLayer = leaf.tileLayer(URL, TILE_OPTIONS);
  tileLayer.addTo(map);

  /**
   * Events:
   * @drag - mapObject.panInsideBounds
   *    @param bounds: Leaflet<latLngBound>{} => map canvas borders prevent the map panned over the boundaries
   *    @param option: options on hitting borders
   */
  map.on('drag', () => {
    map.panInsideBounds(BOUNDS, { animate: false });
  });

  return map;
}
