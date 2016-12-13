// @flow
import React, { Component } from 'react'

class AudioComponent extends Component {
  props: {
    state: {isPlaying: boolean},
    inputs: {src: string},
    updateState: (state: {isPlaying: boolean}) => void,
  }

  componentDidMount() {
    this._setupAudioPlayerHandlers()
    this._setupAudioAnalyser()
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.state.isPlaying && !this.props.state.isPlaying) {
      this._startAnalyser()
    }
    if (!nextProps.state.isPlaying && this.props.state.isPlaying) {
      this._stopAnalyser()
    }
  }

  _handleUpdateStateChange(key: string) {
    return (value: any) => {
      this.props.updateState({
        ...this.props.state,
        [key]: value,
      })
    }
  }

  _setupAudioPlayerHandlers() {
    const audioPlayer = this.refs.audioPlayer
    audioPlayer.addEventListener('play', () =>
      this._handleUpdateStateChange('isPlaying')(true)
    )
    audioPlayer.addEventListener('pause', () =>
      this._handleUpdateStateChange('isPlaying')(false)
    )
    audioPlayer.addEventListener('durationchange', () =>
      this._handleUpdateStateChange('duration')(audioPlayer.duration)
    )
  }

  _setupAudioAnalyser() {
    const context = new AudioContext()
    const source = context.createMediaElementSource(this.refs.audioPlayer)
    this.analyser = context.createAnalyser()
    this.analyser.fftSize = 256
    this.frequencyData = new Uint8Array(this.analyser.frequencyBinCount)
    source.connect(this.analyser)
    this.analyser.connect(context.destination)
  }

  _startAnalyser() {
    this.runAnalyser = setInterval(() => {
      this.analyser.getByteFrequencyData(this.frequencyData)
      this._handleUpdateStateChange('frequencyData')([...this.frequencyData])
    }, 30)
  }

  _stopAnalyser() {
    clearInterval(this.runAnalyser)
  }

  render(): React$Element<*> {
    const {
      src,
    } = this.props.inputs
    return (
      <audio ref="audioPlayer" preload="auto" controls src={src} />
    )
  }
}

export default AudioComponent
