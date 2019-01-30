const readMultipleFiles = require('read-multiple-files');
 
readMultipleFiles(new Set([
  'C:/Users/wluo23/Documents/Mapbox/data/Five_Countries.geojson',    // 'a'
  'C:/Users/wluo23/Documents/Mapbox/data/Brazil_GDT.geojson' // 'b'
])).subscribe({
  next(result) {
    if (result.path === 'C:/Users/wluo23/Documents/Mapbox/data/Five_Countries.geojson') {
      result.contents; // Buffer.from('a')
    } else if (result.path === 'C:/Users/wluo23/Documents/Mapbox/data/Brazil_GDT.geojson') {
      result.contents; // Buffer.from('b')
    }
  },
  complete() {
    console.log('Successfully read all files.');
  }
});



/*var content;

//console.info("Program Start")

//var d3 = require('d3');
var fs = require('fs');*/

/*fs.readFile('C:/Users/wluo23/Documents/Mapbox/data/Five_Countries.geojson', function read(err, data) {
    if (err) {
        throw err;
    }
    content = data;

    // Invoke the next step here however you like
    console.log(content);   // Put all of the code here (not the best solution)
    //processFile();          // Or put the next step in a function and invoke it
});*/

/*fs.readFile('C:/Users/wluo23/Documents/Mapbox/data/Five_Countries.geojson', 'utf8', function (err, data) {
  if (err) throw err;
  content = JSON.parse(data);
  console.log(content);
});*/

/*Promise.all([
  d3.json("/data/Five_Countries.geojson"),
  d3.json("/data/Brazil_GDT.json")
]).then(function(data) {
  
  geofeature = data[0];
  timeseries = data[1];
  
  //console.info("Program Middle");
  console.log("geo",data);
  console.log("time",Object.keys(timeseries)[0]);

  if(geofeature.features[0].properties.CNTRY_NAME===Object.keys(timeseries)[0])
  {
  	Object.assign(geofeature.features[0].properties, timeseries.Brazil);
  	console.log(geofeature.features[0].properties.GDT.Time);
  }

/*var blob = new Blob([JSON.stringify(geofeature)], {type: "text/plain;charset=utf-8"});  
saveAs(blob, "sample.geojson");*/

//});*/


