import { idGenerator } from './node_utilities';
import { createErrorNode } from './create_error_node';
import d3Display from '../d3/d3';
const axios = require('axios');

export const fetchChildNode = (args) => {
  const { word: query, id: parentId, word: parentWord, wordType } = args.data;

  axios.get(`/search/${query}`)
    .then( jsonResponse => {
      const results = jsonResponse.data 
      handleChildResponse(results, wordType, parentId, parentWord)
    })
    .catch(error => console.log(error));
};

const handleChildResponse = (jsonResponse, wordType, parentId, parentWord) => {
  const data = JSON.parse(sessionStorage.getItem('data'));
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach(type => { 
      if (type.fl === wordType && type.hwi.hw === parentWord) {
        type.meta.syns[0].map( (syn) => {
          let childNode = {
            id: idGenerator(),
            parentId,
            wordType,
            word: syn,
            def: 'click to see definition and synonyms'
          };
          data.push(childNode);
        });
        data.forEach( d => {
          if (d.id === parentId && d.def === 'click to see definition and synonyms') { d.def = type.shortdef[0] }
        });
      };
    });
  } else {
    let errorNode = createErrorNode(parentWord);
    data.push(errorNode);
  }

  sessionStorage.setItem('data', JSON.stringify(data));
  d3Display(data);
}