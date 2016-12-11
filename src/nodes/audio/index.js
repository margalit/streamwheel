// @flow
import AudioComponent from './AudioComponent'

type State = {
  url: string,
  isPlaying: boolean,
  duration: number,
  frequencyData: Array<number>,
}

type Inputs = {
}

function implementation(state: State, input: Inputs): Array<Path> {
  return {
    isPlaying: state.isPlaying,
    duration: state.duration,
    frequencyData: state.frequencyData,
  }
}

export let spec = {
  name: 'Audio',
  aliases: ['audio file input'],
  tags: ['audio', 'input'],
  implementation,
  component: AudioComponent,
  state: {
    file: null,
  },
  inputs: {
  },
  outputs: {
  },
  documentation: 'Provides an audio input for creating audio streams.',
  version: '0.0.1',
  uid: 'codewheel/audio',
}
