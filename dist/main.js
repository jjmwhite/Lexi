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

/***/ "./src/d3/d3.js":
/*!**********************!*\
  !*** ./src/d3/d3.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _fetch_child_node = __webpack_require__(/*! ../scripts/fetch_child_node */ \"./src/scripts/fetch_child_node.js\");\n\nfunction handleMouseover() {\n  d3.select(this).transition().duration(300).attr('fill', '#7f1661').attr('r', 7);\n}\n\nfunction handleMouseout() {\n  d3.select(this).transition().duration(300).attr('fill', '#420D33').attr('r', 4);\n}\n\nvar showDef = d3.select(\"main\").append(\"div\").style(\"position\", \"absolute\").style(\"z-index\", 100).style(\"visibility\", \"hidden\").style(\"background\", \"#ceadc5\").style(\"border-radius\", \"10px\").style(\"color\", '#420D33').style(\"width\", \"150px\").style(\"padding\", \"8px\").style(\"font-family\", \"'Krub', sans-serif\").style(\"font-size\", \"14px\").style('text-align', \"left\").text(\"\");\n\nvar handleClick = function handleClick(d) {\n  if (d.children === undefined) {\n    (0, _fetch_child_node.fetchChildNode)(d);\n  }\n};\n\nexports.default = function (data) {\n  d3.select('svg').remove();\n  var margin = { top: 50, right: 50, bottom: 50, left: 50 };\n  var main = document.getElementsByTagName(\"main\")[0];\n  var width = main.clientWidth - margin.right - margin.left;\n  var height = main.clientHeight - margin.top - margin.bottom;\n\n  d3.select(\"main\").append(\"svg\");\n  var displayArea = d3.select(\"svg\").attr(\"width\", width + margin.left + margin.right).attr(\"height\", height + margin.top + margin.bottom).attr(\"viewBox\", [0, 0, width + margin.right + margin.left, height + margin.top + margin.bottom]).append(\"g\");\n\n  var treeLayout = d3.tree().size([height - margin.top, width - margin.left - margin.right - 70]);\n\n  // set up the data structure\n  if (data.length !== 0) {\n    var hierarchicalData = d3.stratify().id(function (d) {\n      return d.id;\n    }).parentId(function (d) {\n      return d.parentId;\n    })(data);\n    var dataTree = treeLayout(hierarchicalData);\n\n    // Add nodes for each descendant in the tree\n    var circles = displayArea.append(\"g\").selectAll(\"circle\").data(dataTree.descendants());\n\n    circles.enter().append(\"circle\").attr(\"cx\", function (d) {\n      return d.y + 10;\n    }).attr(\"cy\", function (d) {\n      return d.x + 10;\n    }).attr(\"r\", 4);\n\n    d3.selectAll(\"circle\").on(\"click\", function (d) {\n      handleClick(d);\n    }).on(\"mouseover\", handleMouseover).on(\"mouseout\", handleMouseout);\n\n    // Add paths between each node\n    var connections = displayArea.append(\"g\").selectAll(\"path\").data(dataTree.links());\n\n    connections.enter().append(\"path\").attr(\"d\", d3.linkHorizontal().x(function (d) {\n      return d.y + 10;\n    }).y(function (d) {\n      return d.x + 10;\n    }));\n\n    // Add words and position relative to nodes\n    var words = displayArea.append(\"g\").selectAll(\"text\").data(dataTree.descendants());\n\n    words.enter().append(\"text\").text(function (d) {\n      return d.data.word;\n    }).attr(\"x\", function (d) {\n      return d.y + 18;\n    }).attr(\"y\", function (d) {\n      return d.x + 15;\n    }).attr(\"font-size\", function (d) {\n      return 1.05 - 0.01 * d.depth + 'em';\n    }).on(\"click\", function (d) {\n      handleClick(d);\n    }).on(\"mouseover\", function (d) {\n      if (d.data.def) {\n        showDef.text(d.data.def);\n        return showDef.style(\"visibility\", \"visible\");\n      }\n    }).on(\"mousemove\", function () {\n      return showDef.style(\"top\", d3.event.clientY + 20 + \"px\").style(\"left\", d3.event.clientX - 180 + \"px\");\n    }).on(\"mouseout\", function () {\n      return showDef.style(\"visibility\", \"hidden\");\n    });\n  }\n};\n\n//# sourceURL=webpack:///./src/d3/d3.js?");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _mobileModal = __webpack_require__(/*! ./modal/mobile-modal */ \"./src/modal/mobile-modal.js\");\n\nvar _form = __webpack_require__(/*! ./scripts/form */ \"./src/scripts/form.js\");\n\nvar _form2 = _interopRequireDefault(_form);\n\nvar _reset = __webpack_require__(/*! ./scripts/reset */ \"./src/scripts/reset.js\");\n\nvar _reset2 = _interopRequireDefault(_reset);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nif (window.innerWidth < 800) {\n  (0, _mobileModal.openModal)();\n}\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/modal/mobile-modal.js":
/*!***********************************!*\
  !*** ./src/modal/mobile-modal.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar openModal = exports.openModal = function openModal() {\n  var modal = document.getElementById('mobile-modal');\n  modal.style.display = 'block';\n};\n\n//# sourceURL=webpack:///./src/modal/mobile-modal.js?");

/***/ }),

