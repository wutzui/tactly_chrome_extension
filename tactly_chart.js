/* jslint browser: true, devel: true, maxlen: 85 */
/* global window */

window.onload = function(){
	
	var dataset = [
		{label: 'Positive', count:10},
		{label: 'Negative', count:90}
	];

	var width = 170,
		height = 170;

	var radius = Math.min(width, height) / 2;
	var donutWidth = 5;

	var color = d3.scale.ordinal()
			    .range(["#31CFFF", "#FF2222"]);

	var svg = d3.select("#tactly-chart")
		      .append('svg')
		      .attr('width', width)
		      .attr('height', height)
		      .append('g')
		      .attr('transform', 'translate(' + (width/2)+',' + (height/2) + ')')

	var arc = d3.svg.arc()
			  .innerRadius(radius - donutWidth)
			  .outerRadius(radius);

	var pie = d3.layout.pie()
		      .value(function(d){ return d.count; })
		      .sort(null);

	var path = svg.selectAll('path')
	           .data(pie(dataset))
	           .enter()
	           .append('path')
	           .attr('d', arc)
	           .attr('fill', function(d, i){
	           	return color(d.data.label);
	           })
};

