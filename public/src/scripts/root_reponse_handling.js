import { idGenerator } from './node_utilities';
import { createErrorNode } from './create_error_node';
import d3Display from '../d3/d3';

export const handleRootResponse = (jsonResponse) => {
  // this is an array of one object: the root word
  const data = JSON.parse(sessionStorage.getItem('data'))
  const root = data[0];
  const results = jsonResponse.data
  if (results[0] instanceof Object) {
    debugger
    results.forEach((type, idx) => {
      if (type.hwi.hw === root.word) {
        let rootChildObj = {
          id: idGenerator(),
          parentId: "_1",
          wordType: type.fl,
          word: type.fl,
          def: type.shortdef
        };
        data.push(rootChildObj);

        let syns = type.meta.syns[0];
        while (syns.length) {
          let childNode = {
            id: idGenerator(),
            parentId: rootChildObj.id,
            wordType: rootChildObj.wordType,
            word: syns.pop(),
            def: 'click to see definition and synonyms'
          };
          data.push(childNode);
        }
      } else if ((type.hwi.hw !== root.word && idx === 0)) {
        let errorNode = createErrorNode(root.word);
        data.push(errorNode);
      }
    })
  } else {
    let errorNode = createErrorNode(root.word);
    data.push(errorNode);
  }

  sessionStorage.setItem('data', JSON.stringify(data));
  d3Display(data);
};
