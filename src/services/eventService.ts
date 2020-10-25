// @ts-ignore
import querystring from 'querystring';
import axios from 'axios';
import L from 'leaflet';
// @ts-ignore
import RT from 'leaflet-realtime';
import store from '../store/index';


/**
 * @API_BASE      - API endpoint for earthquake data.
 * @CUSTOM_ICON   - Custom pin to locate eartquakes on the map view.
 */

const SUMMARY: string = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojsonp';
const API_BASE: string = 'https://earthquake.usgs.gov/fdsnws/event/1/query?';
const CUSTOM_ICON = {
  fillOpacity: 0.20,
  radius: 3,
};

class EventService {
  public markers = new L.LayerGroup();
  constructor() {
    // register 'eqfeed_callback' method to be able to handle API call
    this.registerFunction('eqfeed_callback', (results: any) => results);
  }

  /**
   * @registerFunction
   * @PARAM name      - name of the function will be registered.
   * @PARAM callback  - method implementation will be registered.
   * @OUTPUT          - register method into 'window' object.
   */
  public registerFunction(name: string, callback: any) {
    (window as any)[name] = callback;
  }

  public setFilterParamsToURL = (filters: object) => {
    const q = querystring.stringify(filters);
    const newQuery: URLSearchParams = new URLSearchParams(q);
    return API_BASE + newQuery;
  }

  public dateFormatted = (date: Date) => new Date(
    date.getTime() - (date.getTimezoneOffset() * 60000 ))
        .toISOString()
        .split('T')[0]


  public handleFilters = (filters: object) => {
    const end = new Date(Date.now());
    // @ts-ignore
    filters.endtime = store.state.filters.endtime || this.dateFormatted(end);
    const start = new Date(end.setDate(end.getDate() - 3));
    // @ts-ignore
    filters.starttime = store.state.filters.starttime || this.dateFormatted(start);
    store.dispatch('createFilters', filters);
    return this.setFilterParamsToURL(store.state.filters);
  }

  /**
   * @earthquakeInformationService
   * @PARAM map   - Map object initialized onLoad.
   * @PARAM L     - Leaflet layer object for map options holder.
   * @RESPONSE    - Returns a callback function eqfeed_callback.
   */
  public getEarthquakeInformation =
    async (
      map: L.Map,
      filters = {},
      url: string = API_BASE,
    ) => {
      try {
        // get filters applied over ui
        url = this.handleFilters(filters);

        // clear markers from the map and store
        this.markers.clearLayers();
        store.state.earthquakes = [];
        store.dispatch('setLoading', true);

        // if any filter added pass it throught the url

        // request data from api
        const response = axios.get(url);
        await response
          .then((res) => {
            if (store.state.realtime) {
              return Function(`return ${res.data}`)();
            }
            return res.data;
          })
          .then((res) => {
            const icon = CUSTOM_ICON;
            for (const location of res.features) {
              const inDangerZone = location.properties.mag > 5.0;
              const setColorDangerLevel = this.getColor(location.properties.mag || 0);
              const [lng, lat, depth] = location.geometry.coordinates;

              // Create custom maerker
              const marker = L.circleMarker(
                [lat, lng],
                {
                  ...icon,
                  // @ts-ignore
                  latlng: [lat, lng],
                  className: inDangerZone ? 'ripple' : '',
                  fillColor: setColorDangerLevel,
                  color: setColorDangerLevel,
                  radius: icon.radius * Math.log(location.properties.sig) + location.properties.mag,
                  place: location.properties.place,
                  mag: location.properties.mag,
                  time: location.properties.time,
                  sig: location.properties.sig,
                  url: location.properties.url,
                  depth,
                },
              ).on('click', (e: any) => {
                map.flyTo(e.latlng, 5);
              }).bindPopup(
                (e) => this.popupContent(e),
                {autoClose: true, closeOnClick: true},
              );

              // pass marker into map
              this.markers.addLayer(marker);
              store.dispatch('addEarthquake', marker);
            }
          });
        map.addLayer(this.markers);
        store.dispatch('setLoading', false);
      } catch (error) {
        console.error('OOOPS!, Something went wrong: ', error);
      }
  }


  /**
   * @popUpContent
   * @PARAM marker    - current CircleMarker Object
   * @OUTPUT          - HTML content for Popup
   */
  public popupContent = (marker: any) => (
    `
    <div class="hq-popup">
      <h3>${marker.options.place.toUpperCase()}</h3>
      <label>${new Date(marker.options.time)}</label>
      <p class="hq-popup-item">
        <i class="sort amount down icon"></i>
        <strong>Depth:</strong>
        ${marker.options.depth}
      </p>
      <p class="hq-popup-item">
        <i class="bullseye icon"></i>
        <strong>Magnitude:</strong>
        ${marker.options.mag}
      </p>
      <p class="hq-popup-item">
        <i class="globe icon"></i>
        <strong>latitude:</strong> ${marker.options.latlng[1]}
      </p>
      <p class="hq-popup-item">
        <i class="globe icon"></i>
        <strong>Longitude:</strong> ${marker.options.latlng[0]}
      </p>
    </div>
    `
  )


  public getColor = (datum: number) => {
    return(
      datum > 8.0 ? '#F24236' :
      datum > 7.0 ? '#FF9400' :
      datum > 6.0 ? '#5226e3' :
      datum > 5.0 ? '#C000FF' :
      datum > 4.0 ? '#875fda' :
      '#0EE085'
    );
  }


  public getRealTime(map: L.Map) {
    const realtime = new RT({
      url: SUMMARY,
      crossOrigin: true,
      type: 'geojson',
    }, {
      interval: 600000,
    }).addTo(map);

    realtime.on('update', (e: any) => {
      console.log(e.target);
      map.flyTo(realtime.getBounds(), 8);
      map.invalidateSize(true);
    });
  }
}

export default new EventService();

