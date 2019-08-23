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

  const apiKey = '9451e38b-3466-430f-92df-a7a61487cf03'
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