import { handleRootResponse } from './root_reponse_handling'
import { closeUserGuide } from '../user_guide/user_guide';

const form = document.getElementById('search-form')
let query;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  closeUserGuide();
  d3.select('svg').remove();

  const searchField = document.getElementById('search-field')
  let query = searchField.value.toLowerCase().split('');
  const charsToEscape = { 
    '!': '!', '@': '@', '#': '#', '$': '$', '%': '%',
    '^': '^', '&': '&', '*': '*', '(': '(', ')': ')', 
    '{': '{', '}': '}', '[': '[', ']': ']', '|': '|', 
    '\\': '\\', '/': '/', '?': '?', '<': '<', '>': '>',
    '~': '~', '`': '`', '_': '_', '+': '+', '=': '=', '"': '"'
  }
  for (let i = 0; i < query.length; i++) {
    if (query[i] in charsToEscape) {
      query[i] = '';
    }
  }

  query = query.join('')

  const apiKeys = {
    '1': '9451e38b-3466-430f-92df-a7a61487cf03',
    '2': 'ff542579-97aa-4a0b-a129-cefcb73178e2',
    '3': '5aa03b1d-430f-48b9-8356-d89d877f72bd',
    '4': 'd48a06f9-080c-46d4-90a9-e5f595800391'
  } 

  function getRandomKey() {
    return Math.floor(Math.random() * 4 + 1)
  }
  let apiKey = apiKeys[getRandomKey()]
  
  let url = `https://dictionaryapi.com/api/v3/references/thesaurus/json/${query}?key=${apiKey}`;

  const root = {};
  root['id'] = '_1';
  root['parentId'] = '';
  root['wordType'] = '';
  root['word'] = query;

  sessionStorage.setItem('data', JSON.stringify([root]))

  fetch(url)
    .then(response => { return response.json() })
    .then( jsonResponse => { handleRootResponse(jsonResponse) })
    .then(searchField.value = '')
    .catch(error => { console.log(error) })
})