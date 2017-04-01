import React from "react"
import Portal from 'react-portal'
import { Block, findDOMNode  } from 'slate'
import slateFunctions from '../util/slateFunctions'
import Escritorio from '../api/escritorio'
import { DEFAULT_NODE, BLOCKS } from '../config'

const Api = new Escritorio

export default function inlineMenu() {
  return {
    render: (props, editorState, editor) => {
      return (
        <div>
          { props.children }
          <InlineMenu {...props} />
        </div>
        )
    }
  }
}

class InlineMenu extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount = () => {
    window.addEventListener("resize", () => {
      this.updatePortal()
    })
  }

  componentDidUpdate = () => {
    this.updatePortal()
  }

  updatePortal = () => {
    const { state } = this.props
    const { focusBlock, selection } = state
    if ( focusBlock.isEmpty && state.isCollapsed && focusBlock.type === DEFAULT_NODE ) {
      this.openPortal()
      this.setInlineMenuPosition()
    } else {
      this.closePortal()
    }
  }

  openPortal = () => {
    this.refs.inlineMenuPortal.openPortal()
  }

  closePortal = () => {
    this.refs.inlineMenuPortal.closePortal()
  }

  setInlineMenuPosition = () => {
    const { state } = this.props
    const { focusBlock } = state
    const focusBlockDOMNode = findDOMNode(focusBlock)
    const rect = focusBlockDOMNode.getBoundingClientRect()

    const inlineMenu = this.refs.inlineMenu
    const inlineMenuPlusSymbol = this.refs.inlineMenuPlusSymbol
    const inlineMenuPlusSymbolRect = inlineMenuPlusSymbol.getBoundingClientRect()

    inlineMenu.style.position  = 'absolute'
    inlineMenu.style.top = `${rect.top + window.scrollY}px`
    inlineMenu.style.left = `${rect.left + window.scrollX - inlineMenuPlusSymbolRect.width - 10}px`
  }

  render = () => {
    return (
      <Portal ref="inlineMenuPortal" onOpen={ this.onOpen } >
        <div ref="inlineMenu" className="toolbar-block">
          <ul>
            <li ref="inlineMenuPlusSymbol">
              <button>
                <i className="fa fa-plus" aria-hidden="true"></i>
              </button>
            </li>
            <li>
              <ImageButton {...this.props} />
            </li>
          </ul>
        </div>
      </Portal>
      )
  }
}

class ImageButton extends React.Component {
  constructor(props) {
    super(props)
    this.state = { value: "" }
    this.onChange = this.props.onChange
  }

  addImage = (file) => {
    const transform = this.props.state.transform()

    slateFunctions.insertBlockAfterEndNode(
      this.props.state,
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
      </button>
    </span>
    )
  }
}
