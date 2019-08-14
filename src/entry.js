import { returnData } from './data/data';

const allData = returnData();

// Set up the display area
const displayArea = d3.select("main")
                      .append("svg")
                      .attr("width", 1000)
                      .attr("height", 1000)
                      .append("g").attr("transform", "translate(250,100)")

const hierarchicalData = d3.stratify()
                           .id( (d) => {return d.id} )
                           .parentId( (d) => {return d.parentId} )
                           (allData);

const tree = d3.tree().size([400, 400])
  // .separation((a, b) => { return (a.parent === b.parent ? 5 : 10) });

const dataTree = tree(hierarchicalData);

// TESTING//
  console.log(dataTree.descendants());
  console.log(dataTree.links());
////////////

// Add nodes for each descendant in the tree
const circles = displayArea.append("g").selectAll("circle")
                             .data(dataTree.descendants());
                      
circles.enter().append("circle")
             .attr("cx", d => { return d.y })
             .attr("cy", d => { return d.x })
             .attr("r", 5);

// Add paths between each node
const connections = displayArea.append("g").selectAll("path")
                               .data(dataTree.links());

connections.enter().append("path")
                   .attr("d", d3.linkHorizontal()
                   .x(d => d.y)
                   .y(d => d.x));

const words = displayArea.append("g").selectAll("text")
                         .data(dataTree.descendants());

words.enter().append("text")
             .text( d => { return d.data.word })
             .attr("x", d => { return d.y-5 })
             .attr("y", d => { return d.x-10 })