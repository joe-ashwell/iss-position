// const endpointPeopleInSpace = 'http://api.open-notify.org/astros.json';
// const endpointEarthMeteoriteLanding = 'https://data.nasa.gov/resource/y77d-th95.json';

const endpointISSPosition = 'http://api.open-notify.org/iss-now.json';
const mapboxImage = document.querySelector('img.map');
const ISSPosition = [];

function fetchEndPoint() {

  fetch(endpointISSPosition)
    .then(blob => blob.json())
    .then(data => {
      ISSPosition.push(data)
      return ISSPosition
    })
    .then(getMapCoordinates)

};

function getMapCoordinates() {

  let long = parseFloat(ISSPosition[0].iss_position.longitude);
  let lat = parseFloat(ISSPosition[0].iss_position.latitude);
  
  const endpointMapbox = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${long},${lat},3,0/1280x600@2x?access_token=pk.eyJ1Ijoiam9lYXNod2VsbCIsImEiOiJja2gxdzBkN2MwOHdtMnVsc2t5MG1jOGJ2In0.LG1Bdwg4-nRKZ0gOic6BPw`;
  
  mapboxImage.src = endpointMapbox;

}

// window.addEventListener('load', fetchEndPoint);
setInterval(fetchEndPoint, 1000);