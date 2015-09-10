import { createElement } from 'react'

import { isString, isFunction } from './utils'

function lookupComponent(tagName) {
  return tagName;
}

function render(element, props, ...children) {
  if (isString(element) || isFunction(element)) {
    return createElement(element, props, ...children.map(render));
  }
  const tagConstructor = lookupComponent(element.tagName);
  return createElement(tagConstructor, props, ...children.map(render));
}

export { render as createElement };