/***/ "./src/scripts/create_error_node.js":
/*!******************************************!*\
  !*** ./src/scripts/create_error_node.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.createErrorNode = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar createErrorNode = exports.createErrorNode = function createErrorNode(word) {\n  var errorNode = {};\n  errorNode['id'] = (0, _node_utilities.idGenerator)();\n  errorNode['parentId'] = '_1';\n  errorNode['wordType'] = '';\n  errorNode['word'] = 'Sorry, no synonyms for ' + word + '.';\n  return errorNode;\n};\n\n//# sourceURL=webpack:///./src/scripts/create_error_node.js?");

/***/ }),

/***/ "./src/scripts/fetch_child_node.js":
/*!*****************************************!*\
  !*** ./src/scripts/fetch_child_node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.fetchChildNode = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar _create_error_node = __webpack_require__(/*! ./create_error_node */ \"./src/scripts/create_error_node.js\");\n\nvar _d = __webpack_require__(/*! ../d3/d3 */ \"./src/d3/d3.js\");\n\nvar _d2 = _interopRequireDefault(_d);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar fetchChildNode = exports.fetchChildNode = function fetchChildNode(args) {\n  var query = args.data.word;\n  var parentId = args.data.id;\n  var parentWord = args.data.word;\n  var wordType = args.data.wordType;\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query + '?key=' + apiKey;\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    handleChildResponse(jsonResponse, wordType, parentId, parentWord);\n  }).catch(function (error) {\n    return console.log(error);\n  });\n};\n\nvar handleChildResponse = function handleChildResponse(jsonResponse, wordType, parentId, parentWord) {\n  var data = JSON.parse(sessionStorage.getItem('data'));\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      if (type.fl === wordType && type.hwi.hw === parentWord) {\n        type.meta.syns[0].map(function (syn) {\n          var childNode = {};\n          childNode['id'] = (0, _node_utilities.idGenerator)();\n          childNode['parentId'] = parentId;\n          childNode['wordType'] = wordType;\n          childNode['word'] = syn;\n          childNode['def'] = 'click to see definition and synonyms';\n          data.push(childNode);\n        });\n        data.forEach(function (d) {\n          if (d.id === parentId && d.def === 'click to see definition and synonyms') {\n            d.def = type.shortdef[0];\n          }\n        });\n      }\n    });\n  } else {\n    var errorNode = (0, _create_error_node.createErrorNode)(parentWord);\n    data.push(errorNode);\n  }\n\n  sessionStorage.setItem('data', JSON.stringify(data));\n\n  (0, _d2.default)(data);\n};\n\n//# sourceURL=webpack:///./src/scripts/fetch_child_node.js?");

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _root_reponse_handling = __webpack_require__(/*! ./root_reponse_handling */ \"./src/scripts/root_reponse_handling.js\");\n\nvar _user_guide = __webpack_require__(/*! ../user_guide/user_guide */ \"./src/user_guide/user_guide.js\");\n\nvar form = document.getElementById('search-form');\nvar query = void 0;\n\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n  (0, _user_guide.closeUserGuide)();\n  d3.select('svg').remove();\n\n  query = document.getElementById('search-field');\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query.value + '?key=' + apiKey;\n\n  var root = {};\n  root['id'] = '_1';\n  root['parentId'] = '';\n  root['wordType'] = '';\n  root['word'] = query.value;\n\n  sessionStorage.setItem('data', JSON.stringify([root]));\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    (0, _root_reponse_handling.handleRootResponse)(jsonResponse);\n  }).then(query.value = '').catch(function (error) {\n    console.log(error);\n  });\n});\n\n//# sourceURL=webpack:///./src/scripts/form.js?");

