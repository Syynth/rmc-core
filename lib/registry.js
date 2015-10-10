'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _slicedToArray(arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _utils = require('./utils');

var _renderer = require('./renderer');

var map = Symbol('map');
var expose = Symbol('expose');
var string = Symbol('string');
var func = Symbol('func');
var object = Symbol('object');

var ComponentRegistry = (function () {
  function ComponentRegistry() {
    var _this = this;

    var _ref = arguments[0] === undefined ? {} : arguments[0];

    var preload = _ref.preload;
    var _ref$freeze = _ref.freeze;
    var freeze = _ref$freeze === undefined ? false : _ref$freeze;

    _classCallCheck(this, ComponentRegistry);

    this[map] = new Map();
    if (preload) {
      Object.keys(preload).forEach(function (key) {
        return _this.register(key, preload[key]);
      });
    }
    if (freeze) {
      delete this.register;
      this.register = undefined;
      delete this.deregister;
      this.deregister = undefined;
      Object.seal(this);
      Object.freeze(this);
      Object.preventExtensions(this);
    }
  }

  _createClass(ComponentRegistry, [{
    key: expose,
    value: function value(name, component) {
      var _this2 = this;

      if (component.type === null) {
        throw new TypeError('You can only register strings, functions, and ' + 'objects as components');
      }
      if (this[map].has(name)) {
        throw new Error('You cannot add the same component to a registry twice!');
      }
      this[map].set(name, component);
      var r = undefined;
      var get = component.type == object ? (r = (0, _renderer.getRenderer)(component.value, this), function () {
        return r;
      }) : function () {
        return _this2[map].get(name).value;
      };
      Object.defineProperty(this, name, { get: get, configurable: true });
      return this;
    }
  }, {
    key: 'register',
    value: function register(name, cmp) {
      var type = (0, _utils.isString)(cmp) ? string : (0, _utils.isFunction)(cmp) ? func : (0, _utils.isObject)(cmp) ? object : null;
      if (!cmp) type = null;
      return this[expose](name, { type: type, value: cmp });
    }
  }, {
    key: 'deregister',
    value: function deregister(name) {
      this[map]['delete'](name);
      delete this[name];
      return this;
    }
  }, {
    key: 'nativeValues',
    get: function get() {
      var arr = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = this[map].entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var entry = _step.value;
          arr.push(entry);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator['return']) {
            _iterator['return']();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return arr.filter(function (_ref2) {
        var _ref22 = _slicedToArray(_ref2, 2);

        var k = _ref22[0];
        var v = _ref22[1];
        return v.type != object;
      }).map(function (_ref3) {
        var _ref32 = _slicedToArray(_ref3, 2);

        var k = _ref32[0];
        var v = _ref32[1];
        return [k, v.value];
      }).reduce(function (memo, _ref4) {
        var _ref42 = _slicedToArray(_ref4, 2);

        var k = _ref42[0];
        var v = _ref42[1];
        return memo[k] = v && memo;
      }, {});
    }
  }, {
    key: 'objectValues',
    get: function get() {
      var arr = [];
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = this[map].entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var entry = _step2.value;
          arr.push(entry);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2['return']) {
            _iterator2['return']();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      return arr.filter(function (_ref5) {
        var _ref52 = _slicedToArray(_ref5, 2);

        var k = _ref52[0];
        var v = _ref52[1];
        return v.type == object;
      }).map(function (_ref6) {
        var _ref62 = _slicedToArray(_ref6, 2);

        var k = _ref62[0];
        var v = _ref62[1];
        return [k, v.value];
      }).reduce(function (memo, _ref7) {
        var _ref72 = _slicedToArray(_ref7, 2);

        var k = _ref72[0];
        var v = _ref72[1];
        return memo[k] = v && memo;
      }, {});
    }
  }]);

  return ComponentRegistry;
})();

exports.ComponentRegistry = ComponentRegistry;
//# sourceMappingURL=registry.js.map