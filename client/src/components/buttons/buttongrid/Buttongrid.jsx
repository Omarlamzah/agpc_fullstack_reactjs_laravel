import React from 'react'
import "./css.css"

export default function Buttongrid({text}) {
  return (
     /* From Uiverse.io by mrhyddenn */ 
<button className='btnnav md:w-full w-[80%] text-start'>
<span className='spanbtn'>{text}</span>
</button>
  )
}
