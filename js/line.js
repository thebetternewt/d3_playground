const now = new Date();

const padNum = (n, numFigs) => {
  const missingFigs = numFigs - n.toString().length;
  let prefix = "";
  for (let i = 0; i < missingFigs; i++) {
    prefix = prefix + "0";
  }

  return `${prefix}${n}`;
};

const prettyDate = `${now.getFullYear()}-${padNum(now.getMonth(), 2)}-${padNum(
  now.getDate(),
  2
)}`;

console.log("date:", prettyDate);

// API endpoint to fetch historical data of Bitcoin Price Index
const api = `https://api.coindesk.com/v1/bpi/historical/close.json?start=2019-01-01&end=${prettyDate}`;

// Load data from API after DOM content has been loaded.
document.addEventListener("DOMContentLoaded", e => {
  fetch(api)
    .then(res => res.json())
    .then(data => {
      console.log("data:", data);
      const parsedData = parseData(data);
      drawChart(parsedData);
    });
});

/**
 * Parse data in key-value pairs
 * @Param {object} data object containing historical data of BPI
 */

const parseData = data => {
  const formattedData = [];
  for (item in data.bpi) {
    formattedData.push({
      date: new Date(item),
      value: +data.bpi[item] // Coerce value to number.
    });
  }
  console.log(formattedData);
  return formattedData;
};

/**
 * Create a chart usind D3
 */
const drawChart = data => {
  const svgWidth = 600;
  const svgHeight = 400;
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  const g = d3
    .select("svg")
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const x = d3.scaleTime().rangeRound([0, width]);

  const y = d3.scaleLinear().rangeRound([height, 0]);

  const line = d3
    .line()
    .x(d => x(d.date))
    .y(d => y(d.value));
  x.domain(d3.extent(data, d => d.date));
  y.domain(d3.extent(data, d => d.value));

  g.append("g")
    .attr("transform", `translate(0,${height})`)
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "#000")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71rem")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
};
