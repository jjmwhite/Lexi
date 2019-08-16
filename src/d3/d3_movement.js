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
  // d3.select('svg').remove();

  // Set up the display area
  const margin = { top: 20, right: 50, bottom: 20, left: 50 };
  const width = window.innerWidth - margin.right - margin.left;
  const height = window.innerHeight - margin.top - margin.bottom;

  const displayArea = d3.select("main")
    .append("svg")
    .attr("viewBox", [-10, -10, width, height])
    .append("g")
    .attr("transform", `translate(50, 0)`)

  // set up the data structure
  if (data.length !== 0) {
    const tree = d3.tree().size([width, height]);
    const renderLink = d3.linkHorizontal().x(d => {
      debugger
      d.y}).y(d => d.x);
    const hierarchicalData = d3.stratify()
      .id((d) => { return d.id })
      .parentId((d) => { return d.parentId })
      (data);
    
    const dataTree = tree(hierarchicalData)
    const nodes = dataTree.descendants()
    const links = dataTree.links();


    // TESTING//
    console.log(dataTree.descendants());
    ////////////

    // Add nodes for each descendant in the tree
    let node = displayArea.append("g").selectAll(".circle")
    let link = displayArea.append("g").selectAll(".link")

    node = node.data(nodes);
    node = node.enter().append("circle")
      .attr("class", "node")
      .attr("cx", d => d.parent ? d.parent.py : d.py = d.y)
      .attr("cy", d => d.parent ? d.parent.px : d.px = d.x)
      .attr("r", 4)
      .merge(node);

    // debugger

    d3.selectAll("circle")
      .on("click", d => { fetchChildNode(d) })
      .on("mouseover", handleMouseover)
      .on("mouseout", handleMouseout)

    // debugger

    // Add paths between each node
    
    // sets parent node coordinates as entry coordinates
    debugger
    // look at const links = dataTree.links();
    link = link.data(links);
    link = link.enter().insert("path", ".node")
      .attr("class", "link")
      .attr("d", d => {
        debugger // d.source.
        const parentLoc = { x: d.source.py, y: d.source.px }
        return renderLink({ source: parentLoc, target: parentLoc })
      })
      .merge(link)
    
    debugger
    
    const animation = displayArea.transition()
      .duration(600);
    
    debugger

    link.transition(animation)
      .attr("d", d => {
        debugger
        renderLink});

    debugger

    node.transition(animation)
      .attr("cx", d => d.py = d.y)
      .attr("cy", d => d.px = d.x)
    

    // Add words and position relative to nodes
    // const words = displayArea.append("g").selectAll("text")
    //   .data(dataTree.descendants());

    // words.enter().append("text")
    //   .text(d => { return d.data.word })
    //   .attr("x", d => { return d.y + 10 })
    //   .attr("y", d => { return d.x + 5 })
    //   .on("mouseover", function (d) {
    //     if (d.data.def) {
    //       showDef.text(d.data.def)
    //       return showDef.style("visibility", "visible")
    //     }
    //   })
    //   .on("mousemove", function () {
    //     return showDef.style("top", (d3.event.clientY + 20) + "px").style("left", (d3.event.clientX - 180) + "px")
    //   })
    //   .on("mouseout", function () {
    //     return showDef.style("visibility", "hidden")
    //   })
  }
}