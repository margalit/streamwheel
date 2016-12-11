// @flow
import React, { Component } from 'react'

class TranslateXComponent extends Component {
  props: {
    state: {delta: number},
    inputs: {paths: Array<Paths>},
    updateState: (state: {delta: number}) => void,
  }

  _handleUpdateValueChange(event: SyntheticInputEvent): void {
    this.props.updateState({
      ...this.props.state,
      delta: parseInt(event.target.value),
    })
  }

  render(): React$Element {
    const {
      delta,
    } = this.props.state
    return (
      <div>
        <input
          type="range"
          max="100"
          value={delta}
          onChange={this._handleUpdateValueChange.bind(this)}
        />
      </div>
    )
  }
}

export default TranslateXComponent
