import { idGenerator } from './node_utilities'
import d3Display from '../d3/d3_movement';

export const handleRootResponse = (jsonResponse) => {
  // this is an array of one object: the root word
  const data = JSON.parse(sessionStorage.getItem('data'))
  const root = data[0];

  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach( type => {
      if (type.meta.id === root.word) {
        let rootChildObj = {};
        rootChildObj['id'] = idGenerator();
        rootChildObj['parentId'] = 1;
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
      }
    })
  } else {
    let errorNode = {};
    errorNode['id'] = idGenerator();
    errorNode['parentId'] = 1;
    errorNode['wordType'] = '';
    errorNode['word'] = 'We\'re sorry, but the word you entered isn\'t in the thesaurus.';
    data.push(errorNode)
  }
  
  sessionStorage.setItem('data', JSON.stringify(data))

  d3Display(data);

}