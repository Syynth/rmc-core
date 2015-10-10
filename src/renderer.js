import { createElement } from './createElement'

export const getRenderer = (...args) => () => createElement(...args);
