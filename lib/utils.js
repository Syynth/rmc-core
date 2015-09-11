'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isString = function isString(o) {
  return typeof o === 'string' || typeof o === 'String';
};
exports.isString = isString;
var isFunction = function isFunction(o) {
  return typeof o === 'function';
};
exports.isFunction = isFunction;
var isObject = function isObject(o) {
  return !isFunction(o) && !isString(o) && typeof o === 'object';
};
exports.isObject = isObject;
//# sourceMappingURL=utils.js.map