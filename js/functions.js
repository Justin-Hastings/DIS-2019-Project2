

//Slider
var slider = document.getElementById("myPriceRange");
var output = document.getElementById("demo");
output.innerHTML = slider.value; // Display the default slider value

minPrice = 5;
maxPrice = 200;

getMinPrice();
getMaxPrice();

listSuburbSQLChoices();
listPstCdeSQLChoices();
listDwellTypeSQLChoices();
listRoomNumSQLChoices();


drop = document.getElementById("places");	//Retrieve suburbs from webpage

drop.addEventListener("click",updateSuburb);	//Check when clicked

function storeSuburb() {	//Function to store suburbs
	sub = document.getElementById("suburb").value;	//Retrieve suburbs that are entered
	sessionStorage.setItem("place", sub);	//Stores the place as the suburb selected
}

function updateSuburb() {	//Function to update the suburb
	sub = drop.value;	//Sets the new suburb to the most recently selected suburb
	sessionStorage.setItem("place", sub);	//Stores the place as the most recently selected suburb
}

function listSuburbs() {
	var localityList = [];	// list of localities
	var localityOption = ""; // dropdown list of locality options
	
	var data = {
		sql: "SELECT DISTINCT \"locality\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: data,
		//callback function that responds to the results being returned
		success: function(data) {	//data contains the data returned
				var jsonBlock = JSON.parse(data); //parse converts the data to a JavaScript object
				var localities = jsonBlock.result.records;
				
				localities.forEach(function(item, index) {
					var suburb = item.locality;
					localityList.push(suburb);
				});
				
				localityList.sort();	//Sort all of the suburbs into alphabetical order
				
				localityList.forEach(function(item) {
					var suburb = item;
					localityOption += '<option value="' + suburb + '">' + suburb + '</option>';
				});
				
				localityOption = '<select id="burbs"' + localityOption + '</select>'
				document.getElementById('burbs').innerHTML = localityOption;	//Display all of the suburbs from the database
				
		},
		
		dataType: "text"
	});
}

function storePostcodes() {
	pstCde = document.getElementById("postcode").value;
	sessionStorage.setItem("posctode", pstCde);
}

function listPostcodes() {
	var pstCdeList = [];	// list of postcodes
	var pstCdeOption = ""; // dropdown list of postcode options
	
	var codeData = {
		sql: "SELECT DISTINCT \"PostCode\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: codeData,
		//callback function that responds to the results being returned
		success: function(codeData) {	//data contains the data returned
				var jsonBlock = JSON.parse(codeData); //parse converts the data to a JavaScript object
				var pstCdes = jsonBlock.result.records;
				
				pstCdes.forEach(function(item, index) {
					var pstCde = item.PostCode;
					pstCdeList.push(pstCde);
				});
				
				pstCdeList.sort();	//Sort all of the postcodes into numerical order
				
				pstCdeList.forEach(function(item) {
					var pstCde = item;
					pstCdeOption += '<option value="' + pstCde + '">' + pstCde + '</option>';
				});
				
				pstCdeOption = '<select id="pstCodes"' + pstCdeOption + '</select>'
				document.getElementById('pstCodes').innerHTML = pstCdeOption;	//Display all of the postcodes from the database
				
		},
		
		dataType: "text"
	});
}

function storeRoomNums() {
	roomNm = document.getElementById("numRooms").value;
	sessionStorage.setItem("numRooms", roomNm);
}

	//Code for Dwelling Graph
      // Load the Visualization API and the corechart package.
      google.charts.load('current', {'packages':['corechart']});

      // Set a callback to run when the Google Visualization API is loaded.
     // google.charts.setOnLoadCallback(drawChart);

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart() {
		var records = new google.visualization.DataTable();
		var data1 = {
		sql: "SELECT \"Dwelling Type\", count(\"Dwelling Type\") FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\" GROUP BY \"Dwelling Type\""	//sql query to retrieve data from the database
	
		};
		$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: data1,
		
		success: function(data1) {	//data contains the data returned
			var jsonBlock = JSON.parse(data1); //parse converts the data to a JavaScript object
			var recs = jsonBlock.result.records;
			
			records.addColumn('string','Dwelling Types');
			records.addColumn('number','count');
			
			
			recs.forEach(function (item, index){
				var aNum = parseInt(item['count']);
				var aArray = new Array(item["Dwelling Type"], aNum);
				records.addRow( aArray );
			
			});
			
			// Set chart options
			var options = {'title':'The dwelling types and their amounts',
						   'width':800,
						   'height':600};

			// Instantiate and draw our chart, passing in some options.
			var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
			chart.draw(records, options);

		},
		
		dataType: "text"
		});
		
      }
	  

