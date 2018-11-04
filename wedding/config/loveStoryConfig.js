define([], function() {
	var agave = {
			longitude: -92.326986,
			latitude: 38.988116
		},
		busStop = {
			longitude: -92.32601800859368,
			latitude: 38.93926024590884,
		},
		carthage = {
			longitude: -94.3150,
			latitude: 37.1678
		},
		cityScale = 250000,
		columbia = {
			longitude: -92.3283,
			latitude: 38.9514,
		},
		concordia = {
			longitude: -92.373780,
			latitude:  38.948473
		},
		hinkson = {
			longitude:  -92.325023,
			latitude: 38.927843
		},
		mizzou = {
			longitude: -92.33321240233921,
			latitude: 38.93583321962804
		},
		nowhere = {
			longitude: -62.3283,
			latitude: 38.9514,
		},
		nowhereScale = 100000000,
		smallCityScale = cityScale / 2,
		stadiumScale = 1300,
		stCharles = {
			longitude: -90.199402,
			latitude: 38.627003
		},
		streetScale = 2500,
		taraApts = {
			longitude: -92.318791,
			latitude: 38.934965
		}, 
		telegraphPass = {
		 	longitude: -114.361979,
		 	latitude: 32.665190
		},
		washingtonDC = {
			longitude: -77.0164,
			latitude: 38.9047
		},
		websterGroves = {
			longitude: -90.3544,
			latitude: 38.5878
		},
		websterGrovesScale = 41249.914144844784;

		function offsetLocation(location){
			return {
				longitude: location.longitude + .01,
				latitude: location.latitude + .01
			}
		}

	return [{
		sidebarContents: [{
			type: 'img',
			src: 'images/Florida2.jpg'
		}, {
			type: 'h1',
			value: 'Ohio!'
		}, {
			type: 'p',
			value: 'I hope you\'re ready for a little sappiness. If not, I\'d say you\'ve found the wrong place.'
		}, {
			type: 'p',
			value: 'Jamela and I are getting married, despite all reason. Probably many of you are confounded as to how I was able to land such an amazing woman. I know I am.'
		}, {
			type: 'p',
			value: 'This is our love story. From it, perhaps you will be able to figure out this unlikely union. I hope you enjoy it. I have.'
		}, {
			type: 'p',
			value: ' - Jevin'
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: nowhere,
				scale: nowhereScale
			},
			locations: []
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/WebsterGroves.png'
		}, {
			type: 'h1',
			value: 'She\'s an uptown girl'
		}, {
			type: 'p',
			value: 'Jamela hails from Webster Groves where she attended the legendary Nerinx Hall. After completing the rigorous and demanding curriculum, she took her crayons off to college. She would soon be a colored pencil of excellence at Mizzou.'
		}],
		mapContent: {
			basemap: 'terrain',
			startingPoint: {
				location: websterGroves,
				scale: websterGrovesScale
			},
			locations: [{
				title: 'Webster Groves',
				img: 'images/JamelaSenior.jpg',
				coordinates: websterGroves,
				description: 'Not a bad place to grow up.'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/JasperCountyCourthouse.JPG'
		}, {
			type: 'h1',
			value: 'Downtown man'
		}, {
			type: 'p',
			value: 'Jevin was born and raised in Carthage, Missouri. He attended Carthage Senior High School before enlisting in the United States Marine Corps. After five years of service, he returned to Missouri to complete his college education.'
		}],
		mapContent: {
			basemap: 'osm',
			startingPoint: {
				location: carthage,
				scale: smallCityScale
			},
			locations: [{
				title: 'Carthage',
				img: 'images/JevinsFamily.jpg',
				coordinates: carthage,
				description: 'Born and raised'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/in-beginning.jpg'
		}, {
			type: 'h1',
			value: 'In the beginning...'
		}, {
			type: 'p',
			value: 'Jamela and Jevin moved to Columbia, Missouri(CoMo) in order to attend the University of Missouri.'
		}],
		mapContent: {
			basemap: 'gray',

			startingPoint: {
				location: columbia,
				scale: cityScale
			},
			locations: [{
				title: 'Tara Apartments',
				img: 'images/Tara.jpg',
				coordinates: taraApts,
				description: 'The Batcave. Don\'t tell anyone'
			}, {
				title: 'Hinkson',
				img: 'images/JamelasPlace.jpg',
				coordinates: hinkson,
				description: 'Themyscira'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/UniversityOfMissouri.jpg'
		}, {
			type: 'h1',
			value: 'Salus populi suprema lex esto'
		}, {
			type: 'p',
			value: 'While at MU, Jamela first earned her bachelor\'s degree, and then completed the intensive Accelerated Nursing Program offered by the University, and attained her RN.'
		}, {
			type: 'p',
			value: 'Jevin studied in the School of Engineering and earned his Bacheler\'s degree of Science in Computer science.'
		}, {
			type: 'p',
			value: 'Go Mizzou'
		}],
		mapContent: {
			basemap: 'satellite',
			startingPoint: {
				location: mizzou,
				scale: stadiumScale
			},
			locations: [{
				title: 'Mizzou',
				img: 'images/UniversityOfMissouri.jpg',
				coordinates: mizzou,
				description: 'Let the Welfare of the People be the Supreme Law.'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/BusStop.jpg'
		}, {
			type: 'h1',
			value: 'Where Jevin met Jamela'
		}, {
			type: 'p',
			value: 'This is really where our story begins. While waiting for a bus Jevin struck up a conversation with Jamela to pass the time. Who wouldn\'t, she\'s amazing.'
		}, {
			type: 'p',
			value: 'In what must be understood as an act of unreasonable charity and kindness, Jamela accepted Jevin\'s request of a date, and thus began their epic tale.'
		}],
		mapContent: {
			basemap: 'satellite',
			startingPoint: {
				location: busStop,
				scale: streetScale
			},
			locations: [{
				title: 'Bus Stop',
				img: 'images/BusStop.jpg',
				coordinates: busStop,
				description: 'This is where we first met.'
			}, {
				title: 'Stay Classy Jevin',
				img: 'images/Agave.jpg',
				coordinates: agave,
				description: 'In a stroke of inspiration, Jevin took Jamela to a mediocre Mexican restaurant for their first date. This is how he rolls.'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/FloatTripGroup.jpg'
		}, {
			type: 'h1',
			value: 'We have great friends'
		}, {
			type: 'p',
			value: 'Honestly, I think she loves me for my friends. You guys are amazing. We had too many good times to chronicle. Highlights incoming.'
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: columbia,
				scale: cityScale
			},
			locations: [{
				title: 'Awesome',
				img: 'images/Awesome.jpg',
				coordinates: columbia,
				description: 'The title says it all.'
			}, {
				title: 'MSVA Banquets',
				img: 'images/Banquet.jpg',
				coordinates: mizzou,
				description: 'We had some great times with the MSVA.'
			}, {
				title: 'Chappy',
				img: 'images/BestHalloweenEver.jpg',
				coordinates: taraApts,
				description: 'You complete me.'
			}, {
				title: 'Genius',
				img: 'images/Indians.jpg',
				coordinates: hinkson,
				description: 'Best 3 part plan ever. 1: Go to costume party in costume. 2: Be the only guy in costume. 3: Ladies'
			}, {
				title: 'Disco Fry!',
				img: 'images/DiscoFry.jpg',
				coordinates: carthage,
				description: 'You had to be there.'
			}, {
				title: 'Float trips',
				img: 'images/Float Trip.jpg',
				coordinates: agave,
				description: 'There may be a better way to spend a weekend. I\'m skeptical'
			}, {
				title: 'I do love Halloween',
				img: 'images/Ivy.jpg',
				coordinates: busStop,
				description: ''
			}, {
				title: 'The Marine Corps crew',
				img: 'images/RivasVirginia.jpg',
				coordinates: washingtonDC,
				description: 'Once a marine, always awesome.'
			}, {
				title: 'Joe',
				img: 'images/MSVA.jpg',
				coordinates: nowhere,
				description: 'Miss you buddy'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/JamelaSnowBoarding.jpg'
		}, {
			type: 'h1',
			value: 'We\'ve had some adventures'
		}, {
			type: 'p',
			value: ''
		}],
		mapContent: {
			basemap: 'satellite',
			startingPoint: {
				location: nowhere,
				scale: nowhereScale
			},
			locations: [{
				title: 'A motley crew',
				img: 'images/Snowboarding.jpg',
				coordinates: washingtonDC,
				description: 'Lots of awesome trips up the mountain.'
			}, {
				title: 'Rock Climbing',
				img: 'images/RockClimbing.jpg',
				coordinates: columbia,
				description: 'Thanks to Rivas for this idea'
			}, {
				title: 'Wonder Woman',
				img: 'images/JamelaMountain.jpg',
				coordinates: telegraphPass,
				description: 'That\'s what\'s up!'
			}, {
				title: 'Steve Trevor',
				img: 'images/JevinMountain.jpg',
				coordinates: offsetLocation(telegraphPass),
				description: 'Not quite...'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/MizzouEngineere.jpg'
		}, {
			type: 'h1',
			value: 'And we\'ve had a couple of drinks along the way'
		}, {
			type: 'p',
			value: ''
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: columbia,
				scale: cityScale
			},
			locations: [{
				title: 'Pub crawls',
				img: 'images/Pub Crawl.jpg',
				coordinates: columbia,
				description: 'There is something odd about these ladies. I cannot put my finger on it.'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/MoreThanSheCouldSwallow.jpg'
		}, {
			type: 'h1',
			value: 'Maybe it would be safer to say a few drinks'
		}, {
			type: 'p',
			value: ''
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: columbia,
				scale: cityScale
			},
			locations: [{
				title: 'New years',
				img: 'images/NewYears.jpg',
				coordinates: columbia,
				description: 'Twiggy might have gone too far in his excitement.'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/SixPack.jpg'
		}, {
			type: 'h1',
			value: 'Hell, you get the idea.'
		}, {
			type: 'p',
			value: ''
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: washingtonDC,
				scale: cityScale
			},
			locations: [{
				title: 'Bone´',
				img: 'images/Bonee.jpg',
				coordinates: columbia,
				description: 'Bone´, Bone´ Bone´ Bone´!'
			}]
		}
	}, {
		sidebarContents: [{
			type: 'img',
			src: 'images/Young.jpg'
		}, {
			type: 'h1',
			value: 'Tying the knot'
		}, {
			type: 'p',
			value: 'And so, long overdue, Jamela and I are finally getting married. We hope you\'re excited about it as we are.'
		}, {
			type: 'p',
			value: 'We\'re due to be married this december. Our wedding will be small and our wedding party will be comprised mostly of family, as we intend to be married at sea.'
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: nowhere,
				scale: nowhereScale
			},
			locations: []
		} 
	}, , {
		sidebarContents: [{
			type: 'img',
			src: 'images/Halloween.jpg'
		}, {
			type: 'h1',
			value: 'That\'s all folks'
		}, {
			type: 'p',
			value: 'Thanks for stopping by'
		}],
		mapContent: {
			basemap: 'gray',
			startingPoint: {
				location: nowhere,
				scale: nowhereScale
			},
			locations: []
		} 
	}];
});