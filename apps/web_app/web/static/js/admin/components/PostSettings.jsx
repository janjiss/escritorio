import React from 'react'
import ReactDOM from 'react-dom'
import Portal from 'react-portal'

export default class PostSettings extends React.Component {

  constructor(props) {
    super(props)
    this.portalRef = null
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
      <Portal closeOnEsc closeOnOutsideClick isOpened={this.props.isOpened} ref={(ref) => { this.portalRef = ref }}>
        <aside style={this.style()} >
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
}
