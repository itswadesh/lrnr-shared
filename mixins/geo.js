export default {
  data() {
    return {
      errorStr: "",
      gettingLocation: false,
      geo: null,
      location: { latitude: "", longitude: "" }
    };
  },
  methods: {
    async getLocation() {
      return new Promise((resolve, reject) => {
        if (!("geolocation" in navigator)) {
          reject(new Error("Geolocation is not available."));
        }

        navigator.geolocation.getCurrentPosition(
          pos => {
            resolve(pos);
          },
          err => {
            reject(err);
          }
        );
      });
    },
    showInMap(pos) {
      var latlon = pos.coords.latitude + "," + pos.coords.longitude;
      var img_url =
        "https://maps.googleapis.com/maps/api/staticmap?center=" +
        latlon +
        "&zoom=14&size=400x300&sensor=false&key=YOUR_:KEY";
      var map = document.querySelector("mapholder");
      map.innerHTML = "<img src='" + img_url + "'>";
    }
  }
};
