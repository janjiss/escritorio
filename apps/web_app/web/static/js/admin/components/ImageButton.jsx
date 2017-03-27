import React, { Component } from 'react'
import Escritorio from '../api/escritorio'
import { Block } from 'slate'
import { BLOCKS } from '../config'
import slateFunctions from '../util/slateFunctions'

const Api = new Escritorio

export default class ImageControl extends Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
    this.onChange = this.props.onChange
  }

  addImage = (file) => {
    const transform = this.props.editorState.transform()

    slateFunctions.insertBlockAfterEndNode(
      this.props.editorState,
      transform,
      Block.create({
        type: BLOCKS.IMAGE,
        isVoid: true,
        data: { imageData: { rawFile: file } }
      })
    )

    this.onChange(transform.apply())
  }

  onClick = () => {
    this.refs.fileField.click()
  }

  onFileSelected = (e) => {
    this.addImage(e.target.files[0])
    this.setState({value: ""})
  }

  render = () => {
    return(
    <span>
      <input type="file" ref="fileField" value={this.state.value} style={{display: "none"}} onChange={this.onFileSelected} />
      <button onMouseDown={this.onClick}>
        <i className="fa fa-file-image-o" aria-hidden="true"></i>
        <label>Upload Image</label>
      </button>
    </span>
    )
  }
}
