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

/***/ "./src/data/data.js":
/*!**************************!*\
  !*** ./src/data/data.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nvar data = [{\n  \"id\": 1,\n  \"parentId\": \"\",\n  \"wordType\": \"\",\n  \"word\": \"test\"\n}, {\n  \"id\": 100,\n  \"parentId\": 1,\n  \"wordType\": \"noun\",\n  \"word\": \"noun\"\n}, {\n  \"id\": 101,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"experiment\"\n}, {\n  \"id\": 102,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"exam\"\n}, {\n  \"id\": 103,\n  \"parentId\": 100,\n  \"wordType\": \"noun\",\n  \"word\": \"trial\"\n}, {\n  \"id\": 106,\n  \"parentId\": 103,\n  \"wordType\": \"noun\",\n  \"word\": \"experiment\"\n}, {\n  \"id\": 107,\n  \"parentId\": 103,\n  \"wordType\": \"noun\",\n  \"word\": \"effort\"\n}, {\n  \"id\": 104,\n  \"parentId\": 1,\n  \"wordType\": \"verb\",\n  \"word\": \"verb\"\n}, {\n  \"id\": 105,\n  \"parentId\": 104,\n  \"wordType\": \"verb\",\n  \"word\": \"try\"\n}];\n\nvar returnData = exports.returnData = function returnData() {\n  return data;\n};\n\n// {\n//   \"100\": {\n//     \"id\": 100,\n//     \"parentId\": \"\",\n//     \"wordType\": \"noun\",\n//     \"word\": \"noun\",\n//     \"children\": [\n//       {\n//         \"data\": {\n//           \"id\": 101,\n//           \"parentId\": 100,\n//           \"wordType\": \"noun\",\n//           \"word\": \"experiment\",\n//           \"children\": []\n//         }\n//       },\n//       {\n//         \"data\": {\n//           \"id\": 102,\n//           \"parentId\": 100,\n//           \"wordType\": \"noun\",\n//           \"word\": \"exam\",\n//           \"children\": []\n//         }\n//       },\n//       {\n//         \"data\": {\n//           \"id\": 103,\n//           \"parentId\": 100,\n//           \"wordType\": \"noun\",\n//           \"word\": \"trial\",\n//           \"children\": [\n//             {\n//               \"data\": {\n//                 \"id\": 106,\n//                 \"parentId\": 103,\n//                 \"wordType\": \"noun\",\n//                 \"word\": \"experiment\",\n//                 \"children\": []\n//               }\n//             },\n//             {\n//               \"data\": {\n//                 \"id\": 107,\n//                 \"parentId\": 103,\n//                 \"wordType\": \"noun\",\n//                 \"word\": \"effort\",\n//                 \"children\": []\n//               }\n//             },\n//           ]\n//         }\n//       }\n//     ]\n//   },\n//   \"data\": {\n//     id: 104,\n//     \"parentId\": \"\",\n//     \"wordType\": \"verb\",\n//     \"word\": \"verb\",\n//     \"children\": [\n//       {\n//         \"data\": {\n//           \"id\": 105,\n//           \"parentId\": 104,\n//           \"wordType\": \"verb\",\n//           \"word\": \"try\",\n//           \"children\": []\n//         }\n//       }\n//     ]\n//   }\n// };\n\n//# sourceURL=webpack:///./src/data/data.js?");

/***/ }),

/***/ "./src/entry.js":
/*!**********************!*\
  !*** ./src/entry.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nvar _data = __webpack_require__(/*! ./data/data */ \"./src/data/data.js\");\n\nvar allData = (0, _data.returnData)();\n\n// Set up the display area\nvar displayArea = d3.select(\"main\").append(\"svg\").attr(\"width\", 1000).attr(\"height\", 1000).append(\"g\").attr(\"transform\", \"translate(250,100)\");\n\nvar hierarchicalData = d3.stratify().id(function (d) {\n  return d.id;\n}).parentId(function (d) {\n  return d.parentId;\n})(allData);\n\nvar tree = d3.tree().size([400, 400]);\n// .separation((a, b) => { return (a.parent === b.parent ? 5 : 10) });\n\nvar dataTree = tree(hierarchicalData);\n\n// TESTING//\nconsole.log(dataTree.descendants());\nconsole.log(dataTree.links());\n////////////\n\n// Add nodes for each descendant in the tree\nvar circles = displayArea.append(\"g\").selectAll(\"circle\").data(dataTree.descendants());\n\ncircles.enter().append(\"circle\").attr(\"cx\", function (d) {\n  return d.y;\n}).attr(\"cy\", function (d) {\n  return d.x;\n}).attr(\"r\", 5);\n\n// Add paths between each node\nvar connections = displayArea.append(\"g\").selectAll(\"path\").data(dataTree.links());\n\nconnections.enter().append(\"path\").attr(\"d\", d3.linkHorizontal().x(function (d) {\n  return d.y;\n}).y(function (d) {\n  return d.x;\n}));\n\nvar words = displayArea.append(\"g\").selectAll(\"text\").data(dataTree.descendants());\n\nwords.enter().append(\"text\").text(function (d) {\n  return d.data.word;\n}).attr(\"x\", function (d) {\n  return d.y - 5;\n}).attr(\"y\", function (d) {\n  return d.x - 10;\n});\n\n//# sourceURL=webpack:///./src/entry.js?");

/***/ })

/******/ });