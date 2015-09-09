'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var isString = function isString(o) {
  return typeof o === 'string' || typeof o === 'String';
};
var isFunction = function isFunction(o) {
  return typeof o === 'function';
};

function lookupComponent(tagName) {
  return tagName;
}

function render(element, props) {
  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  if (isString(element) || isFunction(element)) {
    return _react.createElement.apply(undefined, [element, props].concat(_toConsumableArray(children.map(render))));
  }
  var tagConstructor = lookupComponent(element.tagName);
  return _react.createElement.apply(undefined, [tagConstructor, props].concat(_toConsumableArray(children.map(render))));
}

exports.createElement = render;
//# sourceMappingURL=createElement.js.map