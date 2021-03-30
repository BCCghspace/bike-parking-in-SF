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

//var data;
var markers;

var page1 = {
  title: "page1",
  content: "here's some random content",
  bbox: [[34.18, -14.15], [30.3, 59.4]]
}

var page2 = {
  title: "page2",
  content: "here's some random content",
  bbox: [[-45.76, 105.2], [-2.02, 160.3]]
}

var slides = [
  page1,
  page2
]

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
  markers = data.map(function(parking) {
    return L.marker([parking.lat, parking.lon])
  })
  markers.forEach(function(marker) { marker.addTo(map) })


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
$.ajax('https://data.sfgov.org/resource/hn4j-6fx5.json').done(function(json){
  var data = JSON.parse(json)
  buildPage(slides[currentPage])
})

$('#next').click(nextPage)
$('#prev').click(prevPage)
//you can use jquery's "hide" function to hide a div, so that when you click
