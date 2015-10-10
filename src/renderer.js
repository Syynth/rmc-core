import { Component } from 'react'

import { createElement } from './createElement'

export const getRenderer = component => () => createElement(component);
