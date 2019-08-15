import { idGenerator } from './node_utilities'
import d3Display from '../d3/d3';

export const fetchChildNode = (args) => {
  debugger
  const query = args.data.word;
  const parentId = args.data.id;
  const wordType = args.data.wordType;

  const apiKey = '9451e38b-3466-430f-92df-a7a61487cf03'
  let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`;

  fetch(url)
    .then(response => { return response.json() })
    .then(jsonResponse => {
      debugger
      handleChildResponse(jsonResponse, wordType, parentId)
    })
    .catch(error => console.log(error))
}

const handleChildResponse = (jsonResponse, wordType, parentId) => {

  const data = JSON.parse(sessionStorage.getItem('data'));
  debugger

  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach(type => {
      debugger
      if (type.fl === wordType) {
        type.meta.syns[0].map( (syn) => {
          debugger
          let childNode = {};
          childNode['id'] = idGenerator();
          childNode['parentId'] = parentId;
          childNode['wordType'] = wordType;
          childNode['word'] = syn;
          
          data.push(childNode);
        })
      }
    })
  } else {
    let errorNode = {};
    errorNode['id'] = idGenerator();
    errorNode['parentId'] = parentId;
    errorNode['wordType'] = '';
    errorNode['word'] = 'We\'re sorry, but the word you entered isn\'t in the thesaurus.';
    data.push(errorNode)
  }

  sessionStorage.setItem('data', JSON.stringify(data))
  debugger

  d3Display(data);
}