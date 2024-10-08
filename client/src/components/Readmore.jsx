import React from 'react';
import ReactReadMoreReadLess from "react-read-more-read-less";

export default function Readmore({ text }) {
  return (
    <ReactReadMoreReadLess
      charLimit={400}
      readMoreText={"Lire la suite ▼"}
      readLessText={"Lire moins ▲"}
    >
      {text}
    </ReactReadMoreReadLess>
  );
}