// Update the current slider value (each time you drag the slider handle)
slider.oninput = function() {
  output.innerHTML = this.value;
}

//Set slider to price range from database
function priceSliderFunction() {
	var x = document.getElementById("myPriceRange").max = maxPrice;
	var y = document.getElementById("myPriceRange").min = minPrice;
	var z = document.getElementById("myPriceRange").value = maxPrice;
}

function getMinPrice() {
	
	var data = {
		sql: "SELECT * from \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\" ORDER BY \"weekly-rent\"ASC LIMIT 1"	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: data,
		//callback function that responds to the results being returned
		success: function(data) {	//data contains the data returned
				var jsonBlock = JSON.parse(data); //parse converts the data to a JavaScript object
				var price = jsonBlock.result.records;
				
				price.forEach(function(item, index) {
					var min = item["weekly-rent"];	//the - sign stuffs up the code, use square brackets to stop this
					minPrice = parseInt(min);
				});
				//Ensures function runs after data is returned
				priceSliderFunction();
				createJQuerySlider();

		},
		
		
		dataType: "text"
	});
}
function getMaxPrice() {
	
	var data = {
		sql: "SELECT * from \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\" ORDER BY \"weekly-rent\"DESC LIMIT 1"	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: data,
		//callback function that responds to the results being returned
		success: function(data) {	//data contains the data returned
				var jsonBlock = JSON.parse(data); //parse converts the data to a JavaScript object
				var price = jsonBlock.result.records;
				
				price.forEach(function(item, index) {
					var max = item["weekly-rent"];	//the - sign stuffs up the code, use square brackets to stop this
					maxPrice = parseInt(max);
				});
				//Ensures function runs after data is returned
				priceSliderFunction();
				createJQuerySlider();

		},
		
		
		dataType: "text"
	});
}

function listSuburbSQLChoices() {
	var localityList = [];	// list of localities
	var localityOption = ""; // dropdown list of locality options
	
	var data = {
		sql: "SELECT DISTINCT \"locality\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: data,
		//callback function that responds to the results being returned
		success: function(data) {	//data contains the data returned
				var jsonBlock = JSON.parse(data); //parse converts the data to a JavaScript object
				var localities = jsonBlock.result.records;
				
				localities.forEach(function(item, index) {
					var suburb = item.locality;
					localityList.push(suburb);
				});
				
				localityList.sort();	//Sort all of the suburbs into alphabetical order
				
				localityList.forEach(function(item) {
					var suburb = item;
					localityOption += '<option value="' + suburb + '">' + suburb + '</option>';
				});
				
				localityOption = '<select id="burbs"' + localityOption + '</select>'
				document.getElementById('burbsSQL').innerHTML = localityOption;	//Display all of the suburbs from the database
				
		},
		
		dataType: "text"
	});
}

function listPstCdeSQLChoices() {
	var pstCdeList = [];	// list of postcodes
	var pstCdeOption = ""; // dropdown list of postcode options
	
	var codeData = {
		sql: "SELECT DISTINCT \"PostCode\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: codeData,
		//callback function that responds to the results being returned
		success: function(codeData) {	//data contains the data returned
				var jsonBlock = JSON.parse(codeData); //parse converts the data to a JavaScript object
				var pstCdes = jsonBlock.result.records;
				
				pstCdes.forEach(function(item, index) {
					var pstCde = item.PostCode;
					pstCdeList.push(pstCde);
				});
				
				pstCdeList.sort();	//Sort all of the postcodes into numerical order
				
				pstCdeList.forEach(function(item) {
					var pstCde = item;
					pstCdeOption += '<option value="' + pstCde + '">' + pstCde + '</option>';
				});
				
				pstCdeOption = '<select id="pstCodes"' + pstCdeOption + '</select>'
				document.getElementById('postCodesSQL').innerHTML = pstCdeOption;	//Display all of the postcodes from the database
				
		},
		
		dataType: "text"
	});
}

