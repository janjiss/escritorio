const getTopMostParent = (document, node) => {
  const ancestors = document.getAncestors(node.key)
  if (ancestors.size <= 1) {
    return node
  } else {
    return document.getAncestors(node.key).find((ancestor) => {
      return ancestor.kind !== 'document'
    })
  }
}

const insertBlockAfterEndNode = (editorState, transform, block) => {
  const { document, endBlock } = editorState

  const topMostParent = getTopMostParent(document, endBlock)

  const index = document.nodes.findIndex((value, index) => {
    return topMostParent.key === value.key
  })

  return transform
    .insertNodeByKey(document.key, index + 1, block)
    .collapseToStartOfNextBlock()
    .focus()
}

export default { getTopMostParent, insertBlockAfterEndNode }
