export class Maps {
  constructor(coord) {
    this.render(coord);
  }

  render(coordinates) {
    if (!ol) {
      alert('couldnot load maps library. Please try later');
      return;
    }
    document.getElementById('map').innerHTML = '';
    const map = new ol.Map({
      target: 'map',
      layers: [
        new ol.layer.Tile({
          source: new ol.source.OSM()
        })
      ],
      view: new ol.View({
        center: ol.proj.fromLonLat([coordinates.long, coordinates.lat]),
        zoom: 16
      })
    });
  }
}