'use strict';

jest.dontMock('../createElement');
jest.dontMock('../../test-data/simple-div.json');

var createElement = require('../createElement').createElement;
var DivElem = require('../../test-data/simple-div.json');

describe('createElement function', function () {

  describe('should allow nodes to be DOMStrings', function () {

    it('should create a DOM node (div)', function () {
      var React = require('react/addons');
      var TestUtils = React.addons.TestUtils;

      var result = TestUtils.renderIntoDocument(createElement(DivElem));

      expect(result.type).toEqual('div');
    });
  });
});
//# sourceMappingURL=createElement-test.js.map