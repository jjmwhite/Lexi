import { fetchChildNode } from '../scripts/fetch_child_node';

export function renderTree(data, firstRender) {
  
  // set up view
  const margin = { top: 50, right: 50, bottom: 50, left: 50 };
  const main = document.getElementsByTagName("main")[0]
  const width = main.clientWidth - margin.right - margin.left;
  const height = main.clientHeight - margin.top - margin.bottom;

  // set up data structure
  const root = d3.stratify()
    .id((d) => { return d.id })
    .parentId((d) => { return d.parentId })
    (data);
    
  root.y = 10;
  root.x0 = (width / 12);
  root.y0 = 0;

  root.descendants().forEach((d) => {
    d._children = d.children;
  })

  let linkGroup;
  let nodeGroup;
  let svg;

  if (firstRender) {
    d3.select("main").append("svg")
    svg = d3.select("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("viewBox", [0, 0, (width + margin.right + margin.left), (height + margin.top + margin.bottom)])

    linkGroup = svg.append("g")
      .attr("id", "link-group")
      .attr("fill", "none")
      .attr("stroke", "#ceadc5")
      .attr("stroke-width", 1)
      .attr("opacity", ".8")
      .attr("transform", "translate(10, 0)")

    nodeGroup = svg.append("g")
      .attr("id", "node-group")
      .attr("cursor", "pointer")
      .attr("transform", "translate(10, 0)")
  }
  // else {
    debugger
    svg = d3.select("svg")
    linkGroup = d3.select("g#link-group")
    nodeGroup = d3.select("g#node-group")
  // }
  

  function update(data) {
    const nodes = root.descendants().reverse();
    const links = root.links();
    const duration = 200

    tree(root)

    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y
    })
    
    const node = nodeGroup.selectAll("g")
      .data(nodes, d => d.id);

    const nodeEnter = node.enter().append("g")
      .attr("transform", d => {
        debugger
        return `translate(${d.y0 + 10}, ${d.x0 + 10})`
      })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .on("click", d => {
        debugger
        d.children = d.children ? null : d._children;
        update(d);
      })

    nodeEnter.append("circle")
      .attr("r", 5)

    nodeEnter.append("text")
      .text(d => { return d.data.word })
      .attr("x", 15)
      .attr("y", d => "0.33em")
      .attr("font-size", function (d) { return `${1.05 - (0.01 * d.depth)}em` })
      .on("click", d => { fetchChildNode(d) })
      .on("mouseover", function (d) {
        if (d.data.def) {
          showDef.text(d.data.def)
          return showDef.style("visibility", "visible")
        }
      })
      .on("mousemove", function () {
        return showDef.style("top", (d3.event.clientY + 20) + "px").style("left", (d3.event.clientX - 180) + "px")
      })
      .on("mouseout", function () {
        return showDef.style("visibility", "hidden")
      })

    const nodeUpdate = node.merge(nodeEnter).transition(duration)
      .attr("transform", d => {
        return `translate(${d.y}, ${d.x})`
      })
      .attr("fill-opacity", 1)
      .attr("stroke-opacity", 1)

    const nodeExit = node.exit().transition(duration)
      .attr("transform", d => { return `translate(${data.y0}, ${data.x0})` })
      .attr("fill-opacity", 0)
      .attr("stroke-opacity", 0)
      .remove()

    const link = linkGroup.selectAll("path")
      .data(links, d => d.target.id)

    const linkEnter = link.enter().append("path")
      .attr("d", d => {
        const pos = { x: data.x0, y: data.y0 }
        return renderLink({ source: pos, target: pos })
      })

    link.merge(linkEnter).transition(duration)
      .attr("d", renderLink);

    link.exit().transition(duration)
      .attr("d", d => {
        const pos = { x: data.x0, y: data.y0 }
        return renderLink({ source: pos, target: pos })
      })
      .remove()

    root.eachBefore(d => {
      d.x0 = d.x;
      d.y0 = d.y
    })
  }
  
  update(root)

  return svg.node();
}

const renderLink = d3.linkHorizontal()
  .x(d => d.y)
  .y(d => d.x);

const margin = { top: 50, right: 50, bottom: 50, left: 50 };
const main = document.getElementsByTagName("main")[0]
const width = main.clientWidth - margin.right - margin.left;
const height = main.clientHeight - margin.top - margin.bottom;

const tree = d3.tree()
  .size([(height - margin.top), (width - margin.left - margin.right - 70)])
// .nodeSize([10, width / 2])


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
