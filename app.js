const express = require('express');
const path = require('path');
const fetch = require('node-fetch');
const PORT = process.env.PORT || 5500;

const app = express();
app.use(express.static('public'));

app.get('/', (request, response) => {
  response.sendFile(path.join(__dirname, './public/index.html'))
});

app.get('/search/:query', (request, response) => {
  fetch(`https://dictionaryapi.com/api/v3/references/thesaurus/json/${request.params.query}?key=9451e38b-3466-430f-92df-a7a61487cf03`)
    .then(results =>  { return results.json() })
    .then(results => response.send(results))
})

app.listen(PORT, () => {
  console.log(__dirname);
  console.log(`listening on ${PORT}`)
})