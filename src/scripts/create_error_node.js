import { idGenerator } from './node_utilities';

export const createErrorNode = (word) => {
  let errorNode = {};
  errorNode['id'] = idGenerator();
  errorNode['parentId'] = '_1';
  errorNode['wordType'] = '';
  errorNode['word'] = `Sorry, no synonyms for ${word}.`;
  return errorNode;
}