/* =====================
  Map Setup
===================== */
// Notice that we've been using an options object since week 1 without realizing it
var mapOpts = {
  center: [0, 0],
  zoom: 2
};
var map = L.map('map', mapOpts);

// Another options object
var tileOpts = {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
};
var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', tileOpts).addTo(map);

var data;
var markers;
var pathOpts;

// var myStylerack = function(features) {
//   if (features.properties.racks == 0) {color = "#ece58b"}
//   else if (features.properties.racks == 1) {color = "#e0cd78"}
//   else if (features.properties.racks == 2) {color = "#d4b666"}
//   else if (features.properties.racks == 3) {color = "#c69f56"}
//   else if (features.properties.racks == 4) {color = "#b88948"}
//   else if (features.properties.racks == 5) {color = "#a9733b"}
//   else if (features.properties.racks == 6) {color = "#995e2f"}
//   else if (features.properties.racks == 7) {color = "#884925"}
//   else if (features.properties.racks == 8) {color = "#77351c"}
//   else if (features.properties.racks == 9) {color = "#652213"}
//   else if (features.properties.racks >= 10) {color = "#530c09"}
//   else {color =  "white"}
// };

var myStyleyearinstall = function(feature) {
  var yr_num = Number(feature.properties.install_yr)
  if (yr_num == 2020) {return "#a50026"}
  else if (yr_num == 2019) {return "#d73027"}
  else if (yr_num == 2018) {return "#f46d43"}
  else if (yr_num == 2017) {return "#fdae61"}
  else if (yr_num == 2016) {return "#fee090"}
  else if (yr_num == 2015) {return "#ffffbf"}
  else if (yr_num == 2014) {return "#77823a"}
  else if (yr_num == 2013) {return "#e0f3f8"}
  else if (yr_num == 2012) {return "#abd9e9"}
  else if (yr_num == 2011) {return "#74add1"}
  else if (yr_num == 2010) {return "#4575b4"}
  else if (yr_num <2010 && yr_num >= 2005) {return "#313695"}
  else if (yr_num <2005) {return "#000000"}
  else {return "#808080"}
};


var page1 = {
  title: "1 Bike Parking Overview in San Francisco",
  content: "The current parking space for bikes clusters in the northeastern SF where businesses and shops are. In general there are fewer bike parking places in residential areas, but some neighborhoods have more parking space than others.",
  bbox: [[37.68708070686609, -122.53051757812499], [37.82090404811055, -122.32349395751952]]
}

var page2 = {
  title: "2 Downtown and Chinatown",
  content: "let's zoom in to see the installation year and racks in the downtown and Chinatown area. Most of the parking with the most racks were built before 2015. Not all of them distribute along roadways or intersections, a bunch of them located inside blocks.",
  bbox: [[37.77641361883315, -122.431640625], [37.80218877920469, -122.3832321166992]]
}

var page3 = {
  title: "3 Mission District",
  content: "Mission district is an neighborhood near downtown with Latino roots and a hipster vibe. It's a popular weekend hangout with skyline views. Bike parking spaces concentrate more on main streets compared with the downtown area. Some parking spaces with the most racks are either built before 2005 or at 2020.",
  bbox: [[37.74655746554895, -122.43129730224608], [37.77098612371078, -122.40297317504881]]
}

var page4 = {
  title: "4 Poorest Neighborhood - Visitacion Valley",
  content: "Visitacion Valley is the neighborhood with the lowest median household income in the area. It's located at the southeastern part of SF. Very few bike parking spaces are in this area. Only one of them was built after 2015, with only 2 racks.",
  bbox: [[37.70324464138061, -122.43953704833984], [37.72741604925924, -122.38649368286131]]
}

var page5 = {
  title: "5 Richest Neighborhood - Presidio Heights",
  content: "Presidio Heights is the neighborhood with the highest median household income in the area. It's located at the northern part the SF. It's biggest bike parking space was built before 2005. Two newly built bike parking spaces have only one rack and are located along a main street.",
  bbox: [[37.78502894901508, -122.46140241622925], [37.79226979819359, -122.44513750076294]]
}

