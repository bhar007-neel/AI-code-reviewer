import { useState, useEffect } from 'react'
import "prismjs/themes/prism-tomorrow.css"
import Editor from "react-simple-code-editor"
import prism from "prismjs"
import Markdown from "react-markdown"
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from 'axios'
import './App.css'
const API = import.meta.env.VITE_API_URL;

function App() {
  const [code, setCode] = useState(`function sum() {
  return 1 + 1
}`)
  const [review, setReview] = useState(``)
  const [isLoading, setIsLoading] = useState(false)
  const [activeAgent, setActiveAgent] = useState(0)

  const agents = [
    { name: "Code Analyzer", icon: "🔍", description: "Analyzing structure" },
    { name: "Bug Detector", icon: "🐛", description: "Finding issues" },
    { name: "Performance Optimizer", icon: "⚡", description: "Optimizing code" },
    { name: "Review Complete", icon: "✅", description: "Review ready" }
  ]

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    setReview(``)
    setActiveAgent(0)
    
    try {
      const delays = [0, 1000, 2000, 3000]
      delays.forEach((delay, index) => {
        setTimeout(() => setActiveAgent(index), delay)
      })
      
      const response = await axios.post(API + "/ai/get-review", { code });
      setReview(response.data)
      setTimeout(() => setActiveAgent(3), 3000)
    } catch (error) {
      setReview(`❌ Error: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      {/* Agents Carousel at Top */}
      <div className="agents-top">
        <div className="agents-carousel">
          <div className="agent-display">
            <div className="agent-icon-large">{agents[activeAgent].icon}</div>
            <div className="agent-text">
              <div className="agent-name">{agents[activeAgent].name}</div>
              <div className="agent-status">{agents[activeAgent].description}</div>
            </div>
          </div>
          <div className="agents-progress">
            {agents.map((_, index) => (
              <div 
                key={index}
                className={`progress-dot ${index === activeAgent ? 'active' : ''} ${index < activeAgent ? 'completed' : ''}`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="main-content">
        {/* Left Panel - Code Editor */}
        <div className="panel left-panel">
          <div className="panel-header">
            <div className="header-title">Your Code</div>
            <div className="char-count">{code.length} characters</div>
          </div>
          
          <div className="code-editor-wrapper">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              className="code-editor"
              style={{
                fontFamily: '"Courier New", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                color: '#ffffff'
              }}
            />
          </div>

          <button 
            onClick={reviewCode}
            className={`review-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Reviewing...' : 'Review Code'}
          </button>
        </div>

        {/* Right Panel - Review Results */}
        <div className="panel right-panel">
          <div className="panel-header">
            <div className="header-title">AI Review</div>
            {review && <span className="status-badge">Done</span>}
          </div>

          <div className={`review-content ${review ? 'active' : ''}`}>
            {!review && !isLoading && (
              <div className="empty-state">
                <div className="empty-text">Submit your code to get started</div>
              </div>
            )}
            
            {isLoading && (
              <div className="loading-state">
                <div className="loader"></div>
                <p>Agents are reviewing...</p>
              </div>
            )}
            
            {review && (
              <div className="markdown-content">
                <Markdown rehypePlugins={[rehypeHighlight]}>
                  {review}
                </Markdown>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}

export default App