import Portal from 'react-portal'
import React from 'react'
import { DEFAULT_NODE, BLOCKS, MARKS, INLINES } from '../config'

export default function hoverMenuPlugin() {
  return {
    render: (props, editorState, editor) => {
      return (
        <div>
          { props.children }
          <HoverMenu {...props} editor={editor} />
        </div>
      )
    }
  }
}

const MARK_TYPES = [
  { label: 'Bold', type: MARKS.BOLD, iconClass: 'fa fa-lg fa-bold' },
  { label: 'Italic', type: MARKS.ITALIC, iconClass: 'fa fa-lg fa-italic' },
  { label: 'Underline', type: MARKS.UNDERLINED, iconClass: 'fa fa-lg fa-underline' },
  { label: 'Monospace', type: MARKS.CODE, iconClass: 'fa fa-lg fa-code' },
]

const LINK_BUTTON = { label: 'LINK', type: 'link', iconClass: 'fa-lg fa fa-link' }

const BLOCK_TYPES = [
  { label: 'H1', type: BLOCKS.HEADER_ONE, iconClass: 'fa-lg fa fa-header' },
  { label: 'H2', type: BLOCKS.HEADER_TWO, iconClass: 'fa fa-header' },
  { label: 'Blockquote', type: BLOCKS.BLOCKQUOTE, iconClass: 'fa-lg fa fa-quote-right' },
  { label: 'Code', type: BLOCKS.CODE_BLOCK, iconClass: 'fa-lg fa fa-file-code-o' },
  { label: 'UL', type: BLOCKS.UNORDERED_LIST, iconClass: 'fa-lg fa fa-list' },
  { label: 'OL', type: BLOCKS.ORDERED_LIST, iconClass: 'fa-lg fa fa-list-ol' },
]

class HoverMenu extends React.Component {

  constructor(props) {
    super(props)
    this.state = { menu: false, linkInputActive: false, linkInputValue: '' }
    this.onChange = this.props.editor.onChange
    this.hoverMenu = null
  }

  componentDidMount = () => {
    this.updateMenu()
  }

  componentDidUpdate = () => {
    this.updateMenu()
  }

  hasMark = (type) => {
    return this.props.state.marks.some(mark => mark.type == type)
  }

  hasBlock = (type) => {
    const editorState = this.props.state

    const hasParentOfType = editorState.blocks.some((block) => {
      return !!editorState.document.getClosest(block.key, parent => parent.type == type)
    })

    const isSameType = editorState.blocks.some((block) => {
      return block.type === type
    })

    return hasParentOfType || isSameType
  }

  hasLinks = () => {
    return this.props.state.inlines.some(inline => inline.type == INLINES.LINK)
  }

  onClickMarkButton = (e, type) => {
    e.preventDefault()

    const state = this.props.state
      .transform()
      .toggleMark(type)
      .focus()
      .apply()

    this.onChange(state)
  }

  onClickLinkButton = (e, type) => {
    e.preventDefault()

    const editorState = this.props.state

    if (this.hasLinks()) {
      this.onChange(
        editorState
          .transform()
          .unwrapInline('link')
          .apply()
      )
    } else {
      const blurredState = editorState
        .transform()
        .blur()
        .apply()

      this.onChange(blurredState)

      this.setState({ linkInputActive: true })
      this.hoverMenu.style.display = 'none'
      this.linkInput.style.display = 'block'
      this.linkInput.children[0].focus()
    }
  }

  onClickBlockButton = (e, type) => {
    e.preventDefault()
    const editorState = this.props.state
    const { document } = editorState
    const transform = editorState.transform()

    // Handle everything but list buttons.
    if (type != BLOCKS.UNORDERED_LIST && type != BLOCKS.ORDERED_LIST) {
      const isActive = this.hasBlock(type)
      const isList = this.hasBlock(BLOCKS.LIST_ITEM)

      if (isList) {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
          .unwrapBlock()
          .unwrapBlock()
      }

      else {
        transform
          .setBlock(isActive ? DEFAULT_NODE : type)
      }
    }

    // Handle the extra wrapping required for list items.
    else {
      const isList = this.hasBlock(BLOCKS.LIST_ITEM)
      const isType = editorState.blocks.some((block) => {
        return !!document.getClosest(block.key, parent => parent.type == type)
      })

      if (isList && isType) {
        transform
          .setBlock(DEFAULT_NODE)
          .unwrapBlock()
          .unwrapBlock()
      } else if (isList) {
        transform
          .unwrapBlock()
          .wrapBlock(type)
      } else {
        transform
          .setBlock(BLOCKS.LIST_ITEM)
          .wrapBlock(type)
      }
    }

    this.onChange(transform.apply())
  }

