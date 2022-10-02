(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){

const mergeImages = require('merge-images-v2')

let skin = document.getElementById('pfp')
let refresh = document.getElementById('refreshBut')
let city = document.getElementById('city')
let name = document.getElementById('nameEl')
let age = document.getElementById('ageEl')
let color = document.getElementById("color")
let genre = document.getElementById('genre')
let ourRequest = new XMLHttpRequest();
let pH = document.getElementById('placeHolder')


let request = async () =>{

    let req = await fetch('http://www.filltext.com/?rows=1&name={firstName}~{lastName}&age={numberRange|10,60}&location={addressObject}&favoriteColor={number|9}&favoriteGenre={number|10}&skinColor={numberRange|1,20}&pretty=true')
    let data = await req.json()
    return data;
}
refresh.addEventListener('click',function(){
    request().then(ourData =>{
        name.innerText = "Name: "
        age.innerText = "Age: "
        color.innerText = "Favorite Color: "
        genre.innerText = "Favorite Music Genre: "
        city.innerText = "Location: "    
        name.innerText += " " + ourData[0].name
        age.innerText += " " + ourData[0].skinColor
        color.innerHTML += "<br>" + colors.get(ourData[0].favoriteColor)
        genre.innerText += " " + music.get(ourData[0].favoriteGenre)
        city.innerText += ` ${ourData[0].location.streetAddress}, ${ourData[0].location.city}, ${ourData[0].location.state}`
		mergeImages([`./Skintones/Skintones[${ourData[0].skinColor}].png`,`./Shirts/Shirts[${ourData[0].favoriteColor}].png`])
		mergeImages([
			{src : `./Skintones/Skintones[${ourData[0].skinColor}].png`, width : 1000, height: 800},
			{src : `./Shirts/Shirts[${ourData[0].favoriteColor}].png`, width: 1000, height: 800}
		])
		.then(b64 => skin.src = b64)
   	 })
})








request().then(ourData =>{
    name.innerText += " " + ourData[0].name
    age.innerText += " " + ourData[0].age
    color.innerHTML += "<br>" + colors.get(ourData[0].favoriteColor)
    genre.innerText += " " + music.get(ourData[0].favoriteGenre)
    city.innerText += ` ${ourData[0].location.streetAddress}, ${ourData[0].location.city}, ${ourData[0].location.state}`
	mergeImages([`./Skintones/Skintones[${ourData[0].skinColor}].png`,`./Shirts/Shirts[${ourData[0].favoriteColor}].png`])
	mergeImages([
		{src : `./Skintones/Skintones[${ourData[0].skinColor}].png`, width : 1000, height: 800},
		{src : `./Shirts/Shirts[${ourData[0].favoriteColor}].png`, width: 1000, height: 800}
	])
	.then(b64 => skin.src = b64)

})





const music = new Map()
const colors = new Map()

colors.set(0,"White")
colors.set(1,"Red")
colors.set(2,"Blue")
colors.set(3,"Green")
colors.set(4,"Yellow")
colors.set(5,"Orange")
colors.set(6, "Purple")
colors.set(7, "Pink")
colors.set(8, "Brown")
colors.set(9, "Black")

music.set(0, "Punk")
music.set(1,"Country")
music.set(2, "Techno")
music.set(3, "Hip-Hop")
music.set(4, "Pop")
music.set(5,"Rock")
music.set(6,"Rap")
music.set(7, "Jazz")
music.set(8, "Folk")
music.set(9,"R&B")
music.set(10, "Reggae")
},{"merge-images-v2":2}],2:[function(require,module,exports){
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.mergeImagesV2 = factory());
}(this, function () { 'use strict';

	/* eslint new-cap: ["error", { "properties": false }] */

	// Defaults
	var defaultOptions = {
		format: 'image/png',
		quality: 0.92,
		width: undefined,
		height: undefined,
		Canvas: undefined
	};

	var createCanvas = function (options) { return options.Canvas ?
			new options.Canvas.Canvas() :
			window.document.createElement('canvas'); };

	var createImage = function (options) { return options.Canvas ?
			options.Canvas.Image :
			window.Image; };

	// Return Promise
	var mergeImages = function (sources, options) {
		if ( sources === void 0 ) sources = [];
		if ( options === void 0 ) options = {};

		return new Promise(function (resolve) {
		options = Object.assign({}, defaultOptions, options);

		// Setup browser/Node.js specific variables
		var canvas = createCanvas(options);
		var Image = createImage(options);
		if (options.Canvas) {
			options.quality *= 100;
		}

		// Load sources
		var images = sources.map(function (source) { return new Promise(function (resolve, reject) {
			// Convert sources to objects
			if (source.constructor.name !== 'Object') {
				source = { src: source };
			}

	    if (source.width && source.height) {
	      var img = new Image(source.width, source.height);

	      img.onerror = function () { return reject(new Error('Couldn\'t load image')); };
	      img.onload = function () {
	        var width = source.width;
	        var height = source.height;
	        var canvas = createCanvas(options);
	        var ctx = canvas.getContext('2d');

	        canvas.width = width;
	        canvas.height = height;
	        ctx.drawImage(img, 0, 0, width, height);

	        // Adjust source image width and height
	        var resizeImg = new Image();
	        resizeImg.onerror = function () { return reject(new Error('Couldn\'t load image')); };
	        resizeImg.onload = function () { return resolve(Object.assign({}, source, { img: resizeImg })); };
	        resizeImg.src = canvas.toDataURL();
	      };
	      img.src = source.src;
	    } else {
	      // Resolve source and img when loaded
	      var img$1 = new Image();
	      img$1.onerror = function () { return reject(new Error('Couldn\'t load image')); };
	      img$1.onload = function () { return resolve(Object.assign({}, source, { img: img$1 })); };
	      img$1.src = source.src;
	    }
		}); });

		// Get canvas context
		var ctx = canvas.getContext('2d');

		// When sources have loaded
		resolve(Promise.all(images)
			.then(function (images) {
				// Set canvas dimensions
				var getSize = function (dim) { return options[dim] || Math.max.apply(Math, images.map(function (image) { return image.img[dim]; })); };
				canvas.width = getSize('width');
				canvas.height = getSize('height');

				// Draw images to canvas
				images.forEach(function (image) {
					ctx.globalAlpha = image.opacity ? image.opacity : 1;
					return ctx.drawImage(image.img, image.x || 0, image.y || 0);
				});

				if (options.Canvas && options.format === 'image/jpeg') {
					// Resolve data URI for node-canvas jpeg async
					return new Promise(function (resolve) {
						canvas.toDataURL(options.format, {
							quality: options.quality,
							progressive: false
						}, function (err, jpeg) {
							if (err) {
								throw err;
							}
							resolve(jpeg);
						});
					});
				}

				// Resolve all other data URIs sync
				return canvas.toDataURL(options.format, options.quality);
			}));
	});
	};

	return mergeImages;

}));


},{}]},{},[1]);
