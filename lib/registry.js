'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var map = Symbol('map');
var set = Symbol('set');
var render = Symbol('render');

var ComponentRegistry = (function () {
  function ComponentRegistry(_ref) {
    var _this = this;

    var renderFn = _ref.renderFn;
    var preload = _ref.preload;
    var _ref$freeze = _ref.freeze;
    var freeze = _ref$freeze === undefined ? false : _ref$freeze;

    _classCallCheck(this, ComponentRegistry);

    this[map] = new Map();
    this[set] = new Set();
    if (!renderFn) {
      throw new TypeError('Component Registry must be given a render function');
    }
    this[render] = renderFn;
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
    key: 'register',
    value: function register(name, component) {
      var _this2 = this;

      var componentJSON = JSON.stringify(component);
      if (this[set].has(componentJSON) || this[map].has(name)) {
        throw new Error('You cannot add the same component to a registry twice!');
      }
      this[set].add(componentJSON);
      this[map].set(name, component);
      Object.defineProperty(this, name, {
        configurable: true,
        get: function get() {
          return function (_) {
            return _this2[render](_this2[map].get(name), _this2);
          };
        }
      });
      return this;
    }
  }, {
    key: 'deregister',
    value: function deregister(name) {
      this[set]['delete'](JSON.stringify(this[map].get(name)));
      this[map]['delete'](name);
      delete this[name];
      return this;
    }
  }]);

  return ComponentRegistry;
})();

exports.ComponentRegistry = ComponentRegistry;
//# sourceMappingURL=registry.js.map