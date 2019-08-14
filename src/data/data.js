const data = [
  {
    "id": 1,
    "parentId": "",
    "wordType": "",
    "word": "test"
  },
  {
    "id": 100,
    "parentId": 1,
    "wordType": "noun",
    "word": "noun"
  },
  {
    "id": 101,
    "parentId": 100,
    "wordType": "noun",
    "word": "experiment"
  },
  {
    "id": 102,
    "parentId": 100,
    "wordType": "noun",
    "word": "exam"
  },
  {
    "id": 103,
    "parentId": 100,
    "wordType": "noun",
    "word": "trial"
  },
  {
    "id": 106,
    "parentId": 103,
    "wordType": "noun",
    "word": "experiment"
  },
  {
    "id": 107,
    "parentId": 103,
    "wordType": "noun",
    "word": "effort"
  },
  {
    "id": 104,
    "parentId": 1,
    "wordType": "verb",
    "word": "verb"
  },
  {
    "id": 105,
    "parentId": 104,
    "wordType": "verb",
    "word": "try"
  }
];

export const returnData = () => {
  return data;
};



// {
//   "100": {
//     "id": 100,
//     "parentId": "",
//     "wordType": "noun",
//     "word": "noun",
//     "children": [
//       {
//         "data": {
//           "id": 101,
//           "parentId": 100,
//           "wordType": "noun",
//           "word": "experiment",
//           "children": []
//         }
//       },
//       {
//         "data": {
//           "id": 102,
//           "parentId": 100,
//           "wordType": "noun",
//           "word": "exam",
//           "children": []
//         }
//       },
//       {
//         "data": {
//           "id": 103,
//           "parentId": 100,
//           "wordType": "noun",
//           "word": "trial",
//           "children": [
//             {
//               "data": {
//                 "id": 106,
//                 "parentId": 103,
//                 "wordType": "noun",
//                 "word": "experiment",
//                 "children": []
//               }
//             },
//             {
//               "data": {
//                 "id": 107,
//                 "parentId": 103,
//                 "wordType": "noun",
//                 "word": "effort",
//                 "children": []
//               }
//             },
//           ]
//         }
//       }
//     ]
//   },
//   "data": {
//     id: 104,
//     "parentId": "",
//     "wordType": "verb",
//     "word": "verb",
//     "children": [
//       {
//         "data": {
//           "id": 105,
//           "parentId": 104,
//           "wordType": "verb",
//           "word": "try",
//           "children": []
//         }
//       }
//     ]
//   }
// };

