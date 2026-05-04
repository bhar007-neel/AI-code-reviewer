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

  const RobotSVG = () => (
    <svg viewBox="0 0 200 200" className="robot-svg">
      {/* Head */}
      <rect x="60" y="30" width="80" height="80" rx="5" fill="#ff0000" opacity="0.15" stroke="#ff0000" strokeWidth="2"/>
      {/* Eyes */}
      <circle cx="80" cy="55" r="8" fill="#ff0000" opacity="0.3"/>
      <circle cx="120" cy="55" r="8" fill="#ff0000" opacity="0.3"/>
      {/* Mouth */}
      <path d="M 80 75 L 120 75" stroke="#ff0000" strokeWidth="2" opacity="0.3"/>
      {/* Body */}
      <rect x="65" y="120" width="70" height="60" rx="5" fill="#ff0000" opacity="0.1" stroke="#ff0000" strokeWidth="2"/>
      {/* Arms */}
      <rect x="20" y="135" width="40" height="15" rx="7" fill="#ff0000" opacity="0.15" stroke="#ff0000" strokeWidth="2"/>
      <rect x="140" y="135" width="40" height="15" rx="7" fill="#ff0000" opacity="0.15" stroke="#ff0000" strokeWidth="2"/>
      {/* Legs */}
      <rect x="75" y="185" width="15" height="30" rx="7" fill="#ff0000" opacity="0.15" stroke="#ff0000" strokeWidth="2"/>
      <rect x="110" y="185" width="15" height="30" rx="7" fill="#ff0000" opacity="0.15" stroke="#ff0000" strokeWidth="2"/>
    </svg>
  )

  return (
    <div className="app-container">
      {/* Agents Carousel at Top */}
      <div className="agents-top">
        <div className="robot-background">
          <RobotSVG />
        </div>
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
                fontSize: 15,
                lineHeight: 1.8,
                color: '#ffffff',
                backgroundColor: '#1e1e2e',
                caretColor: '#4caf50'
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