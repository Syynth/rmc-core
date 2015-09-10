import { isString, isFunction, isObject } from './utils'

const map = Symbol('map');
const expose = Symbol('expose');
const string = Symbol('string');
const func = Symbol('func');
const object = Symbol('object');

class ComponentRegistry {

  constructor({ preload, freeze = false } = {}) {
    this[map] = new Map();
    if (preload) {
      Object.keys(preload)
        .forEach(key => this.register(key, preload[key]));
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

  [expose](name, component)  {
    if (component.type === null) {
      throw new TypeError('You can only register strings, functions, and ' +
                          'objects as components');
    }
    if (this[map].has(name)) {
      throw new Error('You cannot add the same component to a registry twice!');
    }
    this[map].set(name, component);
    Object.defineProperty(this, name, {
      configurable: true,
      get: () => this[map].get(name).value
    });
    return this;
  }

  register(name, cmp) {
    let type = isString(cmp) ? string :
      (isFunction(cmp) ? func : (isObject(cmp) ? object : null));
    if (!cmp) type = null;
    return this[expose](name, { type, value: cmp });
  }

  get nativeValues() {
    let arr = [];
    for (let entry of this[map].entries()) { arr.push(entry) }
    return arr.filter(([k, v]) => v.type != object)
      .map(([k, v]) => [k, v.value])
      .reduce((memo, [k, v]) => memo[k] = v && memo, {});
  }

  get objectValues() {
    let arr = [];
    for (let entry of this[map].entries()) { arr.push(entry) }
    return arr.filter(([k, v]) => v.type == object)
      .map(([k, v]) => [k, v.value])
      .reduce((memo, [k, v]) => memo[k] = v && memo, {});
  }

  deregister(name) {
    this[map].delete(name);
    delete this[name];
    return this;
  }

}

export { ComponentRegistry };