function listDwellTypeSQLChoices() {
	var dwellTypeList = [];	// list of dwelling types
	var dwellTypeOption = ""; // dropdown list of dwelling Type options
	
	var codeData = {
		sql: "SELECT DISTINCT \"Dwelling Type\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: codeData,
		//callback function that responds to the results being returned
		success: function(codeData) {	//data contains the data returned
				var jsonBlock = JSON.parse(codeData); //parse converts the data to a JavaScript object
				var dwellTypes = jsonBlock.result.records;
				
				dwellTypes.forEach(function(item, index) {
				var dwellTpe = item["Dwelling Type"];
					dwellTypeList.push(dwellTpe);
				});
				
				dwellTypeList.sort();	//Sort all of the dwelling types into alphabetical order
				
				dwellTypeList.forEach(function(item) {
					var dwellTpe = item;
					dwellTypeOption += '<option value="' + dwellTpe + '">' + dwellTpe + '</option>';
				});
				
				dwellTypeOption = '<select id="dwellTypes"' + dwellTypeOption + '</select>'
				document.getElementById('dwellingTypeSQL').innerHTML = dwellTypeOption;	//Display all of the postcodes from the database
				
		},
		
		dataType: "text"
	});
}

function listRoomNumSQLChoices() {
	var rmNumList = [];	// list of room numbers
	var rmNumOption = ""; // dropdown list of room number options
	
	var codeData = {
		sql: "SELECT DISTINCT \"bedrooms\" FROM \"5edaa132-b4fd-4a47-84d1-44bc76e80c50\""	//sql query to retrieve data from the database
	
	};
	
	$.ajax({
		type: "GET",		
		url: "https://data.qld.gov.au/api/action/datastore_search_sql",	//Website for the database where the data is being retrieved from
		data: codeData,
		//callback function that responds to the results being returned
		success: function(codeData) {	//data contains the data returned
				var jsonBlock = JSON.parse(codeData); //parse converts the data to a JavaScript object
				var rmNums = jsonBlock.result.records;
				
				rmNums.forEach(function(item, index) {
				var rmNum = item.bedrooms;
					rmNumList.push(rmNum);
				});
				
				rmNumList.sort(function(a, b){return a-b});	//Sort all of the postcodes into numerical order
				
				rmNumList.forEach(function(item) {
					var rmNum = item;
					rmNumOption += '<option value="' + rmNum + '">' + rmNum + '</option>';
				});
				
				rmNumOption = '<select id="rmNums"' + rmNumOption + '</select>'
				document.getElementById('roomNumSQL').innerHTML = rmNumOption;	//Display all of the postcodes from the database
				
		},
		
		dataType: "text"
	});
}


//jQuery Slider
//Has 2 handles for a user to select a price range instead of a single price
function createJQuerySlider() {
    $( "#slider-range" ).slider({
      range: true,
      min: minPrice,
      max: maxPrice,
      values: [ minPrice, maxPrice ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
      " - $" + $( "#slider-range" ).slider( "values", 1 ) );
	  
  };

/*
function createGraph(){
	var sql = "SELECT\"Dwelling Type\",count(\"Dwelling Type\")FROM\"5edaa132-b4fd-4a47-84d1-44bc76e80c50\"";
	//create where clause
	var where = "";
	
	//get what the user selected on the webpage
	var burbs = document.getElementById("burbsSQL").value;
	var pcode = document.getElementById("postCodesSQL").value;
	var dtype = document.getElementById("dwellingTypeSQL").value;
	var wrentMin = $("#slider-range").slider("values",0)
	var wrentMx = $("#slider-range").slider("values",1)
	
	if(burbs !="") where = "WHERE\"locality\"=""+burbs+""";
}
*/