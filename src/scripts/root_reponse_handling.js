import { createNode, addClickListener, idGenerator } from './node_utilities'
import { returnData } from '../data/data';
import { merge } from 'lodash';

export const handleRootResponse = (jsonResponse) => {
  // const root = document.getElementById('word-tree')
  
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach( type => {
      // let wordType = type.fl
      // let rootChild = createNode('li')
      // rootChild.innerHTML = wordType;
      // rootChild.className = 'word-type';
      // rootChild.id = `${wordType}`;
  
      // debugger
      let rootChildObj = {};
      rootChildObj['id'] = idGenerator();
      rootChildObj['parentId'] = '';
      rootChildObj['wordType'] = type.fl;
      rootChildObj['word'] = type.fl;
      rootChildObj['def'] = '';
      rootChildObj['children'] = [];
      
      // debugger

      let syns = type.meta.syns[0];
      while (syns.length) {
        let childNode = {};
        childNode['id'] = idGenerator();
        childNode['parentId'] = rootChildObj.id;
        childNode['wordType'] = rootChildObj.wordType;
        childNode['word'] = syns.shift();
        childNode['def'] = '';

        rootChildObj['children'].push(childNode);
      }

      merge(allData, rootChildObj);


      // let synList = createNode('ul');
      // type.meta.syns[0].map( (syn) => {
      //   let subLi = createNode('li')
      //   subLi.innerHTML = syn;
      //   subLi.id = idGenerator();
      //   subLi.onclick = () => addClickListener();
      //   synList.append(subLi);
      // })
  
      // rootChild.append(synList);
      // root.append(rootChild)
    })
  } else {
    let error = createNode('li')
    error.innerHTML = 'We\'re sorry, but the word you entered isn\'t in the thesaurus.';
    root.append(error)
  }

}