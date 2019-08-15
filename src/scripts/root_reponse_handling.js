import { idGenerator } from './node_utilities'
import d3Display from '../d3/d3';

export const handleRootResponse = (jsonResponse) => {
  // this is an array of one object: the root word
  const data = JSON.parse(sessionStorage.getItem('data'))

  debugger
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach( type => {
      let rootChildObj = {};
      rootChildObj['id'] = idGenerator();
      rootChildObj['parentId'] = 1;
      rootChildObj['wordType'] = type.fl;
      rootChildObj['word'] = type.fl;
      data.push(rootChildObj)
      debugger

      let syns = type.meta.syns[0];
      while (syns.length) {
        let childNode = {};
        childNode['id'] = idGenerator();
        childNode['parentId'] = rootChildObj.id;
        childNode['wordType'] = rootChildObj.wordType;
        childNode['word'] = syns.shift();

        data.push(childNode)
        debugger
      }
    })
  } else {
    let errorNode = {};
    errorNode['id'] = idGenerator();
    errorNode['parentId'] = 1;
    errorNode['wordType'] = '';
    errorNode['word'] = 'We\'re sorry, but the word you entered isn\'t in the thesaurus.';
    data.push(errorNode)
    debugger
  }
  
  debugger
  sessionStorage.setItem('data', JSON.stringify(data))
  debugger

  d3Display(data);

}