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
  const [activeAgent, setActiveAgent] = useState(null)

  useEffect(() => {
    prism.highlightAll()
  }, [])

  async function reviewCode() {
    setIsLoading(true)
    setReview(``)
    setActiveAgent('analyzer')
    
    try {
      setTimeout(() => setActiveAgent('debugger'), 800)
      setTimeout(() => setActiveAgent('optimizer'), 1600)
      
      const response = await axios.post(API + "/ai/get-review", { code });
      setReview(response.data)
      setActiveAgent('reviewer')
    } catch (error) {
      setReview(`❌ Error: ${error.message}`)
      setActiveAgent(null)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="app-container">
      <div className="background-glow"></div>
      <div className="background-glow-2"></div>
      
      <header className="header">
        <div className="header-content">
          <h1 className="title">
            <span className="title-icon">🤖</span>
            <span>AI Code Reviewer</span>
          </h1>
          <p className="subtitle">Professional code analysis powered by intelligent agents</p>
        </div>
      </header>

      <main className="main-content">
        {/* Left Panel - Code Editor */}
        <div className="panel left-panel">
          <div className="panel-header">
            <div className="header-title">
              <span className="icon">💻</span>
              <span>Your Code</span>
            </div>
            <div className="char-count">{code.length} chars</div>
          </div>
          
          <div className="code-editor-wrapper">
            <Editor
              value={code}
              onValueChange={code => setCode(code)}
              highlight={code => prism.highlight(code, prism.languages.javascript, "javascript")}
              padding={16}
              className="code-editor"
              style={{
                fontFamily: '"Fira Code", monospace',
                fontSize: 14,
                lineHeight: 1.6,
                color: '#e0e0e0'
              }}
            />
          </div>

          <button 
            onClick={reviewCode}
            className={`review-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            <span className="button-icon">✨</span>
            <span>{isLoading ? 'Reviewing...' : 'Review Code'}</span>
            {isLoading && <span className="button-spinner"></span>}
          </button>
        </div>

        {/* Middle - Agents */}
        <div className="agents-panel">
          <div className="agents-container">
            <Agent 
              name="Code Analyzer" 
              role="Analyzer"
              icon="🔍"
              isActive={activeAgent === 'analyzer'}
              description="Analyzing structure"
            />
            <Agent 
              name="Bug Detector" 
              role="Debugger"
              icon="🐛"
              isActive={activeAgent === 'debugger'}
              description="Finding issues"
            />
            <Agent 
              name="Performance Optimizer" 
              role="Optimizer"
              icon="⚡"
              isActive={activeAgent === 'optimizer'}
              description="Optimizing code"
            />
            <Agent 
              name="Review Complete" 
              role="Reviewer"
              icon="✅"
              isActive={activeAgent === 'reviewer'}
              description="Review ready"
            />
          </div>
        </div>

        {/* Right Panel - Review Results */}
        <div className="panel right-panel">
          <div className="panel-header">
            <div className="header-title">
              <span className="icon">📋</span>
              <span>AI Review</span>
            </div>
            {review && <span className="success-badge">Completed</span>}
          </div>

          <div className={`review-content ${review ? 'active' : ''}`}>
            {!review && !isLoading && (
              <div className="empty-state">
                <div className="empty-icon">📝</div>
                <p>Submit your code to get started</p>
              </div>
            )}
            
            {isLoading && (
              <div className="loading-state">
                <div className="code-pulse">
                  <div className="pulse-line"></div>
                  <div className="pulse-line"></div>
                  <div className="pulse-line"></div>
                </div>
                <p>Agents are reviewing your code...</p>
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

function Agent({ name, role, icon, isActive, description }) {
  return (
    <div className={`agent ${isActive ? 'active' : ''}`}>
      <div className="agent-avatar">
        <span className="agent-icon">{icon}</span>
        {isActive && <div className="agent-pulse"></div>}
      </div>
      <div className="agent-info">
        <div className="agent-name">{name}</div>
        <div className="agent-description">{description}</div>
      </div>
    </div>
  )
}

export default App