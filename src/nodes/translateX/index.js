// @flow
import TranslateXComponent from './TranslateXComponent'

type State = {
  delta: number,
}

type Inputs = {
  paths: Array<Path>,
}

function implementation(state: State, input: Inputs): Array<Path> {
  const { delta } = state
  return input.paths == null
    ? []
    : input.paths.map(path => path.map(point => ({
      x: point.x + delta,
      y: point.y
    })))
}

export let spec = {
  name: 'Translate X',
  aliases: ['move horizontally'],
  tags: ['paths', '2d'],
  implementation,
  component: TranslateXComponent,
  state: {
    delta: 0,
  },
  inputs: {
    paths: {name: 'paths', type: 'Array<Path>'},
  },
  outputs: {
    paths: {name: 'paths', type: 'Array<Path>'},
  },
  documentation: 'Provides a slider interface for translating path values.',
  version: '0.0.1',
  uid: 'jxg/paths/translateX',
}
