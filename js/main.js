// Author:Buddy Collins
function initialize(){
  cities();
};

//function to create a table with cities and their populations
function cities(){
  //define two arrays for cities and population
  var cityPop = [
    {
      city: 'Madison',
      population: 233209
    },
    {
      city: 'Milwaukee',
      population: 594833
    },
    {
      city: 'Green Bay',
      population: 104057
    },
    {
      city: 'Superior',
      population: 27244
    }
  ];

  //append the table element to the div
  $("#mydiv").append("<table>");

  //append a header row to the table
  $("table").append("<tr>");

  //add the "City" and "Population" columns to the header row
  $("tr").append("<th>City</th><th>Population</th>");

  //loop to add a new row for each city
  for (var i = 0; i < cityPop.length; i++){
    //assign longer html strings to a variable
    var rowHtml = "<tr><td>" + cityPop[i].city + "</td><td>" + cityPop[i].population + "</td></tr>";
    //add the row's html string to the table
    $("table").append(rowHtml);
  };

  addColumns(cityPop);
  addEvents();
};

function addColumns(cityPop){
  // adds new column city size to the table
  $('tr').each(function(i){

    if (i == 0){
      $(this).append('<th>City Size</th>'); //adds city size to table
    } else {

      var citySize;
      // if checks population in the object and assigns a string to the table in line 67
      if (cityPop[i-1].population < 100000){
        citySize = 'Small';
      } else if (cityPop[i-1].population < 500000){
        citySize = 'Medium';
      } else {
        citySize = 'Large';
      };

      $(this).append('<td>' + citySize + '</td>');
    };
  });
};

function addEvents(){
  //adds the colors to the table
  $('table').mouseover(function(){

    var color = "rgb(";

    for (var i=0; i<3; i++){

      var random = Math.round(Math.random() * 255); //assigns random number for the rgb code

      color += random;

      if (i<2){
        color += ",";

      } else {
        color += ")";
      };
    }
    $(this).css('color', color);
  });
  function clickme(){
    //clicking function
    alert('Hey, you clicked me!');
  };

  $('table').on('click', clickme);
};

$(document).ready(initialize);

function jsAjax(){
    // Step 1: Create the request
    var ajaxRequest = new XMLHttpRequest();

    //Step 2: Create an event handler to send received data to a callback function
    ajaxRequest.onreadystatechange = function(){
        if (ajaxRequest.readyState == 4){
            callback(ajaxRequest.response);
        };
    };

    //Step 3: Open the server connection
    ajaxRequest.open('GET', 'data/MegaCities.geojson', true);

    //Step 4: Set the response data type
    ajaxRequest.responseType = "json";

    //Step 5: Send the request
    ajaxRequest.send();
};

//define callback function
function callback(response){
    //tasks using the data go here
    console.log(response);
};

window.onload = jsAjax();