  onChangeLinkInput = (e) => {
    this.setState({ linkInputValue: e.target.value })
  }

  onKeyDownLinkInput = (e) => {
    if (e.keyCode === 13) {
      e.preventDefault()

      const editorState = this.props.state

      if (e.target.value === '') {
        this.hoverMenu.style.display = 'block'
        this.linkInput.style.display = 'none'
        this.setState({ linkInputActive: false })

        this.onChange(
          editorState
            .transform()
            .focus()
            .collapseToEnd()
            .apply()
        )
        return
      }

      this.hoverMenu.style.display = 'block'
      this.linkInput.style.display = 'none'

      const focusState = editorState
        .transform()
        .wrapInline({ type: INLINES.LINK, data: { url: e.target.value }})
        .collapseToEnd()
        .focus()
        .apply()

      this.onChange(focusState)
      this.setState({ linkInputActive: false, linkInputValue: '' })
    }
  }

  onLinkInputBlur = (e) => {
    this.setState({ linkInputActive: false, linkInputValue: '' })
    this.hoverMenu.style.display = 'block'
    this.linkInput.style.display = 'none'
  }

  onOpen = (portal) => {
    this.setState({ menu: portal.firstChild })
  }

  render = () => {
    return (
      <div>
        {this.renderMenu()}
      </div>
    )
  }

  renderMenu = () => {
    return (
      <Portal isOpened onOpen={this.onOpen}>
        <div className="menu hover-menu">
          <div ref={(hoverMenu) => { this.hoverMenu = hoverMenu }} style={{ display: 'block' }}>
            { MARK_TYPES.map((type) => { return this.renderMarkButton(type) }) }
            <span className='seperator'>|</span>
            { this.renderLinkButton(LINK_BUTTON) }
            <span className='seperator'>|</span>
            { BLOCK_TYPES.map((type) => { return this.renderBlockButton(type) }) }
          </div>
          <div ref={(linkInput) => { this.linkInput = linkInput }} style={{ display: 'none' }} >
            <input placeholder="Enter link URL" className="textInput" onBlur={this.onLinkInputBlur} onKeyDown={this.onKeyDownLinkInput} onChange={this.onChangeLinkInput} value={this.state.linkInputValue} />
          </div>
        </div>
      </Portal>
    )
  }

  renderMarkButton = (button) => {
    const isActive = this.hasMark(button.type)
    const onMouseDown = e => this.onClickMarkButton(e, button.type)

    return (
      <span key={button.type} className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <i className={button.iconClass} aria-hidden="true" />
      </span>
    )
  }

  renderLinkButton = (button) => {
    const isActive = this.hasLinks()
    const onMouseDown = e => this.onClickLinkButton(e, button.type)

    return (
      <span key={button.type} className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <i className={button.iconClass} aria-hidden="true" />
      </span>
    )
  }

  renderBlockButton = (button) => {
    const isActive = this.hasBlock(button.type)
    const onMouseDown = e => this.onClickBlockButton(e, button.type)

    return (
      <span key={button.type} className="button" onMouseDown={onMouseDown} data-active={isActive}>
        <i className={button.iconClass} aria-hidden="true" />
      </span>
    )
  }

  updateMenu = () => {
    const { menu, linkInputActive } = this.state
    const editorState = this.props.state
    if (!menu) return

    if ((editorState.isBlurred || editorState.isCollapsed) && !linkInputActive) {
      this.hideMenu()
      return
    }

    if (editorState.startBlock.key == editorState.document.nodes.first().key) {
      this.hideMenu()
      return
    }

    if (!linkInputActive) {
      this.placeMenuAboveSelection()
    }
  }

  placeMenuAboveSelection = () => {
    const { menu } = this.state
    // This is a hack that I don't know how to fix at the moment
    // If not for setTimeout, it fails to grab coordinates of
    // selection rect
    setTimeout(() => {
      this.showMenu()
      const rect = window.getSelection().getRangeAt(0).getBoundingClientRect()
      menu.style.top = `${rect.top + window.scrollY - menu.offsetHeight - 15}px`
      menu.style.left = `${rect.left + window.scrollX - menu.offsetWidth / 2 + rect.width / 2}px`
    }, 1)
  }

  showMenu = () => {
    const { menu } = this.state
    menu.style.display = 'block'
  }

  hideMenu = () => {
    const { menu } = this.state
    menu.style.display = 'none'
  }
}
