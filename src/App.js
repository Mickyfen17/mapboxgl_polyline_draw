import React, { Component } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';
import Credentials from './credentials';
import './App.css';

class App extends Component {
  componentDidMount() {
    mapboxgl.accessToken = Credentials.mapboxKey;
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: [-122.486052, 37.830348],
      zoom: 15,
    });

    map.on('draw.create', updateArea);
    map.on('draw.delete', updateArea);
    map.on('draw.update', updateArea);

    function updateArea(e) {
      console.log({ e });
      console.log({ draw });
      console.log(draw.getAll());
    }

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      styles: [
        {
          // default polyline style
          id: 'gl-draw-line-inactive',
          type: 'line',
          filter: [
            'all',
            ['==', 'active', 'false'],
            ['==', '$type', 'LineString'],
            ['!=', 'mode', 'static'],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#3bb2d0',
            'line-width': 4,
          },
        },
        {
          // polyine style when clicked/editable
          id: 'gl-draw-line-active',
          type: 'line',
          filter: [
            'all',
            ['==', '$type', 'LineString'],
            ['==', 'active', 'true'],
          ],
          layout: {
            'line-cap': 'round',
            'line-join': 'round',
          },
          paint: {
            'line-color': '#fbb03b',
            'line-dasharray': [0.2, 2],
            'line-width': 2.5,
          },
        },
        {
          // polyline point outer circle when not clicked
          id: 'gl-draw-polygon-and-line-vertex-stroke-inactive',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static'],
          ],
          paint: {
            'circle-radius': 5,
            'circle-color': '#fff',
          },
        },
        {
          // polyline point inner circle when not clicked
          id: 'gl-draw-polygon-and-line-vertex-inactive',
          type: 'circle',
          filter: [
            'all',
            ['==', 'meta', 'vertex'],
            ['==', '$type', 'Point'],
            ['!=', 'mode', 'static'],
          ],
          paint: {
            'circle-radius': 3,
            'circle-color': '#fbb03b',
          },
        },
        {
          // polyline draggable point outer circle when clicked
          id: 'gl-draw-point-stroke-active',
          type: 'circle',
          filter: [
            'all',
            ['==', '$type', 'Point'],
            ['==', 'active', 'true'],
            ['!=', 'meta', 'midpoint'],
          ],
          paint: {
            'circle-radius': 7,
            'circle-color': '#fff',
          },
        },
        {
          // polyline draggable point inner circle when clicked
          id: 'gl-draw-point-active',
          type: 'circle',
          filter: [
            'all',
            ['==', '$type', 'Point'],
            ['!=', 'meta', 'midpoint'],
            ['==', 'active', 'true'],
          ],
          paint: {
            'circle-radius': 5,
            'circle-color': '#fbb03b',
          },
        },
        {
          // clickable polyline mid-point
          id: 'gl-draw-polygon-midpoint',
          type: 'circle',
          filter: ['all', ['==', '$type', 'Point'], ['==', 'meta', 'midpoint']],
          paint: {
            'circle-radius': 3,
            'circle-color': '#fbb03b',
          },
        },
      ],
    });

    map.addControl(draw);

    function drawEditablePolyline() {
      const feature = {
        id: 'unique-id',
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'LineString',
          coordinates: [
            [-122.48369693756104, 37.83381888486939],
            [-122.48348236083984, 37.83317489144141],
            [-122.48339653015138, 37.83270036637107],
            [-122.48356819152832, 37.832056363179625],
            [-122.48404026031496, 37.83114119107971],
            [-122.48404026031496, 37.83049717427869],
            [-122.48348236083984, 37.829920943955045],
            [-122.48356819152832, 37.82954808664175],
            [-122.48507022857666, 37.82944639795659],
            [-122.48610019683838, 37.82880236636284],
            [-122.48695850372314, 37.82931081282506],
            [-122.48700141906738, 37.83080223556934],
            [-122.48751640319824, 37.83168351665737],
            [-122.48803138732912, 37.832158048267786],
            [-122.48888969421387, 37.83297152392784],
            [-122.48987674713133, 37.83263257682617],
            [-122.49043464660643, 37.832937629287755],
            [-122.49125003814696, 37.832429207817725],
            [-122.49163627624512, 37.832564787218985],
            [-122.49223709106445, 37.83337825839438],
            [-122.49378204345702, 37.83368330777276],
          ],
        },
      };
      const featureIds = draw.add(feature);
    }

    map.on('load', drawEditablePolyline);
  }

  render() {
    const style = {
      position: 'absolute',
      top: 0,
      bottom: 0,
      width: '100%',
    };
    return (
      <div className="App">
        <section
          id="map"
          style={style}
          ref={section => (this.mapContainer = section)}
        />
      </div>
    );
  }
}

export default App;
