import { returnData } from '../data/data';

export default class d3 {

  constructor() {
    // Set up the display area
    const margin = { top: 20, right: 50, bottom: 20, left: 50 };
    const width = window.innerWidth - margin.right - margin.left;
    const height = window.innerHeight - margin.top - margin.bottom;

    const displayArea = d3.select("main")
      .append("svg")
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(50, ${height / 2})`)

    // set up the data structure
    debugger
    const allData = returnData();
    if (allData.length !== 0) {
      const hierarchicalData = d3.stratify()
        .id((d) => { return d.id })
        .parentId((d) => { return d.parentId })
        (allData);

      const tree = (data) => {
        data.dx = 30;
        data.dy = width / (data.height + 1);
        return d3.tree().nodeSize([data.dx, data.dy])(data);
      }

      const dataTree = tree(hierarchicalData);

      // TESTING//
      console.log(dataTree.descendants());
      ////////////

      // Add nodes for each descendant in the tree
      const circles = displayArea.append("g").selectAll("circle")
        .data(dataTree.descendants());

      circles.enter().append("circle")
        .attr("cx", d => { return d.y })
        .attr("cy", d => { return d.x })
        .attr("r", 3);

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
    }
  }
}