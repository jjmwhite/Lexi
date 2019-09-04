import { handleRootResponse } from './root_reponse_handling'
import { closeUserGuide } from './user_guide';
const axios = require('axios');

const form = document.getElementById('search-form');
let query;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  closeUserGuide();
  d3.select('svg').remove();

  const searchField = document.getElementById('search-field');
  query = searchField.value.toLowerCase().split('');
  const charsToEscape = { // TODO use Sets maybe
    '!': '!', '@': '@', '#': '#', '$': '$', '%': '%',
    '^': '^', '&': '&', '*': '*', '(': '(', ')': ')', 
    '{': '{', '}': '}', '[': '[', ']': ']', '|': '|', 
    '\\': '\\', '/': '/', '?': '?', '<': '<', '>': '>',
    '~': '~', '`': '`', '_': '_', '+': '+', '=': '=', '"': '"'
  }
  for (let i = 0; i < query.length; i++) {
    if (query[i] in charsToEscape) {
      query[i] = '';
    };
  };

  query = query.join('');

  const root = {
    id: '_1',
    parentId: '',
    wordType: '',
    word: query
  };

  sessionStorage.setItem('data', JSON.stringify([root]));
  
  axios.get(`/search/${query}`)
    .then(handleRootResponse)
    .then(searchField.value = '')
    .catch(console.log);
});