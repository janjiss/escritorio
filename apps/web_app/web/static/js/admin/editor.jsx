import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Editor } from 'slate'
import enterPlugin from './plugins/enterPlugin'
import backspacePlugin from './plugins/backspacePlugin'
import keyboardShortcuts from './plugins/keyboardShortcuts'
import onPasteHtml from './plugins/onPasteHtml'
import onPasteFiles from './plugins/onPasteFiles'
import hoverMenu from './plugins/hoverMenu'
import inlineMenu from './plugins/inlineMenu'
import SoftBreak from 'slate-soft-break'
import Escritorio from './api/escritorio'
import schema from './schema'
import { INITIAL_STATE } from './config'

const Api = new Escritorio()

const editorElement = document.getElementById('editor')

class EscritorioEditor extends Component {

  constructor(props) {
    super(props)
    const postId = editorElement.dataset.postId.length <= 0 ? null : editorElement.dataset.postId
    this.state = { editorState: INITIAL_STATE, postId }
  }

  componentDidMount = () => {
    Api.fetch(editorElement.dataset.postId, (editorState, post) => {
      this.setState({
        editorState
      })
      this.onChange(editorState)
    })

    window.addEventListener("keydown", (e) => {
      if (e.keyCode == 83 && (navigator.platform.match("Mac") ? e.metaKey : e.ctrlKey)) {
        e.preventDefault();

        const { postId, editorState } = this.state
        Api.update(postId, editorState)
      }
    }, false);
  }

  getLatestState = () => {
    return this.state.editorState
  }

  onChange = (editorState) => {
    this.setState({ editorState })
  }

  plugins = () => {
    return [
      backspacePlugin(),
      enterPlugin(),
      inlineMenu(),
      hoverMenu(),
      SoftBreak({ onlyIn: ['code-block'] }),
      onPasteHtml(),
      onPasteFiles(),
      keyboardShortcuts()
    ]
  }

  render = () => {
    return (
      <div>
        <header className="post-edit-menu">
                     
        </header>
        <article className="editable">
          <Editor
            schema={schema}
            plugins={this.plugins()}
            state={this.state.editorState}
            onChange={this.onChange}
            focus={this.focus}
          />
        </article>
      </div>
    )
  }

}

ReactDOM.render(
  <EscritorioEditor />,
  editorElement
)
