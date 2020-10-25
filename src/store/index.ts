import L, { CircleMarker } from 'leaflet';
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    magLimit: 1,
    loading: false,
    chartloading: false,
    map!: {} as L.Map,
    isFilterOpen: true,
    isSidePanelOpen: false,
    charts: {
      active: false,
      data: {} as CircleMarker,
      axis: [] as any,
    },
    filters: {
      starttime: null,
      endtime: null,
      limit: '100',
      format: 'geojson',
    },
    realtime: false,
    earthquakes: new Array<CircleMarker>(),
  },
  mutations: {
    SET_LOADING(state, loadingStatus: boolean): void {
      state.loading = loadingStatus;
    },

    TOGGLE_SIDEPANEL(state, panelState: boolean): void {
      state.isSidePanelOpen = panelState;
    },

    TOGGLE_FILTER(state, panelState: boolean): void {
      state.isFilterOpen = panelState;
    },

    ADD_EARTHQUAKE(state, earthquake: CircleMarker): void {
      state.earthquakes.push(earthquake);
    },

    CREATE_FILTERS(state, filter: object): void {
      state.filters = {...state.filters, ...filter};
    },
  },

  // @TODO: generalize repetitive actions...
  actions: {
    setLoading(context, loading: boolean) {
      context.commit('SET_LOADING', loading);
    },

    toggleSidePanel(context, state: boolean) {
      context.commit('TOGGLE_SIDEPANEL', state);
    },

    toggleFilter(context, state: boolean) {
      context.commit('TOGGLE_FILTER', state);
    },

    addEarthquake(context, earthquake: CircleMarker) {
      context.commit('ADD_EARTHQUAKE', earthquake);
    },

    createFilters(context, filter: object) {
      context.commit('CREATE_FILTERS', filter);
    },
  },
  modules: {
  },
});
