<!-- ========================= -->
<!-- AI Code Reviewer README  -->
<!-- ========================= -->

<div align="center">

  <h1>🤖 AI Code Reviewer</h1>
  <p>
    A full-stack AI-powered code review tool that analyzes JavaScript code and provides
    structured feedback, best practices, and improvement suggestions in real time.
  </p>

  <p>
    <a href="https://ai-code-reviewer-1-fk71.onrender.com/" target="_blank">
      🔗 Live App
    </a>
    &nbsp; | &nbsp;
    <a href="https://ai-code-reviewer-kcte.onrender.com/" target="_blank">
      🔗 Backend API
    </a>
  </p>

</div>

<hr />



<!-- ========================= -->
<!-- What It Does             -->
<!-- ========================= -->

<h2>✨ Features</h2>

<ul>
  <li>🧠 AI-generated code reviews with clear summaries</li>
  <li>🧾 Highlights good practices and improvement areas</li>
  <li>🔍 Detects hard-coded values, config issues, and missing middleware</li>
  <li>📝 Produces structured, readable feedback</li>
  <li>⚡ Real-time response via a deployed backend API</li>
</ul>

<hr />

<!-- ========================= -->
<!-- Tech Stack               -->
<!-- ========================= -->

<h2>🛠️ Tech Stack</h2>

<h3>Frontend</h3>
<ul>
  <li>React (Vite)</li>
  <li>Axios</li>
  <li>react-simple-code-editor</li>
  <li>Prism.js (syntax highlighting)</li>
</ul>

<h3>Backend</h3>
<ul>
  <li>Node.js</li>
  <li>Express.js</li>
  <li>CORS (explicit origin whitelist)</li>
  <li>External AI API integration</li>
</ul>

<h3>Deployment</h3>
<ul>
  <li>Frontend: Render (Static Site)</li>
  <li>Backend: Render (Web Service)</li>
</ul>

<hr />

<!-- ========================= -->
<!-- Architecture             -->
<!-- ========================= -->

<h2>🏗️ Architecture</h2>

<pre>
Frontend (React)
   |
   |  POST /ai/get-review
   |
Backend (Express API)
   |
   |  AI Provider
   |
AI-Generated Review
</pre>

<hr />

<!-- ========================= -->
<!-- API Details              -->
<!-- ========================= -->

<h2>📡 API Endpoint</h2>

<p><strong>POST</strong> <code>/ai/get-review</code></p>

<p>Request body:</p>

<pre>
{
  "code": "function sum() { return 1 + 1 }"
}
</pre>

<p>Response:</p>
<ul>
  <li>Quick summary (good / needs improvement)</li>
  <li>Detailed issues & recommendations</li>
  <li>Actionable refactoring suggestions</li>
</ul>

<hr />

<!-- ========================= -->
<!-- Environment Variables    -->
<!-- ========================= -->

<h2>🔐 Environment Variables</h2>

<h3>Frontend</h3>

<pre>
VITE_API_URL=https://ai-code-reviewer-kcte.onrender.com
</pre>

<h3>Backend</h3>

<pre>
AI_API_KEY=your_api_key_here
PORT=3000
</pre>

<hr />

<!-- ========================= -->
<!-- Lessons Learned          -->
<!-- ========================= -->

<h2>🧠 Lessons Learned</h2>

<ul>
  <li>Linux is case-sensitive (folder names matter in production)</li>
  <li>Vite environment variables are baked at build time</li>
  <li>CORS must allow the frontend origin, not the backend</li>
  <li>Render root directories change how build paths work</li>
  <li>Clear build cache is sometimes non-optional</li>
</ul>

<hr />

<!-- ========================= -->
<!-- Future Improvements     -->
<!-- ========================= -->

<h2>🚀 Future Improvements</h2>

<ul>
  <li>Add authentication & rate limiting</li>
  <li>Support multiple languages</li>
  <li>Downloadable review reports</li>
  <li>Streaming responses for large files</li>
  <li>Project-level code analysis</li>
</ul>

<hr />

<!-- ========================= -->
<!-- Footer                   -->
<!-- ========================= -->

<p align="center">
  Built with persistence, caffeine, and way too much debugging.
</p>
