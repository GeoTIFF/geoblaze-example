import React, { Fragment } from 'react';
import L from 'leaflet';
import { load, sum } from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import geoJSON from './ukraine.json';
import  '../styles.scss';

const RASTER_URL = 'https://s3.amazonaws.com/geoblaze/spam2005v2r0_production_wheat_rainfed.tiff';

export default class App extends React.Component {
  componentDidMount () {
    this.setupMap();
  }

  state = {
    map: null,
  }

  async setupMap () {
    const map = L.map('map').setView([0, 0], 2);
    map.options.minZoom = 2;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.setState({ map });

    const raster = await this.loadRaster();
    raster.addTo(this.state.map);
    this.setState({ georaster: raster.georaster });

    this.loadGeoJSON();
  }

  async loadRaster () {
    const georaster = await load(RASTER_URL);
    return new GeoRasterLayer({ georaster, opacity: 0.7, resolution: Math.pow(2, 6) });
  }

  loadGeoJSON () {
    L.geoJSON(geoJSON).addTo(this.state.map);
  }

  calculateSum () {
    const result = sum(this.state.georaster, geoJSON);
  }

  render () {
    return (
      <Fragment>
        <div id="map"></div>
        <section className="tool">
          <h3>Welcome to the Demo!</h3>
          <button onClick={() => this.calculateSum()}>Calculate Sum</button>
        </section>
      </Fragment>
    );
  }
};
