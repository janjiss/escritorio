import React from 'react'
import Portal from 'react-portal'
import { Block, findDOMNode } from 'slate'
import slateFunctions from '../util/slateFunctions'
import { DEFAULT_NODE, BLOCKS } from '../config'

export default function inlineMenuPlugin() {
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
    this.inlineMenuPortal = null
    this.inlineMenu = null
    this.inlineMenuPlusSymbol = null
  }

  componentDidMount = () => {
    window.addEventListener('resize', () => {
      this.updatePortal()
    })
  }

  componentDidUpdate = () => {
    this.updatePortal()
  }

  updatePortal = () => {
    const { state } = this.props
    const { focusBlock } = state
    if (focusBlock.isEmpty && state.isCollapsed && focusBlock.type === DEFAULT_NODE) {
      this.openPortal()
      this.setInlineMenuPosition()
    } else {
      this.closePortal()
    }
  }

  openPortal = () => {
    this.inlineMenuPortal.openPortal()
  }

  closePortal = () => {
    this.inlineMenuPortal.closePortal()
  }

  setInlineMenuPosition = () => {
    const { state } = this.props
    const { focusBlock } = state
    const focusBlockDOMNode = findDOMNode(focusBlock)
    const rect = focusBlockDOMNode.getBoundingClientRect()

    const inlineMenu = this.inlineMenu
    const inlineMenuPlusSymbol = this.inlineMenuPlusSymbol
    const inlineMenuPlusSymbolRect = inlineMenuPlusSymbol.getBoundingClientRect()

    inlineMenu.style.opacity = 1
    inlineMenu.style.position = 'absolute'
    inlineMenu.style.top = `${rect.top + window.scrollY}px`
    inlineMenu.style.left = `${rect.left + window.scrollX - inlineMenuPlusSymbolRect.width - 10}px`
  }

  render = () => {
    return (
      <Portal ref={(inlineMenuPortal) => { this.inlineMenuPortal = inlineMenuPortal }}>
        <div ref={(inlineMenu) => { this.inlineMenu = inlineMenu }} className="toolbar-block">
          <ul>
            <li ref={(inlineMenuPlusSymbol) => { this.inlineMenuPlusSymbol = inlineMenuPlusSymbol }}>
              <button>
                <i className="fa fa-plus" aria-hidden="true" />
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
    this.state = { value: '' }
    this.onChange = this.props.onChange
    this.fileField = null
  }

  addImage = (file) => {
    const transform = this.props.state.transform()

    slateFunctions.insertBlockAfterEndNode(
      this.props.state,
      transform,
      Block.create({
        type: BLOCKS.IMAGE,
        isVoid: true,
        data: { imageData: { rawFile: file }}
      })
    )

    this.onChange(transform.apply())
  }

  onClick = () => {
    this.fileField.click()
  }

  onFileSelected = (e) => {
    this.addImage(e.target.files[0])
    this.setState({ value: '' })
  }

  render = () => {
    return (
    <span>
      <input type="file" ref={(fileField) => { this.fileField = fileField }} value={this.state.value} style={{ display: 'none' }} onChange={this.onFileSelected} />
      <button onMouseDown={this.onClick}>
        <i className="fa fa-file-image-o" aria-hidden="true" />
      </button>
    </span>
    )
  }

}
