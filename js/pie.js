const data = [
  { platform: "Android", percentage: 40.11 },
  { platform: "Windows", percentage: 36.69 },
  { platform: "iOS", percentage: 13.06 }
];

const svgWidth = 500;
const svgHeight = 300;
const radius = Math.min(svgWidth, svgHeight) / 2;

const svg = d3
  .select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Create group element to hold pie chart
const g = svg
  .append("g")
  .attr("transform", `translate(${svgWidth / 2}, ${radius})`);

const color = d3.scaleOrdinal(d3.schemeCategory10);

const pie = d3.pie().value(d => d.percentage);

console.log("pie data:", pie(data));

const path = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius / 2);

const arc = g
  .selectAll()
  .data(pie(data))
  .enter()
  .append("g");

arc
  .append("path")
  .attr("d", path)
  .attr("fill", d => color(d.data.percentage));

const label = d3
  .arc()
  .outerRadius(radius)
  .innerRadius(radius / 2);

console.log(label);

arc
  .append("text")
  .attr("transform", d => `translate(${label.centroid(d)})`)
  .attr("text-anchor", "middle")
  .text(d => `${d.data.platform}: ${d.data.percentage}%`)
  .attr("fill", "#fff");
