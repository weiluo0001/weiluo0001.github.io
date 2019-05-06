 mapboxgl.accessToken = 'pk.eyJ1Ijoid2VpbHVvMDAwMSIsImEiOiJjajhhcDQxcG0wajdjMzFwN29qYXRjbjRsIn0.Rv7Nbd2mqfGUc4gFds6BtQ';
    var map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/mapbox/dark-v10',
      center: [10.0339, 30],
      zoom: 1.5
    });


    map.on('load', function() {

    map.addSource('dengue_city', {
    type: 'geojson',
    data: 'https://weiluo0001.github.io./dengue_cities.geojson' 
    });

     map.addLayer ({
      id: 'dengue_point',
      type: 'symbol',
      source: 'dengue_city',
      layout: {
        'icon-ignore-placement' : true,
        'icon-image': 'pharmacy-15',
        'icon-size' : 1.5
      },
      })

      map.on('click', 'dengue_point', function (e) {

      var features = e.features;
      
      // data processing for different years over one location
      var epi_week = JSON.parse(features[0].properties.CASES).Week;
      var epi_date = JSON.parse(features[0].properties.CASES).Date;
      var epi_year = JSON.parse(features[0].properties.CASES).Year;
      var epi_cases = JSON.parse(features[0].properties.CASES).Num;


      var multiple_years = [];

      var dates = [];
      var weeks = [];
      var values = [];
      var years = [];


      for (let i=0; i<epi_week.length;i++){

        if(i==0){
          dates.push(epi_date[i]);
          values.push(epi_cases[i]);
          weeks.push(epi_week[i]);
          years.push(epi_year[i]);
        }

        else{

          if(years[0] == epi_year[i]){
            dates.push(epi_date[i]);
            values.push(epi_cases[i]);
            weeks.push(epi_week[i]);
            years.push(epi_year[i]);
          }
          else{

          var data_oneyear = 
            {
              x: weeks,
              y: values,
              type: 'scatter',
              name: years[0]
            };
            multiple_years.push(data_oneyear);      
            dates = [];
            weeks = [];
            values = [];
            years = [];
            data_oneyear ={};
            dates.push(epi_date[i]);
            values.push(epi_cases[i]);
            weeks.push(epi_week[i]);
            years.push(epi_year[i]);
          }
        }
      }

       var layout_accumulated = {
                title: "Temporal Accumulation",
                font: {color: '#5072a8'},
                margin: {t: 30, b: 50, l: 30, r: 10},
                plot_bgcolor: '#000000',
                paper_bgcolor:'#000000',
      };

      // data one time series line for one year
      var one_place = 
           {
              x: epi_date,
              y: epi_cases,
              type: 'scatter',
              name: 'infections'
            }
            ;



      //console.log(math.median(epi_cases));
      var epi_threshold_array = new Array(epi_cases.length);

      if (epi_cases === undefined || epi_cases.length == 0) {
          epi_cases = 0;
}
      console.log(epi_cases);
      var y_value = epi_threshold_array.fill(math.median(epi_cases)*1.5);
      var epi_threshold = 
           {
              x: epi_date,
              y: y_value,
               mode: 'lines',
               name: 'epidemic threshold',
               line: {
                  dash: 'dashdot',
                  width: 4
                }
              
            };


      var timeseries_left = [one_place,epi_threshold];

      var layout = {
              title: "Dengue Infections in " + features[0].properties.city,
              font: {color: '#5072a8'},
              margin: {t: 30, b: 50, l: 30, r: 10},
              plot_bgcolor: '#000000',
              paper_bgcolor:'#000000',
      };      

      Plotly.newPlot('timeseries', timeseries_left, layout);
      Plotly.newPlot('timeseries_accumulated', multiple_years, layout_accumulated);


      })

      map.on('mouseenter', 'dengue_point', function () {
      map.getCanvas().style.cursor = 'pointer';
      });
       
      // Change it back to a pointer when it leaves.
      map.on('mouseleave', 'dengue_point', function () {
      map.getCanvas().style.cursor = '';
      });
});





