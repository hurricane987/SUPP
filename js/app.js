var shows = [
{
	id: 11623858,
	url: "http://www.bandsintown.com/event/11623858?app_id=SUPP",
	datetime: "2016-03-21T08:00:18",
	ticket_url: "http://www.bandsintown.com/event/11623858/buy_tickets?app_id=SUPP&came_from=233",
	artists: [
		{
		name: "Louie laveine",
		url: "http://www.bandsintown.com/LouieLaveine",
		mbid: null
		}
	],
	venue: {
	id: 2549874,
	url: "http://www.bandsintown.com/venue/2549874",
	name: "Dantes ",
	city: "Portland",
	region: "OR",
	country: "United States",
	latitude: 45.5221242,
	longitude: -122.6727062
	},
	ticket_status: "available",
	on_sale_datetime: null
},
{
	id: 10416072,
	url: "http://www.bandsintown.com/event/10416072?app_id=SUPP",
	datetime: "2016-03-21T18:30:00",
	ticket_url: "http://www.bandsintown.com/event/10416072/buy_tickets?app_id=SUPP&came_from=233",
	artists: [
		{
			name: "TAPPY HOUR",
			url: "http://www.bandsintown.com/TappyHour",
			mbid: null
		},
		{
			name: "TAP DANCE CLASS W. SUE CESWICK",
			url: "http://www.bandsintown.com/TapDanceClassW.SueCeswick",
			mbid: null
		},
		{
			name: "Gothique 11 pm",
			url: "http://www.bandsintown.com/Gothique11Pm",
			mbid: null
		},
		{
			name: "FCTV 9 pm",
			url: "http://www.bandsintown.com/Fctv9Pm",
			mbid: null
		},
		{
			name: "FREE MARIJUANA MONDAYS",
			url: "http://www.bandsintown.com/%22freeMarijuanaMondays%22",
			mbid: null
		},
		{
			name: "Gothique Blend @ 10 pm",
			url: "http://www.bandsintown.com/GothiqueBlend%4010Pm",
			mbid: null
		}
	],
	venue: {
	id: 2026314,
	url: "http://www.bandsintown.com/venue/2026314",
	name: "Analog Cafe & Theater",
	city: "Portland",
	region: "OR",
	country: "United States",
	latitude: 45.512006,
	longitude: -122.658176
	},
	ticket_status: "available",
	on_sale_datetime: null
},
{
	id: 11611843,
	url: "http://www.bandsintown.com/event/11611843?app_id=SUPP",
	datetime: "2016-03-21T19:00:00",
	ticket_url: "http://www.bandsintown.com/event/11611843/buy_tickets?app_id=SUPP&came_from=233",
	artists: [
	{
		name: "Matt Alber",
		url: "http://www.bandsintown.com/MattAlber",
		mbid: "a22a3a4a-88ba-43c6-9a9b-a77314e90787"
	}
	],
	venue: {
	id: 3230474,
	url: "http://www.bandsintown.com/venue/3230474",
	name: "The Lake Theater & Cafe",
	city: "Lake Oswego",
	region: "OR",
	country: "United States",
	latitude: 45.4164344,
	longitude: -122.6638916
	},
	ticket_status: "available",
	on_sale_datetime: null
},
];

var listingHTML = '';

function compileListings() {
	for (var i = 0; i < shows.length; i ++){
		listingHTML += "<li><div class='listing' data-id='" + shows[i].id + "'><h3 class='listing-title'>" + shows[i].artists[0].name + " @ " + shows[i].venue.name + "</h3><h4 class='listing-subheading'>" + moment(shows[i].datetime).format( 'MMM DD, YYYY h:mm a' ) + "</h4><div class='otherInfo' id='other" + shows[i].id + "'><h4 class='listing-subheading'><a href='" + shows[i].url + "'>Event Page</a></h4><h4 class='listing-subheading'><a href='" + shows[i].ticket_url + "'>Get Tickets</a></h4></div></div></li>";
	}
}

function showListings() {
	document.getElementById('listings').innerHTML += listingHTML;
}

var map;

  	function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          	center: {lat: 45.52 , lng: -122.681944},
         	zoom: 15,
         	zoomControl: true,
    		zoomControlOptions: {
        		position: google.maps.ControlPosition.RIGHT_TOP
    		},
        });

	    for (i = 0; i < shows.length; i++) {  
		    marker = new google.maps.Marker({
		        position: new google.maps.LatLng(shows[i].venue.latitude, shows[i].venue.longitude),
		        map: map
		    });

	    	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        	return function() {
	          		infowindow.setContent(shows[i].artists[0].name);
	          		infowindow.open(map, marker);
	        	}
	    	})(marker, i));
	    }

	    var infowindow = new google.maps.InfoWindow();

		var marker, i;
	}

$(document).ready(function(){
	$('.location').on('click', '.submit', function(e){
		e.preventDefault();
		$('.map').css('height', '65%');
		$('.landing').hide('fast');
		$('.show-listings').show('fast');
		compileListings();
		showListings();
	});

	$('.show-listings').on('click', '.listing', function(){
		$(this).find('.otherInfo').toggle('fast');
	});
});






