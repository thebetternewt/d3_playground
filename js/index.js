// d3.select();
// d3.selectAll();

// d3.select("h1")
//   .style("color", "orange")
//   .attr("class", "heading")
//   .text("Updated h1 tag");

// d3.select("body")
//   .append("p")
//   .text("First Paragraph");
// d3.select("body")
//   .append("p")
//   .text("Second Paragraph");
// d3.select("body")
//   .append("p")
//   .text("Third Paragraph");

// d3.selectAll("p").style("color", "blue");

// const dataset = [1, 2, 3, 4, 5];

// d3.select("body")
//   .selectAll("p")
//   .data(dataset)
//   .enter()
//   .append("p")
//   // .text("D3 is awesome!");
//   .text(d => d);

////////////////////////////////////////
// Stylish bar chart
////////////////////////////////////////

// const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

// const svgWidth = 500;
// const svgHeight = 300;
// const barPadding = 5;
// const barWidth = (svgWidth - 40) / dataset.length;

// const svg = d3
//   .select("svg")
//   .attr("width", svgWidth)
//   .attr("height", svgHeight);

// const barChart = svg
//   .selectAll("rect")
//   .data(dataset)
//   .enter()
//   .append("rect")
//   .attr("y", d => svgHeight - d - 20)
//   .attr("height", d => d)
//   .attr("width", barWidth - barPadding)
//   // .attr("transform", (d, i) => {
//   //   const translate = [barWidth * i, 0];
//   //   return `translate(${translate})`;
//   // })
//   .attr("x", (d, i) => barWidth * i + 20)
//   .attr("fill", "#62ADFA")
//   .attr("ry", "3")
//   .attr("class", "bar");

// const text = svg
//   .selectAll("text")
//   .data(dataset)
//   .enter()
//   .append("text")
//   .text(d => d)
//   .attr("y", (d, i) => svgHeight - d - 22)
//   .attr("x", (d, i) => barWidth * i + 20)
//   .attr("fill", "#A64C38")
//   .attr("class", "label");

////////////////////////////////////////
// Scales
////////////////////////////////////////

// const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
const dataset = [1, 2, 3, 4, 15];

const svgWidth = 500;
const svgHeight = 300;
const barPadding = 5;
const barWidth = (svgWidth - 40) / dataset.length;

const svg = d3
  .select("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

const yScale = d3
  .scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, svgHeight - 40]);

const barChart = svg
  .selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr("y", d => svgHeight - yScale(d) - 20)
  .attr("height", d => yScale(d))
  .attr("width", barWidth - barPadding)
  .attr("transform", (d, i) => {
    const translate = [barWidth * i + 20, 0];
    return `translate(${translate})`;
  })
  .attr("fill", "#62ADFA")
  .attr("ry", "3")
  .attr("class", "bar");
