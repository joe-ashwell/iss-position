const endpointPeopleInSpace = 'http://api.open-notify.org/astros.json';
const endpointISSPosition = 'http://api.open-notify.org/iss-now.json';
const endpointEarthMeteoriteLanding = 'https://data.nasa.gov/resource/y77d-th95.json';

const ISSPosition = [];

function fetchEndpoint() {
  fetch(endpointISSPosition)
  .then(blob => blob.json())
  .then(data => ISSPosition.push(data));

  console.log(ISSPosition);

}


setTimeout(function getMapCoordinates() {
  let long = parseFloat(ISSPosition[0].iss_position.longitude);
  let lat = parseFloat(ISSPosition[0].iss_position.latitude);
  
  const endpointMapbox = `https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/${long},${lat},5,0/1280x1280@2x?access_token=pk.eyJ1Ijoiam9lYXNod2VsbCIsImEiOiJja2gxdzBkN2MwOHdtMnVsc2t5MG1jOGJ2In0.LG1Bdwg4-nRKZ0gOic6BPw`;
  
  const mapboxImage = document.querySelector('img.map-iframe');
  
  mapboxImage.src = endpointMapbox;
}, 1000)

window.addEventListener('load', fetchEndpoint);
