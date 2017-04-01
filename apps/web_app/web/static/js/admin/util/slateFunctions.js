export default {
  insertBlockAfterEndNode(editorState, transform, block) {
    const { document, endBlock } = editorState

    const topMostParent = this.getTopMostParent(document, endBlock)

    const index = document.nodes.findIndex((value) => {
      return topMostParent.key === value.key
    })

    return transform
      .insertNodeByKey(document.key, index + 1, block)
      .collapseToStartOfNextBlock()
      .focus()
  },

  getTopMostParent(document, node) {
    const ancestors = document.getAncestors(node.key)
    if (ancestors.size <= 1) {
      return node
    } else {
      return document.getAncestors(node.key).find((ancestor) => {
        return ancestor.kind !== 'document'
      })
    }
  }
}
