
var geofeature;

Promise.all([
  d3.json("/data/Five_Countries.json"),
  d3.csv("/data/GDT_Brazil_cleaned.csv"),
  d3.csv("/data/GDT_Mexico_cleaned.csv"),
  d3.csv("/data/GDT_Singapore_cleaned.csv"),
  d3.csv("/data/GDT_Thailand_cleaned.csv"),
]).then(function(data) {
  
  geofeature = data[0];

  var i;
  for (i = 0; i < geofeature.features.length; i++) { 
     	geofeature.features[i].properties.GDT = {};
  		geofeature.features[i].properties.GDT.Time=[];
  		geofeature.features[i].properties.GDT.Value=[];
		}

  for (i = 1; i<geofeature.features.length;i++){
  		data[i].forEach(function(element){
  		geofeature.features[i-1].properties.GDT.Time.push(element.Date);
  		geofeature.features[i-1].properties.GDT.Value.push(element.Value);
  		  	});
  }		
	
  //console.log("1:", geofeature);	

  Promise.all([
  d3.csv("/data/Counts_Brazil_cleaned.csv"),
  d3.csv("/data/Counts_Mexico_cleaned.csv"),
  d3.csv("/data/Counts_Singapore_cleaned.csv"),
  d3.csv("/data/Counts_Thailand_cleaned.csv"),
  d3.csv("/data/Counts_Taiwan_cleaned.csv"),
]).then(function(data) {
  
    var i;	
    //console.log("2:",geofeature);
    for (i = 0; i < geofeature.features.length; i++) { 
     	geofeature.features[i].properties.CASES = {};
  		geofeature.features[i].properties.CASES.Time=[];
  		geofeature.features[i].properties.CASES.Value=[];
		}

	  for (i = 0; i<geofeature.features.length;i++){
  		data[i].forEach(function(element){
  		geofeature.features[i].properties.CASES.Time.push(element.Date);
  		geofeature.features[i].properties.CASES.Value.push(element.Value);
  		 });
  }		


/*  timeseries.forEach(function(element) {
  geofeature.features[0].properties.GDT.Time.push(element.Date);
  geofeature.features[0].properties.GDT.Value.push(element.Brazil);

});*/

/*  if(geofeature.features[0].properties.CNTRY_NAME===Object.keys(timeseries)[0])
  {
  	Object.assign(geofeature.features[0].properties, timeseries.Brazil);
  	console.log(geofeature.features[0].properties.GDT.Time);
  }*/

var blob = new Blob([JSON.stringify(geofeature)], {type: "text/plain;charset=utf-8"});  
saveAs(blob, "dengue.geojson");

});

/*  if(geofeature.features[0].properties.CNTRY_NAME===Object.keys(timeseries)[0])
  {
  	Object.assign(geofeature.features[0].properties, timeseries.Brazil);
  	console.log(geofeature.features[0].properties.GDT.Time);
  }*/

/*var blob = new Blob([JSON.stringify(geofeature)], {type: "text/plain;charset=utf-8"});  
saveAs(blob, "sample.geojson");*/

});






