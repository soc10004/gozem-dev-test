const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 3000
  },
  getDistanceUrl:({start,end,units})=>{
     return `https://maps.googleapis.com/maps/api/distancematrix/json?units=${units}&origins=${start.lat},${start.lng}&destinations=${end.lat},${end.lng}&key=${process.env.API_KEY}`
  },
  getOriginTimeZoneUrl:({location,timeStamp})=>{
    return `https://maps.googleapis.com/maps/api/timezone/json?location=${location?.lat},${location?.lng}&timestamp=${timeStamp}&key=${process.env.API_KEY}`;
  },
  getDestTimeZone2Url:({location,timeStamp})=>{
    return `https://maps.googleapis.com/maps/api/timezone/json?location=${location?.lat},${location?.lng}&timestamp=${timeStamp}&key=${process.env.API_KEY}`;
  },
  homeInstructions:{
    message: "Welcome to gozem-dev-test API!",
    guide:
      "Lire le ReadMe.md pour plus d'info, la requete post doit etre envoyee au format JSON",

    url: "<baseurl| localhost:3000 >/api/get_distance_and_time",
    type: "POST",
    format_de_la_requete: {
      start: {
        lat: "latitude",
        lng: "longitude",
      },
      end: {
        lat: "latitude",
        lng: "longitude",
      },
      units: "metric",
    },
  }
}

module.exports = config;