/***/ }),

/***/ "./src/scripts/node_utilities.js":
/*!***************************************!*\
  !*** ./src/scripts/node_utilities.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.idGenerator = exports.supplyParentData = exports.addClickListener = exports.createNode = undefined;\n\nvar _fetch_child_node = __webpack_require__(/*! ./fetch_child_node */ \"./src/scripts/fetch_child_node.js\");\n\nvar createNode = exports.createNode = function createNode(elementType) {\n  return document.createElement(elementType);\n};\n\nvar addClickListener = exports.addClickListener = function addClickListener() {\n  document.addEventListener('click', function (e) {\n    e.stopImmediatePropagation();\n    var target = e.target.innerText;\n    var wordType = void 0;\n    e.path.forEach(function (el) {\n      if (el.className == 'word-type') {\n        wordType = el.id;\n      }\n    });\n    var parentId = e.target.id;\n    (0, _fetch_child_node.fetchChildNode)(target, wordType, parentId);\n  });\n};\n\nvar supplyParentData = exports.supplyParentData = function supplyParentData() {};\n\nvar idGenerator = exports.idGenerator = function idGenerator() {\n  return Math.floor(Math.random() * Math.floor(10000));\n};\n\n//# sourceURL=webpack:///./src/scripts/node_utilities.js?");

/***/ }),

/***/ "./src/scripts/reset.js":
/*!******************************!*\
  !*** ./src/scripts/reset.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar resetButton = document.getElementById('reset');\n\nresetButton.addEventListener(\"click\", function (e) {\n  e.preventDefault();\n  d3.select('svg').remove();\n});\n\n//# sourceURL=webpack:///./src/scripts/reset.js?");

/***/ }),

/***/ "./src/scripts/root_reponse_handling.js":
/*!**********************************************!*\
  !*** ./src/scripts/root_reponse_handling.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.handleRootResponse = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar _d = __webpack_require__(/*! ../d3/d3 */ \"./src/d3/d3.js\");\n\nvar _d2 = _interopRequireDefault(_d);\n\nvar _create_error_node = __webpack_require__(/*! ./create_error_node */ \"./src/scripts/create_error_node.js\");\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\nvar handleRootResponse = exports.handleRootResponse = function handleRootResponse(jsonResponse) {\n  // this is an array of one object: the root word\n  var data = JSON.parse(sessionStorage.getItem('data'));\n  var root = data[0];\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      if (type.hwi.hw === root.word) {\n        var rootChildObj = {};\n        rootChildObj['id'] = (0, _node_utilities.idGenerator)();\n        rootChildObj['parentId'] = '_1';\n        rootChildObj['wordType'] = type.fl;\n        rootChildObj['word'] = type.fl;\n        rootChildObj['def'] = type.shortdef[0];\n        data.push(rootChildObj);\n\n        var syns = type.meta.syns[0];\n        while (syns.length) {\n          var childNode = {};\n          childNode['id'] = (0, _node_utilities.idGenerator)();\n          childNode['parentId'] = rootChildObj.id;\n          childNode['wordType'] = rootChildObj.wordType;\n          childNode['def'] = 'click to see definition and synonyms';\n          childNode['word'] = syns.shift();\n          data.push(childNode);\n        }\n      } else if (type.hwi.hw !== root.word && jsonResponse.length === 1) {\n        var errorNode = (0, _create_error_node.createErrorNode)(root.word);\n        data.push(errorNode);\n      }\n    });\n  } else {\n    var errorNode = (0, _create_error_node.createErrorNode)(root.word);\n    data.push(errorNode);\n  }\n\n  sessionStorage.setItem('data', JSON.stringify(data));\n\n  (0, _d2.default)(data);\n};\n\n//# sourceURL=webpack:///./src/scripts/root_reponse_handling.js?");

/***/ }),

/***/ "./src/user_guide/user_guide.js":
/*!**************************************!*\
  !*** ./src/user_guide/user_guide.js ***!
  \**************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar closeUserGuide = exports.closeUserGuide = function closeUserGuide() {\n  var userGuide = document.getElementById('user-guide');\n  userGuide.style.display = 'none';\n};\n\n//# sourceURL=webpack:///./src/user_guide/user_guide.js?");

/***/ })

/******/ });