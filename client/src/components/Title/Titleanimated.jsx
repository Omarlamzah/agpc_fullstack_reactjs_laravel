import React from 'react'
import "./css.css"
export default function Titleanimated({text}) {
  return (
<div class="titleanimated md:text-2xl text-sm" data-text="Awesome">
    <span class="actual-text  md:pl-[10px] pl-[6px] ">&nbsp;{text}&nbsp;</span>
    <span aria-hidden="true" class="hover-text">&nbsp; {text} &nbsp;</span>
</div> 




)
}
