import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Escritorio from '../api/escritorio'

const Api = new Escritorio

export default class ImageBlock extends Component {
  constructor(props) {
    super(props)
    this.onChange = props.editor.onChange
    this.editorState = props.state
  }

  componentDidMount = () => {
    this.updateImageState()
  }

  componentDidUpdate = () => {
    this.updateImageState()
  }

  updateImageState = () => {
    const imageData = this.props.node.data.get('imageData')
    const imageKey = this.props.node.key

    if (imageData.rawFile && !imageData.tmpSrc) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const stateWithTmpImage = this.editorState
          .transform()
          .setNodeByKey(imageKey, { data: { imageData: { tmpSrc: reader.result, rawFile: imageData.rawFile } } })
          .apply()
        this.onChange(stateWithTmpImage)
      }
      reader.readAsDataURL(imageData.rawFile)
    } else if (imageData.tmpSrc) {
      Api.upload(imageData.rawFile, (result) => {
        const src = result.file
        const stateWithFinalImage = this.editorState
          .transform()
          .setNodeByKey(imageKey, { data: { imageData: { src: src } } })
          .apply()

        this.onChange(stateWithFinalImage)
      })
    }
  }

  isFocused = () => {
    return this.props.state.selection.hasEdgeIn(this.props.node)
  }

  render = () => {
    const className = this.isFocused() ? 'active' : null
    const props = this.props
    const imageData = props.node.data.get('imageData')

    if(imageData.rawFile) {
      return (<p className={className}>Image Uploading</p>)
    } else if (imageData.tmpSrc) {
      return (<img style={{width: "100%"}} src={imageData.tmpSrc} className={className} {...props.attributes} />)
    } else {
      return (<img style={{width: "100%"}} src={imageData.src} className={className} {...props.attributes} />)
    }
  }
}
