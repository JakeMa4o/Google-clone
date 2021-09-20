if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {

    const config = {
      endpoint: "https://maps.googleapis.com/maps/api/geocode/json?",
      key: config.API_KEY,
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }

    fetch(`${config.endpoint}key=${config.key}&latlng=${config.lat},${config.lng}`)
    .then(response => response.json())
    .then(data => {
      const region = document.querySelector(".region");
      const array = data.plus_code.compound_code;
      let location = array.split(" ");
      location = location.slice(-1);
      console.log(location);
      region.innerHTML = location.toString();
    });

  });
} else {
  console.log("Geolocation is not supported");
}
