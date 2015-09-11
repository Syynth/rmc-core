'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _utils = require('./utils');

function lookup(tagName) {
  return tagName;
}

function mapChildren(children) {
  return children.map(function (child) {
    return isString(child) ? child : render(child);
  });
}

function render(element, props) {
  var el = (0, _utils.isString)(element) || (0, _utils.isFunction)(element) ? element : lookup(element.tagName);

  for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
    children[_key - 2] = arguments[_key];
  }

  return (0, _react.createElement)(el, props, mapChildren.apply(undefined, children));
}

exports.createElement = render;
//# sourceMappingURL=createElement.js.map