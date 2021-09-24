if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {

    const settings = {
      endpoint: "https://maps.googleapis.com/maps/api/geocode/json?",
      key: "AIzaSyAyOvW6_3wdcnaIFDdYGP6T8iISJc72Npw",
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }

    fetch(`${settings.endpoint}key=${settings.key}&latlng=${settings.lat},${settings.lng}`)
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
