import { idGenerator } from './node_utilities'
import { createErrorNode } from './create_error_node';
import d3Display from '../d3/d3';

export const fetchChildNode = (args) => {
  // TODO: aliased destructuring
  // const { word: query, id: parentId, parentWord, wordType } = args.data;
  const query = args.data.word;
  const parentId = args.data.id;
  const parentWord = args.data.word
  const wordType = args.data.wordType;


  const apiKey = '9451e38b-3466-430f-92df-a7a61487cf03'
  let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`;

  console.log('fetch child');
  fetch(url)
    .then(response => { return response.json() })
    .then(jsonResponse => {   
      handleChildResponse(jsonResponse, wordType, parentId, parentWord)
    })
    .catch(error => console.log(error))
}

const handleChildResponse = (jsonResponse, wordType, parentId, parentWord) => {
  const data = JSON.parse(sessionStorage.getItem('data'));
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach(type => { 
      if (type.fl === wordType && type.hwi.hw === parentWord) {
        type.meta.syns[0].map( (syn) => {
          let childNode = {};
          childNode['id'] = idGenerator();
          childNode['parentId'] = parentId;
          childNode['wordType'] = wordType;
          childNode['word'] = syn;
          childNode['def'] = 'click to see definition and synonyms';
          data.push(childNode);
        })
        data.forEach( d => {
          if (d.id === parentId && d.def === 'click to see definition and synonyms') { d.def = type.shortdef[0] }
        })
      }
    })
  } else {
    let errorNode = createErrorNode(parentWord);
    data.push(errorNode)
  }

  sessionStorage.setItem('data', JSON.stringify(data))

  d3Display(data);
}