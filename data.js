// For use by game.js
// Big objects that essentially just store data
// ld-38
// GPL3

// Starting resources reflect a colony
var resources = {
	"metal" : 100,
	"money" : 1000,
	"gas" : 100,
	"water" : 100,
	"natural" : 100,
};

var names = {
	"money" : "Money",
	"water" : "Water",
	"natural" : "Organic",
	"metal" : "Metal",
	"gas" : "Gas",
};

var descriptions = {
	"metal" : "Valuable and useful metals like Gold and Iron"
	, "money" : "IOU notes of the future"
	, "gas" : "Gaseous resources like Hydrogen and Helium used to make rocket fuel"
	, "water" : "A vital component of rocket fuel... and life"
	, "natural" : "Organic resources like wood and food. Only found in Earth and controlled habitats"
};

// This is gonna get too big... figure out a way to refactor
// Possibly making object and adding to it in modules
var planets = {
	"mercury" : {
	},
	"venus" : {
	},
	"earth" : {
		"resources" : { // We're doing stereotypes here. Fuck science.
			"metal" : 40,
			"gas" : 10,
			"water" : 500,
			"natural" : 200
		}
	},
	"mars" : {
	},
	"jupiter" : {
	},
	"saturn" : {
	},
	"uranus" : {
	},
	"neptune" : {
	},
	"pluto" : { // eh whatever
	}
};

planets["earth"].moons = {
	"luna" : {
		"resources" : {
			"metal" : 30,
			"gas" : 3,
			"water" : 20,
			"natural" : 2
		},
		"owner" : "player"
	}
};

planets["mars"].moons = {
	"phobos" : {}, 
	"delmos" : {}
};

// I don't want to have to make maps for every image but I don't want to place evrything
// Am I going to have to use canvas??
// Uuuggghhhh
// Nah I can use top and left... right? Is it worth it???
// Canvas isn't soooo bad but it can be annoying and it's more than I need.
// I've REALLY gotta figure out /exactly/ what I'm doing for graphics.
// If I used canvas I could make everything graphical...
// But canvas text rendering is a BITCH
// And let's be real, it's mostly text.
// I don't have a strong enough vision. I'm not certain what exactly I'm doing.
// I want to be able to click those planets
// And I don't want to keep fucking with this dumb positioning CSS
// I think it's probably worth canvas... but I'm not ready yetA
// I also need to think about sizing... do I want responsive design?