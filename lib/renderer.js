'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _react = require('react');

var _createElement = require('./createElement');

var getRenderer = function getRenderer() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return function () {
    return _createElement.createElement.apply(undefined, args);
  };
};
exports.getRenderer = getRenderer;
//# sourceMappingURL=renderer.js.map