# Steps
---
1. `npm install geoblaze georaster-layer-for-leaflet`

2. `import { load } from 'geoblaze';`

3. `import GeoRasterLayer from 'georaster-layer-for-leaflet';`

4. Add new method `loadRaster` and call in `setupMap`
```javascript
  setupMap () {
    ...

    this.loadRaster();
  }

  loadRaster () {
    load(RASTER_URL).then(georaster => {
      const raster = new GeoRasterLayer({ georaster, opacity: 0.7 });
    });
  }
```

5. We want to add the raster to the map, but don't want to do it in `loadRaster`, so let's move to `async/await` syntax
```javascript
  async setupMap () {
    ...

    const raster = await this.loadRaster();
  }

  async loadRaster () {
    const georaster = await load(RASTER_URL);
    return new GeoRasterLayer({ georaster, opacity: 0.7, resolution: Math.pow(2, 6) });
  }
```

resolution: how many pixels are in each tile (tiles generated dynamically out of our control)

6. Add raster to map
```javascript
  async setupMap () {
    ...

    const raster = await this.loadRaster();
    raster.addTo(this.state.map);
    this.setState({ raster });
  }
```

7.
