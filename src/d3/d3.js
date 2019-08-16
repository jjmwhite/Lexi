import { fetchChildNode } from '../scripts/fetch_child_node';

function handleMouseover() {
  d3.select(this)
    .transition()
    .duration(300)
    .attr('fill', '#7f1661')
    .attr('r', 7)
}

function handleMouseout() {
  d3.select(this)
    .transition()
    .duration(300)
    .attr('fill', '#420D33')
    .attr('r', 4)
}

const showDef = d3.select("main")
  .append("div")
  .style("position", "absolute")
  .style("z-index", 100)
  .style("visibility", "hidden")
  .style("background", "#ceadc5")
  .style("border-radius", "10px")
  .style("color", '#7f1661')
  .style("width", "150px")
  .style("padding", "5px")
  .style("font-family", "'Krub', sans-serif")
  .style('text-align', "left")
  .text("");

export default (data) => {
  d3.select('svg').remove();
    // Set up the display area
  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  // const width = window.innerWidth; --
  // const height = window.innerHeight; --
  // debugger

  // const width = window.innerWidth - margin.right - margin.left;
  // const height = window.innerHeight - margin.top - margin.bottom;

  // const displayArea = d3.select("main")
  //   .append("svg")
  //   .attr("viewBox", [0, 0, width, height])
  //   // .attr("heigh", height)
  //   // .attr("width", width)
  //   .append("g")
  //   .attr("transform", `translate(50, ${height / 2})`)
  const main = document.getElementsByTagName("main")[0]
  const width = main.clientWidth - margin.right - margin.left;
  const height = main.clientHeight - margin.top - margin.bottom;

  d3.select("main").append("svg")
  const displayArea = d3.select("svg")

  const treeLayout = d3.tree().size([height, width])

  const zoomImg = displayArea
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", [0, 0, (width + margin.right + margin.left), (height + margin.left + margin.right)])

    .append("g")

  // const g = zoomImg.append("g")
  //   .attr("transform", `translate(${margin.left}, ${margin.top})`)

  displayArea.call(d3.zoom()
    .on("zoom", () => {
      zoomImg.attr("transform", d3.event.transform)
    }))

  // set up the data structure
  if (data.length !== 0) {
    const hierarchicalData = d3.stratify()
      .id((d) => { return d.id })
      .parentId((d) => { return d.parentId })
      (data);

    // const tree = (data) => {
    //   data.dx = 30;
    //   data.dy = width / (data.height + 1);
    //   return d3.tree().nodeSize([data.dx, data.dy])(data);
    // }
    
    //tree size vs. node size?

    // const tree = (data) => d3.tree(data).size([height, width])

    const dataTree = treeLayout(hierarchicalData);
    // const dataTree = tree(hierarchicalData);

    // TESTING//
    console.log(dataTree.descendants());
    ////////////

    // Add nodes for each descendant in the tree
    const circles = displayArea.append("g").selectAll("circle")
      .data(dataTree.descendants());

    circles.enter().append("circle")
      .attr("cx", d => { return d.y })
      .attr("cy", d => { return d.x })
      .attr("r", 4);

    d3.selectAll("circle")
      .on("click", d => { fetchChildNode(d) })
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)

    // Add paths between each node
    const connections = displayArea.append("g").selectAll("path")
      .data(dataTree.links());

    connections.enter().append("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    // Add words and position relative to nodes
    const words = displayArea.append("g").selectAll("text")
      .data(dataTree.descendants());

    words.enter().append("text")
      .text(d => { return d.data.word })
      .attr("x", d => { return d.y - 5 })
      .attr("y", d => { return d.x - 10 })
      .on("mouseover", function(d) {
        if (d.data.def) {
          showDef.text(d.data.def)
          return showDef.style("visibility", "visible")
        }
      })
      .on("mousemove", function() {
        return showDef.style("top", (d3.event.clientY + 20) + "px").style("left", (d3.event.clientX - 180) + "px")
      })
      .on("mouseout", function(){
        return showDef.style("visibility", "hidden")
      })
  }
}