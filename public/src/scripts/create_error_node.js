import { idGenerator } from './node_utilities';

export const createErrorNode = (word) => {
  let errorNode = {
    id: idGenerator(),
    parentId: '_1',
    wordType: '',
    word: `Sorry, no synonyms for ${word}.`
  };
  return errorNode;
};
