'use strict';

jest.dontMock('../registry.js');

var _require = require('../registry.js');

var ComponentRegistry = _require.ComponentRegistry;

var renderFn = jest.genMockFn();
var defArgs = { renderFn: renderFn };
var freezeItArgs = { renderFn: renderFn, freeze: true };

describe('ComponentRegistry', function () {

  describe('api', function () {

    it('should have a register method', function () {
      var inst = new ComponentRegistry(defArgs);
      expect(inst.register).toBeDefined();
    });

    it('should have a deregister method', function () {
      var inst = new ComponentRegistry(defArgs);
      expect(inst.deregister).toBeDefined();
    });
  });

  describe('component registration', function () {

    it('should add registered components as properties on the registry', function () {
      var inst = new ComponentRegistry(defArgs);
      expect(inst.someComponent).not.toBeDefined();
      inst.register('someComponent', function () {
        return 0;
      });
      expect(inst.someComponent).toBeDefined();
    });

    it('should now allow two components with the same name to be registered', function () {
      var inst = new ComponentRegistry(defArgs);
      expect(function () {
        return inst.register('someComponent', function () {
          return 0;
        });
      }).not.toThrow();
      expect(function () {
        return inst.register('someComponent', function () {
          return 0;
        });
      }).toThrow();
    });
  });

  describe('component deregistration', function () {

    it('should remove registered components as properties on the registry', function () {
      var inst = new ComponentRegistry(defArgs);
      inst.register('someComponent', function () {
        return 0;
      });
      expect(inst.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.someComponent).not.toBeDefined();
    });
  });

  describe('freezing behavior', function () {

    it('should remove the register/deregister methods when constructed', function () {
      var inst = new ComponentRegistry(freezeItArgs);
      expect(inst.register).not.toBeDefined();
      expect(inst.deregister).not.toBeDefined();
    });

    it('should prevent extensions if freeze is passed to the constructor', function () {
      expect(Object.isExtensible(new ComponentRegistry(freezeItArgs))).toEqual(false);
    });

    it('should seal registry if freeze is passed to the constructor', function () {
      expect(Object.isSealed(new ComponentRegistry(freezeItArgs))).toEqual(true);
    });

    it('should freeze registry if freeze is passed to the constructor', function () {
      expect(Object.isFrozen(new ComponentRegistry(freezeItArgs))).toEqual(true);
    });
  });
});
//# sourceMappingURL=registry-test.js.map