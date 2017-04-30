var products = require('../db/products').products;
var _ = require('lodash');


var Util = function() {

	var sortProducts = function(sortItem, sortRule) {
		
		var sortedProducts = _.orderBy(products, sortItem, sortRule );

		return sortedProducts;

	};


	var filterByColor = function(color) {

		var filteredProducts = _.filter(products, { 'color': color }) ;
		return filteredProducts;
	}


	return {
		'sortProducts': sortProducts,
		'filterByColor': filterByColor
	};
}


module.exports = new Util();