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

/***/ "./src/d3/render_tree.js":
/*!*******************************!*\
  !*** ./src/d3/render_tree.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.renderTree = renderTree;\n\nvar _fetch_child_node = __webpack_require__(/*! ../scripts/fetch_child_node */ \"./src/scripts/fetch_child_node.js\");\n\nfunction renderTree(data, firstRender) {\n\n  // set up view\n  var margin = { top: 50, right: 50, bottom: 50, left: 50 };\n  var main = document.getElementsByTagName(\"main\")[0];\n  var width = main.clientWidth - margin.right - margin.left;\n  var height = main.clientHeight - margin.top - margin.bottom;\n\n  // set up data structure\n  var root = d3.stratify().id(function (d) {\n    return d.id;\n  }).parentId(function (d) {\n    return d.parentId;\n  })(data);\n\n  root.y = 10;\n  root.x0 = width / 12;\n  root.y0 = 0;\n\n  root.descendants().forEach(function (d) {\n    d._children = d.children;\n  });\n\n  var linkGroup = void 0;\n  var nodeGroup = void 0;\n  var svg = void 0;\n\n  if (firstRender) {\n    d3.select(\"main\").append(\"svg\");\n    svg = d3.select(\"svg\").attr(\"width\", width + margin.left + margin.right).attr(\"height\", height + margin.top + margin.bottom).attr(\"viewBox\", [0, 0, width + margin.right + margin.left, height + margin.top + margin.bottom]);\n\n    linkGroup = svg.append(\"g\").attr(\"id\", \"link-group\").attr(\"fill\", \"none\").attr(\"stroke\", \"#ceadc5\").attr(\"stroke-width\", 1).attr(\"opacity\", \".8\").attr(\"transform\", \"translate(10, 0)\");\n\n    nodeGroup = svg.append(\"g\").attr(\"id\", \"node-group\").attr(\"cursor\", \"pointer\").attr(\"transform\", \"translate(10, 0)\");\n  }\n  // else {\n  debugger;\n  svg = d3.select(\"svg\");\n  linkGroup = d3.select(\"g#link-group\");\n  nodeGroup = d3.select(\"g#node-group\");\n  // }\n\n\n  function update(data) {\n    var nodes = root.descendants().reverse();\n    var links = root.links();\n    var duration = 200;\n\n    tree(root);\n\n    root.eachBefore(function (d) {\n      d.x0 = d.x;\n      d.y0 = d.y;\n    });\n\n    var node = nodeGroup.selectAll(\"g\").data(nodes, function (d) {\n      return d.id;\n    });\n\n    var nodeEnter = node.enter().append(\"g\").attr(\"transform\", function (d) {\n      debugger;\n      return \"translate(\" + (d.y0 + 10) + \", \" + (d.x0 + 10) + \")\";\n    }).attr(\"fill-opacity\", 0).attr(\"stroke-opacity\", 0).on(\"click\", function (d) {\n      debugger;\n      d.children = d.children ? null : d._children;\n      update(d);\n    });\n\n    nodeEnter.append(\"circle\").attr(\"r\", 5);\n\n    nodeEnter.append(\"text\").text(function (d) {\n      return d.data.word;\n    }).attr(\"x\", 15).attr(\"y\", function (d) {\n      return \"0.33em\";\n    }).attr(\"font-size\", function (d) {\n      return 1.05 - 0.01 * d.depth + \"em\";\n    }).on(\"click\", function (d) {\n      (0, _fetch_child_node.fetchChildNode)(d);\n    }).on(\"mouseover\", function (d) {\n      if (d.data.def) {\n        showDef.text(d.data.def);\n        return showDef.style(\"visibility\", \"visible\");\n      }\n    }).on(\"mousemove\", function () {\n      return showDef.style(\"top\", d3.event.clientY + 20 + \"px\").style(\"left\", d3.event.clientX - 180 + \"px\");\n    }).on(\"mouseout\", function () {\n      return showDef.style(\"visibility\", \"hidden\");\n    });\n\n    var nodeUpdate = node.merge(nodeEnter).transition(duration).attr(\"transform\", function (d) {\n      return \"translate(\" + d.y + \", \" + d.x + \")\";\n    }).attr(\"fill-opacity\", 1).attr(\"stroke-opacity\", 1);\n\n    var nodeExit = node.exit().transition(duration).attr(\"transform\", function (d) {\n      return \"translate(\" + data.y0 + \", \" + data.x0 + \")\";\n    }).attr(\"fill-opacity\", 0).attr(\"stroke-opacity\", 0).remove();\n\n    var link = linkGroup.selectAll(\"path\").data(links, function (d) {\n      return d.target.id;\n    });\n\n    var linkEnter = link.enter().append(\"path\").attr(\"d\", function (d) {\n      var pos = { x: data.x0, y: data.y0 };\n      return renderLink({ source: pos, target: pos });\n    });\n\n    link.merge(linkEnter).transition(duration).attr(\"d\", renderLink);\n\n    link.exit().transition(duration).attr(\"d\", function (d) {\n      var pos = { x: data.x0, y: data.y0 };\n      return renderLink({ source: pos, target: pos });\n    }).remove();\n\n    root.eachBefore(function (d) {\n      d.x0 = d.x;\n      d.y0 = d.y;\n    });\n  }\n\n  update(root);\n\n  return svg.node();\n}\n\nvar renderLink = d3.linkHorizontal().x(function (d) {\n  return d.y;\n}).y(function (d) {\n  return d.x;\n});\n\nvar margin = { top: 50, right: 50, bottom: 50, left: 50 };\nvar main = document.getElementsByTagName(\"main\")[0];\nvar width = main.clientWidth - margin.right - margin.left;\nvar height = main.clientHeight - margin.top - margin.bottom;\n\nvar tree = d3.tree().size([height - margin.top, width - margin.left - margin.right - 70]);\n// .nodeSize([10, width / 2])\n\n\nfunction handleMouseover() {\n  d3.select(this).transition().duration(300).attr('fill', '#7f1661').attr('r', 7);\n}\n\nfunction handleMouseout() {\n  d3.select(this).transition().duration(300).attr('fill', '#420D33').attr('r', 4);\n}\n\nvar showDef = d3.select(\"main\").append(\"div\").style(\"position\", \"absolute\").style(\"z-index\", 100).style(\"visibility\", \"hidden\").style(\"background\", \"#ceadc5\").style(\"border-radius\", \"10px\").style(\"color\", '#420D33').style(\"width\", \"150px\").style(\"padding\", \"8px\").style(\"font-family\", \"'Krub', sans-serif\").style(\"font-size\", \"14px\").style('text-align', \"left\").text(\"\");\n\n//# sourceURL=webpack:///./src/d3/render_tree.js?");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _form = __webpack_require__(/*! ./scripts/form */ \"./src/scripts/form.js\");\n\nvar _form2 = _interopRequireDefault(_form);\n\nvar _reset = __webpack_require__(/*! ./scripts/reset */ \"./src/scripts/reset.js\");\n\nvar _reset2 = _interopRequireDefault(_reset);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ }),

/***/ "./src/scripts/fetch_child_node.js":
/*!*****************************************!*\
  !*** ./src/scripts/fetch_child_node.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.fetchChildNode = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar _render_tree = __webpack_require__(/*! ../d3/render_tree */ \"./src/d3/render_tree.js\");\n\nvar fetchChildNode = exports.fetchChildNode = function fetchChildNode(args) {\n  var query = args.data.word;\n  var parentId = args.data.id;\n  var parentWord = args.data.word;\n  var wordType = args.data.wordType;\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query + '?key=' + apiKey;\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    handleChildResponse(jsonResponse, wordType, parentId, parentWord);\n  }).catch(function (error) {\n    return console.log(error);\n  });\n};\n\nvar handleChildResponse = function handleChildResponse(jsonResponse, wordType, parentId, parentWord) {\n\n  var data = JSON.parse(sessionStorage.getItem('data'));\n  debugger;\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      if (type.fl === wordType && type.meta.id === parentWord) {\n        data.forEach(function (d) {\n          if (d.id === parentId) {\n            d.def = type.shortdef[0];\n          }\n        });\n\n        type.meta.syns[0].map(function (syn) {\n          var childNode = {};\n          childNode['id'] = (0, _node_utilities.idGenerator)();\n          childNode['parentId'] = parentId;\n          childNode['wordType'] = wordType;\n          childNode['word'] = syn;\n          childNode['def'] = 'click to see definition and synonyms';\n          data.push(childNode);\n        });\n      }\n    });\n  } else {\n    var errorNode = {};\n    errorNode['id'] = (0, _node_utilities.idGenerator)();\n    errorNode['parentId'] = parentId;\n    errorNode['wordType'] = '';\n    errorNode['word'] = 'Sorry, no synonyms for ' + parentWord + '.';\n    data.push(errorNode);\n  }\n\n  sessionStorage.setItem('data', JSON.stringify(data));\n\n  var firstRender = false;\n  (0, _render_tree.renderTree)(data, firstRender);\n};\n\n//# sourceURL=webpack:///./src/scripts/fetch_child_node.js?");

