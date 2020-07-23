import {
	select,
	csv,
	scaleLinear,
	max,
	scaleBand,
	axisLeft,      
	axisBottom
} from 'd3';

const svg = select('svg');

const width = +svg.attr('width');
const height = +svg.attr('height');

const render = dataMilitary => {
	const xValue = d => d.FinalScore;
	const yValue = d => d.RankCountry;
	const margin = {
		top: 20,
		right: 40,
		bottom: 20,
		left: 100
	};
	const innerWidth = width - margin.left - margin.right;
 	const innerHeight = height - margin.top - margin.bottom;

	const xScale = scaleLinear()
		.domain([0, max(dataMilitary, xValue)])
		.range([0, innerWidth]);

	const yScale = scaleBand()
		.domain(dataMilitary.map(yValue))
		.range([0, innerHeight])
		.padding(0.1);

	const g = svg.append('g')
		.attr('transform', `translate(${margin.left},${margin.top})`);

	g.append('g').call(axisLeft(yScale));
	g.append('g').call(axisBottom(xScale))
		.attr('transform', `translate(0,${innerHeight})`);

	g.selectAll('rect').data(dataMilitary)
		.enter().append('rect')
		.attr('y', d => yScale(yValue(d)))
		.attr('width', d => xScale(xValue(d)))
		.attr('height', yScale.bandwidth());
};

// TO CONVERT FROM STRING TO NUMBERS
//TRICK IS PLUS OPERATOR
csv('static/data/csv/dataMilitary.csv').then(dataMilitary => {
	dataMilitary.forEach(d => {
		d.FinalScore = +d.FinalScore * 100;
		d.ActivePersonnel = +d.ActivePersonnel * 100;
		d.Submarines = +d.Submarines * 100;
		d.Tanks = +d.Tanks * 100;
		d.Aircraft = +d.Aircraft * 100;
		d.AttackHelicopters = +d.AttackHelicopters * 100;
		d.AircraftCarriers = +d.AircraftCarriers * 100;
	});
	render(dataMilitary);
});
