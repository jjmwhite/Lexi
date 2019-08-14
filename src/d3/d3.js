import allData from '../data/data';

// const wordTree = d3.select('.word-tree')
//                    .append('svg')
//                    .attr('width', 2000)
//                    .attr('height', 1000)
//                    .append('g').attr('transform', 'translate(100,500)')



// const heirarchicalData = d3.stratify()
//                         .id( (d) => { return d.child } )
//                         .parentId( (d) => { return d.parent } )
//                         (allData);

// const tree = d3.tree()
//                .size([2000,1000])
//               //  .size([height*3, width*2])
//                .separation( (a ,b) => { return (a.parent === b.parent ? 5 :  10) });

// const dataTree = tree(heirarchicalData);

// console.log(dataTree.descendents());
// console.log(dataTree.links());

// tree(root);
