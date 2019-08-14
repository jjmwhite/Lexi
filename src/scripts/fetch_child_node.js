import { createNode, addClickListener, idGenerator } from './node_utilities'
import { allData } from '../data/data';
import { merge } from 'lodash';

export const fetchChildNode = (syn, wordType, parentId) => {
  const query = syn

  const apiKey = '9451e38b-3466-430f-92df-a7a61487cf03'
  let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`;

  fetch(url)
    .then(response => { return response.json() })
    .then(jsonResponse => {
      handleChildResponse(jsonResponse, wordType, parentId)
    })
    .catch(error => console.log(error))
}

const handleChildResponse = (jsonResponse, wordType, parentId) => {
  let parentEle = document.getElementById(parentId)
  if (jsonResponse[0] instanceof Object) {
    jsonResponse.forEach(type => {
      let synList = createNode('ul');
      if (type.fl == wordType) {
        type.meta.syns[0].map( (syn) => {
          let subLi = createNode('li')
          subLi.innerHTML = syn;
          subLi.onclick = () => addClickListener();
          subLi.id = idGenerator();
          synList.append(subLi);
        })
      }
      parentEle.append(synList);
    })
  } else {
    let error = createNode('li')
    error.innerHTML = 'We\'re sorry, but the word you entered isn\'t in the thesaurus.';
    parentEle.append(error)
  }
}