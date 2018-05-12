import React, { Fragment } from 'react';
import L from 'leaflet';
import { load, bandArithmetic } from 'geoblaze';
import GeoRasterLayer from 'georaster-layer-for-leaflet';
import  '../styles.scss';

const RASTER_URL = 'https://s3.amazonaws.com/geoblaze/color_infrared_dir_st_louis.tif';

export default class App extends React.Component {
  componentDidMount () {
    this.setupMap();
  }

  state = {
    map: null,
    raster: null,
  }

  async setupMap () {
    const map = L.map('map').setView([39, -90.2], 7);
    map.options.minZoom = 2;

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    this.setState({ map });

    const raster = await this.loadRaster();
    raster.addTo(this.state.map);
    this.setState({ raster });
  }

  async loadRaster () {
    const georaster = await load(RASTER_URL);
    return new GeoRasterLayer({ georaster, opacity: 0.7, resolution: 128 });
  }

  render () {
    return (
      <Fragment>
        <div id="map"></div>
        <section className="tool">
          <h3>Welcome to the Demo (Part 2)!</h3>
        </section>
      </Fragment>
    );
  }
};
