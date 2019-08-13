/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/entry.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _form = __webpack_require__(/*! ./scripts/form */ \"./src/scripts/form.js\");\n\nvar _form2 = _interopRequireDefault(_form);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/scripts/fetch_child_node.js":
/*!*****************************************!*\
  !*** ./src/scripts/fetch_child_node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.fetchChildNode = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar fetchChildNode = exports.fetchChildNode = function fetchChildNode(syn, wordType, parentId) {\n  var query = syn;\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query + '?key=' + apiKey;\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    handleChildResponse(jsonResponse, wordType, parentId);\n  }).catch(function (error) {\n    return console.log(error);\n  });\n};\n\nvar handleChildResponse = function handleChildResponse(jsonResponse, wordType, parentId) {\n  var parentEle = document.getElementById(parentId);\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      var synList = (0, _node_utilities.createNode)('ul');\n      if (type.fl == wordType) {\n        type.meta.syns[0].map(function (syn) {\n          var subLi = (0, _node_utilities.createNode)('li');\n          subLi.innerHTML = syn;\n          subLi.onclick = function () {\n            return (0, _node_utilities.addClickListener)();\n          };\n          subLi.id = (0, _node_utilities.idGenerator)();\n          synList.append(subLi);\n        });\n      }\n      parentEle.append(synList);\n    });\n  } else {\n    var error = (0, _node_utilities.createNode)('li');\n    error.innerHTML = 'We\\'re sorry, but the word you entered isn\\'t in the thesaurus.';\n    parentEle.append(error);\n  }\n};\n\n//# sourceURL=webpack:///./src/scripts/fetch_child_node.js?");

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _root_reponse_handling = __webpack_require__(/*! ./root_reponse_handling */ \"./src/scripts/root_reponse_handling.js\");\n\nvar form = document.getElementById('search-form');\nvar wordTree = document.getElementById('word-tree');\nvar query = void 0;\n\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n\n  while (wordTree.firstChild) {\n    wordTree.removeChild(wordTree.firstChild);\n  }\n\n  query = document.getElementById('search-field').value;\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query + '?key=' + apiKey;\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    (0, _root_reponse_handling.handleRootResponse)(jsonResponse);\n  }).catch(function (error) {\n    console.log(error);\n  });\n});\n\n//# sourceURL=webpack:///./src/scripts/form.js?");

/***/ }),

/***/ "./src/scripts/node_utilities.js":
/*!***************************************!*\
  !*** ./src/scripts/node_utilities.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.idGenerator = exports.addClickListener = exports.createNode = undefined;\n\nvar _fetch_child_node = __webpack_require__(/*! ./fetch_child_node */ \"./src/scripts/fetch_child_node.js\");\n\nvar createNode = exports.createNode = function createNode(elementType) {\n  return document.createElement(elementType);\n};\n\nvar addClickListener = exports.addClickListener = function addClickListener() {\n  document.addEventListener('click', function (e) {\n    e.stopImmediatePropagation();\n    var target = e.target.innerText;\n    var wordType = void 0;\n    e.path.forEach(function (el) {\n      if (el.className == 'word-type') {\n        wordType = el.id;\n      }\n    });\n    var parentId = e.target.id;\n    (0, _fetch_child_node.fetchChildNode)(target, wordType, parentId);\n  });\n};\n\nvar idGenerator = exports.idGenerator = function idGenerator() {\n  return Math.floor(Math.random() * Math.floor(10000));\n};\n\n//# sourceURL=webpack:///./src/scripts/node_utilities.js?");

/***/ }),

/***/ "./src/scripts/root_reponse_handling.js":
/*!**********************************************!*\
  !*** ./src/scripts/root_reponse_handling.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.handleRootResponse = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar handleRootResponse = exports.handleRootResponse = function handleRootResponse(jsonResponse) {\n  var root = document.getElementById('word-tree');\n\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      var wordType = type.fl;\n      var rootChild = (0, _node_utilities.createNode)('li');\n      rootChild.innerHTML = wordType;\n      rootChild.className = 'word-type';\n      rootChild.id = '' + wordType;\n\n      var synList = (0, _node_utilities.createNode)('ul');\n      type.meta.syns[0].map(function (syn) {\n        var subLi = (0, _node_utilities.createNode)('li');\n        subLi.innerHTML = syn;\n        subLi.id = (0, _node_utilities.idGenerator)();\n        subLi.onclick = function () {\n          return (0, _node_utilities.addClickListener)();\n        };\n        synList.append(subLi);\n      });\n\n      rootChild.append(synList);\n      root.append(rootChild);\n    });\n  } else {\n    var error = (0, _node_utilities.createNode)('li');\n    error.innerHTML = 'We\\'re sorry, but the word you entered isn\\'t in the thesaurus.';\n    root.append(error);\n  }\n};\n\n//# sourceURL=webpack:///./src/scripts/root_reponse_handling.js?");

/***/ })

/******/ });