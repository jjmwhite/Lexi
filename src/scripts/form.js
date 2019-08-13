import { handleRootResponse } from './root_reponse_handling'

const form = document.getElementById('search-form')
const wordTree = document.getElementById('word-tree')
let query;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  while (wordTree.firstChild) {
    wordTree.removeChild(wordTree.firstChild)
  }
  
  query = document.getElementById('search-field').value

  const apiKey = '9451e38b-3466-430f-92df-a7a61487cf03'
  let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`;

  fetch(url)
    .then(response => { 
      return response.json() })
    .then( jsonResponse => {
      handleRootResponse(jsonResponse)})
    .catch(error => {
      console.log(error)})
})