'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

var _get = function get(_x, _x2, _x3) { var _again = true; _function: while (_again) { var object = _x, property = _x2, receiver = _x3; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x = parent; _x2 = property; _x3 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };

exports.renderData = renderData;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } }

var _react = require('react');

function renderData(data, registry) {
  if (typeof data === 'string' || data instanceof String) {
    return data;
  }
  var children = data.children;
  var tagName = data.tagName;
  var props = data.props;

  var kids = children.map(function (child) {
    return renderData(child, registry);
  });
  var tagFn = tagName[0] == tagName[0].toLowerCase() ? _react.DOM[tagFn] : registry[tagName];
  return tagFn.apply(undefined, [props].concat(_toConsumableArray(kids)));
}

var RmcRenderer = (function (_Component) {
  function RmcRenderer() {
    _classCallCheck(this, RmcRenderer);

    _get(Object.getPrototypeOf(RmcRenderer.prototype), 'constructor', this).apply(this, arguments);
  }

  _inherits(RmcRenderer, _Component);

  _createClass(RmcRenderer, [{
    key: 'render',
    value: function render() {
      return renderData(this.props.data, this.context.registry);
    }
  }]);

  return RmcRenderer;
})(_react.Component);

exports.RmcRenderer = RmcRenderer;

RmcRenderer.propTypes = {
  data: _react.PropTypes.shapeOf({
    tagName: _react.PropTypes.string.isRequired,
    props: _react.PropTypes.object.isRequired,
    children: _react.PropTypes.arrayOf(_react.PropTypes.oneOf([_react.PropTypes.string, _react.PropTypes.object])).isRequired
  })
};

RmcRenderer.contextTypes = {
  registry: _react.PropTypes.object
};
//# sourceMappingURL=renderer.js.map