var page6 = {
  title: "Distribution of New Parking Space with No Less Than 6 Racks",
  content: "There are four bike parking spaces in total built after 2018 with at least 6 racks. Almost all of them are in downtown and Chinatown area.s",
  bbox: [[37.68708070686609, -122.53051757812499], [37.82090404811055, -122.32349395751952]],
  filterfun:function(row){return Number(row.properties.install_yr) > 2018 && row.properties.racks >= 6}
}
//summary page???
var slides = [
  page1,
  page2,
  page3,
  page4,
  page5,
  page6
]

// var filterAndPlot = function() {
//   _.each(data, function(continent) {
//     var markerArray = _.chain(continent.data)
//       .filter(function(country) {
//         var condition = true;
//         if (stringFilter) {
//           condition = condition && country.CountryName.toLowerCase().includes(stringFilter);
//         }
//         if (selectValue !== 'All') {
//           condition = condition && country.ContinentName === selectValue;
//         }
//         return condition;
//       })
//       .map(function(country) { return country.marker; })
//       .value();
//
//     // clear the continent featureLayers
//     continent.features.clearLayers();
//
//     // Notice that our featureGroup was never removed from the map - all we have to do is add
//     // markers to one of our featureGroups and it will immediately appear on the map
//     _.each(markerArray, function(marker) { continent.features.addLayer(marker); });
//   });
// };

var currentPage = 0

var nextPage = function() {
  // event handling for proceeding forward in slideshow
  var nextPage = currentPage + 1
  currentPage = nextPage
  buildPage(slides[nextPage])
}

var prevPage = function() {
  // event handling for going backward in slideshow
  var prevPage = currentPage - 1
  currentPage = prevPage
  console.log(currentPage)
  buildPage(slides[prevPage])
}

var buildPage = function(pageDefinition) {
//console.log(pageDefinition)
  // build up a 'slide' given a page definition
  if (pageDefinition.filterfun) {
    var filtered = data.filter(pageDefinition.filterfun)
    console.log(filtered)
  } else {
    var filtered = data
  }
  if (markers) {markers.forEach(function(marker){map.removeLayer(marker)})}
  markers = filtered.map(function(features) {
    var color = myStyleyearinstall(features)
    pathOpts = {'radius': Math.log(Math.pow(features.properties.racks,3))+3, 'color': color, 'fillColor': color};
    return L.circleMarker([features.geometry.coordinates[1], features.geometry.coordinates[0]], pathOpts)
              .bindPopup(`<h1>${features.properties.racks} racks were built in ${features.properties.install_yr}</h1>`)
              .addTo(map);
  })
 // markers.forEach(function(marker) { marker.addTo(map).bindPopup(data.properties.racks);})
 //marker.bindPopup(features.properties.racks).openPopup()})

  //set the title
  $('#title').text(pageDefinition.title)
  //set the content
  $('#content').text(pageDefinition.content)
  //move to the bounnding box
  map.flyToBounds(pageDefinition.bbox)


if (currentPage === 0) {
  $('#prev').prop("disabled", true)
} else {
  $('#prev').prop("disabled", false)
}
if (currentPage === slides.length - 1) {
  $('#next').prop("disabled", true)
} else {
  $('#next').prop("disabled", false)
}

}

// var tearDown = function() {
//
//   // remove all plotted data in prep for building the page with new filters etc
//   map.removeLayer(marker)
//
// }

// Ajax to grab json
$.ajax("https://data.sfgov.org/resource/hn4j-6fx5.geojson").done(function(json){
  data = json.features
  buildPage(slides[currentPage])
})
$('#next').click(nextPage)
$('#prev').click(prevPage)
//you can use jquery's "hide" function to hide a div, so that when you click
