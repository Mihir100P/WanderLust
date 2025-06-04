 mapboxgl.accessToken = maptoken;

        // console.log(mapboxgl.accessToken);
        const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/streets-v9',
        // projection: 'globe', // Display the map as a globe, since satellite-v9 defaults to Mercator
        zoom: 9,
        center: coordinates     //[lng,lat]
    });

    // console.log(coordinates);

const marker = new mapboxgl.Marker({ color: "red" })
  .setLngLat(coordinates)
  .setPopup(new mapboxgl.Popup({ offset: 25, className: "my-class" })
  .setHTML("<h3>Your location is here</h3>")) 
  .addTo(map);
