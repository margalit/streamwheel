// @flow

import React, { Component } from 'react'

class FileComponent extends Component {
  props: {
    state: {url: string},
    inputs: {},
    updateState: (state: {url: string}) => void,
  }

  _handleUpdateFileChange(event: SyntheticInputEvent): void {
    this.props.updateState({
      ...this.props.state,
      url: URL.createObjectURL(event.target.files[0]),
    })
  }

  render(): React$Element<*> {
    return (
      <input
        type="file"
        onChange={this._handleUpdateFileChange.bind(this)}
      />
    )
  }
}

export default FileComponent
