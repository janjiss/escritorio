import { Raw } from 'slate'
import HTMLSerializer from '../serializers/htmlSerializer'

export default class Escritorio {

  fetch = (id, onSuccess) => {
    fetch(`/api/posts/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
      .then((post) => {
        const editorState = Raw.deserialize(post.raw, { terse: true })
        onSuccess(editorState, post)
      })
  }

  update = (postId, state) => {
    fetch(`/api/posts/${postId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: this.prepData(state) })
      .then((response) => {
        if (response.ok) {
          return response.json()
        }
      })
  }

  upload = (file, onSuccess) => {
    const data = new FormData()
    data.append('file', file)
    fetch('/api/uploads', { method: 'POST', body: data })
      .then((response) => {
        if (!response.ok) {
          throw Error(response.json())
        }
        return response.json()
      }).then((body) => {
        onSuccess(body)
      }).catch((error) => {
        // TODO: Handle error
      })
  }

  prepData = (state) => {
    const title = state.document.nodes.first()
    const excerpt = state.document.nodes.get(1)
    const updatedState = state.transform()
      .removeNodeByKey(title.key)
      .apply()

    const raw = Raw.serialize(state)
    const body = HTMLSerializer.serialize(updatedState)

    const payload = {
      post: {
        title: title.text,
        raw,
        body,
        excerpt: excerpt ? excerpt.text : ''
      }
    }

    return JSON.stringify(payload)
  }

}
