'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

var _utils = require('./utils');

function lookup(tagName, r) {
  return r[tagName] || tagName;
}

function map(children, r) {
  return children.map(function (child) {
    return (0, _utils.isString)(child) ? child : render(child);
  });
}

function render(_ref) {
  var tagName = _ref.tagName;
  var props = _ref.props;
  var children = _ref.children;
  var r = arguments[1] === undefined ? {} : arguments[1];

  return _react.createElement.apply(undefined, [lookup(tagName, r), props].concat(_toConsumableArray(map(children, r))));
}

exports.createElement = render;
//# sourceMappingURL=createElement.js.map