/***/ }),

/***/ "./src/scripts/form.js":
/*!*****************************!*\
  !*** ./src/scripts/form.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _root_reponse_handling = __webpack_require__(/*! ./root_reponse_handling */ \"./src/scripts/root_reponse_handling.js\");\n\nvar form = document.getElementById('search-form');\nvar query = void 0;\n\nform.addEventListener('submit', function (e) {\n  e.preventDefault();\n\n  d3.select('svg').remove();\n\n  query = document.getElementById('search-field');\n\n  var apiKey = '9451e38b-3466-430f-92df-a7a61487cf03';\n  var url = 'https://dictionaryapi.com/api/v3/references/thesaurus/json/' + query.value + '?key=' + apiKey;\n\n  var root = {};\n  root['id'] = '_1';\n  root['parentId'] = '';\n  root['wordType'] = '';\n  root['word'] = query.value;\n\n  sessionStorage.setItem('data', JSON.stringify([root]));\n\n  fetch(url).then(function (response) {\n    return response.json();\n  }).then(function (jsonResponse) {\n    (0, _root_reponse_handling.handleRootResponse)(jsonResponse);\n  }).then(query.value = '').catch(function (error) {\n    console.log(error);\n  });\n});\n\n//# sourceURL=webpack:///./src/scripts/form.js?");

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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.handleRootResponse = undefined;\n\nvar _node_utilities = __webpack_require__(/*! ./node_utilities */ \"./src/scripts/node_utilities.js\");\n\nvar _render_tree = __webpack_require__(/*! ../d3/render_tree */ \"./src/d3/render_tree.js\");\n\nvar handleRootResponse = exports.handleRootResponse = function handleRootResponse(jsonResponse) {\n  // this is an array of one object: the root word\n  var data = JSON.parse(sessionStorage.getItem('data'));\n  var root = data[0];\n\n  if (jsonResponse[0] instanceof Object) {\n    jsonResponse.forEach(function (type) {\n      if (type.meta.id === root.word) {\n        var rootChildObj = {};\n        rootChildObj['id'] = (0, _node_utilities.idGenerator)();\n        rootChildObj['parentId'] = '_1';\n        rootChildObj['wordType'] = type.fl;\n        rootChildObj['word'] = type.fl;\n        rootChildObj['def'] = type.shortdef[0];\n        data.push(rootChildObj);\n\n        var syns = type.meta.syns[0];\n        while (syns.length) {\n          var childNode = {};\n          childNode['id'] = (0, _node_utilities.idGenerator)();\n          childNode['parentId'] = rootChildObj.id;\n          childNode['wordType'] = rootChildObj.wordType;\n          childNode['def'] = 'click to see definition and synonyms';\n          childNode['word'] = syns.shift();\n          data.push(childNode);\n        }\n      }\n    });\n  } else {\n    var errorNode = {};\n    errorNode['id'] = (0, _node_utilities.idGenerator)();\n    errorNode['parentId'] = '_1';\n    errorNode['wordType'] = '';\n    errorNode['word'] = 'Sorry, no synonyms for ' + root.word + '.';\n    data.push(errorNode);\n  }\n\n  sessionStorage.setItem('data', JSON.stringify(data));\n\n  d3.select('svg').remove();\n\n  var firstRender = true;\n  (0, _render_tree.renderTree)(data, firstRender);\n};\n\n//# sourceURL=webpack:///./src/scripts/root_reponse_handling.js?");

/***/ })

/******/ });