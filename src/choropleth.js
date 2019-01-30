// define access token
mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpbHVvMDAwMSIsImEiOiJjajhhcDQxcG0wajdjMzFwN29qYXRjbjRsIn0.Rv7Nbd2mqfGUc4gFds6BtQ';

//create map
var map = new mapboxgl.Map({
    container: 'map', // container id
    style: 'mapbox://styles/weiluo0001/cjq8w52wwaxu42rs0g09jn964', 
    center: [-51.9253, -14.2350],
    zoom: 2// map style URL from Mapbox Studio
});

// wait for map to load before adjusting it
map.on('load', function() {

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    // set map bounds to the continental US
    //map.fitBounds([[-133.2421875, 16.972741], [-47.63671875, 52.696361]]);

    // make a pointer cursor
    map.getCanvas().style.cursor = 'default';

    // define layer names
    var layers = ['200,000', '400,000', '600,000', '800,000', '800,000+'];
    var colors = ['#ffffb2', '#fecc5c', '#fd8d3c', '#f03b20', '#bd0026'];

    // create legend
    for (i=0; i<layers.length; i++) {
        var layer = layers[i];
        var color = colors[i];
        var item = document.createElement('div');
        var key = document.createElement('span');
        key.className = 'legend-key';
        key.style.backgroundColor = color;

        var value = document.createElement('span');
        value.innerHTML = layer;
        item.appendChild(key);
        item.appendChild(value);
        legend.appendChild(item);
    }

    // change info window on hover
    map.on('mousemove', function (e) {


        var data = [
          {
            x: ['2013-10-04 22:23:00', '2013-11-04 22:23:00', '2013-12-04 22:23:00'],
            y: [1, 3, 6],
            type: 'scatter'
          }
        ];

        Plotly.newPlot('timeseries', data, {}, {showSendToCloud: true});

        var states = map.queryRenderedFeatures(e.point, {
            layers: ['urban_dengue_top10countries']
        });

        if (states.length > 0) {
            document.getElementById('pd').innerHTML = "<h3><strong>" + states[0].properties.name_conve + "</strong></h3><p><strong><em>" + states[0].properties.max_pop_al + "</strong> total people</em></p>";
        } else {
            document.getElementById('pd').innerHTML = '<p>Hover over a state!</p>';
        }
    });

});
