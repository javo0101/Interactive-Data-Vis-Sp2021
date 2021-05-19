
let data

console.log("hola! 2");
d3.csv("../data/squirrelActivities.csv", d3.autoType)
.then(data => {
    console.log("data", data)

})
// constants
data = d3.csv("../data/squirrelActivities.csv", d3.autoType)
const width = window.innerWidth;
const height = window.innerHeight;

//SCALES
//xScale - Categorical, activity
const xScale = d3.scaleBand()
.domain(data.map(d => d.activity))
.range([0, Window.innerWidth]) // visual variable

// yscale - linear,count
const yScale = d3.scaleLinear()
.domain([0, d3.max(data, d => d.count)])
.range([window.innerHeight, 0])

console.log(xScale, xScale("climbing")) // to see what actual value it has.

const svg = d3.select("#barchart")
.append('svg')
.attr("width", width)
.attr("height", height)
