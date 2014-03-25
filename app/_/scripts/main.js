/*global Modernizr, preinitialise */
/*jshint -W083 */

'use strict';


/*
**  Autor: True Story
**  Copyright: True Story
**  More info: hello@truestory.io
*/



var Class = require('../libs/Class-js/dist/Class.min.js');

var App = Class.create({

	constructor:function() {

		$.Window = $(window);
		$.Body = $("html,body");
		$.Content = $.Body.find('#content');
		$.Self = this;

		this.checkMediaQueries();
		this.modernizrTests();

		$.Window.on('resize', this.onResize);
		this.onResize();
	},

	onResize:function() {

		$.Self.checkMediaQueries();
	},

	checkMediaQueries:function() {

		if(Modernizr.mq('(max-width: 767px)')) {
			$.MediaQuery = 'mobile';
		} else if(Modernizr.mq('(min-width: 768px) and (max-width: 979px)')){
			$.MediaQuery = 'tablet';
		} else {
			$.MediaQuery = 'full-size';
		}
	},

	modernizrTests:function() {
		Modernizr.addTest('highres', function() {
			// for opera
			var ratio = '2.99/2';
			// for webkit
			var num = '1.499';
			var mqs = [
				'only screen and (-o-min-device-pixel-ratio:' + ratio + ')',
				'only screen and (min--moz-device-pixel-ratio:' + num + ')',
				'only screen and (-webkit-min-device-pixel-ratio:' + num + ')',
				'only screen and (min-device-pixel-ratio:' + num + ')'
			];
			var isHighRes = false;

			// loop through vendors, checking non-prefixed first
			for (var i = mqs.length - 1; i >= 0; i--) {
				isHighRes = Modernizr.mq( mqs[i] );
				// if found one, return early
				if ( isHighRes ) {
					return isHighRes;
				}
			}
			// not highres
			return isHighRes;
		});
	},

});


	/* ---------------
	** INIT FUNCTION 
	** ---------------
	*/

preinitialise();

$(function() { 
	var app = new App(); 
});