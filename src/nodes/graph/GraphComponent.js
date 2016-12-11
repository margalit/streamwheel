// @flow
import React, { Component } from 'react'
import graph from './graph.css'

class GraphComponent extends Component {
  props: {
    state: {},
    inputs: {bars: Array<number>},
    updateState: (state: {}) => void,
  }

  render(): React$Element {
    const {
      bars,
    } = this.props.inputs
    return (
      <div className="wrapper">
        {bars.map((bar, index) => <div key={index} className="bar" style={{height: `${bar}px`}} />)}
      </div>
    )
  }
}

export default GraphComponent
