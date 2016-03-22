
// function showEvent(location){
// 	for (var i = 0; i < events.length; i++){
// 		locations.append
// 	}
// }

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
		listingHTML += "<div class='listing'><h2>" + shows[i].artists[0].name + "</h2><h3>" + shows[i].venue.name + "</h3></div>";
	}
}

function showListings() {
	document.getElementById('listings').innerHTML += listingHTML;
}

// function compileLocations(){
// 	for (var i = 0; i<shows.length; i++) {
// 		locations += "['" + shows[i].venue.name + "', " + shows[i].venue.latitude + ", " + shows[i].venue.longitude + ", " + (i + 1) + "],";
// 	}
// }

var locations = [
    		// ['Bondi Beach', -33.890542, 151.274856, 4],
   		 // 	['Coogee Beach', -33.923036, 151.259052, 5],
   			// ['Cronulla Beach', -34.028249, 151.157507, 3],
    		// ['Manly Beach', -33.80010128657071, 151.28747820854187, 2],
    		// ['Maroubra Beach', -33.950198, 151.259302, 1]
		];
var map;

  	function initMap() {

        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: shows[0].venue.latitude, lng: shows[0].venue.longitude},
          zoom: 12
        });

	    for (i = 0; i < shows.length; i++) {  
		    marker = new google.maps.Marker({
		        position: new google.maps.LatLng(shows[i].venue.latitude, shows[i].venue.longitude),
		        map: map
		    });

	    	google.maps.event.addListener(marker, 'click', (function(marker, i) {
	        	return function() {
	          		infowindow.setContent(locations[i][0]);
	          		infowindow.open(map, marker);
	        	}
	    	})(marker, i));
	    }

	    var infowindow = new google.maps.InfoWindow();

		var marker, i;
	}

$(function(){
	// $('.main-content').hide();
	// compileLocations();
	$('.location').on('click', '.submit', function(e){
		var posts = $.ajax('http://jsonplaceholder.typicode.com/posts', {
			method: 'GET'
		});
		var users = $.ajax({
			url: 'http://jsonplaceholder.typicode.com/users',
			method: 'GET'
		});
		
		var data = {};
		
		$.when(posts, users).done(function(postsData, usersData) {
			
			data.posts = postsData[0];
			data.users = usersData[0];
			
			data.getUserForPost = function(post) {
				for (var i = 0; i < data.users.length; i++) {
					if (data.users[i].id === post.userId) {
						return data.users[i];
					}
				}
				
				return false;
			};
			
			data.getPostsWithUser = function () {
				return data.posts.map(function(post) {
					post.user = data.getUserForPost(post);
					return post;
				});
			};


			var finalData = data.getPostsWithUser();
			debugger;
			
			compileListings(finalData);
		});
		
		e.preventDefault();
		$('.landing').hide('fast');
		$('.main-content').show('fast');
		console.log(locations);
		initMap();
		compileListings();
		showListings();
	});
});






