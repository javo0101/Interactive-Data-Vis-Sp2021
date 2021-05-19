/* CONSTANTS AND GLOBALS */
const width = window.innerWidth * 0.7,
  height = window.innerHeight * 0.7,
  margin = { top: 20, bottom: 50, left: 60, right: 40 },
  radius = 5,
  xZero = +margin.left + 50,
  yZero = +height - margin.bottom;

// these variables allow us to access anything we manipulate in init() but need access to in draw().
// All these variables are empty before we assign something to them.
let svg;
let xScale;
let yScale;

/* APPLICATION STATE */
let state = {
  data: [],
  selection: "Afghanistan", // + YOUR FILTER SELECTION
};

/* LOAD DATA */
// + SET YOUR DATA PATH
d3.csv('../data/populationOverTime.csv', (d)=>
  {
    const formattedObj = {
    country: d.Entity,
    population: +d.Population,
    year: new Date(+d.Year, 01, 01) //  year, month, day
  }
  return formattedObj
})
  .then(data => {
    console.log("loaded data:", data);
    state.data = data;
    init();
  });

/* INITIALIZING FUNCTION */
// this will be run *one time* when the data finishes loading in
function init() {
  // + SCALES
xScale = d3.scaleTime()
.domain(d3.extent(state.data, d=> d.year))
.range([margin.left, width - margin.right])

yScale = d3.scaleLinear()
.domain(d3.extent(state.data, d=> d.population))
//.domain([0, d3.max(state.data, d => d.population)])
.range([height-margin.bottom, margin.top])

  // + AXES
const xAxis = d3.axisBottom(xScale)
const yAxis = d3.axisLeft(yScale)


 // + CREATE SVG ELEMENT
svg = d3.select("#d3-container")
.append("svg")
.attr('width', width)
.attr('height', height)

svg.append("g")
.attr("class", "xAxis")
.attr("transform", `translate(${+50}, ${height-margin.bottom})`)
.call(xAxis)
.append("text")
.text("Ideology Score 2020")
.attr("transform", `translate(${width/2}, ${40})`)

svg.append("g")
.attr("class", "yAxis")
.attr("transform", `translate(${margin.left + 50}, ${0})`)
.call(yAxis)

  // + UI ELEMENT SETUP
const dropdown = d3.select("#dropdown")

dropdown.selectAll("options")
.data(Array.from(new Set(state.data.map(d=> d.country))))
.join("option")
.attr("value", d => d)
.text(d=> d)

dropdown.on("change", event=> {
  console.log("dropdown changed!", event.target.value)
  state.selection = event.target.value
  
  console.log("new state:", state)
  draw();
})
  // add in dropdown options from the unique values in the data

  // + SET SELECT ELEMENT'S DEFAULT VALUE (optional)

  d3.selectAll("svg.circle")

  // + CALL AXES

  draw(); // calls the draw function
}

/* DRAW FUNCTION */
// we call this everytime there is an update to the data/state
function draw() {
  console.log("state.selection", state.selection)
  // + FILTER DATA BASED ON STATE
const filteredData = state.data
.filter(d=> state.selection === d.country)

yScale.domain(d3.extent(filteredData, d=> d.population))
console.log("filteredData", filteredData) 


  // + UPDATE SCALE(S), if needed

  // + UPDATE AXIS/AXES, if needed

  // + DRAW CIRCLES/LABEL GROUPS, if you decide to

  // + DEFINE LINE GENERATOR FUNCTION

  // + DRAW LINE AND/OR AREA

  const lineFunction = d3.line()
  .x(d=> xScale(d.year))
  .y(d=> yScale(d.population))

svg.selectAll("path.line")
.data([filteredData])
.join(enter => enter.append("path"))
.attr("class","line")
.attr("d", lineFunction)
.attr("fill", "none")
.attr("stroke", "black")
.attr("transform", `translate(${+50}, ${0})`)

svg.append("line")
.style("stroke", "green")
.style("stroke-width", 10)
.attr("x1", 0)
.attr("y1", 0)
.attr("x2", 200)
.attr("y2", 200)

svg.selectAll("line.dynamic")
.data([filteredData])
.join(enter => enter.append("line"))
.style("stroke", "blue")
.style("stroke-width", 10)
.attr("x1", yZero)
.attr("y1", xZero)
.attr("x2", margin.left, width - margin.right)
.attr("y2", d3.max(state.data, d => d.population))

//.call(enter => enter.transition(t)
//.attr("y", 0)),
//update => update
//.attr("stroke", "green")
//.attr("y", 0)
//.call(update => update.transition(t)
//.attr("x", (d, i) => i * 16)),
//exit => exit
//.attr("stroke", "brown")
//.call(exit => exit.transition(t)
//.attr("y", 30)
//.remove())

// yield svg.node();
// await Promises.tick(2500);

// SELECT_ALL
//JOIN_DATA
//RENDER_ELEMENTS

} 