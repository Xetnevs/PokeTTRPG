import 'src/Pokemon/Attributes/Evolution/evolution.css'

import PropTypes from 'prop-types'
import { useEffect, useRef } from 'react'

const AutoHeightTextArea = ({ children, ...props }) => {
  const textareaRef = useRef(null)

  useEffect(() => {
    // Set initial height based on the initial content
    if (textareaRef.current) {
      //reset it, so the scrollheight takes over and we can shrink if needed
      textareaRef.current.style.height = '25px'
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [props.value])

  return (
    <textarea ref={textareaRef} {...props}>
      {children}
    </textarea>
  )
}
AutoHeightTextArea.propTypes = {
  children: PropTypes.array,
  value: PropTypes.string,
}

export default AutoHeightTextArea
