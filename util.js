// Works with game.js part of ld-38
// Utility functions that are unlikely to be changed; they serve a clear purpose separate from the game
// GPL3

// Something something prototype.js bad form something something
// Fuck you. Anyway, thanks http://stackoverflow.com/a/3291856/1556332
String.prototype.capitalize = function()
{
	return this.replace(/\w*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

String.prototype.humanize = function()
{
	return this.replace(/-/g, " ").capitalize()
}

function incrementOrOne(obj, prop, count)
{
	if (typeof count == "undefined") {
		count = 1;
	}
	if (!obj.hasOwnProperty(prop)) {
		obj[prop] = 0;
	}
	obj[prop] += count;
}

// Create a property as a new object if it doesn't exist
// Return the /property/ (not the parent object)
function objOrCreate(obj, prop) {
	if (!obj.hasOwnProperty(prop)) {
		obj[prop] = {};
	}
	return obj[prop];
}

// Adds modifiers from built things like mines
function getMultiplied(built, resource, original)
{
	var amount = original;
	if (built) {
		$.each(built, function(item, count) {
			if (item in buildMultipliers && resource in buildMultipliers[item]) {
				amount += original * count * buildMultipliers[item][resource];
			}
		});
	}
	return Math.ceil(amount);
}

// Adds resources listed in from to resources (doesn't subtract from `from`)
// If built is provided, resources will be multiplied times the appropriate modifiers
function addResources(from, to, mult, built)
{
	if (typeof mult == "undefined") {
		mult = 1;
	}
	$.each(from, function(resource, count) {
		var amount = count;
		if (built) {
			amount = getMultiplied(built, resource, count);
		}
		teams[to].resources[resource] += amount * mult;
	});
}

function getMaxBuyable(buyer, buying) {
	var max = -1;
	$.each(buying, function(resource, count) {
		var buyable = Math.floor(buyer[resource]/count);
		if (max == -1 || buyable < max) {
			max = buyable;
		}
	});
	return max;
}

// Loops through every planet or moon and passes it to func
// Passes (actual body object, identifier name, parent object, parent name)
function bodies(func)
{
	$.each(planets, function(name, planet) {
		// We return because we want to allow return to break like in jQuery
		var doBreak = func(planet, name);
		if (typeof doBreak != "undefined") {
			return doBreak;
		}
		$.each(planet.moons, function(moonName, moon) {
			doBreak = func(moon, moonName);
			if (typeof doBreak != "undefined") {
				return doBreak;
			}
		});
		if (typeof doBreak != "undefined") {
			return doBreak;
		}
	});
}

function getBody(name)
{
	if (planets.hasOwnProperty(name)) {
		return planets[name];
	}
	else {
		var body = null;
		$.each(planets, function(planetName, planet) {
			if (planet.hasOwnProperty("moons") && planet.moons.hasOwnProperty(name)) {
				body = planet.moons[name];
				return false; // Break out of loop, not return from function
			}
		});
		return body;
	}
	return null;
}

function totalResources(obj) {
	var total = 0;
	$.each(obj.resources, function(resource, count) {
		total += count;
	});
	return total;
}

function ownedBodies(team) {
	var total = 0;
	bodies(function(body) {
		if (body.owner == team) {
			total++;
		}
	});
	return total;
}

