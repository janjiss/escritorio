import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import { Block, Editor, Raw, Html, Plain } from 'slate'
import enterPlugin from './plugins/enterPlugin'
import backspacePlugin from './plugins/backspacePlugin'
import onSavePlugin from './plugins/onSavePlugin'
import keyboardShortcuts from './plugins/keyboardShortcuts'
import onPasteHtml from './plugins/onPasteHtml'
import onPasteFiles from './plugins/onPasteFiles'
import ImageButton from './components/ImageButton'
import HoverMenu from './components/HoverMenu'
import SoftBreak from 'slate-soft-break'
import Escritorio from './api/escritorio'
import schema from './schema'
import { INITIAL_STATE } from './config'

const Api = new Escritorio

const editorElement = document.getElementById('editor')

class EscritorioEditor extends Component {
  constructor(props) {
    super(props)
    const postId = editorElement.dataset.postId.length <= 0 ? null : editorElement.dataset.postId
    this.state = { editorState: INITIAL_STATE, postId: postId }
  }

  componentDidMount = () => {
    Api.fetch(editorElement.dataset.postId, (editorState, post) => {
      this.setState({
        editorState: editorState
      })
      this.onChange(editorState)
    })
  }

  getLatestState = () => {
    return this.state.editorState
  }

  // On change, update the app's React state with the new editor state.
  onChange = (editorState) => {
    this.setState({ editorState })
  }

  onSave = () => {
    const { postId, editorState } = this.state
    Api.update(postId, editorState)
  }

  plugins = () => {
    return [
      backspacePlugin(),
      enterPlugin(),
      SoftBreak({ onlyIn: ['code-block'] }),
      onSavePlugin(this.onSave),
      onPasteHtml(),
      onPasteFiles(),
      keyboardShortcuts()
    ]
  }

  render = () => {
    return (
      <div>
        <HoverMenu getLatestState={this.getLatestState} onChange={this.onChange} />
        <div className="toolbar-wrapper">
          <div className="toolbar-block">
            <ul>
              <li className="image-upload">
                <ImageButton editorState={this.state.editorState} onChange={this.onChange} getLatestState={this.getLatestState} postId={this.state.postId}/>
              </li>
            </ul>
          </div>
        </div>
        <div className="editable">
          <Editor
            schema={schema}
            plugins={this.plugins()}
            state={this.state.editorState}
            onChange={this.onChange}
            focus={this.focus}
          >
          </Editor>
        </div> 
      </div>
    )
  }
}

ReactDOM.render(
  <EscritorioEditor />,
  editorElement
);
