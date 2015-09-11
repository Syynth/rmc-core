import { createElement } from 'react'

import { isString as str, isFunction as fn } from './utils'

function lookup(tagName) {
  return tagName;
}

function mapChildren(children) {
  return children.map(child => isString(child) ? child : render(child));
}

function render(element, props, ...children) {
  let el = (str(element) || fn(element)) ? element : lookup(element.tagName);
  return createElement(el, props, mapChildren(...children));
}

export { render as createElement };
