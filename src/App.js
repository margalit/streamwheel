// @flow
import React, { Component } from 'react'
import Rx from 'rx'
import './App.css'
import { spec as file } from './nodes/file'
import { spec as audio } from './nodes/audio'
import { spec as graph } from './nodes/graph'

const state$ = new Rx.Subject()

const nodeState$ = state$.concatMap(nodes => Rx.Observable.from(nodes))

// file$
const fileState$ = nodeState$
  .filter(node => node.id === 'file')
  .map(node => node.state)

const fileInput$ = Rx.Observable.of({})

const file$ = Rx.Observable.combineLatest(
  fileState$,
  fileInput$,
  file.implementation,
)

// audio$
const audioState$ = nodeState$
  .filter(node => node.id === 'audio')
  .map(node => node.state)

const audioInputs$ = Rx.Observable.combineLatest(
  file$,
  (file$) => {
    return Rx.Observable.of({
      src: file$.url
    })
  }
)

const audio$ = Rx.Observable.combineLatest(
  audioState$,
  audioInputs$,
  audio.implementation
)

// graph$
const graphState$ = nodeState$
  .filter(node => node.id === 'graph')
  .map(node => node.state)

const graphInputs$ = Rx.Observable.combineLatest(
  audio$,
  (audio$) => {
    return Rx.Observable.of({
      bars: audio$.frequencyData
    })
  }
)

const graph$ = Rx.Observable.combineLatest(
  graphState$,
  graphInputs$,
  graph.implementation
)

// value$
const value$ = Rx.Observable.combineLatest(
  file$,
  audio$,
  graph$,
  (file, audio) => ({
    file: file,
    audio: audio,
    graph: graph,
  })
)

class App extends Component {
  state: Object

  constructor() {
    super()
    this.state = {
      nodes: [{
        id: 'file',
        state: file.state,
        spec: file,
        inputs: [],
      }, {
        id: 'audio',
        state: audio.state,
        spec: audio,
        inputs: [{
          key: 'src',
          provider: 'file',
          value: 'url',
        }]
      }, {
        id: 'graph',
        state: graph.state,
        spec: graph,
        inputs: [{
          key: 'bars',
          provider: 'audio',
          value: 'frequencyData',
        }]
      }],
      values: {
        file: file.implementation(file.state, {}),
        audio: audio.implementation(audio.state, {}),
        graph: graph.implementation(graph.state, {}),
      }
    }
    value$.subscribe(this._handleUpdateValueChange.bind(this))
  }

  _handleUpdateValueChange(newValues) {
    this.setState({
      values: newValues
    })
  }

  _handleUpdateStateChange(id: string) {
    return (state: any) => {
      const node = this._getNodeById(id)
      const nodeIndex = this.state.nodes.indexOf(node)
      this.setState({
        nodes: [
          ...this.state.nodes.slice(0, nodeIndex),
          { ...node, state: state },
          ...this.state.nodes.slice(nodeIndex + 1)
        ]
      }, this._updateStream)
    }
  }

  _updateStream() {
    state$.onNext(this.state.nodes)
  }

  _getInputValues(inputs) {
    return inputs.reduce((prevValue, input) => ({
      ...prevValue,
      [input.key]: this.state.values[input.provider][input.value]
    }), {})
  }

  _getNodeById(id: string) {
    return this.state.nodes.filter(node => id === node.id)[0]
  }

  render() {
    const { values } = this.state
    return (
      <div className="App">
        {this.state.nodes.map(node => (
          <Node
            key={node.id}
            id={node.id}
            spec={node.spec}
            updateState={this._handleUpdateStateChange.bind(this)}
            state={this._getNodeById(node.id).state}
            inputs={this._getInputValues(this._getNodeById(node.id).inputs)}
          />
        ))}
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
    <div style={{padding: '10px', border: '1px solid red', marginBottom: '10px'}}>
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
