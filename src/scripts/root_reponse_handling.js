import { idGenerator } from './node_utilities'
import d3Display from '../d3/d3';
import { createErrorNode } from './create_error_node';

export const handleRootResponse = (jsonResponse) => {
  // this is an array of one object: the root word
  const data = JSON.parse(sessionStorage.getItem('data'))
  const root = data[0];
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach( type => {
      if (type.hwi.hw === root.word) {
        let rootChildObj = {};
        rootChildObj['id'] = idGenerator();
        rootChildObj['parentId'] = '_1';
        rootChildObj['wordType'] = type.fl;
        rootChildObj['word'] = type.fl;
        rootChildObj['def'] = type.shortdef[0];
        data.push(rootChildObj)

        let syns = type.meta.syns[0];
        while (syns.length) {
          let childNode = {};
          childNode['id'] = idGenerator();
          childNode['parentId'] = rootChildObj.id;
          childNode['wordType'] = rootChildObj.wordType;
          childNode['def'] = 'click to see definition and synonyms';
          childNode['word'] = syns.shift();
          data.push(childNode)
        }
      } else if ((type.hwi.hw !== root.word && jsonResponse.length === 1)) {
        let errorNode = createErrorNode(root.word);
        data.push(errorNode);
      }
    })
  } else {
    let errorNode = createErrorNode(root.word);
    data.push(errorNode);
  }
  
  sessionStorage.setItem('data', JSON.stringify(data))

  d3Display(data);

}