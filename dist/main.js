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
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\n\nvar _data = __webpack_require__(/*! ../data/data */ \"./src/data/data.js\");\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nvar d3 = function d3() {\n  _classCallCheck(this, d3);\n\n  // Set up the display area\n  var margin = { top: 20, right: 50, bottom: 20, left: 50 };\n  var width = window.innerWidth - margin.right - margin.left;\n  var height = window.innerHeight - margin.top - margin.bottom;\n\n  var displayArea = d3.select(\"main\").append(\"svg\").attr(\"width\", width + margin.right + margin.left).attr(\"height\", height + margin.top + margin.bottom).append(\"g\").attr(\"transform\", \"translate(50, \" + height / 2 + \")\");\n\n  // set up the data structure\n  debugger;\n  var allData = (0, _data.returnData)();\n  if (allData.length !== 0) {\n    var hierarchicalData = d3.stratify().id(function (d) {\n      return d.id;\n    }).parentId(function (d) {\n      return d.parentId;\n    })(allData);\n\n    var tree = function tree(data) {\n      data.dx = 30;\n      data.dy = width / (data.height + 1);\n      return d3.tree().nodeSize([data.dx, data.dy])(data);\n    };\n\n    var dataTree = tree(hierarchicalData);\n\n    // TESTING//\n    console.log(dataTree.descendants());\n    ////////////\n\n    // Add nodes for each descendant in the tree\n    var circles = displayArea.append(\"g\").selectAll(\"circle\").data(dataTree.descendants());\n\n    circles.enter().append(\"circle\").attr(\"cx\", function (d) {\n      return d.y;\n    }).attr(\"cy\", function (d) {\n      return d.x;\n    }).attr(\"r\", 3);\n\n    // Add paths between each node\n    var connections = displayArea.append(\"g\").selectAll(\"path\").data(dataTree.links());\n\n    connections.enter().append(\"path\").attr(\"d\", d3.linkHorizontal().x(function (d) {\n      return d.y;\n    }).y(function (d) {\n      return d.x;\n    }));\n\n    // Add words and position relative to nodes\n    var words = displayArea.append(\"g\").selectAll(\"text\").data(dataTree.descendants());\n\n    words.enter().append(\"text\").text(function (d) {\n      return d.data.word;\n    }).attr(\"x\", function (d) {\n      return d.y - 5;\n    }).attr(\"y\", function (d) {\n      return d.x - 10;\n    });\n  }\n};\n\nexports.default = d3;\n\n//# sourceURL=webpack:///./src/d3/d3.js?");

/***/ }),

/***/ "./src/data/data.js":
/*!**************************!*\
  !*** ./src/data/data.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar data = [{\n  \"id\": 1,\n  \"parentId\": \"\",\n  \"wordType\": \"\",\n  \"word\": \"test\"\n}, {\n  \"id\": 100,\n  \"parentId\": 1,\n  \"wordType\": \"noun\",\n  \"word\": \"noun\"\n}, {\n  \"id\": 101,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"experiment\"\n}, {\n  \"id\": 102,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"exam\"\n}, {\n  \"id\": 103,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"trial\"\n}, {\n  \"id\": 106,\n  \"parentId\": 103,\n  \"wordType\": \"noun\",\n  \"word\": \"experiment\"\n}, {\n  \"id\": 107,\n  \"parentId\": 103,\n  \"wordType\": \"noun\",\n  \"word\": \"effort\"\n}, {\n  \"id\": 104,\n  \"parentId\": 1,\n  \"wordType\": \"verb\",\n  \"word\": \"verb\"\n}, {\n  \"id\": 105,\n  \"parentId\": 104,\n  \"wordType\": \"verb\",\n  \"word\": \"try\"\n}];\n\nvar returnData = exports.returnData = function returnData() {\n  debugger;\n  return data || [];\n};\n\n//# sourceURL=webpack:///./src/data/data.js?");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _d = __webpack_require__(/*! ./d3/d3 */ \"./src/d3/d3.js\");\n\nvar _d2 = _interopRequireDefault(_d);\n\nfunction _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ })

/******/ });