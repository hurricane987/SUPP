var map;

  	function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          	center: {lat: 45.52 , lng: -122.681944},
         	zoom: 15,
         	zoomControl: true,
    		zoomControlOptions: {
    			style: google.maps.ZoomControlStyle.LARGE,
        		position: google.maps.ControlPosition.RIGHT_TOP
    		},
        });
	}

$(document).ready(function(){

	var shows = [];

	var listingHTML = '';
	var location = '';

	function getLocation(){
		location += $('#city').val();
		location += ',';
		location += $('#state').val();
	}

	function getShows(item){
	
		// the parameters we need to pass in our request to StackOverflow's API
		var request = { 
			location: location,
			app_id: 'supp',
			api_version: '2.0',
			limit: 100
		};
		
		$.ajax({
			url: "http://api.bandsintown.com/events/search",
			data: request,
			dataType: "jsonp",
			type: "GET"
		})
		.done(function(result){ //this waits for the ajax to return with a succesful promise object
			for (var i = 0; i < result.length; i ++) {
				shows.push(result[i]);
			}
			if (shows.length === 0) {
				alert('There don\'t seem to be any shows in this location today!')
			} else {
				console.log(shows);
				compileListings();
				showListings();
				mapShows();
			}
		})
		.fail(function(jqXHR, error){ //this waits for the ajax to return with an error promise object
			alert('error!');
		});

		return
	};

	function compileListings() {
		for (var i = 0; i < shows.length; i ++){
			listingHTML += "<li><div class='listing' data-id='" + shows[i].id + "'><h3 class='listing-title'>" + shows[i].artists[0].name + " @ " + shows[i].venue.name + "</h3><h4 class='listing-subheading'>" + moment(shows[i].datetime).format( 'MMM DD, YYYY h:mm a' ) + "</h4><div class='otherInfo' id='other" + shows[i].id + "'><h4 class='listing-subheading'><a href='" + shows[i].url + "'>Event Page</a></h4><h4 class='listing-subheading'><a href='" + shows[i].ticket_url + "'>Get Tickets</a></h4></div></div></li>";
		}
	}

	function showListings() {
		document.getElementById('listings').innerHTML += listingHTML;
	}

	function mapShows() {
	    var bounds = new google.maps.LatLngBounds();

		for (i = 0; i < shows.length; i++) {  

			position = new google.maps.LatLng(shows[i].venue.latitude, shows[i].venue.longitude);
		    marker = new google.maps.Marker({
		        position: position,
		        map: map
		    });

		    bounds.extend(position)
		   	google.maps.event.addListener(marker, 'click', (function(marker, i) {
		       	return function() {
	        		infowindow.setContent(shows[i].artists[0].name);
		        	infowindow.open(map, marker);
		        }
		    	})(marker, i));
		    }
		map.fitBounds(bounds);

		var infowindow = new google.maps.InfoWindow();

		var marker, i;
	}

	$('.location').on('click', '.submit', function(e){
		e.preventDefault();
		getLocation();
		getShows();
		$('.map').css('height', '65%');
		$('.landing').hide('fast');
		$('.show-listings').show('fast');
	});

	$('.show-listings').on('click', '.listing', function(){
		$(this).find('.otherInfo').toggle('fast');
	});
});






