import { fetchChildNode } from './fetch_child_node';

export const createNode = (elementType) => {
  return document.createElement(elementType);
}

export const addClickListener = () => {
  document.addEventListener('click', (e) => {
    e.stopImmediatePropagation();
    const target = e.target.innerText;
    let wordType;
    e.path.forEach(el => {
      if (el.className == 'word-type') { 
        wordType =  el.id
      }
    })
    const parentId = e.target.id
    fetchChildNode(target, wordType, parentId)
  }
  )
}

export const idGenerator = () => {
  return Math.floor(Math.random() * Math.floor(10000))
}