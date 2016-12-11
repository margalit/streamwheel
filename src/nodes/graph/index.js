// @flow
import GraphComponent from './GraphComponent'

type State = {
  delta: number,
}

type Inputs = {
  bars: Array<Number>,
}

function implementation(state: State, input: Inputs): Array<Number> {
  return input
}

export let spec = {
  name: 'Graph',
  aliases: ['bars'],
  tags: ['2d'],
  implementation,
  component: GraphComponent,
  state: {
  },
  inputs: {
    bars: {name: 'bars', type: 'Array<Number>'},
  },
  outputs: {
    bars: {name: 'bars', type: 'Array<Number>'},
  },
  documentation: 'Provides a slkder interface for translating path values.',
  version: '0.0.1',
  uid: 'jxg/paths/translateX',
}
