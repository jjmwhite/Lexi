// export function collapse(d) {
//   if (d.children) {
//     d._children = d.children;
//     d._children.forEach(child => { collapse(child) })
//     d.children = null;
//   }
// }

// export function expand(d) {
//   if (d.children) {
//     d._children = d.children;
//     d.children = null;
//   } else {
//     d.children = d._children;
//     d._children = null;
//   }
//   update(d)
// }