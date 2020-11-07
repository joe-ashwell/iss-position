const endpointPeopleInSpace = 'http://api.open-notify.org/astros.json';
const endpointISSPosition = 'http://api.open-notify.org/iss-now.json';
const mapboxImage = document.querySelector('img.map');

const ISSPosition = [];
const peopleInSpace = [];

setInterval(function fetchLocationEndPoint() {

  fetch(endpointISSPosition)
    .then(blob => blob.json())
    .then(data => {
      ISSPosition.push(data)
      return ISSPosition
    })
    .then(getMapCoordinates)

}, 1000);

(function fetchPeopleInfo() {

  fetch(endpointPeopleInSpace)
    .then(blob => blob.json())
    .then(data => {
      peopleInSpace.push(data)
      return peopleInSpace
    })
    .then(displayPeople)

})();

function getMapCoordinates() {

  let long = parseFloat(ISSPosition[ISSPosition.length - 1].iss_position.longitude);
  let lat = parseFloat(ISSPosition[ISSPosition.length - 1].iss_position.latitude);
  
  const endpointMapbox = `https://api.mapbox.com/styles/v1/mapbox/light-v10/static/${long},${lat},3,0/1280x600@2x?access_token=pk.eyJ1Ijoiam9lYXNod2VsbCIsImEiOiJja2gxdzBkN2MwOHdtMnVsc2t5MG1jOGJ2In0.LG1Bdwg4-nRKZ0gOic6BPw`;
  
  mapboxImage.src = endpointMapbox;

}

function displayPeople() {

  const h2 = document.querySelector('h2.iss-text-content');
  const p = document.querySelector('p.iss-text-content');
  let whatToCall;
  const peopleList = [];

  peopleInSpace[0].people.forEach(person => {
    peopleList.push(person.name);
  })

  if(parseInt(peopleInSpace[0].number) === 1) {
    whatToCall = 'person';
  } else {
    whatToCall = 'people';
  }

  p.innerHTML = `There are currently ${peopleInSpace[0].number} ${whatToCall} in space. <span>(That we know of...👀)</span>. Onboard the ISS is; ${peopleList.join(', ')}. Displayed below is their relative position to the earth (updated every second). The International Space Station orbits the Earth at a height of 400km and a speed of roughly 28,800 km per hour (that's about 8 km per second). This means that the Space Station orbits Earth once every 92 minutes!`

}

// Firstly, got stuck due to bad syntax on my end (using 'getMapCoordinates()' in the promise)
// Secondly, forgot I had defined the long and lat as ISSPosition[0], so even though it was updating the array, it wasn't updated the screen.