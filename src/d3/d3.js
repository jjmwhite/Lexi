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
  .style("color", '#420D33')
  .style("width", "150px")
  .style("padding", "8px")
  .style("font-family", "'Krub', sans-serif")
  .style("font-size", "14px")
  .style('text-align', "left")
  .text("");

const handleClick = (d) => {
  if (d.children === undefined) {
    fetchChildNode(d)
  }
}

export default (data) => {
  d3.select('svg').remove();
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const main = document.getElementsByTagName("main")[0]
  const width = main.clientWidth - margin.right - margin.left;
  const height = main.clientHeight - margin.top - margin.bottom;

  d3.select("main").append("svg")
  const displayArea = d3.select("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .attr("viewBox", [0, 0, (width + margin.right + margin.left), (height + margin.top + margin.bottom)])
    .append("g")

  const treeLayout = d3.tree().size([(height - margin.top), (width - margin.left - margin.right - 70)])

  // set up the data structure
  if (data.length !== 0) {
    const hierarchicalData = d3.stratify()
      .id((d) => { return d.id })
      .parentId((d) => { return d.parentId })
      (data);
    const dataTree = treeLayout(hierarchicalData)
    
    // Add nodes for each descendant in the tree
    const circles = displayArea.append("g").selectAll("circle")
      .data(dataTree.descendants())
 
    circles.enter().append("circle")
      .attr("cx", d => { return d.y + 10 })
      .attr("cy", d => { return d.x + 10 })
      .attr("r", 4)
      
    d3.selectAll("circle")
      .on("click", d => {  handleClick(d) })
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)

    // Add paths between each node
    const connections = displayArea.append("g").selectAll("path")
      .data(dataTree.links());

    connections.enter().append("path")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y + 10 )
        .y(d => d.x + 10 ));

    // Add words and position relative to nodes
    const words = displayArea.append("g").selectAll("text")
      .data(dataTree.descendants())
      
      words.enter().append("text")
      .text(d => { return d.data.word })
      .attr("x", d => { return d.y + 18 })
      .attr("y", d => { return d.x + 15 })
      .attr("font-size", function(d) { return `${1.05 - (0.01 * d.depth)}em` })
      .on("click", d => { handleClick(d) })
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