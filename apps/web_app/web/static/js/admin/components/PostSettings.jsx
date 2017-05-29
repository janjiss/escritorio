import React from 'react'
import ReactDOM from 'react-dom'
import Portal from 'react-portal'

const KEYCODES = {
  ESCAPE: 27,
};

export default class PostSettings extends React.Component {

  constructor(props) {
    super(props)
    this.menuRef = null
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeydown);
    document.addEventListener('mouseup', this.handleOutsideMouseClick);
    document.addEventListener('touchstart', this.handleOutsideMouseClick);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeydown);
    document.removeEventListener('mouseup', this.handleOutsideMouseClick);
    document.removeEventListener('touchstart', this.handleOutsideMouseClick);
    this.props.closeSidebar()
  }

  style = () => {
    return {
      display: "block",
      position: "fixed",
      top: 0,
      right: 0,
      bottom: 0,
      zIndex: 500,
      overflow: "hidden",
      width: "350px",
      borderLeft: "#dfe1e3 1px solid",
      background: "#fff"
    }
  }

  render = () => {
    return (
      <Portal isOpened={this.props.sidebarOpened}>
        <aside ref={(ref) => { this.menuRef = ref }} style={this.style()} >
          <div className="post-settings">
            <div className="image-upload">
              <div className="description">Add post image</div>
            </div>
            <div>
              <label>Post url</label>
              <input/>
            </div>
            <div>
              <label>Publish date</label>
              <input/>
            </div>
            <div>
              <label>Tags</label>
              <input/>
            </div>
            <div>
              <label>Author</label>
              <select>
                <option>Janis Miezitis</option>
              </select>
            </div>
          </div>
        </aside>
      </Portal>
      )
  }

  handleOutsideMouseClick = (e) => {
    if (!this.props.sidebarOpened) { return; }

    const root = ReactDOM.findDOMNode(this.menuRef);
    if (root.contains(e.target) || (e.button && e.button !== 0)) { return; }

    e.stopPropagation();
    this.props.closeSidebar()
  }

  handleKeydown = (e) => {
    if (e.keyCode === KEYCODES.ESCAPE && this.props.sidebarOpened) {
      this.props.closeSidebar()
    }
  }
}
