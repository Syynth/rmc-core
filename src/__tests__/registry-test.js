jest.dontMock('../registry.js');
jest.dontMock('../utils.js');

require.requireActual('array.from');
const { ComponentRegistry } = require('../registry.js');
const freeze = { freeze: true };

describe('ComponentRegistry', () => {

  describe('api', () => {

    it('should have a register method', () => {
      let inst = new ComponentRegistry();
      expect(inst.register).toBeDefined();
    });

    it('should have a deregister method', () => {
      let inst = new ComponentRegistry();
      expect(inst.deregister).toBeDefined();
    });

    it('should have a nativeValues property', () => {
      let inst = new ComponentRegistry();
      expect(inst.nativeValues).toBeDefined();
    });

    it('should have a objectValues property', () => {
      let inst = new ComponentRegistry();
      expect(inst.objectValues).toBeDefined();
    });

  });

  describe('component registration', () => {

    it('should add registered components as properties on the registry', () => {
      let inst = new ComponentRegistry();
      expect(inst.someComponent).not.toBeDefined();
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
    });

    it('should not allow two components with the same name to be registered', () => {
      let inst = new ComponentRegistry();
      expect(() => inst.register('someComponent', () => 0)).not.toThrow();
      expect(() => inst.register('someComponent', () => 0)).toThrow();
    });

    it('should not register components unless they are strings, functions, or objects', () => {
      let inst = new ComponentRegistry();
      expect(() => inst.register('strCmp', '() => 0')).not.toThrow();
      expect(() => inst.register('fnCmp', () => 0)).not.toThrow();
      expect(() => inst.register('objCmp', { a: 0 })).not.toThrow();
      expect(() => inst.register('nullCmp', null)).toThrow();
      expect(() => inst.register('intCmp', 0)).toThrow();
      expect(() => inst.register('voidCmp', void 0)).toThrow();
    });

  });

  describe('component sorting', () => {

    it('should add components to nativeValues if they are strings', () => {
      let inst = new ComponentRegistry();
      expect(inst.nativeValues.strCmp).not.toBeDefined();
      inst.register('strCmp', 'test');
      expect(inst.nativeValues.strCmp).toBeDefined();
    });

    it('should not add components to objectValues if they are strings', () => {
      let inst = new ComponentRegistry();
      expect(inst.objectValues.strCmp).not.toBeDefined();
      inst.register('strCmp', 'test');
      expect(inst.objectValues.strCmp).not.toBeDefined();
    });

    it('should add components to nativeValues if they are functions', () => {
      let inst = new ComponentRegistry();
      expect(inst.nativeValues.fnCmp).not.toBeDefined();
      inst.register('fnCmp', () => 'test');
      expect(inst.nativeValues.fnCmp).toBeDefined();
    });

    it('should not add components to objectValues if they are functions', () => {
      let inst = new ComponentRegistry();
      expect(inst.objectValues.fnCmp).not.toBeDefined();
      inst.register('fnCmp', () => 'test');
      expect(inst.objectValues.fnCmp).not.toBeDefined();
    });

    it('should add components to objectValues if they are objects', () => {
      let inst = new ComponentRegistry();
      expect(inst.objectValues.objCmp).not.toBeDefined();
      inst.register('objCmp', {a: 0});
      expect(inst.objectValues.objCmp).toBeDefined();
    });

    it('should not add components to nativeValues if they are objects', () => {
      let inst = new ComponentRegistry();
      expect(inst.nativeValues.objCmp).not.toBeDefined();
      inst.register('objCmp', {a: 0});
      expect(inst.nativeValues.objCmp).not.toBeDefined();
    });

  });

  describe('component deregistration', () => {

    it('should remove deregistered components as properties on the registry', () => {
      let inst = new ComponentRegistry();
      inst.register('someComponent', () => 0);
      expect(inst.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.someComponent).not.toBeDefined();
    });

    it('should remove deregistered components as properties on the nativeValues', () => {
      let inst = new ComponentRegistry();
      inst.register('someComponent', () => 0);
      expect(inst.nativeValues.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.nativeValues.someComponent).not.toBeDefined();
    });

    it('should remove deregistered components as properties on the objectValues', () => {
      let inst = new ComponentRegistry();
      inst.register('someComponent', {a: 0});
      expect(inst.objectValues.someComponent).toBeDefined();
      inst.deregister('someComponent');
      expect(inst.objectValues.someComponent).not.toBeDefined();
    });

  });

  describe('freezing behavior', () => {

    it('should remove the register/deregister methods when constructed', () => {
      let inst = new ComponentRegistry(freeze);
      expect(inst.register).not.toBeDefined();
      expect(inst.deregister).not.toBeDefined();
    });

    it('should prevent extensions if freeze is passed to the constructor', () => {
      expect(Object.isExtensible(new ComponentRegistry(freeze)))
        .toEqual(false);
    });

    it('should seal registry if freeze is passed to the constructor', () => {
      expect(Object.isSealed(new ComponentRegistry(freeze)))
        .toEqual(true);
    });

    it('should freeze registry if freeze is passed to the constructor', () => {
      expect(Object.isFrozen(new ComponentRegistry(freeze)))
        .toEqual(true);
    });

  });

});
