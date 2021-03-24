var map = L.map('main_map').setView([-32.9271914,-68.7941551],15);

	var greenIcon = L.icon({
    iconUrl: '../images/icon_prueba.png',
    shadowUrl: 'leaf-shadow.png',

    iconSize:     [38, 50], // size of the icon
    shadowSize:   [50, 64], // size of the shadow
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    shadowAnchor: [4, 62],  // the same for the shadow
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
	attribution: '&copy; <a href="https://wwww.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

function AddMarker(latitud, longitud){

    L.marker([latitud, longitud]).addTo(map).bindPopup(
        '<p>Latitud :'+latitud+ '<br> Longitud: '+longitud
        );
    console.log("entre");
}

var marker, oldMarker;
function onMapClick(e) {
    var latitud = document.querySelector("#latitud");
    var longitud = document.querySelector("#longitud");

    if(oldMarker)
        map.removeLayer(oldMarker);

    marker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map).bindPopup(
                '<p>You clicked the map at' + e.latlng +'</p>'
                );
    latitud.value = e.latlng.lat;
    longitud.value = e.latlng.lng;

    oldMarker = marker;
}

map.on('click', onMapClick);