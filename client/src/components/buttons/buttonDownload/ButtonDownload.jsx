import { MdCloudDownload } from "react-icons/md"; 
 import React from 'react'
import "./css.css"

export default function ButtonDownload() {
  return (
<div className=" m-auto">
<button type="button" className="button  m-auto">
  <span className="button__text">TÉLÉCHARGER</span>
  <span className="button__icon">
    <MdCloudDownload className="  w-10 h-10 fill-white animate-bounce" />  
    </span>
</button> 
</div>

  )
}
