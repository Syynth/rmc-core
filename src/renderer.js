import { Component } from 'react'

import { createElement } from './createElement'

export function getRenderer(component) {
  return class RmcRenderer extends Component {
    render() {
      return createElement(component);
    }
  }
}
