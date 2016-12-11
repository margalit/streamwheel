// @flow
import React, { Component } from 'react'
import './App.css'
import { spec as audioSpec } from './nodes/audio'
import { spec as graphSpec } from './nodes/graph'

class App extends Component {
  state: Object

  constructor() {
    super()
    this.state = {
      states: {
        'a': {
          url: '',
          isPlaying: false,
          duration: 0,
          frequencyData: [],
        },
      },
    }
  }

  _handleUpdateStateChange(id: string) {
    return (value: any) => {
      this.setState({
        states: {
          [id]: value,
        }
      })
    }
  }

  render() {
    return (
      <div className="App">
        <Node
          id={'a'}
          spec={audioSpec}
          updateState={this._handleUpdateStateChange.bind(this)}
          state={this.state.states['a']}
          inputs={{}}
        />
        <Node
          id={'b'}
          spec={graphSpec}
          updateState={this._handleUpdateStateChange.bind(this)}
          state={this.state.states['b']}
          inputs={{
            bars: this.state.states['a'].frequencyData,
          }}
        />
      </div>
    )
  }
}

const Node = ({
  spec,
  id,
  state,
  inputs,
  updateState,
}) => {
  const Component = spec.component
  return (
    <div>
      {spec.name}
      <Component
        state={state}
        inputs={inputs}
        updateState={updateState(id)}
      />
    </div>
  )
}

export default App
