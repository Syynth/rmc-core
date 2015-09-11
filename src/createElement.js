import { createElement } from 'react'
import { isString as str, isFunction as fn } from './utils'

function lookup(tagName, r) {
  return r[tagName] || tagName;
}

function map(children, r) {
  return children.map(child => str(child) ? child : render(child, r));
}

function render({ tagName, props, children }, r = {}) {
  return createElement(lookup(tagName, r), props, ...map(children, r));
}

export { render as createElement };
