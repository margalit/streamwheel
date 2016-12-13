// @flow
import FileComponent from './FileComponent'

type State = {
  url: string,
}

type Inputs = {
}

function implementation(state: State, input: Inputs): Object {
  const { url } = state
  return url == null
    ? { url: '' }
    : { url: url }
}

export let spec = {
  name: 'File Input',
  aliases: [],
  tags: ['paths', '2d'],
  implementation,
  component: FileComponent,
  state: {
    url: null,
  },
  inputs: {
  },
  outputs: {
    paths: {name: 'url', type: 'string'},
  },
  documentation: 'Provides a file input and extracts file information',
  version: '0.0.1',
  uid: 'codewheel/inputs/file',
}
