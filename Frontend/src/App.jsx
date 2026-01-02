import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [code, setCode] = useState(` function sum(){
  return 1+1
}`)

const [review, setReview] = useState(``)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000'

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode(){
   const response = await axios.post(`${API_BASE_URL}/ai/get-review`, { code })

   setReview(response.data)

  }

  return (
   <>
   <main>
    <div className="left">
      <div className="code">
        <Editor
          value={code}
          onValueChange={code => setCode(code)}
          highlight={code => prism.highlight(code, prism.languages.javascript)}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 16,
            width: "100%",
            height: "100%",
            border: "1px solid #ddd",
            borderRadius: "5px"
          }}
        />
      </div>
      <div 
      onClick={reviewCode}
      className="review">Review</div>
    </div>
    <div className="right">
      <Markdown
      rehypePlugins={[ rehypeHighlight ]}
      >{review}</Markdown>
    </div>
   </main>
   </>
  )
}



export default App
