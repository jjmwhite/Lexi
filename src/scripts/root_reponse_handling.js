import { createNode, addClickListener, idGenerator } from './node_utilities'

export const handleRootResponse = (jsonResponse) => {
  const root = document.getElementById('word-tree')

  jsonResponse.forEach( type => {
    let wordType = type.fl
    let rootChild = createNode('li')
    rootChild.innerHTML = wordType;
    rootChild.className = 'word-type';
    rootChild.id = `${wordType}`;

    let synList = createNode('ul');
    type.meta.syns[0].map( (syn) => {
      let subLi = createNode('li')
      subLi.innerHTML = syn;
      subLi.id = idGenerator();
      subLi.onclick = () => addClickListener();
      synList.append(subLi);
    })

    rootChild.append(synList);
    root.append(rootChild)
  })
}