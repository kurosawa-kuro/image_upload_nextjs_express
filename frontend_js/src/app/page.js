'use client';

import React, { useState } from "react"
import axios from 'axios'

export default function Home() {
  const [file, setFile] = useState()
  
  const upload = () => {
    const formData = new FormData()
    formData.append('file', file)
    axios.post('http://localhost:3001/upload', formData)
      .then(res => {
        console.log('File uploaded successfully');
      })
      .catch(er => console.log(er))
  }

  return (
    <div>
      <input type="file" onChange={(e) => setFile(e.target.files[0])}/>
      <button type="button" onClick={upload}>Upload</button>
    </div>
  )
}