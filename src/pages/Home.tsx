import '../styles/Home.css'

function Home(): JSX.Element {
  return (
    <div className="home">
      <h1>Build your own local tool</h1>
      <p className="subtitle">
        A blank foundation for any small app you wish existed — it runs entirely in your browser,
        your data never leaves your machine, and it ships as a single file you can just open.
      </p>

      <section className="intro">
        <h2>How this works</h2>
        <p>
          You don't write the code — you describe the tool you want, and the coding agent builds it
          with you. Tell it what you need in plain language. It will interview you to sharpen the
          idea, turn that into a short spec, build it test-first, and show you the running result.
          Then you ask for the next thing. Repeat until the tool does what you need.
        </p>
      </section>

      <section className="features">
        <h2>Try saying something like…</h2>
        <div className="feature-grid">
          <div className="feature-card">
            <h3>📊 Explore data</h3>
            <p className="prompt">"Let me drop in a CSV and filter, sort, and chart any column."</p>
          </div>
          <div className="feature-card">
            <h3>💸 Track money</h3>
            <p className="prompt">"A budget tracker: import my bank export and show spend by month and category."</p>
          </div>
          <div className="feature-card">
            <h3>✅ Build a habit</h3>
            <p className="prompt">"A habit tracker with a streak calendar I tick off each day."</p>
          </div>
          <div className="feature-card">
            <h3>📝 Capture notes</h3>
            <p className="prompt">"A markdown scratchpad with live preview that autosaves locally."</p>
          </div>
          <div className="feature-card">
            <h3>🔁 Convert formats</h3>
            <p className="prompt">"A JSON ↔ YAML converter that validates as I type."</p>
          </div>
          <div className="feature-card">
            <h3>🏋️ Log progress</h3>
            <p className="prompt">"A workout log where I record sets and see progress over time."</p>
          </div>
        </div>
        <p className="hint">
          These are just starting points. Describe whatever personal tool you have in mind — this
          template is the foundation for all of them.
        </p>
      </section>
    </div>
  )
}

export default Home
