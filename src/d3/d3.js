import { fetchChildNode } from '../scripts/fetch_child_node';
import { Transform } from 'stream';
// import updateStructure from './collapsible';

export default (data) => {
  d3.select('svg').remove();
    // Set up the display area
  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const width = window.innerWidth - margin.right - margin.left;
  const height = window.innerHeight - margin.top - margin.bottom;

  const displayArea = d3.select("main")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(50, ${height / 2})`)

  // set up the data structure
  const hierarchicalData = d3.stratify()
    .id((d) => { return d.id })
    .parentId((d) => { return d.parentId })
    (data);

  const tree = (data) => {
    // data.dx = height / 2;
    // data.dy = 0;
    data.dx = height / (data.height * 8);
    data.dy = width / (data.height + 4);
    return d3.tree().nodeSize([data.dx, data.dy])(data);
  }

  hierarchicalData.children.forEach(child => { collapse(child) });

  updateStructure(hierarchicalData);

  function updateStructure (newData) {
    const dataTree = tree(newData);
    const nodes = dataTree.descendants();
    const links = dataTree.descendants().slice(1);

    // set the y intercept for each node relative to its depth
    nodes.forEach((node) => {
      node.y = node.depth * 180
    })

    let node = displayArea.selectAll("g.node")
      .data(nodes, function(d) { return d.id })

    // enter new nodes in the parent's previous position
    const nodeEnter = node.enter()
      .append('g')
      .attr("transform", function(d){
        debugger
        return "translate(" + source.dx + "," + source.dy + ")";
      })
      .on("click", toggleChildren)
      
      // const circles = displayArea.append("g").selectAll("circle")
      //   .data(dataTree.descendants());
      
      // circles.enter().append("circle")
      //   .attr("cx", d => { return d.y })
      //   .attr("cy", d => { return d.x })
      //   .attr("r", 5);

    nodeEnter.append("circle")
      .attr("class", "node")
      .attr("r", 1e-6)
    
      // can I attach to circles above?
    d3.selectAll("circle")
      .on("click", d => { fetchChildNode(d) })
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)

    const nodeUpdate = nodeEnter.merge(node);

    nodeUpdate.transition()
      .duration(600)
      .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";
      });

    debugger
    nodeUpdate.select("circle.node")
      .attr("r", 5)
    
    const nodeExit = node.exit().transition()
      .duration(600)
      .attr("transform", function(d) {
        debugger
        return "translate(" + source.y + "," + source.x + ")";
      })
      .remove();

    nodeExit.select("circle")
      .attr("r", 1e-6)

    nodeExit.select("text")
      .style("fill-opacity", 1e-6);
    
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
  
    d3.selectAll("text")
      .on("hover", e => {
      })
  }

  
  //could be imported?
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(child => { collapse(child) })
      d.children = null;
    }
  }

  function toggleChildren(d) {
    if (d.children) {
      d._children = d.children;
      d.children = null;
    } else {
      d.children = d._children;
      d._children = null;
    }
    update(d)
  }

  function handleMouseover() {
    d3.select(this)
      .transition()
      .duration(100)
      .attr('r', 8)
      .attr('fill', '#7f1661')
  }

  function handleMouseout() {
    d3.select(this)
      .transition()
      .duration(100)
      .attr('r', 5)
      .attr('fill', '#420D33')
  }
}

// special thanks to these d3 resources and animation tutorials:
// 
// https://bl.ocks.org/d3noob/43a860bc0024792f8803bba8ca0d5ecd
// 