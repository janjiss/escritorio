import { Block } from 'slate'
import { BLOCKS } from '../config'
import slateFunctions from '../util/slateFunctions'

export default function onPasteFiles() {
  return {
    onPaste: (e, data, editorState) => {
      if (data.files.size < 1) return

      const transform = editorState.transform()

      data.files.forEach((file) => {
        slateFunctions.insertBlockAfterEndNode(
          editorState,
          transform,
          Block.create({
            type: BLOCKS.IMAGE,
            isVoid: true,
            data: { imageData: { rawFile: file }}
          })
        )
      })
      return transform.apply()
    }
  }
}
