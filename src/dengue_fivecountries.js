	mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpbHVvMDAwMSIsImEiOiJjajhhcDQxcG0wajdjMzFwN29qYXRjbjRsIn0.Rv7Nbd2mqfGUc4gFds6BtQ';

    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v9',
      center: [-51.9253, -14.2350],
      zoom: 2
    });

	 map.on('load', function() {

	  map.addSource('dengue', {
	    type: 'geojson',
	    data: 'https://weiluo0001.github.io./dengue_fivecountries.geojson'
	  });
	  
	  map.addLayer ({
      id: 'dengue',
      type: 'fill',
      source: 'dengue',
      maxzoom: 15,
      paint:{
      "fill-color": "#00ffff"
      }})

    // change info window on hover
	map.on('mousemove', function (e) {

	var features = map.queryRenderedFeatures(e.point,{
		layers:['dengue']
	});

	
    if(features[0]	== null){
    	console.log('No Such Value');
    }

    else{
        
     	var names=["GDT","CASES"];

		function makeTrace(i) {
		    return {
		        x:JSON.parse(features[0].properties[names[i]]).Time,
     		    y:JSON.parse(features[0].properties[names[i]]).Value,
     		    type:'scatter',
     		    //color:'red',
		        visible: i === 0,
		        name: names[i],
		    };
		}

		var updatemenus= [{
	        x: 0.1,
        	xanchor: 'left',
        	y: 1.1,
        	yanchor: 'top',
	        font: {color: '#5072a8'},
	        buttons: [{
	            method: 'restyle',
	            args: ['visible', [true, false]],
	            label: names[0]
	        }, {
	            method: 'restyle',
	            args: ['visible', [false, true]],
	            label: names[1]
	        }]
	    	}]

		var layout = {
		  title: features[0].properties.CNTRY_NAME,
		  font: {color: '#5072a8'},
		  margin: {t: 30, b: 50, l: 100, r: 10},
		  plot_bgcolor: '#000000',
		  paper_bgcolor:'#000000',
		  updatemenus: updatemenus
		}; 
		Plotly.newPlot('timeseries', [0, 1].map(makeTrace), layout);
    }
	});
	});   