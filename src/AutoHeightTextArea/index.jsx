import { useState, useEffect, useContext, useRef } from 'react'
import { usePokedex } from 'src/Contexts/PokedexContext'
import { useCustomConfig } from 'src/Contexts/CustomConfigContext'
import getEvolutionInfo from 'src/Pokemon/Attributes/Evolution/getEvolutionInfo'
import 'src/Pokemon/Attributes/Evolution/evolution.css'

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

export default AutoHeightTextArea
